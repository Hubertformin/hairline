/**
 * Assembles `skill/` — the Agent-Skills bundle.
 *
 * This is the third consumer: Claude Design, Claude Code and throwaway HTML
 * mockups. It gets the stylesheet, the per-component usage notes, the foundation
 * specimen cards, and a class reference generated from the stylesheet itself — so
 * the vocabulary an agent is told about is, by construction, the vocabulary that
 * exists.
 */
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'skill');

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

/* The stylesheet and tokens, exactly as shipped. */
cpSync(resolve(root, 'dist/hairline.css'), resolve(out, 'hairline.css'));
cpSync(resolve(root, 'dist/tokens.css'), resolve(out, 'tokens.css'));

/* The foundation specimen cards, unchanged from the export. */
cpSync(resolve(root, 'reference/guidelines'), resolve(out, 'guidelines'), { recursive: true });

/* Per-component usage notes. The prop APIs they describe still hold; where a
   component gained something, `CLASSES.md` and the .d.ts carry the difference. */
const componentsDir = resolve(root, 'reference/components');
for (const group of readdirSync(componentsDir)) {
  const src = resolve(componentsDir, group);
  const dst = resolve(out, 'components', group);
  mkdirSync(dst, { recursive: true });
  for (const file of readdirSync(src).filter((f) => f.endsWith('.prompt.md'))) {
    cpSync(resolve(src, file), resolve(dst, file));
  }
}

/* The real type contract, from the build rather than from a hand-written sidecar. */
cpSync(resolve(root, 'dist/index.d.ts'), resolve(out, 'hairline.d.ts'));

/**
 * The class reference, extracted from the stylesheet.
 *
 * Generated rather than written, because a hand-written class list is a promise
 * that rots: an agent told about `.hl-card` when the stylesheet says `.hl-tile`
 * will produce unstyled output and never know why.
 */
const css = readFileSync(resolve(root, 'src/css/components.css'), 'utf8');

interface Entry {
  selector: string;
  note?: string;
}

const sections = new Map<string, Entry[]>();
let section = 'other';
let pendingNote: string | undefined;
/* A rule's selector may span several lines when it is a comma-separated group,
   so lines are buffered until the one that opens the block. */
let selectorBuffer: string[] = [];

const isState = (sel: string) => /:hover|:active|:focus|:disabled|::placeholder/.test(sel);

for (const raw of css.split('\n')) {
  const line = raw.trim();

  const sectionMatch = /^\/\* ── (.+?) ─+ \*\/$/.exec(line);
  if (sectionMatch) {
    section = sectionMatch[1]!.trim();
    continue;
  }

  const noteMatch = /^\/\*\s*(.+?)\s*\*\/$/.exec(line);
  if (noteMatch) {
    pendingNote = noteMatch[1];
    continue;
  }

  if (line.endsWith(',')) {
    selectorBuffer.push(line.slice(0, -1).trim());
    continue;
  }

  if (line.endsWith('{')) {
    const group = [...selectorBuffer, line.slice(0, -1).trim()].filter(Boolean);
    selectorBuffer = [];
    // Descendant rules (`.hl-tile--dark .hl-stat__value`) restyle a class in a
    // context rather than adding vocabulary, so only leading simple selectors count.
    const selectors = group.filter((sel) => /^\.[A-Za-z0-9_-]+$/.test(sel) && !isState(sel));
    if (selectors.length) {
      const list = sections.get(section) ?? [];
      for (const selector of selectors) {
        if (!list.some((e) => e.selector === selector)) {
          list.push(pendingNote ? { selector, note: pendingNote } : { selector });
        }
      }
      sections.set(section, list);
    }
    pendingNote = undefined;
    continue;
  }

  if (line !== '') pendingNote = undefined;
}

const classDoc = [
  '# Hairline class reference',
  '',
  'Generated from `src/css/components.css` by `scripts/build-skill.ts`. Every class',
  'below exists in `hairline.css`; nothing else does. If a class you want is not here,',
  'compose one out of the tokens rather than inventing a `.hl-` name.',
  '',
  ...[...sections].flatMap(([name, entries]) => [
    `## ${name}`,
    '',
    ...entries.map((e) => `- \`${e.selector}\`${e.note ? ` — ${e.note}` : ''}`),
    '',
  ]),
].join('\n');

writeFileSync(resolve(out, 'CLASSES.md'), classDoc);

/**
 * Per-component docs in the shape the design-sync converter looks for.
 *
 * It matches `<Name>.md`, not `<Name>.prompt.md`, and reads the frontmatter
 * `category` to decide a component's group — without which every component is
 * grouped by whatever source directory the fuzzy match happened to hit.
 */
