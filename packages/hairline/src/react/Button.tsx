import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.js';

export type ButtonTone = 'solid' | 'quiet' | 'ghost' | 'danger';
export type ButtonSize = 's' | 'm' | 'l';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  /** solid = the one primary action; quiet = secondary; ghost = tertiary; danger = destructive */
  tone?: ButtonTone;
  size?: ButtonSize;
  /** Optional trailing glyph, e.g. an arrow on "Continue". */
  iconRight?: ReactNode;
}

/**
 * The one pressable shape: a pill.
 *
 * `solid` black is the single primary action per view — if two solid buttons are
 * visible at once, one of them is wrong.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, tone = 'solid', size = 'm', iconRight, className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx('hl-btn', `hl-btn--${tone}`, size !== 'm' && `hl-btn--${size}`, className)}
      {...rest}
    >
      {children}
      {iconRight}
    </button>
  );
});
