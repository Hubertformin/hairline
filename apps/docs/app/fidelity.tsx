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

const plus = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const caret = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6.5 10l5.5 5 5.5-5" />
  </svg>
);

/**
 * Every component rendered twice — once by the original `.hl-*` class layer and once
 * by the ported Tailwind component, with identical content.
 *
 * `scripts/check-port.ts` screenshots the two panels and diffs them in both themes, so
 * every port is verified against the implementation it replaces rather than reviewed by
 * eye. Keeping both renderings in one file is what makes them stay in step.
 */
export const PAIRS: { name: string; original: React.ReactNode; ported: React.ReactNode }[] = [
  {
    name: 'Button',
    original: (
      <div className="flex flex-wrap items-center gap-s5">
        <button className="hl-btn hl-btn--solid">Record it</button>
        <button className="hl-btn hl-btn--quiet">Move to April</button>
        <button className="hl-btn hl-btn--ghost">Skip</button>
        <button className="hl-btn hl-btn--danger">Delete account</button>
        <button className="hl-btn hl-btn--solid hl-btn--s">Small</button>
        <button className="hl-btn hl-btn--solid hl-btn--l">Large</button>
      </div>
    ),
    ported: (
      <div className="flex flex-wrap items-center gap-s5">
        <Button tone="solid">Record it</Button>
        <Button tone="quiet">Move to April</Button>
        <Button tone="ghost">Skip</Button>
        <Button tone="danger">Delete account</Button>
        <Button size="s">Small</Button>
        <Button size="l">Large</Button>
      </div>
    ),
  },
  {
    name: 'IconButton',
    original: (
      <div className="flex items-center gap-s5">
        <button className="hl-iconbtn hl-iconbtn--quiet" aria-label="Add">{plus}</button>
        <button className="hl-iconbtn hl-iconbtn--solid" aria-label="Add">{plus}</button>
        <button className="hl-iconbtn hl-iconbtn--bare" aria-label="Add">{plus}</button>
      </div>
    ),
    ported: (
      <div className="flex items-center gap-s5">
        <IconButton label="Add" tone="quiet">{plus}</IconButton>
        <IconButton label="Add" tone="solid">{plus}</IconButton>
        <IconButton label="Add" tone="bare">{plus}</IconButton>
      </div>
    ),
  },
  {
    name: 'Chip',
    original: (
      <div className="flex flex-wrap items-center gap-s5">
        <button className="hl-chip hl-chip--selected">This month</button>
        <button className="hl-chip">Six months forward</button>
        <span className="hl-chip hl-chip--static">Mobile money</span>
      </div>
    ),
    ported: (
      <div className="flex flex-wrap items-center gap-s5">
        <Chip selected>This month</Chip>
        <Chip>Six months forward</Chip>
        <Chip interactive={false}>Mobile money</Chip>
      </div>
    ),
  },
  {
    name: 'Badge',
    original: (
      <div className="flex flex-wrap items-center gap-s5">
        <span className="hl-badge hl-badge--neutral">Settled</span>
        <span className="hl-badge hl-badge--alarm">Needs a decision</span>
        <span className="hl-badge hl-badge--positive">Paid</span>
        <span className="hl-badge hl-badge--info">Scheduled</span>
        <span className="hl-badge hl-badge--caution">Held</span>
      </div>
    ),
    ported: (
      <div className="flex flex-wrap items-center gap-s5">
        <Badge>Settled</Badge>
        <Badge tone="alarm">Needs a decision</Badge>
        <Badge tone="positive">Paid</Badge>
        <Badge tone="info">Scheduled</Badge>
        <Badge tone="caution">Held</Badge>
      </div>
    ),
  },
  {
    name: 'Field',
    original: (
      <div className="w-[360px] grid gap-s9">
        <div className="hl-field">
          <div className="hl-field__label">Account name</div>
          <div className="hl-field__box"><span className="hl-field__value">MTN MoMo — 677 04</span></div>
          <div className="hl-field__hint">The number the salary lands on.</div>
        </div>
        <div className="hl-field hl-field--lg">
          <div className="hl-field__label">Amount</div>
          <div className="hl-field__box">
            <span className="hl-field__prefix">XAF</span>
            <span className="hl-field__value">250 000</span>
          </div>
        </div>
      </div>
    ),
    ported: (
      <div className="w-[360px] grid gap-s9">
        <Field label="Account name" value="MTN MoMo — 677 04" hint="The number the salary lands on." />
        <Field label="Amount" size="lg" prefix="XAF" value="250 000" />
      </div>
    ),
  },
  {
    name: 'SelectDisplay',
    original: (
      <div className="w-[360px]">
        <div className="hl-select">
          <div className="hl-select__label">Category</div>
          <button className="hl-select__box">
            <span className="hl-select__main">
              <span className="hl-select__dot" style={{ background: 'var(--a-coral)' }} />
              <span className="hl-select__value">School fees</span>
              <span className="hl-select__meta">3 this month</span>
            </span>
            <span className="hl-select__caret">{caret}</span>
          </button>
        </div>
      </div>
    ),
    ported: (
      <div className="w-[360px]">
        <SelectDisplay label="Category" value="School fees" dot="var(--a-coral)" meta="3 this month" />
      </div>
    ),
  },
  {
    name: 'Toggle',
    original: (
      <div className="w-[420px]">
        <div className="hl-toggle-row">
          <div className="min-w-0">
            <div className="hl-toggle-row__label">Round up every payment</div>
            <div className="hl-toggle-row__note">Adds about 4 200 a month to the vault.</div>
          </div>
          <button className="hl-toggle__switch hl-toggle__switch--on"><span className="hl-toggle__knob" /></button>
        </div>
        <div className="hl-toggle-row">
          <div className="min-w-0">
            <div className="hl-toggle-row__label">Warn me before zero</div>
            <div className="hl-toggle-row__note">Twenty per cent is held for a year.</div>
          </div>
          <button className="hl-toggle__switch"><span className="hl-toggle__knob" /></button>
        </div>
      </div>
    ),
    ported: (
      <div className="w-[420px]">
        <Toggle on label="Round up every payment" note="Adds about 4 200 a month to the vault." />
        <Toggle label="Warn me before zero" note="Twenty per cent is held for a year." />
      </div>
    ),
  },
  {
    name: 'SegmentedTabs',
    original: (
      <div className="grid gap-s6 justify-items-start">
        <div className="hl-tabs">
          <button className="hl-tabs__item hl-tabs__item--on">Month</button>
          <button className="hl-tabs__item">Quarter</button>
          <button className="hl-tabs__item">Year</button>
        </div>
        <div className="hl-tabs hl-tabs--sans">
          <button className="hl-tabs__item hl-tabs__item--on">Everything</button>
          <button className="hl-tabs__item">Needs a decision</button>
        </div>
      </div>
    ),
    ported: (
      <div className="grid gap-s6 justify-items-start">
        <SegmentedTabs items={['Month', 'Quarter', 'Year']} value="Month" />
        <SegmentedTabs mono={false} items={['Everything', 'Needs a decision']} value="Everything" />
      </div>
    ),
  },
  {
    name: 'Tile + StatBlock',
    original: (
      <div className="grid grid-cols-2 gap-gap-tile w-[520px]">
        <div className="hl-tile hl-tile--dark">
          <div className="hl-tile__head"><span className="hl-tile__label">Available</span></div>
          <div className="hl-stat hl-stat--l">
            <div className="hl-stat__row">
              <span className="hl-stat__value">227 400</span>
              <span className="hl-stat__unit">XAF</span>
            </div>
          </div>
        </div>
        <div className="hl-tile hl-tile--quiet">
          <div className="hl-tile__head"><span className="hl-tile__label">This month</span></div>
          <div className="hl-stat">
            <div className="hl-stat__row"><span className="hl-stat__value">1 284 900</span></div>
            <div className="hl-stat__note">Nothing saved this month.</div>
          </div>
        </div>
      </div>
    ),
    ported: (
      <div className="grid grid-cols-2 gap-gap-tile w-[520px]">
        <Tile tone="dark" label="Available">
          <StatBlock size="l" value="227 400" unit="XAF" />
        </Tile>
        <Tile tone="quiet" label="This month">
          <StatBlock value="1 284 900" note="Nothing saved this month." />
        </Tile>
      </div>
    ),
  },
  {
    name: 'DataRow',
    original: (
      <div className="w-[520px]">
        <div className="hl-row">
          <span className="hl-row__dot" style={{ background: 'var(--a-coral)' }} />
          <div className="hl-row__main">
            <div className="hl-row__name">School fees</div>
            <div className="hl-row__meta">22 Mar · Mobile money</div>
          </div>
          <span className="hl-row__amount hl-row__amount--alarm">−258 900</span>
          <span className="hl-row__secondary">227 400</span>
        </div>
        <div className="hl-row">
          <div className="hl-row__main">
            <div className="hl-row__name">Salary</div>
            <div className="hl-row__meta">01 Mar</div>
          </div>
          <span className="hl-row__amount hl-row__amount--struck">750 000</span>
          <span className="hl-row__secondary">520 300</span>
        </div>
      </div>
    ),
    ported: (
      <div className="w-[520px]">
        <DataRow dot="var(--a-coral)" name="School fees" meta="22 Mar · Mobile money" state="alarm" amount="−258 900" secondary="227 400" />
        <DataRow name="Salary" meta="01 Mar" state="struck" amount="750 000" secondary="520 300" />
      </div>
    ),
  },
  {
    name: 'MeterBar',
    original: (
      <div className="w-[420px] grid gap-s9">
        <div className="hl-meter"><span className="hl-meter__fill" style={{ width: '62%' }} /></div>
        <div className="hl-meter hl-meter--over"><span className="hl-meter__fill" style={{ width: '100%' }} /></div>
        <div className="hl-meter hl-meter--stacked">
          <span className="hl-meter__segment" style={{ flex: '4.2', background: 'var(--a-coral)' }} />
          <span className="hl-meter__segment" style={{ flex: '2.6', background: 'var(--a-blue)' }} />
          <span className="hl-meter__segment" style={{ flex: '1.8', background: 'var(--a-amber)' }} />
        </div>
      </div>
    ),
    ported: (
      <div className="w-[420px] grid gap-s9">
        <MeterBar value={62} limit={100} />
        <MeterBar value={120} limit={100} over />
        <MeterBar
          segments={[
            { label: 'Fees', amount: 4.2, color: 'var(--a-coral)' },
            { label: 'Bills', amount: 2.6, color: 'var(--a-blue)' },
            { label: 'Food', amount: 1.8, color: 'var(--a-amber)' },
          ]}
        />
      </div>
    ),
  },
];
