/**
 * Visual regression: proves each implementation of a component renders the same
 * pixels as the original Claude Design export.
 *
 * `docs/compare.html` renders the export's own components (compiled straight out of
 * `reference/components/`) beside ours. This script screenshots each pair at several
 * widths and diffs them, so "we checked it by eye once" becomes something CI enforces
 * on every commit.
 *
 * It exists before the Tailwind port rather than after, because the port is a
 * reimplementation — `.led-tile--dark .led-stat__value` has no utility form and has to
 * be rebuilt with `data-*` attributes and `group-data-[…]`. Reimplementations drift by
 * a pixel at a time, and a pixel at a time is exactly what an eyeball misses.
 *
 * Failures are written to `docs/diffs/` as three-up PNGs (expected / actual / diff).
 */
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium, type Browser } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const diffDir = resolve(root, 'docs/diffs');

/**
 * Antialiasing on text differs by a hair between two DOM structures that paint the
 * same glyphs, so a nonzero floor is required. 0.1% of a cell is a few dozen pixels —
 * far below a spacing or colour mistake, which moves thousands.
 */
const THRESHOLD = 0.001;
/** Per-pixel colour sensitivity handed to pixelmatch (0 strict … 1 loose). */
const PIXEL_TOLERANCE = 0.12;

/**
 * Only widths at which the compare page's own three-column grid still holds.
 *
 * Below roughly 1100px the harness's `150px 1fr 1fr` grid squeezes each cell until
 * specimen content rewraps and every row shifts a pixel — which diffs as a whole-cell
 * failure while both implementations are in fact identical. Testing there measures the
 * harness, not the components. When the components themselves become responsive, this
 * gains narrow widths and the compare page gains a responsive grid to match.
 */
const WIDTHS = [1440, 1200];

/**
 * Differences from the export that are deliberate, each with a bound.
 *
 * A bare allowlist would hide any future regression in the same component, so each
 * entry caps how far it may diverge: a fix that grows past its bound fails like
 * anything else.
 */
const INTENTIONAL: Record<string, { maxRatio: number; reason: string }> = {
  Tile: {
    maxRatio: 0.03,
    reason:
      "the export's StatBlock hardcodes --ink-1, so a figure inside tone=\"dark\" renders " +
      'black on black; ours reads --text-on-inverse and is legible',
  },
};

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
};

function serve(dir: string): Promise<{ url: string; close: () => Promise<void> }> {
  const server = createServer(async (req, res) => {
    try {
      const path = decodeURIComponent((req.url ?? '/').split('?')[0]!);
      const file = resolve(dir, `.${path}`);
      if (!file.startsWith(dir)) throw new Error('escape');
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end('not found');
    }
  });
  return new Promise((ok) => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address() as { port: number };
      ok({
        url: `http://127.0.0.1:${port}`,
        close: () => new Promise<void>((done) => server.close(() => done())),
      });
    });
  });
}

/** Pads both images to a common canvas so a 1px size difference is a diff, not a crash. */
function pad(png: PNG, w: number, h: number): PNG {
  if (png.width === w && png.height === h) return png;
  const out = new PNG({ width: w, height: h });
  // Fill with magenta so any size difference shows up loudly rather than as black.
  for (let i = 0; i < out.data.length; i += 4) {
    out.data[i] = 255;
    out.data[i + 1] = 0;
    out.data[i + 2] = 255;
    out.data[i + 3] = 255;
  }
  PNG.bitblt(png, out, 0, 0, png.width, png.height, 0, 0);
  return out;
}

interface Failure {
  name: string;
  width: number;
  ratio: number;
  changed: number;
}

async function run(browser: Browser, url: string) {
  const failures: Failure[] = [];
  const known: { name: string; width: number; ratio: number; reason: string }[] = [];
  let compared = 0;

  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 1200 }, deviceScaleFactor: 1 });
    await page.goto(`${url}/docs/compare.html`, { waitUntil: 'networkidle' });
    // The page loads webfonts; comparing before they settle produces false diffs.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(250);

    const names = await page.$$eval('.pair > h2', (hs) => hs.map((h) => h.textContent!.trim()));

    for (const [i, name] of names.entries()) {
      const cells = await page.$$(`.pair:nth-of-type(${i + 1}) .frame`);
      if (cells.length < 2) continue;

      const shots = await Promise.all(cells.map((c) => c.screenshot({ type: 'png' })));
      const pngs = shots.map((b) => PNG.sync.read(b));
      const w = Math.max(...pngs.map((p) => p.width));
      const h = Math.max(...pngs.map((p) => p.height));

      // Column 0 is always the export; every later column is checked against it.
      const expected = pad(pngs[0]!, w, h);
      for (let col = 1; col < pngs.length; col++) {
        const actual = pad(pngs[col]!, w, h);
        const diff = new PNG({ width: w, height: h });
        const changed = pixelmatch(expected.data, actual.data, diff.data, w, h, {
          threshold: PIXEL_TOLERANCE,
          includeAA: false,
        });
        const ratio = changed / (w * h);
        compared++;

        const allowed = INTENTIONAL[name];
        if (allowed && ratio <= allowed.maxRatio) {
          known.push({ name, width, ratio, reason: allowed.reason });
        } else if (ratio > THRESHOLD) {
          failures.push({ name: `${name} [col ${col}]`, width, ratio, changed });
          const sheet = new PNG({ width: w * 3, height: h });
          PNG.bitblt(expected, sheet, 0, 0, w, h, 0, 0);
          PNG.bitblt(actual, sheet, 0, 0, w, h, w, 0);
          PNG.bitblt(diff, sheet, 0, 0, w, h, w * 2, 0);
          const file = `${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${width}-col${col}.png`;
          await writeFile(resolve(diffDir, file), PNG.sync.write(sheet));
        }
      }
    }
    await page.close();
  }
  return { failures, known, compared };
}

await rm(diffDir, { recursive: true, force: true });
await mkdir(diffDir, { recursive: true });

const server = await serve(root);
const browser = await chromium.launch();
try {
  const { failures, known, compared } = await run(browser, server.url);

  const seen = new Set<string>();
  for (const k of known) {
    if (seen.has(k.name)) continue;
    seen.add(k.name);
    console.log(`  · ${k.name} differs by design — ${k.reason}`);
  }

  // An allowlist entry for something that no longer diverges is a stale rule that
  // would mask a future regression, so say so.
  for (const name of Object.keys(INTENTIONAL)) {
    if (!seen.has(name)) {
      console.error(
        `\n  ✗ ${name} is listed as an intentional divergence but now matches the export — remove the entry.`,
      );
      process.exit(1);
    }
  }

  if (failures.length) {
    console.error(`Visual drift from the export (${failures.length} of ${compared} comparisons):\n`);
    for (const f of failures) {
      console.error(
        `  ✗ ${f.name} at ${f.width}px — ${(f.ratio * 100).toFixed(3)}% of pixels differ (${f.changed})`,
      );
    }
    console.error(`\n  Three-up diffs (expected | actual | difference) in docs/diffs/`);
    process.exit(1);
  }

  console.log(
    `visual ok — ${compared} comparisons across ${WIDTHS.length} widths; ` +
      `${compared - known.length} within ${(THRESHOLD * 100).toFixed(1)}% of the export, ` +
      `${known.length} diverging by design`,
  );
} finally {
  await browser.close();
  await server.close();
}
