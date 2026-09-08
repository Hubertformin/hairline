import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/registry/hairline/lib/utils';

/**
 * Label, big tight figure, one line of meaning.
 *
 * The house rule the component exists to enforce: say the number, then say what it
 * means. A `value` without a `note` is usually a missed sentence.
 */
export const statValueVariants = cva('tracking-figure tabular', {
  variants: {
    size: { xl: 'type-figure-xl', l: 'type-figure-l', m: 'type-figure-m', s: 'type-figure-s' },
    tone: {
      ink: 'text-strong group-data-[tone=dark]/tile:text-on-inverse',
      alarm: 'text-alarm',
      positive: 'text-positive',
      info: 'text-info',
    },
  },
  defaultVariants: { size: 'm', tone: 'ink' },
});

export interface StatBlockProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof statValueVariants> {
  label?: React.ReactNode;
  /** The figure. Group thousands with a thin space: 250 000. */
  value?: React.ReactNode;
  /** A currency code or unit, set in mono uppercase. */
  unit?: React.ReactNode;
  /** One line of plain consequence, second person, no hedging. */
  note?: React.ReactNode;
}

export function StatBlock({ className, size, tone, label, value, unit, note, ...props }: StatBlockProps) {
  return (
    <div data-slot="stat-block" className={className} {...props}>
      {label ? (
        <div className="type-label text-faint group-data-[tone=dark]/tile:text-white/66">{label}</div>
      ) : null}
      <div className="mt-s5 flex items-baseline gap-s5">
        <span className={cn(statValueVariants({ size, tone }))}>{value}</span>
        {unit ? <span className="type-data-s tracking-unit uppercase text-muted">{unit}</span> : null}
      </div>
      {note ? <div className="mt-s4 type-body-s text-muted">{note}</div> : null}
    </div>
  );
}
