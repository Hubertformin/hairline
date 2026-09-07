import { IconButton } from 'ledger-ds';

const plus = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const send = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h13M12.5 6.5L19 12l-6.5 5.5" />
  </svg>
);
const more = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M6 12h.01M12 12h.01M18 12h.01" />
  </svg>
);

/** The tone axis. `solid` is the assistant's send button — one per screen. */
export const Tones = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <IconButton label="Add an account" tone="quiet">{plus}</IconButton>
    <IconButton label="Send to Kima" tone="solid">{send}</IconButton>
    <IconButton label="More" tone="bare">{more}</IconButton>
  </div>
);

/** Sizes. The default is 34; 44 meets the touch minimum on mobile. */
export const Sizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <IconButton label="Add" size={28}>{plus}</IconButton>
    <IconButton label="Add">{plus}</IconButton>
    <IconButton label="Add" size={38}>{plus}</IconButton>
    <IconButton label="Add" size={44}>{plus}</IconButton>
  </div>
);