const GROUP_LABEL: Record<string, string> = { core: 'Core', forms: 'Forms', data: 'Data' };
const docsOut = resolve(out, 'docs');
mkdirSync(docsOut, { recursive: true });
for (const group of readdirSync(componentsDir)) {
  const src = resolve(componentsDir, group);
  for (const file of readdirSync(src).filter((f) => f.endsWith('.prompt.md'))) {
    const name = file.replace(/\.prompt\.md$/, '');
    const body = readFileSync(resolve(src, file), 'utf8');
    const label = GROUP_LABEL[group] ?? group;
    writeFileSync(resolve(docsOut, `${name}.md`), `---\ncategory: ${label}\n---\n\n${body}`);
  }
}

/* The design spec, verbatim — it is the best part of the export. */
cpSync(resolve(root, 'reference/readme.md'), resolve(out, 'DESIGN.md'));

const skillMd = `---
name: hairline-design
description: Use this skill to generate well-branded interfaces and assets for Hairline, the calm-money design direction — monochrome ink on paper, mono uppercase labels, tabular figures, generous space, colour reserved for data. Either for production or throwaway prototypes and mocks. Contains design guidelines, colours, type, fonts, and a component library for prototyping.
user-invocable: true
---

# Hairline

Read \`DESIGN.md\` first — it is the design spec, and it decides most questions
before you ask them. Then pick a surface:

| Building | Use |
| --- | --- |
| A mock, a slide, a throwaway HTML prototype | \`hairline.css\` + the classes in \`CLASSES.md\` |
| A React web app | \`import { Button } from '@hairline/ds'\` + \`import '@hairline/ds/hairline.css'\` |
| A React Native / Expo app | \`import { Button } from '@hairline/ds/native'\` |
| Something with its own components | \`tokens.css\` alone — the \`var(--*)\` layer |

## For static HTML

Link \`hairline.css\` and write the markup in \`CLASSES.md\`. Nothing else is required:
no build step, no npm, no JavaScript.

\`\`\`html
<link rel="stylesheet" href="hairline.css">

<div class="hl-tile hl-tile--dark">
  <div class="hl-tile__head"><span class="hl-tile__label">Available</span></div>
  <div class="hl-stat hl-stat--l">
    <div class="hl-stat__row">
      <span class="hl-stat__value">227&thinsp;400</span>
      <span class="hl-stat__unit">XAF</span>
    </div>
  </div>
</div>
\`\`\`

## Rules that are easy to get wrong

- **Colour is data only.** Chrome is monochrome. An accent means a category, a
  series or a status — never decoration, never a border-only accent.
- **One solid button per view.** If two \`hl-btn--solid\` are visible, one is wrong.
- **Every figure in a table is mono and tabular** (\`hl-data\`, or \`hl-row__amount\`).
  A figure never appears in the sans in a table, and prose never appears in the mono.
- **Uppercase is only ever the mono label** (\`hl-label\`). Everything else is
  sentence case, buttons included.
- **Say the number, then say what it means.** A \`hl-stat__value\` wants a
  \`hl-stat__note\` under it with one line of plain consequence.
- **Structure by hairline, not by box.** No vertical rules, no zebra striping, no
  cell borders. Cards get a fill, not a border.
- **No emoji, no exclamation marks, no gradients, no photography.**

## What is not here

No logo, no icon assets, no dark theme. For icons use Lucide (\`lucide-static\`) —
same 24px grid, round caps, ~1.75 stroke — and note the substitution.

## Files

| File | What it is |
| --- | --- |
| \`DESIGN.md\` | The design spec: voice, colour, type, space, motion. Read first. |
| \`CLASSES.md\` | Every class in \`hairline.css\`, generated from the stylesheet. |
| \`hairline.css\` | Tokens + components. The one file to link. |
| \`tokens.css\` | The \`var(--*)\` layer alone. |
| \`hairline.d.ts\` | The React prop contracts, from the build. |
| \`components/\` | Per-component usage notes — when to reach for each one. |
| \`guidelines/\` | Foundation specimen cards. |
`;

writeFileSync(resolve(out, 'SKILL.md'), skillMd);

const files = (dir: string): number =>
  readdirSync(dir, { withFileTypes: true }).reduce(
    (n, e) => n + (e.isDirectory() ? files(resolve(dir, e.name)) : 1),
    0,
  );
console.log(`skill → skill/ (${files(out)} files)`);
