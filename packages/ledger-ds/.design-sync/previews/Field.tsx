import { Field, IconButton } from 'ledger-ds';

/** The canonical field: label, value on a grey fill, one line of consequence. */
export const Labelled = () => (
  <div style={{ width: 360 }}>
    <Field label="Account name" value="MTN MoMo — 677 04" hint="The number the salary lands on." />
  </div>
);

/** `size="lg"` is the one amount a form is about — never two on a screen. */
export const Amount = () => (
  <div style={{ width: 360 }}>
    <Field
      label="Amount"
      size="lg"
      prefix="XAF"
      value="250 000"
      hint="Paying both today leaves nothing until the 28th."
    />
  </div>
);

/** A trailing control inside the field. */
export const WithTrailing = () => (
  <div style={{ width: 360 }}>
    <Field
      label="Recipient"
      value="Ecole Bilingue — bursar"
      trailing={
        <IconButton label="Clear" tone="bare" size={28}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </IconButton>
      }
    />
  </div>
);

/** A whole form section, which is how fields actually appear. */
export const Stacked = () => (
  <div style={{ width: 360, display: 'grid', gap: 20 }}>
    <Field label="From" value="Savings vault" />
    <Field label="Amount" size="lg" prefix="XAF" value="120 000" />
    <Field label="When" value="22 March" hint="The day the school fees are due." />
  </div>
);
