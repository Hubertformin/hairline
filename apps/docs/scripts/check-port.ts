/**
 * The port gate: proves the Tailwind component renders the same pixels as the
 * original `.led-*` class layer, in both themes.
 *
 * The docs page renders both implementations of the same markup side by side. This
 * screenshots each panel and diffs them. If the generated `@theme` bridge is wrong —
 * a token mapped to the wrong namespace, a size that resolved to the default scale,
 * a composite type utility missing its tracking — the two panels stop matching and
 * this fails.
 *
 * Running it while the library is two components large is the whole point: a bridge
 * mistake found here costs one component to fix, not the whole catalogue.
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const diffDir = resolve(root, 'diffs');
const PORT = 3399;
const THRESHOLD = 0.001;

async function waitForServer(url: string, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`server did not start within ${timeoutMs}ms`);
}

await rm(diffDir, { recursive: true, force: true });
await mkdir(diffDir, { recursive: true });

const server = spawn('npx', ['next', 'start', '--port', String(PORT)], {
  cwd: root,
  stdio: 'ignore',
  detached: true,
});

const failures: string[] = [];
try {
  await waitForServer(`http://127.0.0.1:${PORT}/`);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 1400 }, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  for (const theme of ['light', 'dark'] as const) {
    await page.evaluate((t) => {
      document.documentElement.dataset.theme = t;
    }, theme);
    await page.waitForTimeout(200);

    const shots = await Promise.all(
      (['original', 'ported'] as const).map(async (which) => {
        const el = await page.$(`[data-fidelity="${which}"]`);
        if (!el) throw new Error(`no [data-fidelity="${which}"] panel on the page`);
        return PNG.sync.read(await el.screenshot({ type: 'png' }));
      }),
    );

    const a = shots[0]!;
    const b = shots[1]!;
    if (a.width !== b.width || a.height !== b.height) {
      failures.push(`${theme}: panels differ in size — ${a.width}x${a.height} vs ${b.width}x${b.height}`);
      continue;
    }

    const diff = new PNG({ width: a.width, height: a.height });
    const changed = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
      threshold: 0.12,
      includeAA: false,
    });
    const ratio = changed / (a.width * a.height);

    if (ratio > THRESHOLD) {
      failures.push(`${theme}: ${(ratio * 100).toFixed(3)}% of pixels differ (${changed})`);
      const sheet = new PNG({ width: a.width * 3, height: a.height });
      PNG.bitblt(a, sheet, 0, 0, a.width, a.height, 0, 0);
      PNG.bitblt(b, sheet, 0, 0, a.width, a.height, a.width, 0);
      PNG.bitblt(diff, sheet, 0, 0, a.width, a.height, a.width * 2, 0);
      await writeFile(resolve(diffDir, `port-${theme}.png`), PNG.sync.write(sheet));
    }
  }

  await browser.close();
} finally {
  // The spawn is detached so the whole process group goes, not just the shim.
  try {
    process.kill(-server.pid!, 'SIGTERM');
  } catch {
    /* already gone */
  }
}

if (failures.length) {
  console.error('The Tailwind port does not match the class layer:');
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error('\n  Three-up diffs (original | ported | difference) in apps/docs/diffs/');
  process.exit(1);
}

console.log('port ok — the Tailwind component matches the class layer in light and dark');
