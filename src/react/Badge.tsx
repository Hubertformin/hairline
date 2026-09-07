import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.js';

export type BadgeTone = 'neutral' | 'alarm' | 'positive' | 'info' | 'caution';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  tone?: BadgeTone;
}

/**
 * A mono uppercase state marker. Ink and wash travel together — a badge is never
 * a border-only accent.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, tone = 'neutral', className, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx('led-badge', `led-badge--${tone}`, className)} {...rest}>
      {children}
    </span>
  );
});
