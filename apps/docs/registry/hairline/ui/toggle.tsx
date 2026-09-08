import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';

export interface ToggleProps extends Omit<React.ComponentProps<'div'>, 'onChange'> {
  on?: boolean;
  onChange?: () => void;
  /** With a label the whole settings row renders; without one, just the switch. */
  label?: React.ReactNode;
  /** The consequence of turning it on — say the uncomfortable part. */
  note?: React.ReactNode;
  /** The accessible name when there is no visible label. */
  switchLabel?: string;
}

/** A switch, or a whole settings row with its consequence. */
export function Toggle({ className, on = false, onChange, label, note, switchLabel, ...props }: ToggleProps) {
  const sw = (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label ? undefined : switchLabel}
      onClick={onChange}
      data-slot="toggle-switch"
      className={cn(
        'relative w-9 h-[22px] shrink-0 border-0 p-0 rounded-pill cursor-pointer',
        'transition-[background-color] duration-base ease-hairline focus-visible:focus-ring-inset',
        on ? 'bg-ink-1' : 'bg-rule',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 size-[18px] rounded-full bg-paper transition-[left] duration-base ease-hairline',
          on ? 'left-4' : 'left-0.5',
        )}
      />
    </button>
  );

  if (!label) return sw;

  return (
    <div
      data-slot="toggle-row"
      className={cn('flex items-center justify-between gap-s9 py-row-y border-b border-hairline', className)}
      {...props}
    >
      <div className="min-w-0">
        <div className="type-item text-strong">{label}</div>
        {note ? <div className="mt-[3px] type-caption text-muted">{note}</div> : null}
      </div>
      {sw}
    </div>
  );
}
