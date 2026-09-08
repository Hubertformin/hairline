import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.js';

export interface ToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  on?: boolean;
  onChange?: () => void;
  /**
   * With a label, the whole settings row renders: the label, its consequence,
   * and the switch. Without one, just the switch.
   */
  label?: ReactNode;
  /** The consequence of turning it on — say the uncomfortable part. */
  note?: ReactNode;
  /** The accessible name when there is no visible label. */
  ariaLabel?: string;
}

/** A switch, or a whole settings row with its consequence. */
export const Toggle = forwardRef<HTMLDivElement, ToggleProps>(function Toggle(
  { on = false, onChange, label, note, ariaLabel, className, ...rest },
  ref,
) {
  const sw = (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label ? undefined : ariaLabel}
      onClick={onChange}
      className={cx('hl-toggle__switch', on && 'hl-toggle__switch--on')}
    >
      <span className="hl-toggle__knob" />
    </button>
  );

  if (!label) return sw;

  return (
    <div ref={ref} className={cx('hl-toggle-row', className)} {...rest}>
      <div style={{ minWidth: 0 }}>
        <div className="hl-toggle-row__label">{label}</div>
        {note ? <div className="hl-toggle-row__note">{note}</div> : null}
      </div>
      {sw}
    </div>
  );
});
