import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.js';

export type DataRowState = 'plain' | 'demoted' | 'struck' | 'alarm';

export interface DataRowProps extends HTMLAttributes<HTMLDivElement> {
  name?: ReactNode;
  /** Mono uppercase detail under the name — a date, a method, a category. */
  meta?: ReactNode;
  /** A category dot. Its colour is data, so it is passed in as a CSS colour. */
  dot?: string;
  /** The figure, in mono tabular numerals. */
  amount?: ReactNode;
  /** The running total, in its own right-aligned column. */
  secondary?: ReactNode;
  /**
   * `demoted` and `struck` mark a settled, paid or skipped line. Both keep the
   * value at --ink-3 and add a mark, because lightness alone is not readable.
   */
  state?: DataRowState;
  badge?: ReactNode;
}

/** A ledger line: dot, name, mono meta, figure, running total. */
export const DataRow = forwardRef<HTMLDivElement, DataRowProps>(function DataRow(
  { name, meta, dot, amount, secondary, state = 'plain', badge, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('hl-row', className)} {...rest}>
      {dot ? <span className="hl-row__dot" style={{ background: dot }} /> : null}
      <div className="hl-row__main">
        <div className="hl-row__name">{name}</div>
        {meta ? <div className="hl-row__meta">{meta}</div> : null}
      </div>
      {badge}
      <span className={cx('hl-row__amount', state !== 'plain' && `hl-row__amount--${state}`)}>
        {amount}
      </span>
      {secondary ? <span className="hl-row__secondary">{secondary}</span> : null}
    </div>
  );
});
