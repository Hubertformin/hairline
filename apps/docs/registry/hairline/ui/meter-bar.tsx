import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';

export interface MeterSegment {
  label?: string;
  amount: number;
  /** A CSS colour — normally one of the accent tokens, because a segment is data. */
  color: string;
}

export interface MeterBarProps extends React.ComponentProps<'div'> {
  /** Pass segments for a stacked composition bar; omit them for a limit meter. */
  segments?: MeterSegment[];
  value?: number;
  limit?: number;
  /** Over the limit: the whole track fills, in alarm. */
  over?: boolean;
  /** Any CSS length. Defaults to the meter stroke token. */
  height?: string | number;
}

/** A limit meter, or a stacked composition bar. */
export function MeterBar({
  className,
  segments,
  value = 0,
  limit = 100,
  over = false,
  height,
  style,
  ...props
}: MeterBarProps) {
  const sized = { ...(height === undefined ? null : { height }), ...style };

  if (segments?.length) {
    const total = segments.reduce((sum, s) => sum + s.amount, 0) || 1;
    return (
      <div data-slot="meter" className={cn('flex gap-0.5 h-meter', className)} style={sized} {...props}>
        {segments.map((s, i) => (
          <span
            key={s.label ?? i}
            title={s.label}
            className="rounded-pill min-w-0.5"
            style={{ flex: String(s.amount / total), background: s.color }}
          />
        ))}
      </div>
    );
  }

  const pct = Math.min(100, Math.round((value / (limit || 1)) * 100));
  return (
    <div
      data-slot="meter"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={limit}
      className={cn('h-meter rounded-pill bg-rule overflow-hidden', className)}
      style={sized}
      {...props}
    >
      <span
        className={cn('block h-full rounded-pill', over ? 'bg-alarm' : 'bg-ink-1')}
        style={{ width: `${over ? 100 : pct}%` }}
      />
    </div>
  );
}
