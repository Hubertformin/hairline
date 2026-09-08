/**
 * Fails if the generated CSS has drifted from the original Claude Design export.
 *
 * The export in `reference/tokens/` is the fidelity baseline: the Moni mockups and
 * the `guidelines/` specimen cards were authored against those exact custom
 * properties. This check permits ADDING properties (the system grows) but never
 * renaming, removing or changing the value of one that already shipped.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Every `--name:value;` declaration in a stylesheet, last one winning. */
function declarations(css: string): Map<string, string> {
  const out = new Map<string, string>();
  // Strip comments first so a commented-out declaration is not counted.
  const bare = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of bare.matchAll(/--([A-Za-z0-9-]+)\s*:\s*([^;}]+)/g)) {
    out.set(m[1]!, m[2]!.trim().replace(/\s+/g, ' '));
  }
  return out;
}

const baselineDir = resolve(root, 'reference/tokens');
const baseline = new Map<string, string>();
for (const file of readdirSync(baselineDir).filter((f) => f.endsWith('.css'))) {
  for (const [k, v] of declarations(readFileSync(resolve(baselineDir, file), 'utf8'))) {
    baseline.set(k, v);
  }
}

const generated = declarations(
  readFileSync(resolve(root, 'src/css/tokens.generated.css'), 'utf8'),
);

const missing: string[] = [];
const changed: string[] = [];
for (const [name, want] of baseline) {
  const got = generated.get(name);
  if (got === undefined) missing.push(`--${name}`);
  else if (got !== want) changed.push(`--${name}\n      export: ${want}\n      built:  ${got}`);
}

const added = [...generated.keys()].filter((k) => !baseline.has(k));

if (missing.length || changed.length) {
  console.error('Token drift against the original export:\n');
  if (missing.length) console.error(`  Missing (${missing.length}):\n    ${missing.join('\n    ')}\n`);
  if (changed.length) console.error(`  Changed (${changed.length}):\n    ${changed.join('\n    ')}\n`);
  process.exit(1);
}

console.log(
  `tokens ok — ${baseline.size} export properties reproduced exactly` +
    (added.length ? `, ${added.length} added (${added.map((a) => `--${a}`).join(', ')})` : ''),
);
