import { Chip } from 'ledger-ds';

/** The canonical use: a range picker where one chip is selected. */
export const Selected = () => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
    <Chip selected>This month</Chip>
    <Chip>Six months forward</Chip>
    <Chip>Since January</Chip>
  </div>
);

/** Assistant suggestions — a chip holds a whole phrase, not a word. */
export const Suggestions = () => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', width: 460 }}>
    <Chip>What can I move to April?</Chip>
    <Chip>Why is the fibre bill twice?</Chip>
    <Chip>Set a ceiling for food</Chip>
  </div>
);

/** A chip that only reports. It renders as a span, so it is not in the tab order. */
export const Static = () => (
  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
    <Chip interactive={false}>Mobile money</Chip>
    <Chip interactive={false}>XAF</Chip>
  </div>
);
