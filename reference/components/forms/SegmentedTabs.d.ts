import * as React from 'react';

/** A pill track with one raised white segment. Used for tabs, filters and periods. */
export interface SegmentedTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Strings, or { id, label, icon } for tabs that carry a glyph */
  items: Array<string | { id: string; label: string; icon?: React.ReactNode }>;
  value?: string;
  onChange?: (id: string) => void;
  /** Mono uppercase labels (default) or sentence-case sans */
  mono?: boolean;
}
export function SegmentedTabs(props: SegmentedTabsProps): JSX.Element;
