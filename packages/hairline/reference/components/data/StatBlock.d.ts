import * as React from 'react';

/**
 * The system's headline pattern: mono label, big tight figure, one quiet line of meaning.
 * @startingPoint section="Data" subtitle="Figures, rows, meters and tiles" viewport="700x320"
 */
export interface StatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  value?: React.ReactNode;
  /** Mono unit beside the figure — a currency code, a date */
  unit?: string;
  /** The sentence that says what the number means */
  note?: string;
  size?: 'xl' | 'l' | 'm' | 's';
  tone?: 'ink' | 'alarm' | 'positive' | 'info';
}
export function StatBlock(props: StatBlockProps): JSX.Element;
