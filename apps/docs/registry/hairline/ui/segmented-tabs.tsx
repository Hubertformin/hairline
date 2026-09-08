'use client';

/* This component wires its own onClick, so it cannot render as a Server Component —
   React Server Components may not attach event handlers to DOM elements. Components
   that only pass handlers through (Button, Chip, IconButton) stay server-capable. */
import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SegmentedTabsProps extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  /** A bare string is shorthand for `{ id: s, label: s }`. */
  items?: (TabItem | string)[];
  value?: string;
  onChange?: (id: string) => void;
  /** Mono uppercase labels — the default, and the system's signature. */
  mono?: boolean;
}

/** Grey track, one raised white segment. The only tab pattern in the system. */
export function SegmentedTabs({ className, items = [], value, onChange, mono = true, ...props }: SegmentedTabsProps) {
  return (
    <div
      data-slot="segmented-tabs"
      role="tablist"
      className={cn('inline-flex gap-s1 p-s1 rounded-pill bg-card', className)}
      {...props}
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
            className={cn(
              'h-[34px] px-s7 flex items-center gap-s3 rounded-pill border-0 cursor-pointer',
              'transition-[color,background-color] duration-fast ease-hairline focus-visible:focus-ring-inset',
              mono ? 'type-label' : 'type-tab normal-case tracking-normal',
              on ? 'bg-paper text-strong shadow-raised' : 'bg-transparent text-muted hover:text-strong',
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
