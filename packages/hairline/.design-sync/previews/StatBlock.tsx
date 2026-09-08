import { StatBlock } from '@hairline/ds';

/** Say the number, then say what it means. */
export const Canonical = () => (
  <div style={{ width: 380 }}>
    <StatBlock
      size="xl"
      label="Total expenses"
      value="1 284 900"
      unit="XAF"
      note="258 900 of the difference is the deferred fees. The rest is the fibre bill landing twice."
    />
  </div>
);

/** The size axis, from the page figure down to a tile's supporting number. */
export const Sizes = () => (
  <div style={{ display: 'grid', gap: 26 }}>
    <StatBlock size="xl" label="Extra large" value="227 400" />
    <StatBlock size="l" label="Large" value="227 400" />
    <StatBlock size="m" label="Medium" value="227 400" />
    <StatBlock size="s" label="Small" value="227 400" />
  </div>
);

/** The tone axis. Colour here encodes the state of the figure, not decoration. */
export const Tones = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 220px)', gap: 26 }}>
    <StatBlock label="Available" value="227 400" note="Until the 28th." />
    <StatBlock tone="alarm" label="Shortfall" value="−258 900" note="Due 22 March." />
    <StatBlock tone="positive" label="Saved" value="42 000" note="First month above the ceiling." />
    <StatBlock tone="info" label="Scheduled" value="150 000" note="Rent, on the 1st." />
  </div>
);
