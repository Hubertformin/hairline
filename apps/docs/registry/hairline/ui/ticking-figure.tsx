'use client';

import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';
import { useAnimatedNumber } from '@/registry/hairline/hooks/use-animated-number';

export interface TickingFigureProps extends Omit<React.ComponentProps<'span'>, 'children'> {
  value: number;
  /** Thousands separator. Defaults to the thin space the system uses for XAF. */
  separator?: string;
  /** Decimal places. Zero-decimal currencies like XAF want 0. */
  decimals?: number;
  durationMs?: number;
}

/**
 * A figure that counts to its value in tabular numerals.
 *
 * Tabular figures are what make this readable: with proportional digits the number
 * would jitter horizontally on every frame as glyph widths changed.
 */
export function TickingFigure({
  className,
  value,
  separator = ' ',
  decimals = 0,
  durationMs,
  ...props
}: TickingFigureProps) {
  const animated = useAnimatedNumber(value, durationMs);
  const text = animated
    .toFixed(decimals)
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return (
    <span className={cn('tabular', className)} {...props}>
      {text}
    </span>
  );
}
