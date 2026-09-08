import { Button } from '@hairline/ds';

/** The canonical use: one solid primary action, one quiet action beside it. */
export const Primary = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button tone="solid">Record it</Button>
    <Button tone="quiet">Move to April</Button>
  </div>
);

/** The tone axis — the prop that most changes appearance. */
export const Tones = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    <Button tone="solid">Set the ceiling</Button>
    <Button tone="quiet">Not now</Button>
    <Button tone="ghost">Skip this month</Button>
    <Button tone="danger">Delete account</Button>
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button size="s">Small</Button>
    <Button size="m">Medium</Button>
    <Button size="l">Large</Button>
  </div>
);

export const Disabled = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button tone="solid" disabled>
      Locked until 22 March
    </Button>
    <Button tone="quiet" disabled>
      Nothing to record
    </Button>
  </div>
);

/** A trailing glyph on a continue action. */
export const WithTrailingIcon = () => (
  <Button
    tone="solid"
    iconRight={
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h13M12.5 6.5L19 12l-6.5 5.5" />
      </svg>
    }
  >
    Continue
  </Button>
);
