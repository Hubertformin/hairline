import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';

export interface FieldProps extends Omit<React.ComponentProps<'div'>, 'prefix'> {
  label?: React.ReactNode;
  /** One line of plain consequence under the field. */
  hint?: React.ReactNode;
  value?: React.ReactNode;
  /** A mono code sitting before the value, e.g. XAF. */
  prefix?: React.ReactNode;
  /** `lg` is for the one amount a form is about — never for two. */
  size?: 'm' | 'lg';
  trailing?: React.ReactNode;
  /**
   * Render a real <input> rather than static text. The static form is a display
   * pattern from the original screens and stays the default.
   */
  editable?: boolean;
  inputProps?: Omit<React.ComponentProps<'input'>, 'value' | 'size' | 'className'>;
}

/** A labelled value on a grey fill. */
export function Field({
  className,
  label,
  hint,
  value,
  prefix,
  size = 'm',
  trailing,
  editable,
  inputProps,
  ...props
}: FieldProps) {
  const lg = size === 'lg';
  /* `tabular` after the type utility: the CSS `font` shorthand resets
     font-variant-numeric, and this is the one amount on the form. */
  const valueClasses = cn(
    'flex-1 min-w-0 bg-transparent border-0 p-0 text-strong tabular outline-none',
    lg ? 'type-amount tracking-amount' : 'type-item',
  );

  return (
    <div data-slot="field" className={className} {...props}>
      {label ? <div className="type-label-s text-faint">{label}</div> : null}
      <div
        className={cn(
          'mt-s4 px-s7 flex items-center gap-s5 rounded-field bg-field',
          lg ? 'h-field-lg' : 'h-field',
        )}
      >
        {prefix ? <span className="type-prefix tracking-prefix text-muted shrink-0">{prefix}</span> : null}
        {editable ? (
          <input
            className={cn(valueClasses, 'placeholder:text-faint')}
            value={typeof value === 'string' || typeof value === 'number' ? value : undefined}
            {...inputProps}
          />
        ) : (
          <span className={valueClasses}>{value}</span>
        )}
        {trailing}
      </div>
      {hint ? <div className="mt-s3 type-caption text-muted">{hint}</div> : null}
    </div>
  );
}
