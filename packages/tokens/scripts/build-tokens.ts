/**
 * Generates the CSS custom-property layer from the TypeScript token source.
 *
 * The property names emitted here are a compatibility contract: the Moni `.dc.html`
 * mockups, the `guidelines/` specimen cards and any HTML written against the
 * original Claude Design export all read `var(--ink-1)`, `var(--type-label)` and
 * friends. `scripts/check-tokens.ts` fails the build if a name or value drifts.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { palette, alias } from '../src/color.js';
import { family, text, tracking, type TextStyle } from '../src/typography.js';
import { space, inset, gap, clearanceBar } from '../src/space.js';
import { radius, height, shadow, scrim, stroke, dotSeries } from '../src/shape.js';
import { ease, duration } from '../src/motion.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** `500 46px/1 var(--font-sans)` — the CSS `font` shorthand, as the export wrote it. */
export function fontShorthand(t: TextStyle): string {
  const lh = t.lineHeight === 'normal' ? '' : `/${t.lineHeight}`;
  return `${t.weight} ${t.size}px${lh} var(--font-${t.family})`;
}

/** The export writes a bare `0`, never `0px`. Keep that. */
const px = (n: number) => (n === 0 ? '0' : `${n}px`);
const em = (n: number) => `${n}em`;

interface Block {
  title: string;
  lines: string[];
}

const declare = (name: string, value: string) => `  --${name}:${value};`;

const colors: Block = {
  title: 'colors',
  lines: [
    '  /* ink — text, in four steps from black to placeholder */',
    ...(['ink-1', 'ink-2', 'ink-3', 'ink-4'] as const).map((k) => declare(k, palette[k])),
    '',
    '  /* surfaces — paper white through to the desk the app sits on */',
    ...(['paper', 'surface-1', 'surface-2', 'surface-3', 'desk'] as const).map((k) =>
      declare(k, palette[k]),
    ),
    '',
    '  /* lines — two weights only */',
    ...(['line-1', 'line-2'] as const).map((k) => declare(k, palette[k])),
    '',
    '  /* accents — a spectrum for data series, never for chrome */',
    ...(Object.keys(palette) as (keyof typeof palette)[])
      .filter((k) => k.startsWith('a-'))
      .map((k) => declare(k, palette[k])),
    '',
    '  /* semantic — each has an ink and a wash, and the pair is used together */',
    ...(['alarm', 'positive', 'info', 'caution'] as const).map(
      (k) => `  --${k}:${palette[k]};      --${k}-wash:${palette[`${k}-wash`]};`,
    ),
    declare('marker', palette.marker) + '     /* the highlighter, once per screen */',
    '',
    '  /* semantic aliases — prefer these in components */',
    ...Object.entries(alias).map(([name, target]) => declare(name, `var(--${target})`)),
  ],
};

const typography: Block = {
  title: 'typography',
  lines: [
    declare('font-sans', family.sans.stack),
    declare('font-mono', family.mono.stack),
    '',
    '  /* display — figures and page titles, always tight */',
    ...(['figure-xl', 'figure-l', 'figure-m', 'figure-s'] as const).map((k) =>
      declare(`type-${k}`, fontShorthand(text[k])),
    ),
    declare('track-figure', em(tracking.figure)),
    '',
    '  /* prose */',
    ...(['lead', 'body', 'body-s', 'caption'] as const).map((k) =>
      declare(`type-${k}`, fontShorthand(text[k])),
    ),
    '',
    "  /* label — mono, uppercase, wide. the system's signature */",
    ...(['label', 'label-s'] as const).map((k) => declare(`type-${k}`, fontShorthand(text[k]))),
    declare('track-label', em(tracking.label)),
    declare('track-meta', em(tracking.meta)),
    '',
    '  /* data — mono figures, tabular and slashed */',
    ...(['data', 'data-s'] as const).map((k) => declare(`type-${k}`, fontShorthand(text[k]))),
    declare('numeric-data', 'tabular-nums slashed-zero'),
    '',
    '  /* content — the sans at the sizes the components actually set it */',
    ...(['item', 'value', 'chip', 'prefix', 'amount'] as const).map((k) =>
      declare(`type-${k}`, fontShorthand(text[k])),
    ),
    declare('track-amount', em(tracking.amount)),
    declare('track-unit', em(tracking.unit)),
    declare('track-prefix', em(tracking.prefix)),
    '',
    '  /* control — the sans used inside pressable things */',
    ...(['control', 'control-s', 'control-l'] as const).map((k) =>
      declare(`type-${k}`, fontShorthand(text[k])),
    ),
  ],
};

