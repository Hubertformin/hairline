import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';

const caret = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M6.5 10l5.5 5 5.5-5" />
  </svg>
);

export interface SelectDisplayProps extends Omit<React.ComponentProps<'button'>, 'value'> {
  label?: React.ReactNode;
  value?: React.ReactNode;
  /** A category dot. Its colour is data, so it is passed in as a CSS colour. */
  dot?: string;
  /** Mono detail after the value — an account number, a count. */
  meta?: React.ReactNode;
}

/**
 * A closed dropdown — the trigger only.
 *
 * It renders the closed state and calls `onClick`; it does not open a menu, manage a
 * listbox or handle keyboard selection. That is deliberate: a closed-looking select is
 * a legitimate *display* pattern in the original screens. When you need a real menu,
 * install `@hairline/select`; for more than about ten options with typeahead, install
 * `@hairline/combobox`.
 */
export function SelectDisplay({ className, label, value, dot, meta, type = 'button', ...props }: SelectDisplayProps) {
  return (
    <div data-slot="select-display" className={className}>
      {label ? <div className="type-label-s text-faint">{label}</div> : null}
      <button
        type={type}
        className={
          'mt-s4 h-field px-s7 w-full flex items-center justify-between gap-s5 text-left ' +
          'rounded-field bg-field border-0 cursor-pointer ' +
          'transition-[color,background-color] duration-fast ease-hairline ' +
          'hover:bg-quiet focus-visible:focus-ring-inset'
        }
        {...props}
      >
        {/* Baseline, not centre: the value is 13.5px and the meta 11px, so centring
            them floats the meta off the value's baseline. */}
        <span className="flex items-baseline gap-s4 min-w-0">
          {dot ? <span className="size-dot rounded-full shrink-0 self-center" style={{ background: dot }} /> : null}
          <span className="type-value text-strong truncate">{value}</span>
          {meta ? <span className="type-data-s text-muted shrink-0">{meta}</span> : null}
        </span>
        <span className="text-muted flex shrink-0">{caret}</span>
      </button>
    </div>
  );
}
