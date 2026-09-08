import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/registry/hairline/lib/utils';

/**
 * A demoted line steps down to --ink-3 *and* takes a mark. Never lightness alone —
 * lightness by itself is not readable, which is why `struck` adds a line rather than
 * fading further.
 */
export const dataRowAmountVariants = cva('type-data tabular shrink-0', {
  variants: {
    state: {
      plain: 'text-strong',
      demoted: 'text-muted',
      struck: 'text-muted line-through',
      alarm: 'text-alarm font-medium',
    },
  },
  defaultVariants: { state: 'plain' },
});

export interface DataRowProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof dataRowAmountVariants> {
  name?: React.ReactNode;
  /** Mono uppercase detail under the name — a date, a method, a category. */
  meta?: React.ReactNode;
  /** A category dot. Its colour is data, so it is passed in as a CSS colour. */
  dot?: string;
  amount?: React.ReactNode;
  /** The running total, in its own right-aligned column. */
  secondary?: React.ReactNode;
  badge?: React.ReactNode;
}

/** A ledger line: dot, name, mono meta, figure, running total. */
export function DataRow({ className, state, name, meta, dot, amount, secondary, badge, ...props }: DataRowProps) {
  return (
    <div
      data-slot="data-row"
      className={cn('flex items-center gap-s5 py-row-y border-b border-hairline', className)}
      {...props}
    >
      {dot ? <span className="size-dot rounded-full shrink-0" style={{ background: dot }} /> : null}
      <div className="flex-1 min-w-0">
        <div className="type-item text-strong">{name}</div>
        {meta ? <div className="mt-[3px] type-data-s tracking-meta uppercase text-muted">{meta}</div> : null}
      </div>
      {badge}
      <span className={cn(dataRowAmountVariants({ state }))}>{amount}</span>
      {secondary ? (
        <span className="w-[110px] text-right type-data tabular text-muted shrink-0">{secondary}</span>
      ) : null}
    </div>
  );
}
