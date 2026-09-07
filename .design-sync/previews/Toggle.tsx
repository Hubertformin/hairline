import { Toggle } from 'ledger-ds';

/** The canonical use: a settings row that states the consequence. */
export const SettingsRow = () => (
  <div style={{ width: 460 }}>
    <Toggle on label="Round up every payment" note="Adds about 4 200 a month to the vault." />
    <Toggle label="Warn me before the balance hits zero" note="Twenty per cent is held for a year — delayed, not lost." />
    <Toggle on label="Count the vault as available" note="It is not. Turning this on hides the shortfall." />
  </div>
);

/** The switch alone, both states. */
export const Switch = () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Toggle on ariaLabel="On" />
    <Toggle ariaLabel="Off" />
  </div>
);
