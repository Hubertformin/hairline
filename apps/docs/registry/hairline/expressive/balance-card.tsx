'use client';

import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';

/**
 * ── The expressive tier ──────────────────────────────────────────────────────
 *
 * Hairline's core forbids gradient, gloss and lift, because a dense screen full of
 * figures has to stay calm and those effects compete with the data. This component
 * lives outside that rule on purpose.
 *
 * The tier exists for the surfaces where a product does need to sell: a card the user
 * is proud to own, an onboarding hero, a marketing page. Two conditions keep it from
 * leaking back into the core:
 *
 *   1. it is never used behind dense data — a balance card, not a ledger row;
 *   2. it still reads its colours from the token layer, so a theme swap moves it too.
 *
 * Everything here degrades: with `prefers-reduced-motion` the sheen simply stops
 * following the pointer and sits still.
 */

export interface BalanceCardProps extends React.ComponentProps<'div'> {
  label?: string;
  /** The figure. Already formatted — the card does not do currency logic. */
  balance: string;
  currency?: string;
  /** Last four digits. The rest is masked, because the rest is not yours to show. */
  last4?: string;
  holder?: string;
  expiry?: string;
  /** A network or bank mark, rendered top-right. */
  brand?: React.ReactNode;
  /** Two stops for the card's ground. Defaults to the system's ink. */
  from?: string;
  to?: string;
  /** Turns off the pointer-tracking sheen. */
  still?: boolean;
}

export function BalanceCard({
  className,
  label = 'Available balance',
  balance,
  currency,
  last4,
  holder,
  expiry,
  brand,
  from = 'var(--ink-1)',
  to = 'var(--ink-2)',
  still = false,
  ...props
}: BalanceCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [sheen, setSheen] = React.useState({ x: 32, y: 22 });
  const [reduced, setReduced] = React.useState(true);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    if (still || reduced) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setSheen({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div
      ref={ref}
      data-slot="balance-card"
      onPointerMove={track}
      onPointerLeave={() => setSheen({ x: 32, y: 22 })}
      className={cn(
        'relative isolate overflow-hidden select-none',
        'aspect-[1.586/1] w-full max-w-[420px] rounded-board',
        'p-s11 flex flex-col justify-between',
        'shadow-float',
        className,
      )}
      style={{ background: `linear-gradient(140deg, ${from} 0%, ${to} 100%)` }}
      {...props}
    >
      {/* The sheen. Pointer-driven, and the transition is on opacity and position
          only — never transform, so the card itself never moves under the cursor. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-[background] duration-slow ease-hairline"
        style={{
          background: `radial-gradient(60% 55% at ${sheen.x}% ${sheen.y}%, rgb(255 255 255 / 0.16), transparent 70%)`,
        }}
      />
      {/* A single hairline of light along the top edge — the one nod to the name. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-s11 top-0 h-px -z-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgb(255 255 255 / 0.35), transparent)' }}
      />

      <div className="flex items-start justify-between gap-s9">
        <span className="type-label text-white/55">{label}</span>
        {brand ? <span className="text-white/80">{brand}</span> : null}
      </div>

      <div>
        <div className="flex items-baseline gap-s4">
          <span className="type-figure-l tracking-figure tabular text-white">{balance}</span>
          {currency ? <span className="type-data-s tracking-unit uppercase text-white/50">{currency}</span> : null}
        </div>

        <div className="mt-s9 flex items-end justify-between gap-s9">
          {last4 ? (
            <span className="type-data text-white/70 tabular">
              {'•••• '.repeat(3)}
              {last4}
            </span>
          ) : (
            <span />
          )}
          <div className="text-right">
            {holder ? <div className="type-label-s text-white/45">{holder}</div> : null}
            {expiry ? <div className="type-data-s text-white/60 tabular">{expiry}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
