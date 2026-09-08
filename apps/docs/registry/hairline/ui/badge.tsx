import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/registry/hairline/lib/utils';

/**
 * A mono uppercase state marker.
 *
 * Ink and wash always travel together — a badge is never a border-only accent, and
 * never colour alone, because colour is a data channel here rather than decoration.
 */
export const badgeVariants = cva(
  'inline-flex items-center h-5 px-[9px] rounded-pill type-label-s whitespace-nowrap',
  {
    variants: {
      tone: {
        neutral: 'bg-quiet text-muted',
        alarm: 'bg-alarm-wash text-alarm',
        positive: 'bg-positive-wash text-positive',
        info: 'bg-info-wash text-info',
        caution: 'bg-caution-wash text-caution',
      },
    },
    defaultVariants: { tone: 'neutral' },
  },
);

export interface BadgeProps extends React.ComponentProps<'span'>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ tone }), className)} {...props} />;
}
