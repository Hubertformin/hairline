/**
 * The machine-readable token table.
 *
 * One entry per token, carrying every name it is known by: the legacy custom
 * property, the Tailwind theme variable, and the utility class it generates. The
 * docs site, `llms-full.txt` and the registry's `cssVars` block all read this rather
 * than re-deriving the mapping — so an agent asking "what is the radius of a card"
 * gets `--r-card` / `--radius-card` / `rounded-card` / `20px` from one place.
 */
import { palette, alias, darkPalette } from '../src/color.js';
import { family, text, tracking } from '../src/typography.js';
import { space, inset, gap, clearanceBar } from '../src/space.js';
import { radius, height, shadow, scrim, stroke, dotSeries } from '../src/shape.js';
import { ease, duration } from '../src/motion.js';
import { ALIAS_THEME_KEY } from './emit-theme.js';

export interface TokenEntry {
  /** The token's family, for grouping in docs. */
  family: 'color' | 'type' | 'space' | 'size' | 'radius' | 'shadow' | 'motion' | 'tracking';
  /** The legacy CSS custom property, e.g. `--ink-1`. */
  legacy: string;
  /** The Tailwind theme variable, e.g. `--color-ink-1`. Absent when not bridged. */
  theme?: string;
  /** Example utilities this token generates, e.g. `bg-ink-1`. */
  utilities?: string[];
  value: string;
  /** The dark-theme value, where the token is re-pointed. */
  dark?: string;
  note?: string;
}

const px = (n: number) => (n === 0 ? '0' : `${n}px`);

export function emitJson(): string {
  const tokens: TokenEntry[] = [];

  for (const [k, v] of Object.entries(palette)) {
    tokens.push({
      family: 'color',
      legacy: `--${k}`,
      theme: `--color-${k}`,
      utilities: [`bg-${k}`, `text-${k}`, `border-${k}`, `fill-${k}`],
      value: v,
      dark: (darkPalette as Record<string, string>)[k],
    });
  }
  for (const [k, target] of Object.entries(alias)) {
    const short = ALIAS_THEME_KEY[k as keyof typeof alias];
    tokens.push({
      family: 'color',
      legacy: `--${k}`,
      theme: `--color-${short}`,
      utilities: [`bg-${short}`, `text-${short}`, `border-${short}`],
      value: `var(--${target})`,
      note: 'Semantic alias — prefer these in components; a theme swap re-points them.',
    });
  }

  tokens.push({ family: 'type', legacy: '--font-sans', theme: '--font-sans', utilities: ['font-sans'], value: family.sans.stack });
  tokens.push({ family: 'type', legacy: '--font-mono', theme: '--font-mono', utilities: ['font-mono'], value: family.mono.stack });

  for (const [k, t] of Object.entries(text)) {
    tokens.push({
      family: 'type',
      legacy: `--type-${k}`,
      theme: `--text-${k}`,
      utilities: [`type-${k}`],
      value: `${t.weight} ${t.size}px${t.lineHeight === 'normal' ? '' : `/${t.lineHeight}`} ${family[t.family].stack}`,
      note: `Use the \`type-${k}\` utility — it carries family, size, weight, line-height${
        t.tracking ? ', tracking' : ''
      }${t.uppercase ? ', uppercase' : ''}${t.tabular ? ', tabular figures' : ''} together.`,
    });
  }
  for (const [k, v] of Object.entries(tracking)) {
    tokens.push({ family: 'tracking', legacy: `--track-${k}`, theme: `--tracking-${k}`, utilities: [`tracking-${k}`], value: `${v}em` });
  }

  for (const [k, v] of Object.entries(space)) {
    tokens.push({ family: 'space', legacy: `--s-${k}`, theme: `--spacing-s${k}`, utilities: [`p-s${k}`, `gap-s${k}`, `mt-s${k}`], value: px(v) });
  }
  tokens.push({ family: 'space', legacy: '--gap-tile', theme: '--spacing-gap-tile', utilities: ['gap-gap-tile'], value: px(gap.tile) });
  tokens.push({ family: 'space', legacy: '--gap-column', theme: '--spacing-gap-column', utilities: ['gap-gap-column'], value: px(gap.column) });
  tokens.push({ family: 'space', legacy: '--pad-board', value: `${px(inset.board.y)} ${px(inset.board.x)}`, theme: '--spacing-board-y / --spacing-board-x', utilities: ['py-board-y', 'px-board-x'] });
  tokens.push({ family: 'space', legacy: '--pad-card', value: `${px(inset.card.y)} ${px(inset.card.x)}`, theme: '--spacing-card-y / --spacing-card-x', utilities: ['py-card-y', 'px-card-x'] });
  tokens.push({ family: 'space', legacy: '--pad-row', value: `${px(inset.row.y)} 0`, theme: '--spacing-row-y', utilities: ['py-row-y'] });
  tokens.push({ family: 'space', legacy: '--clearance-bar', theme: '--spacing-clearance-bar', utilities: ['pb-clearance-bar'], value: px(clearanceBar), note: 'Reserve this at the bottom when the floating assistant bar is present.' });

  for (const [k, v] of Object.entries(height)) {
    tokens.push({ family: 'size', legacy: `--h-${k}`, theme: `--spacing-${k}`, utilities: [`h-${k}`], value: px(v) });
  }
  tokens.push({ family: 'size', legacy: '--stroke-meter', theme: '--spacing-meter', utilities: ['h-meter'], value: px(stroke.meter) });
  tokens.push({ family: 'size', legacy: '--dot-series', theme: '--spacing-dot', utilities: ['size-dot'], value: px(dotSeries) });
  tokens.push({ family: 'size', legacy: '--stroke-series', value: px(stroke.series), note: 'Chart line weight. Used in SVG, not as a utility.' });

  for (const [k, v] of Object.entries(radius)) {
    tokens.push({ family: 'radius', legacy: `--r-${k}`, theme: `--radius-${k}`, utilities: [`rounded-${k}`], value: px(v) });
  }

  for (const [k, s] of Object.entries(shadow)) {
    tokens.push({ family: 'shadow', legacy: `--shadow-${k}`, theme: `--shadow-${k}`, utilities: [`shadow-${k}`], value: `${px(s.x)} ${px(s.y)} ${px(s.blur)} ${s.color}` });
  }
  tokens.push({ family: 'shadow', legacy: '--scrim', value: scrim, note: 'The modal scrim. The only transparency in the system.' });

  tokens.push({ family: 'motion', legacy: '--ease', theme: '--ease-ledger', utilities: ['ease-ledger'], value: ease });
  for (const [k, v] of Object.entries(duration)) {
    tokens.push({ family: 'motion', legacy: `--dur-${k}`, utilities: [`duration-${k}`], value: `${v}ms` });
  }

  return `${JSON.stringify(
    {
      $comment: 'Generated by scripts/emit-json.ts from src/*.ts — do not edit.',
      aliasThemeKeys: ALIAS_THEME_KEY,
      tokens,
    },
    null,
    2,
  )}\n`;
}
