import { forwardRef, type HTMLAttributes, type ReactNode, type InputHTMLAttributes } from 'react';
import { cx } from './cx.js';

export type FieldSize = 'm' | 'lg';

interface FieldBase extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
  /** The mono uppercase label sitting above the value. */
  label?: ReactNode;
  /** One line of plain consequence under the field. */
  hint?: ReactNode;
  /** A mono code sitting before the value, e.g. `XAF`. */
  prefix?: ReactNode;
  /** `lg` is for the one amount on a form — never for two. */
  size?: FieldSize;
  /** A glyph or button at the trailing edge. */
  trailing?: ReactNode;
}

export interface FieldProps extends FieldBase {
  /** The value shown. */
  value?: ReactNode;
  /**
   * Render a real `<input>` rather than static text.
   *
   * The original export was a display-only mock, which is right for a screen
   * design and useless in a running app. Set this and the value becomes typable;
   * pass `inputProps` for `onChange`, `placeholder`, `inputMode` and the rest.
   */
  editable?: boolean;
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'size' | 'className'>;
}

/**
 * A labelled value on a grey fill.
 *
 * `size="lg"` is reserved for the single amount a form is about — the figure the
 * whole screen leads with.
 */
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { label, hint, value, prefix, size = 'm', trailing, editable, inputProps, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('led-field', size === 'lg' && 'led-field--lg', className)}
      {...rest}
    >
      {label ? <div className="led-field__label">{label}</div> : null}
      <div className="led-field__box">
        {prefix ? <span className="led-field__prefix">{prefix}</span> : null}
        {editable ? (
          <input
            className="led-field__value"
            value={typeof value === 'string' || typeof value === 'number' ? value : undefined}
            {...inputProps}
          />
        ) : (
          <span className="led-field__value">{value}</span>
        )}
        {trailing}
      </div>
      {hint ? <div className="led-field__hint">{hint}</div> : null}
    </div>
  );
});
