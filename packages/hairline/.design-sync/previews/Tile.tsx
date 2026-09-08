import { Tile, StatBlock, Badge, DataRow, MeterBar } from '@hairline/ds';

/** The dark tile: one per page, holding the primary figure. */
export const DarkPrimary = () => (
  <div style={{ width: 300 }}>
    <Tile tone="dark" label="Available">
      <StatBlock size="l" value="227 400" unit="XAF" />
    </Tile>
  </div>
);

/** The tone axis. Quiet is the default; the washes carry a status. */
export const Tones = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 220px)', gap: 20 }}>
    <Tile tone="quiet" label="This month">
      <StatBlock value="1 284 900" note="Nothing saved this month." />
    </Tile>
    <Tile tone="alarm" label="Shortfall">
      <StatBlock tone="alarm" value="−258 900" note="The day the school fees are due." />
    </Tile>
    <Tile tone="caution" label="Held">
      <StatBlock tone="ink" value="600 000" note="Twenty per cent is held for a year." />
    </Tile>
  </div>
);

/** A head action: the label on the left, a control or badge on the right. */
export const WithAction = () => (
  <div style={{ width: 320 }}>
    <Tile tone="paper" label="Savings vault" action={<Badge tone="caution">Locked</Badge>}>
      <StatBlock size="s" value="600 000" unit="XAF" note="Delayed, not lost." />
    </Tile>
  </div>
);

/** Realistic composition: a tile is the container the other data parts sit in. */
export const Composed = () => (
  <div style={{ width: 420 }}>
    <Tile tone="quiet" label="Where it went">
      <MeterBar
        segments={[
          { label: 'School fees', amount: 4.2, color: 'var(--a-coral)' },
          { label: 'Bills', amount: 2.6, color: 'var(--a-blue)' },
          { label: 'Food', amount: 1.8, color: 'var(--a-amber)' },
          { label: 'Other', amount: 1.1, color: 'var(--a-green)' },
        ]}
      />
      <div style={{ marginTop: 18 }}>
        <DataRow dot="var(--a-coral)" name="School fees" meta="22 Mar · Mobile money" amount="−258 900" />
        <DataRow dot="var(--a-blue)" name="Fibre bill" meta="18 Mar · Landed twice" amount="−34 000" />
      </div>
    </Tile>
  </div>
);
