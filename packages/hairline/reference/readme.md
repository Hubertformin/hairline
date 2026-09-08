# Ledger — a calm money design system

Ledger is the visual direction developed for **Moni**, a personal-finance app for
Cameroon (XAF, mobile money, an on-chain savings vault, and an assistant called
Kima). It is written down here so the same feel can be used for products that
have nothing to do with money.

The direction in one line: **monochrome ink on paper, mono uppercase labels,
tabular figures, generous space, and colour reserved for data.**

## Where it came from

- The Moni mockups in this project: `MoniOverview.dc.html` (nine app screens),
  `MoniForms.dc.html` (five forms and a three-step wizard), `MoniChrome.dc.html`
  (the top navigation), `MoniKima.dc.html` (the floating assistant bar).
- No brand book, logo files, Figma file or codebase was supplied. There is
  therefore **no logo in this system** — the wordmark is set in plain type and a
  filled black circle with a hollow ring stands in as a placeholder mark. Do not
  invent one; ask the brand for the real asset.

## Index

| File | What it is |
| --- | --- |
| `styles.css` | The one stylesheet consumers link. Imports everything below. |
| `tokens/` | `colors`, `typography`, `spacing`, `shape`, `motion`, `fonts`. |
| `components/core/` | Button, IconButton, Chip, Badge |
| `components/forms/` | Field, Select, Toggle, SegmentedTabs |
| `components/data/` | StatBlock, DataRow, MeterBar, Tile |
| `guidelines/` | Foundation specimen cards (the Design System tab). |
| `ui_kits/moni/` | A recreation of the Moni overview screen from the primitives. |
| `SKILL.md` | Agent-Skills wrapper so this works in Claude Code. |

### Components

| Component | Group | What it is for |
| --- | --- | --- |
| `Button` | core | The pill. `solid` is the one primary action per view. |
| `IconButton` | core | A round button holding one 24-grid stroke glyph. |
| `Chip` | core | An outlined pill holding a whole phrase — suggestions, presets. |
| `Badge` | core | Mono uppercase state marker; ink and wash travel together. |
| `Field` | forms | Labelled value on a grey fill; `size="lg"` for the one amount. |
| `Select` | forms | A closed dropdown, with an optional category dot. |
| `Toggle` | forms | A switch, or a whole settings row with its consequence. |
| `SegmentedTabs` | forms | Grey track, one raised white segment. The only tab pattern. |
| `StatBlock` | data | Label, big tight figure, one line of meaning. |
| `DataRow` | data | Ledger line: dot, name, mono meta, figure, running total. |
| `MeterBar` | data | A limit meter, or a stacked composition bar. |
| `Tile` | data | The only card shape. Fill, radius, no border. |

Each has a sibling `.d.ts` (props contract) and `.prompt.md` (when to use it).
`Button`, `Field` and `StatBlock` are tagged as starting points.

### Using it in another project

1. Set **File type → Design System** in this project's Share menu, then attach it
   to the new project. Components arrive as `window.<Namespace>` and the tokens
   arrive with `styles.css`.
2. In plain HTML, link `styles.css` and write `var(--ink-1)`, `var(--type-label)`
   and friends. Nothing else is required — no build step, no npm.
3. For Claude Code, download the folder; `SKILL.md` makes it an invocable skill.

### What this system deliberately does not have

No logo, no icon assets, no photography, no illustration, no gradients (beyond the
one score meter), no dark theme. Colour is data-only. If you need a dark theme,
add a `[data-theme="dark"]` scope in `tokens/colors.css` and re-point the
semantic aliases — the components read only aliases, so nothing else changes.

## Content fundamentals

**Say the number, then say what it means.** Every screen leads with a figure and
follows with one sentence of plain consequence. "Your money runs out on
22 March — the day the school fees are due." Never "Insights" as a heading over
generic advice.

**Second person, present tense, no hedging.** "You have 227 400." "Paying both
today leaves nothing until the 28th." Not "the user's balance is" and not
"you might want to consider".

**Sentence case everywhere except mono labels.** Buttons and titles are sentence
case ("Add account", "Six months forward"). Mono labels are the only uppercase:
`TOTAL EXPENSES`, `NEEDS A DECISION`, `STEP 2 OF 3`.

**Plain verbs on buttons.** "Record it", "Set the ceiling", "Lock it", "Make the
change" — what will happen, not "Submit" or "Confirm".

**Name the cause, not the symptom.** Copy earns trust by attributing: "258 900 of
the difference is the deferred fees. The rest is the fibre bill landing twice."

