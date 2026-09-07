import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.js';

export type TileTone = 'quiet' | 'paper' | 'dark' | 'alarm' | 'info' | 'caution';

export interface TileProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  tone?: TileTone;
  /** The mono uppercase label in the tile's head row. */
  label?: ReactNode;
  /** A control at the trailing edge of the head row. */
  action?: ReactNode;
}

/**
 * The only card shape: a fill, a radius, no border.
 *
 * `dark` is the one large coloured area the system allows, and it appears once
 * per page, holding the primary figure.
 */
export const Tile = forwardRef<HTMLDivElement, TileProps>(function Tile(
  { children, tone = 'quiet', label, action, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx('led-tile', `led-tile--${tone}`, className)} {...rest}>
      {label || action ? (
        <div className="led-tile__head">
          {label ? <span className="led-tile__label">{label}</span> : <span />}
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
});
