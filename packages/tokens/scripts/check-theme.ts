/**
 * The Tailwind bridge contract.
 *
 * `check-tokens.ts` guards the legacy layer against drift from the original export.
 * This guards the bridge on top of it, and it exists because every failure mode here
 * is silent: a hardcoded colour still renders, it just stops following the theme; a
 * missing bridge entry just means a utility quietly doesn't exist; an unmirrored
 * reference resolves to nothing and paints transparent.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { palette, alias, darkPalette } from '../src/color.js';
import { text, tracking } from '../src/typography.js';
import { radius, height, shadow } from '../src/shape.js';
import { ALIAS_THEME_KEY } from './emit-theme.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(resolve(root, 'src/css/theme.generated.css'), 'utf8');

const failures: string[] = [];
const fail = (msg: string) => failures.push(msg);

/** The text between `@theme inline {` and its closing brace. */
const themeBlock = (() => {
  const start = css.indexOf('@theme inline {');
  if (start === -1) return '';
  const end = css.indexOf('\n}', start);
  return css.slice(start, end);
})();

if (!themeBlock) fail('no `@theme inline` block found');

/** Declarations inside the @theme block, as [name, value]. */
const themeDecls = new Map<string, string>();
for (const m of themeBlock.matchAll(/^\s*(--[A-Za-z0-9-]+):\s*([^;]+);/gm)) {
  themeDecls.set(m[1]!, m[2]!.trim());
}

/** Every mirror declared in the :root mirrors block. */
const mirrors = new Set<string>();
for (const m of css.matchAll(/^\s*(--lg-[A-Za-z0-9-]+):/gm)) mirrors.add(m[1]!);

// 1. Colour must never be a literal — a hex here silently stops following the theme.
for (const [name, value] of themeDecls) {
  if (!name.startsWith('--color-')) continue;
  if (!/^var\(--lg-[a-z0-9-]+\)$/.test(value)) {
    fail(`${name} must be a var(--lg-*) reference, got \`${value}\``);
  }
}
const hexInTheme = themeBlock.match(/#[0-9a-fA-F]{3,8}\b/g);
if (hexInTheme) fail(`hex colour literal(s) inside @theme: ${[...new Set(hexInTheme)].join(', ')}`);

// 2. Every var(--lg-*) referenced anywhere must actually be declared.
for (const m of css.matchAll(/var\((--lg-[A-Za-z0-9-]+)\)/g)) {
  if (!mirrors.has(m[1]!)) fail(`references ${m[1]} but no mirror declares it`);
}

// 3. Totality — a token added to the source without a bridge is a utility that
//    silently doesn't exist.
const want: [string, string][] = [
  ...Object.keys(palette).map((k) => [`--color-${k}`, `palette.${k}`] as [string, string]),
  ...Object.keys(alias).map(
    (k) => [`--color-${ALIAS_THEME_KEY[k as keyof typeof alias]}`, `alias.${k}`] as [string, string],
  ),
  ...Object.keys(text).map((k) => [`--text-${k}`, `text.${k}`] as [string, string]),
  ...Object.keys(tracking).map((k) => [`--tracking-${k}`, `tracking.${k}`] as [string, string]),
  ...Object.keys(radius).map((k) => [`--radius-${k}`, `radius.${k}`] as [string, string]),
  ...Object.keys(shadow).map((k) => [`--shadow-${k}`, `shadow.${k}`] as [string, string]),
  ...Object.keys(height).map((k) => [`--spacing-${k}`, `height.${k}`] as [string, string]),
];
for (const [key, source] of want) {
  if (!themeDecls.has(key)) fail(`${source} has no @theme entry (expected ${key})`);
}

// 4. Every type token needs its composite utility — the metrics alone lose family,
//    case and numerics, which is exactly how a mono label turns into a sans one.
for (const k of Object.keys(text)) {
  if (!css.includes(`@utility type-${k} {`)) fail(`text.${k} has no \`type-${k}\` utility`);
}

// 5. Dark must re-point the whole raw scale. A token left out keeps its light value
//    and turns into a white-on-white bug in exactly one theme.
const darkBlock = (() => {
  const start = css.indexOf('.dark{');
  if (start === -1) return '';
  return css.slice(start, css.indexOf('\n}', start));
})();
if (!darkBlock) fail('no dark theme block found');
for (const k of Object.keys(palette)) {
  if (!new RegExp(`^\\s*--${k}:`, 'm').test(darkBlock)) fail(`dark theme does not re-point --${k}`);
}
for (const k of Object.keys(darkPalette)) {
  if (!(k in palette)) fail(`darkPalette has --${k}, which is not in the light palette`);
}

if (failures.length) {
  console.error(`Tailwind bridge contract violated (${failures.length}):`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}

console.log(
  `theme ok — ${themeDecls.size} bridged tokens, ${mirrors.size} mirrors, ` +
    `${Object.keys(text).length} type utilities, dark re-points ${Object.keys(darkPalette).length}`,
);
