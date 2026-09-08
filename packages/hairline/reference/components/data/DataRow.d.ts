import * as React from 'react';

/** One line of a ledger or list: dot, name, mono meta, right-aligned figure, optional running total. */
export interface DataRowProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: React.ReactNode;
  /** Mono uppercase detail — account, time, reference */
  meta?: string;
  /** CSS colour for the category dot */
  dot?: string;
  amount?: React.ReactNode;
  /** A second figure, e.g. a running balance */
  secondary?: React.ReactNode;
  /** plain = open; demoted = settled; struck = skipped or moved; alarm = late now */
  state?: 'plain' | 'demoted' | 'struck' | 'alarm';
  badge?: React.ReactNode;
}
export function DataRow(props: DataRowProps): JSX.Element;
