import { Badge } from '@/registry/hairline/ui/badge';
import { Button } from '@/registry/hairline/ui/button';
import { Chip } from '@/registry/hairline/ui/chip';
import { DataRow } from '@/registry/hairline/ui/data-row';
import { Field } from '@/registry/hairline/ui/field';
import { IconButton } from '@/registry/hairline/ui/icon-button';
import { MeterBar } from '@/registry/hairline/ui/meter-bar';
import { SegmentedTabs } from '@/registry/hairline/ui/segmented-tabs';
import { SelectDisplay } from '@/registry/hairline/ui/select-display';
import { StatBlock } from '@/registry/hairline/ui/stat-block';
import { Tile } from '@/registry/hairline/ui/tile';
import { Toggle } from '@/registry/hairline/ui/toggle';
import { BubblesDemoClient } from './_components/bubbles-demo';
import { TickingFigure } from '@/registry/hairline/ui/ticking-figure';

const plus = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
);

export interface GalleryEntry {
  name: string;
  slug: string;
  /** Which sidebar group it belongs to. */
  group: 'Core' | 'Forms' | 'Data' | 'Charts';
  description: string;
  code: string;
  demo: React.ReactNode;
}

export const GALLERY: GalleryEntry[] = [
  {
    name: 'Button', slug: 'button', group: 'Core',
    description: 'The one pressable shape. Solid is the single primary action per view — if two are visible, one is wrong.',
    code: `<Button tone="solid">Record it</Button>
<Button tone="quiet">Move to April</Button>
<Button tone="ghost">Skip this month</Button>
<Button tone="danger">Delete account</Button>`,
    demo: (<>
      <Button tone="solid">Record it</Button>
      <Button tone="quiet">Move to April</Button>
      <Button tone="ghost">Skip this month</Button>
      <Button tone="danger">Delete account</Button>
    </>),
  },
  {
    name: 'StatBlock', slug: 'stat-block', group: 'Data',
    description: 'Say the number, then say what it means. A value without a note is usually a missed sentence.',
    code: `<StatBlock
  size="xl"
  label="Total expenses"
  value="1 284 900"
  unit="XAF"
  note="258 900 of it is the deferred fees."
/>`,
    demo: <StatBlock size="xl" label="Total expenses" value="1 284 900" unit="XAF" note="258 900 of it is the deferred fees." />,
  },
  {
    name: 'DataRow', slug: 'data-row', group: 'Data',
    description: 'A ledger line: dot, name, mono meta, figure, running total. Settled lines step down and take a mark — lightness alone is not readable.',
    code: `<DataRow
  dot="var(--a-coral)"
  name="School fees — second term"
  meta="22 Mar · Mobile money"
  state="alarm"
  amount="−258 900"
  secondary="227 400"
/>`,
    demo: (<div className="w-full max-w-[520px] min-w-0">
      <DataRow dot="var(--a-coral)" name="School fees — second term" meta="22 Mar · Mobile money" state="alarm" amount="−258 900" secondary="227 400" />
      <DataRow dot="var(--a-green)" name="Salary" meta="01 Mar · MTN MoMo" amount="750 000" secondary="520 300" />
      <DataRow name="Transport" meta="Settled" state="struck" amount="−12 500" secondary="507 800" />
    </div>),
  },
  {
    name: 'Tile', slug: 'tile', group: 'Data',
    description: 'The only card shape: a fill, a radius, no border. One dark tile per page, holding the primary figure.',
    code: `<Tile tone="dark" label="Available">
  <StatBlock size="l" value="227 400" unit="XAF" />
</Tile>`,
    demo: (<div className="grid grid-cols-2 gap-gap-tile w-full max-w-[520px] min-w-0">
      <Tile tone="dark" label="Available"><StatBlock size="l" value="227 400" unit="XAF" /></Tile>
      <Tile tone="alarm" label="Shortfall"><StatBlock size="l" tone="alarm" value="−258 900" /></Tile>
    </div>),
  },
  {
    name: 'MeterBar', slug: 'meter-bar', group: 'Charts',
    description: 'A limit meter, or a composition bar weighted by amount. Over the ceiling, the whole track fills in alarm.',
    code: `<MeterBar value={62} limit={100} />
<MeterBar value={128} limit={100} over />
<MeterBar segments={[
  { label: 'Fees', amount: 258900, color: 'var(--a-coral)' },
  { label: 'Bills', amount: 142000, color: 'var(--a-blue)' },
]} />`,
    demo: (<div className="w-full max-w-[440px] min-w-0 grid gap-s9">
      <MeterBar value={62} limit={100} />
      <MeterBar value={128} limit={100} over />
      <MeterBar segments={[
        { label: 'Fees', amount: 258900, color: 'var(--a-coral)' },
        { label: 'Bills', amount: 142000, color: 'var(--a-blue)' },
        { label: 'Food', amount: 98000, color: 'var(--a-amber)' },
      ]} />
    </div>),
  },
  {
    name: 'Badge', slug: 'badge', group: 'Core',
    description: 'A mono uppercase state marker. Ink and wash travel together — never a border-only accent, never colour alone.',
    code: `<Badge>Settled</Badge>
<Badge tone="alarm">Needs a decision</Badge>
<Badge tone="positive">Paid</Badge>`,
    demo: (<>
      <Badge>Settled</Badge>
      <Badge tone="alarm">Needs a decision</Badge>
      <Badge tone="positive">Paid</Badge>
      <Badge tone="info">Scheduled</Badge>
      <Badge tone="caution">Held for a year</Badge>
    </>),
  },
  {
    name: 'Field', slug: 'field', group: 'Forms',
    description: 'A labelled value on a grey fill. size="lg" is for the single amount a form is about — never for two.',
    code: `<Field label="Account name" value="MTN MoMo — 677 04" hint="The number the salary lands on." />
<Field label="Amount" size="lg" prefix="XAF" value="250 000" />`,
    demo: (<div className="w-full max-w-[360px] min-w-0 grid gap-s9">
      <Field label="Account name" value="MTN MoMo — 677 04" hint="The number the salary lands on." />
      <Field label="Amount" size="lg" prefix="XAF" value="250 000" />
    </div>),
  },
  {
    name: 'SelectDisplay', slug: 'select-display', group: 'Forms',
    description: 'A closed dropdown trigger with an optional category dot. It renders the closed state; wire it to your own popover.',
    code: `<SelectDisplay
  label="Category"
  value="School fees"
  dot="var(--a-coral)"
  meta="3 this month"
/>`,
    demo: <div className="w-full max-w-[360px] min-w-0"><SelectDisplay label="Category" value="School fees" dot="var(--a-coral)" meta="3 this month" /></div>,
  },
  {
    name: 'Toggle', slug: 'toggle', group: 'Forms',
    description: 'A switch, or a whole settings row with its consequence. A setting without its consequence stated is the commonest copy failure in finance UIs.',
    code: `<Toggle
  on
  label="Round up every payment"
  note="Adds about 4 200 a month to the vault."
/>`,
    demo: (<div className="w-full max-w-[440px] min-w-0">
      <Toggle on label="Round up every payment" note="Adds about 4 200 a month to the vault." />
      <Toggle label="Warn me before the balance hits zero" note="Twenty per cent is held for a year." />
    </div>),
  },
  {
    name: 'SegmentedTabs', slug: 'segmented-tabs', group: 'Forms',
    description: 'Grey track, one raised white segment. The only tab pattern in the system.',
    code: `<SegmentedTabs items={['Month', 'Quarter', 'Year']} value={range} onChange={setRange} />`,
    demo: (<div className="grid gap-s6 justify-items-start">
      <SegmentedTabs items={['Month', 'Quarter', 'Year']} value="Month" />
      <SegmentedTabs mono={false} items={['Everything', 'Needs a decision', 'Settled']} value="Everything" />
    </div>),
  },
  {
    name: 'Chip', slug: 'chip', group: 'Core',
    description: 'An outlined pill holding a whole phrase — suggestions, presets, filters. Not a single word.',
    code: `<Chip selected>This month</Chip>
<Chip>Six months forward</Chip>
<Chip interactive={false}>Mobile money</Chip>`,
    demo: (<>
      <Chip selected>This month</Chip>
      <Chip>Six months forward</Chip>
      <Chip>Since January</Chip>
      <Chip interactive={false}>Mobile money</Chip>
    </>),
  },
  {
    name: 'IconButton', slug: 'icon-button', group: 'Core',
    description: 'A round button holding one 24-grid stroke glyph. The label is required — a glyph alone is unreachable.',
    code: `<IconButton label="Add an account">{plus}</IconButton>
<IconButton label="Send" tone="solid">{send}</IconButton>`,
    demo: (<>
      <IconButton label="Add an account">{plus}</IconButton>
      <IconButton label="Add an account" tone="solid">{plus}</IconButton>
      <IconButton label="Add an account" tone="bare">{plus}</IconButton>
      <IconButton label="Add an account" size={44}>{plus}</IconButton>
    </>),
  },
  {
    name: 'CategoryBubbles', slug: 'category-bubbles', group: 'Charts',
    description: 'Where the month went, as a field of bubbles around a core. Share is encoded as area rather than arc length, which the eye reads far better than a donut.',
    code: `<CategoryBubbles
  total={540900}
  coreLabel="Total expenses"
  coreCaption="17 OF 26 DAYS COVERED"
  selectedId={selected}
  onSelect={setSelected}
  bubbles={[
    { id: 'fees',      label: 'School fees', icon: '🎓', amount: 258900, color: '#FF6B4A' },
    { id: 'bills',     label: 'Bills',       icon: '💡', amount: 142000, color: '#3B5BFF' },
    { id: 'food',      label: 'Food',        icon: '🍚', amount: 98000,  color: '#FFA83D' },
    { id: 'transport', label: 'Transport',   icon: '🚌', amount: 42000,  color: '#8CD44A' },
  ]}
/>`,
    demo: <BubblesDemoClient />,
  },
  {
    name: 'TickingFigure', slug: 'ticking-figure', group: 'Charts',
    description: 'A figure that counts to its value in tabular numerals. Tabular matters: proportional digits change width every frame, so the number would jitter as it counts.',
    code: `<TickingFigure value={227400} />`,
    demo: (
      <span className="type-figure-l tracking-figure text-strong">
        <TickingFigure value={227400} />
      </span>
    ),
  },
];