const spacing: Block = {
  title: 'spacing',
  lines: [
    ...[
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14],
    ].map((row) =>
      row
        .map((n) => `  --s-${n}:${px(space[n as keyof typeof space])};`.trimStart())
        .join('  ')
        .replace(/^/, '  '),
    ),
    '',
    declare('gap-tile', px(gap.tile)) + '        /* between tiles in a row */',
    declare('gap-column', px(gap.column)) + '      /* between page columns */',
    declare('pad-board', `${px(inset.board.y)} ${px(inset.board.x)}`) + '  /* a full page board */',
    declare('pad-card', `${px(inset.card.y)} ${px(inset.card.x)}`) + '  /* a tile */',
    declare('pad-row', `${px(inset.row.y)} ${px(inset.row.x)}`) +
      '  /* a list row, horizontal padding comes from the parent */',
    declare('clearance-bar', px(clearanceBar)) +
      '  /* bottom padding when a floating bar is present */',
  ],
};

const shapes: Block = {
  title: 'shape',
  lines: [
    ...(Object.keys(radius) as (keyof typeof radius)[]).map((k) => declare(`r-${k}`, px(radius[k]))),
    '',
    declare('h-control', px(height.control)) + '   /* buttons, selects */',
    declare('h-field', px(height.field)) + '     /* text fields */',
    declare('h-field-lg', px(height['field-lg'])) + '  /* amount fields */',
    declare('h-pill', px(height.pill)) + '      /* tabs, chips */',
    declare('h-touch', px(height.touch)) + '     /* minimum on mobile */',
    '',
    ...(Object.keys(shadow) as (keyof typeof shadow)[]).map((k) => {
      const s = shadow[k];
      return declare(`shadow-${k}`, `${px(s.x)} ${px(s.y)} ${px(s.blur)} ${s.color}`);
    }),
    declare('scrim', scrim),
    '',
    declare('stroke-meter', px(stroke.meter)),
    declare('stroke-series', px(stroke.series)),
    declare('dot-series', px(dotSeries)),
  ],
};

const motion: Block = {
  title: 'motion',
  lines: [
    declare('ease', ease),
    declare('dur-fast', `${duration.fast}ms`),
    declare('dur-base', `${duration.base}ms`),
    declare('dur-slow', `${duration.slow}ms`),
    declare('dur-travel', `${duration.travel}ms`) +
      '   /* an amount arcing from one place to another */',
    declare('t-color', 'color var(--dur-fast) var(--ease), background var(--dur-fast) var(--ease)'),
    declare('t-state', 'opacity var(--dur-slow) var(--ease), color var(--dur-slow) var(--ease)'),
  ],
};

const banner = `/* Generated by scripts/build-tokens.ts from src/tokens/*.ts — do not edit.
   Edit the TypeScript source and run \`pnpm build:tokens\`. */`;

const body = [colors, typography, spacing, shapes, motion]
  .map((b) => `  /* ── ${b.title} ─────────────────────────────────────── */\n${b.lines.join('\n')}`)
  .join('\n\n');

const fonts = `@import url("https://fonts.googleapis.com/css2?family=${family.sans.google.replace(
  / /g,
  '+',
)}:wght@${family.sans.weights.join(';')}&family=${family.mono.google.replace(
  / /g,
  '+',
)}:wght@${family.mono.weights.join(';')}&display=swap");`;

const out = `${banner}\n\n${fonts}\n\n:root{\n${body}\n}\n`;

const target = resolve(root, 'src/css/tokens.generated.css');
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, out);
console.log(`tokens → ${target.replace(root + '/', '')} (${out.split('\n').length} lines)`);