**Say the uncomfortable part.** "Nothing saved this month." "60 % of what you own
is here and none of it can help with March." "Twenty per cent is held for a
year — delayed, not lost."

**No emoji. No exclamation marks. No jargon.** Numbers are grouped with a thin
space (250 000), currency codes are mono and uppercase, foreign amounts always
carry their code. Percentages take a space before the sign (41 %).

**Empty states describe the mechanism**, not the absence: "Faint labels are
categories with no spending in March", not "No data".

## Visual foundations

**Ground.** A light grey desk (`--desk`) with white boards floating on it at
`--r-board` (22px). Inside a board, content sits on white; secondary blocks are
`--surface-2` (#F7F8F9) at `--r-card`. Two greys only — resist adding a third.

**Colour.** Chrome is monochrome: four ink steps, five surface steps, two line
weights. Colour appears **only where it encodes data** — a category, a series, a
status. Semantic colours always travel as an ink + wash pair (alarm ink on alarm
wash) and never as a border-only accent. One highlighter (`--marker`, a warm
yellow) may appear **once per screen**, behind the single sentence that matters.

**Type.** Two families. Schibsted Grotesk carries everything human — titles at
`--type-figure-*` with -0.03em tracking, body at 14/1.65. Azeret Mono carries
everything machine — uppercase labels at 8.5–9.5px with 0.12em tracking, and all
figures in tables with `tabular-nums slashed-zero`. A figure never appears in the
sans in a table, and prose never appears in the mono.

**Space.** Generous and uneven on purpose: 26–34px between sections, 20px
between tiles, 8–14px inside rows. Labels sit 10–14px above their value. When a
floating bar is present, reserve `--clearance-bar` (116px) at the bottom.

**Structure by hairline, not by box.** Lists are separated by 1px `--line-1`
rules with no vertical rules, no zebra striping and no cell borders. A table
header is a mono label row over a `--line-2` rule. Cards get a fill, not a
border; `--shadow-raised` is the only shadow in normal UI.

**Shape.** Pills for anything you can press (`--r-pill`), 14px for fields, 20px
for tiles, 22px for boards. Nothing is square-cornered and nothing is a circle
except avatars, dots and the send button.

**Backgrounds.** No gradients, no textures, no photography, no illustration. The
only large coloured area is a dark tile (`--ink-1`) used once per page for the
primary figure, and inside it soft circles at 8–20 % white or accent give depth.

**Data graphics are drawn from real numbers.** Rings and arcs (stroke 24, dasharray
per share), stacked bars (flex weighted by amount, 2px gaps), smooth cubic curves
with 2px strokes and 4–6px dots, meters at `--stroke-meter`. Below-zero regions
get a wash, and crossings get a dated label. Never decorate a chart.

**Motion.** 140–260ms with `--ease`; opacity, colour and background only.
Selection dims siblings to 13–16 % rather than moving them. One exception: an
amount moved between months arcs to its destination over `--dur-travel`.

**Hover.** Backgrounds step one surface lighter or darker; text steps toward
`--ink-1`. No lift, no scale, no shadow change. **Press** is the same step
darker. **Focus** is a 2px inset ring in `--ink-1`, never a browser outline.

**Transparency and blur.** Only the modal scrim (`--scrim`, 30 % ink). No
frosted glass.

**Fixed elements.** A centred top navigation of icon+label pills, and one
floating black pill at the bottom centre for the assistant. Both are the same on
every screen.

**Density and contrast rules.** Meaningful text never lighter than `--ink-3`
(#6E7178, 4.6:1 on white). `--ink-4` is for placeholders and true chrome only.
Demoted values (settled, paid, skipped) go to `--ink-3` and carry a strike or a
chip — never lighter, since lightness alone is not readable.

## Iconography

Hand-drawn 24×24 stroke paths, `stroke-width` 1.9 (2.0–2.4 for small glyphs),
`stroke-linecap`/`linejoin` round, `fill:none`, coloured by `currentColor`, and
rendered at 13–20px. They are geometric and open — a clock as a circle with two
hands, a planner as a rounded rectangle with a header rule, spending as three
descending lines. No filled icons, no duotone, no icon font, and **no emoji**.

No icon set was supplied, so the system ships **no icon assets**. When you need a
set, use Lucide from CDN (`lucide-static`) — same 24px grid, round caps, ~1.75
stroke — and note the substitution. The mono `K` used for the assistant is
typography, not an icon.

## Intentional additions

None of the primitives here existed as a component library; they were extracted
from the Moni screens. `Tile`, `StatBlock` and `MeterBar` are generalisations of
patterns that appear on four or more screens.
