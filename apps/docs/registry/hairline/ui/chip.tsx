import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';

export interface ChipProps extends React.ComponentProps<'button'> {
  selected?: boolean;
  /**
   * A chip that only reports — a preset that is not pressable. Renders a <span>, so
   * it never lands in the tab order or announces itself as a button.
   */
  interactive?: boolean;
}

/**
 * An outlined pill holding a whole phrase — suggestions, presets, filters.
 *
 * `box-border` is deliberate: the height token is the *content* box, and the 1px
 * border sits outside it, so a chip lines up with the tab beside it.
 */
export function Chip({ className, selected = false, interactive = true, type = 'button', ...props }: ChipProps) {
  const classes = cn(
    'box-content inline-flex items-center gap-s3 h-pill px-s6 rounded-pill type-chip',
    'border border-rule bg-transparent text-body',
    'transition-[border-color,color] duration-fast ease-hairline',
    interactive && 'cursor-pointer hover:border-muted hover:text-strong focus-visible:focus-ring-inset',
    selected && 'border-ink-1 text-strong',
    className,
  );

  if (!interactive) {
    const { disabled: _d, form: _f, value: _v, ...rest } = props;
    return <span data-slot="chip" className={classes} {...rest} />;
  }
  return <button data-slot="chip" type={type} aria-pressed={selected} className={classes} {...props} />;
}
