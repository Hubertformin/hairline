import { DataRow, Badge } from 'ledger-ds';

/** A ledger: dot, name, mono meta, figure, running total. */
export const Ledger = () => (
  <div style={{ width: 520 }}>
    <DataRow
      dot="var(--a-coral)"
      name="School fees — second term"
      meta="22 Mar · Mobile money"
      state="alarm"
      amount="−258 900"
      secondary="227 400"
    />
    <DataRow
      dot="var(--a-blue)"
      name="Fibre bill"
      meta="18 Mar · Landed twice"
      badge={<Badge tone="info">Disputed</Badge>}
      amount="−34 000"
      secondary="486 300"
    />
    <DataRow dot="var(--a-green)" name="Salary" meta="01 Mar · MTN MoMo" amount="750 000" secondary="520 300" />
  </div>
);

/** The state axis: how a line is demoted once it no longer needs a decision. */
export const States = () => (
  <div style={{ width: 520 }}>
    <DataRow name="Needs a decision" meta="Due 22 Mar" state="alarm" amount="−258 900" />
    <DataRow name="Paid" meta="Settled 18 Mar" state="plain" amount="−34 000" />
    <DataRow name="Skipped this month" meta="Moved to April" state="struck" amount="−12 500" />
    <DataRow name="Already counted" meta="Settled" state="demoted" amount="−4 200" />
  </div>
);

/** Without a running total, and without dots — the plain list. */
export const Minimal = () => (
  <div style={{ width: 420 }}>
    <DataRow name="Transport" meta="Daily · Bus" amount="−12 500" />
    <DataRow name="Airtime" meta="Weekly" amount="−5 000" />
    <DataRow name="Rent" meta="01 Mar" amount="−150 000" />
  </div>
);
