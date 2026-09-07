import { Badge } from 'ledger-ds';

/** The tone axis. Each tone is an ink and a wash used together. */
export const Tones = () => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
    <Badge>Settled</Badge>
    <Badge tone="alarm">Needs a decision</Badge>
    <Badge tone="positive">Paid</Badge>
    <Badge tone="info">Scheduled</Badge>
    <Badge tone="caution">Held for a year</Badge>
  </div>
);

/** In use: a badge marks the state of the line it sits on. */
export const InContext = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <span style={{ font: 'var(--type-body)', color: 'var(--ink-1)' }}>School fees — second term</span>
    <Badge tone="alarm">Needs a decision</Badge>
  </div>
);
