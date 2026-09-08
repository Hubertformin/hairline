import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.js';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  selected?: boolean;
  /**
   * A chip that only reports — a preset that is not pressable. It renders as a
   * `<span>`, so it never lands in the tab order or announces itself as a button.
   */
  interactive?: boolean;
}

/** An outlined pill holding a whole phrase — suggestions, presets, filters. */
export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { children, selected = false, interactive = true, className, type = 'button', ...rest },
  ref,
) {
  const cls = cx(
    'hl-chip',
    selected && 'hl-chip--selected',
    !interactive && 'hl-chip--static',
    className,
  );

  if (!interactive) {
    // The button-only props are meaningless on a span; drop them rather than
    // letting React warn about unknown attributes.
    const { disabled: _disabled, form: _form, value: _value, ...spanRest } = rest;
    return (
      <span className={cls} {...spanRest}>
        {children}
      </span>
    );
  }

  return (
    <button ref={ref} type={type} aria-pressed={selected} className={cls} {...rest}>
      {children}
    </button>
  );
});
