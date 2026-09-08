import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.js';

export type StatSize = 'xl' | 'l' | 'm' | 's';
export type StatTone = 'ink' | 'alarm' | 'positive' | 'info';

export interface StatBlockProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  /** The figure. Group thousands with a thin space: 250 000. */
  value?: ReactNode;
  /** A currency code or unit, set in mono uppercase. */
  unit?: ReactNode;
  /** One line of plain consequence. Say the number, then say what it means. */
  note?: ReactNode;
  size?: StatSize;
  tone?: StatTone;
}

/** Label, big tight figure, one line of meaning. */
export const StatBlock = forwardRef<HTMLDivElement, StatBlockProps>(function StatBlock(
  { label, value, unit, note, size = 'm', tone = 'ink', className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'hl-stat',
        size !== 'm' && `hl-stat--${size}`,
        tone !== 'ink' && `hl-stat--${tone}`,
        className,
      )}
      {...rest}
    >
      {label ? <div className="hl-stat__label">{label}</div> : null}
      <div className="hl-stat__row">
        <span className="hl-stat__value">{value}</span>
        {unit ? <span className="hl-stat__unit">{unit}</span> : null}
      </div>
      {note ? <div className="hl-stat__note">{note}</div> : null}
    </div>
  );
});
