import { MeterBar } from 'ledger-ds';

/** A limit meter, under and over the ceiling. */
export const Limit = () => (
  <div style={{ width: 420, display: 'grid', gap: 22 }}>
    <div>
      <div className="led-label" style={{ marginBottom: 10 }}>Under the ceiling</div>
      <MeterBar value={62} limit={100} />
    </div>
    <div>
      <div className="led-label" style={{ marginBottom: 10 }}>Over the ceiling</div>
      <MeterBar value={128} limit={100} over />
    </div>
  </div>
);

/** The stacked composition bar: segments weighted by amount, in accent colours. */
export const Composition = () => (
  <div style={{ width: 420 }}>
    <div className="led-label" style={{ marginBottom: 10 }}>Where it went</div>
    <MeterBar
      segments={[
        { label: 'School fees', amount: 258900, color: 'var(--a-coral)' },
        { label: 'Bills', amount: 142000, color: 'var(--a-blue)' },
        { label: 'Food', amount: 98000, color: 'var(--a-amber)' },
        { label: 'Transport', amount: 42000, color: 'var(--a-green)' },
      ]}
    />
  </div>
);

/** A taller meter, for when the bar is the primary graphic. */
export const Tall = () => (
  <div style={{ width: 420 }}>
    <MeterBar value={41} limit={100} height={14} />
  </div>
);
