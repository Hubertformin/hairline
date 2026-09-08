import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/registry/hairline/lib/utils';

/** A round button holding one 24-grid stroke glyph. */
export const iconButtonVariants = cva(
  'inline-flex items-center justify-center shrink-0 border-0 cursor-pointer rounded-pill ' +
    'transition-[color,background-color] duration-fast ease-hairline ' +
    'focus-visible:focus-ring-inset disabled:opacity-45 disabled:cursor-default',
  {
    variants: {
      tone: {
        quiet: 'bg-quiet text-body hover:bg-desk hover:text-strong',
        solid: 'bg-solid text-solid-text hover:bg-ink-2',
        bare: 'bg-transparent text-muted hover:text-strong',
      },
    },
    defaultVariants: { tone: 'quiet' },
  },
);

export interface IconButtonProps
  extends Omit<React.ComponentProps<'button'>, 'aria-label'>,
    VariantProps<typeof iconButtonVariants> {
  /** Diameter in px. Defaults to 34. */
  size?: number;
  /** Required: a button holding only a glyph is unreachable without an accessible name. */
  label: string;
}

export function IconButton({ className, tone, size = 34, label, style, type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      data-slot="icon-button"
      type={type}
      aria-label={label}
      className={cn(iconButtonVariants({ tone }), className)}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  );
}
