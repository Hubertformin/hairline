import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/registry/hairline/lib/utils';

/**
 * The only card shape in the system: a fill, a radius, no border.
 *
 * `dark` is the one large inverted area allowed, and it appears once per page holding
 * the primary figure. It reads the `surface-inverse` role rather than the ink ramp, so
 * it stays the high-contrast tile in dark mode instead of flipping to white.
 */
export const tileVariants = cva('py-card-y px-card-x rounded-card', {
  variants: {
    tone: {
      quiet: 'bg-card text-strong',
      paper: 'bg-paper text-strong shadow-raised',
      dark: 'bg-surface-inverse text-on-inverse',
      alarm: 'bg-alarm-wash text-strong',
      info: 'bg-info-wash text-strong',
      caution: 'bg-caution-wash text-strong',
    },
  },
  defaultVariants: { tone: 'quiet' },
});

export interface TileProps extends React.ComponentProps<'div'>, VariantProps<typeof tileVariants> {
  /** The mono uppercase label in the tile's head row. */
  label?: React.ReactNode;
  /** A control at the trailing edge of the head row. */
  action?: React.ReactNode;
}

export function Tile({ className, tone, label, action, children, ...props }: TileProps) {
  return (
    <div
      data-slot="tile"
      data-tone={tone ?? 'quiet'}
      /* `group` so descendants can react to the tile's tone — an inverted tile has to
         re-colour the label and figure inside it, and Tailwind reaches an ancestor's
         data attribute only through a group. */
      className={cn('group/tile', tileVariants({ tone }), className)}
      {...props}
    >
      {label || action ? (
        <div className="flex items-center justify-between gap-s5 mb-s6">
          {label ? (
            /* On the inverted tile the label lifts off the ink rather than sinking in. */
            <span className="type-label text-faint group-data-[tone=dark]/tile:text-white/66">
              {label}
            </span>
          ) : (
            <span />
          )}
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}
