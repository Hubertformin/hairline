import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.js';

/* `value` here is displayed content, not a form value, so the button's own
   string-only `value` attribute is omitted rather than widened. */
export interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  label?: ReactNode;
  /** The chosen value, as displayed. */
  value?: ReactNode;
  /** A category dot. Its colour is data, so it is passed in as a CSS colour. */
  dot?: string;
  /** Mono detail after the value — an account number, a count. */
  meta?: ReactNode;
}

const caret = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M6.5 10l5.5 5 5.5-5" />
  </svg>
);

/**
 * A closed dropdown.
 *
 * This is deliberately the trigger only — it renders the closed state and calls
 * `onClick`. It does not open a menu, manage a listbox or handle keyboard
 * selection. Wire it to your own popover, or use a native `<select>` when you
 * need the platform behaviour.
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { label, value, dot, meta, className, type = 'button', ...rest },
  ref,
) {
  return (
    <div className={cx('led-select', className)}>
      {label ? <div className="led-select__label">{label}</div> : null}
      <button ref={ref} type={type} className="led-select__box" {...rest}>
        <span className="led-select__main">
          {dot ? <span className="led-select__dot" style={{ background: dot }} /> : null}
          <span className="led-select__value">{value}</span>
          {meta ? <span className="led-select__meta">{meta}</span> : null}
        </span>
        <span className="led-select__caret">{caret}</span>
      </button>
    </div>
  );
});
