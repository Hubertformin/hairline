/**
 * Proves the generated theme actually compiles through Tailwind and produces the
 * utilities components will be written against.
 *
 * `check-theme.ts` verifies the CSS we emit; this verifies what Tailwind does with
 * it, which is a different question. It exists because the three namespace collisions
 * (`--font-*`, `--shadow-*`, and colours landing in the font-size `--text-*` space)
 * all fail silently: the build succeeds, the utility is simply absent or wrong, and
 * you find out when a component renders unstyled.
 *
 * It also guards the spacing decision — Tailwind's default numeric scale must survive,
 * so `p-4` still means 16px and nobody's muscle memory betrays them.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** class → the declaration its rule must contain. */
const EXPECT: Record<string, string> = {
  // colour must resolve through the mirror, so a theme swap follows
  'bg-ink-1': 'background-color: var(--lg-ink-1)',
  'text-paper': 'color: var(--lg-paper)',
  'bg-card': 'background-color: var(--lg-surface-card)',
  'border-hairline': 'border-color: var(--lg-border-hairline)',
  // the dangerous one: an alias colour must be a colour, never a font-size
  'text-strong': 'color: var(--lg-text-strong)',
  'text-muted': 'color: var(--lg-text-muted)',
  // families and shadows must not self-reference
  'font-mono': 'font-family: var(--lg-font-mono)',
  'shadow-raised': 'var(--lg-shadow-raised)',
  // sizes
  'rounded-card': 'border-radius: var(--lg-r-card)',
  'h-control': 'height: 40px',
  'h-touch': 'height: 44px',
  'px-s7': 'padding-inline: 16px',
  'gap-s5': 'gap: 12px',
  'py-card-y': 'padding-block: 22px',
  // composite type utilities carry family, case and numerics together
  'type-label': 'text-transform: uppercase',
  'type-data': 'font-variant-numeric: var(--lg-numeric-data)',
  'type-figure-xl': 'font-size: 46px',
  tabular: 'font-variant-numeric: var(--lg-numeric-data)',
  // interaction
  'focus-ring-inset': 'box-shadow: inset 0 0 0 2px var(--lg-focus-ring)',
  'ease-ledger': 'var(--lg-ease)',
  'duration-fast': 'transition-duration: var(--lg-dur-fast)',
  // Tailwind's own scale must survive untouched
  'p-4': 'calc(var(--spacing) * 4)',
};

const dir = mkdtempSync(resolve(tmpdir(), 'ledger-tw-'));
try {
  const classes = Object.keys(EXPECT);
  writeFileSync(resolve(dir, 'probe.html'), `<div class="${classes.join(' ')}"></div>\n`);
  const out = resolve(dir, 'out.css');

  execFileSync(
    resolve(root, 'node_modules/.bin/tailwindcss'),
    ['-i', resolve(root, 'src/css/theme.generated.css'), '-o', out, '--content', resolve(dir, 'probe.html')],
    { stdio: 'pipe' },
  );

  const css = readFileSync(out, 'utf8');
  const failures: string[] = [];

  for (const [cls, decl] of Object.entries(EXPECT)) {
    // Grab the rule body for this exact class.
    const m = new RegExp(`\\.${cls.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\s*\\{([^}]*)\\}`).exec(css);
    if (!m) {
      failures.push(`.${cls} was not generated at all`);
    } else if (!m[1]!.includes(decl)) {
      failures.push(`.${cls} is missing \`${decl}\`\n      got: ${m[1]!.trim().replace(/\s+/g, ' ')}`);
    }
  }

  // A colour alias landing in the font-size namespace is the failure this whole
  // mirror scheme exists to prevent — assert it explicitly rather than by proxy.
  const strong = /\.text-strong\s*\{([^}]*)\}/.exec(css);
  if (strong && /font-size/.test(strong[1]!)) {
    failures.push('.text-strong generated a font-size — a colour alias has leaked into the --text-* namespace');
  }

  if (failures.length) {
    console.error(`Tailwind output wrong (${failures.length}):`);
    for (const f of failures) console.error(`  ✗ ${f}`);
    process.exit(1);
  }

  console.log(`tailwind ok — ${classes.length} utilities compile with the expected declarations`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
