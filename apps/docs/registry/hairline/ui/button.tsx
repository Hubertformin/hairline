import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/registry/hairline/lib/utils';

/**
 * The one pressable shape in Hairline: a pill.
 *
 * `solid` is the single primary action per view — if two solid buttons are visible
 * at once, one of them is wrong.
 *
 * Every value here is a Hairline token: `h-control`, `rounded-pill`, `px-s8` and
 * `type-control` all come from the generated Tailwind theme, so nothing in this file
 * needs updating when a token changes. `type-control` is one utility carrying family,
 * size, weight and line-height together — splitting them across four classes is how
 * type quietly drifts.
 *
 * Interaction follows the spec: background steps one surface on hover and one more on
 * press. No lift, no scale, no shadow change, and focus is a 2px inset ring rather
 * than a browser outline.
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-s3 whitespace-nowrap border-0 cursor-pointer ' +
    'rounded-pill transition-[color,background-color] duration-fast ease-hairline ' +
    'focus-visible:focus-ring-inset ' +
    'disabled:opacity-45 disabled:cursor-default disabled:pointer-events-none',
  {
    variants: {
      tone: {
        solid: 'bg-solid text-solid-text hover:bg-ink-2 active:bg-ink-3',
        quiet: 'bg-quiet text-strong hover:bg-desk active:bg-rule',
        ghost: 'bg-transparent text-body hover:bg-surface-2 hover:text-strong active:bg-surface-3',
        danger:
          'bg-alarm-wash text-alarm ' +
          'hover:bg-[color-mix(in_srgb,var(--hl-alarm-wash)_90%,var(--hl-alarm))]',
      },
      size: {
        s: 'h-pill px-s6 type-control-s',
        m: 'h-control px-s8 type-control',
        l: 'h-12 px-s10 type-control-l',
      },
    },
    defaultVariants: { tone: 'solid', size: 'm' },
  },
);

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  /** Render as the child element instead of a <button>, so a link can wear the button. */
  asChild?: boolean;
  /**
   * A trailing glyph, e.g. an arrow on "Continue".
   *
   * Ignored when `asChild` is set: Slot forwards to exactly one child, so the icon
   * belongs inside that child's own markup instead.
   */
  iconRight?: React.ReactNode;
}

export function Button({
  className,
  tone,
  size,
  asChild = false,
  iconRight,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-slot="button"
      type={asChild ? undefined : type}
      className={cn(buttonVariants({ tone, size }), className)}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {children}
          {iconRight}
        </>
      )}
    </Comp>
  );
}
