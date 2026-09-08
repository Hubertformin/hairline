import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { cx } from './cx.js';

export interface MeterSegment {
  label?: string;
  amount: number;
  /** A CSS colour, normally one of the accent tokens. */
  color: string;
}

export interface MeterBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Pass segments for a stacked composition bar; omit them for a limit meter. */
  segments?: MeterSegment[];
  value?: number;
  limit?: number;
  /** Over the limit: the whole track fills, in alarm. */
  over?: boolean;
  /** Any CSS length. Defaults to --stroke-meter. */
  height?: string | number;
}

/** A limit meter, or a stacked composition bar. */
export const MeterBar = forwardRef<HTMLDivElement, MeterBarProps>(function MeterBar(
  { segments, value = 0, limit = 100, over = false, height, className, style, ...rest },
  ref,
) {
  const sized: CSSProperties = {
    ...style,
    ...(height === undefined ? null : { height: typeof height === 'number' ? `${height}px` : height }),
  };

  if (segments && segments.length) {
    const total = segments.reduce((sum, s) => sum + s.amount, 0) || 1;
    return (
      <div
        ref={ref}
        className={cx('hl-meter', 'hl-meter--stacked', className)}
        style={sized}
        {...rest}
      >
        {segments.map((s, i) => (
          <span
            key={s.label ?? i}
            title={s.label}
            className="hl-meter__segment"
            style={{ flex: String(s.amount / total), background: s.color }}
          />
        ))}
      </div>
    );
  }

  const pct = Math.min(100, Math.round((value / (limit || 1)) * 100));
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={limit}
      className={cx('hl-meter', over && 'hl-meter--over', className)}
      style={sized}
      {...rest}
    >
      <span className="hl-meter__fill" style={{ width: `${over ? 100 : pct}%` }} />
    </div>
  );
});
