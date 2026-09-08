import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type CSSProperties } from 'react';
import { cx } from './cx.js';

export type IconButtonTone = 'quiet' | 'solid' | 'bare';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
  children?: ReactNode;
  tone?: IconButtonTone;
  /** Diameter in px. The export's default is 34. */
  size?: number;
  /**
   * The accessible name. Required — a button holding only a glyph is
   * unreachable without one.
   */
  label: string;
}

/** A round button holding one 24-grid stroke glyph. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { children, tone = 'quiet', size, label, className, style, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      className={cx('hl-iconbtn', `hl-iconbtn--${tone}`, className)}
      style={
        size === undefined
          ? style
          : ({ ...style, '--hl-iconbtn-size': `${size}px` } as CSSProperties)
      }
      {...rest}
    >
      {children}
    </button>
  );
});
