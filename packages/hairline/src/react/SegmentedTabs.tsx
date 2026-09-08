import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx.js';

export interface TabItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
}

export interface SegmentedTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** A bare string is shorthand for `{ id: s, label: s }`. */
  items?: (TabItem | string)[];
  value?: string;
  onChange?: (id: string) => void;
  /** Mono uppercase labels — the default, and the system's signature. */
  mono?: boolean;
}

/** Grey track, one raised white segment. The only tab pattern in the system. */
export const SegmentedTabs = forwardRef<HTMLDivElement, SegmentedTabsProps>(
  function SegmentedTabs({ items = [], value, onChange, mono = true, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="tablist"
        className={cx('hl-tabs', !mono && 'hl-tabs--sans', className)}
        {...rest}
      >
        {items.map((it) => {
          const item: TabItem = typeof it === 'string' ? { id: it, label: it } : it;
          const on = item.id === value;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => onChange?.(item.id)}
              className={cx('hl-tabs__item', on && 'hl-tabs__item--on')}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    );
  },
);
