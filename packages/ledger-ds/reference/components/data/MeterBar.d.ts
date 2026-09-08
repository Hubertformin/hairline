import * as React from 'react';

/** Either a single meter against a limit, or a stacked composition bar weighted by amount. */
export interface MeterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Pass segments for a composition bar; omit for a single meter */
  segments?: Array<{ label?: string; amount: number; color: string }>;
  value?: number;
  limit?: number;
  /** Fills the whole track in alarm — a limit already exceeded */
  over?: boolean;
  height?: string;
}
export function MeterBar(props: MeterBarProps): JSX.Element;
