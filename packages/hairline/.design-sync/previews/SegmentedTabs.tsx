import { SegmentedTabs } from '@hairline/ds';

/** The default: mono uppercase labels — the system's signature. */
export const Mono = () => <SegmentedTabs items={['Month', 'Quarter', 'Year']} value="Month" />;

/** `mono={false}` for tabs holding a phrase rather than a code. */
export const Sans = () => (
  <SegmentedTabs mono={false} items={['Everything', 'Needs a decision', 'Settled']} value="Everything" />
);

/** Each position selected, so the raised segment is visibly the moving part. */
export const Positions = () => (
  <div style={{ display: 'grid', gap: 14, justifyItems: 'start' }}>
    <SegmentedTabs items={['Month', 'Quarter', 'Year']} value="Month" />
    <SegmentedTabs items={['Month', 'Quarter', 'Year']} value="Quarter" />
    <SegmentedTabs items={['Month', 'Quarter', 'Year']} value="Year" />
  </div>
);
