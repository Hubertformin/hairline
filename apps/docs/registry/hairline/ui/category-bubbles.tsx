'use client';

import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';

/**
 * Where the month went, as a field of bubbles around a core.
 *
 * A donut encodes one thing — share of total — and encodes it in an arc length the eye
 * is bad at comparing. Bubbles encode the same share as *area*, put the category's own
 * glyph inside the mark, and leave room to read a figure without a legend lookup.
 *
 * The instrument furniture around them (range rings, a radial tick collar) is what makes
 * it read as a readout rather than a pie: it is drawn faintly and never carries data, so
 * it decorates without lying.
 *
 * Layout is deterministic, not physics: bubbles are placed largest-first by walking
 * outward from the core and taking the first opening, with each ring offset by the golden
 * angle so openings never line up into a visible spoke. Same input, same picture, every
 * render — no settling animation, no layout thrash.
 */

export interface Bubble {
  id: string;
  label: string;
  /** The category's own glyph, drawn inside its bubble. */
  icon?: string;
  amount: number;
  /** A CSS colour — normally one of the accent tokens, because a category is data. */
  color: string;
}

const SIZE = 470;
const CENTER = SIZE / 2;
/** Wide enough to hold the core readout, which is real HTML sitting on top. */
const CORE_R = 100;
const FRAME_R = CENTER - 14;
/** Where the outer tick collar sits — inside the frame, so it never clips. */
const COLLAR_R = FRAME_R - 6;

interface Placed extends Bubble {
  x: number;
  y: number;
  r: number;
  /** Positional, because ids carry category names and those break url(#…). */
  slot: number;
  /** True when the fill is light enough that white text would disappear on it. */
  lightFill: boolean;
}

/** Perceived brightness of a #rrggbb, 0–1. Used only to pick a text colour. */
function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return 0;
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}

/** Thin-space grouping, the convention the system uses for figures. */
function figure(n: number): string {
  return Math.round(Math.abs(n))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function layout(bubbles: Bubble[]): Placed[] {
  if (bubbles.length === 0) return [];
  const total = bubbles.reduce((s, b) => s + b.amount, 0) || 1;

  // Budget the ink: give the bubbles a fixed share of the ring of space between the core
  // and the frame, then split that area by amount. Radius is therefore √share — the whole
  // reason to use bubbles — and the field can never outgrow the frame however many
  // categories land.
  const annulus = Math.PI * (FRAME_R * FRAME_R - CORE_R * CORE_R);
  const byArea = Math.sqrt((annulus * 0.34) / Math.PI);

  // The band between core and frame is only so wide, so also cap the scale by what the
  // largest share can be without spanning it. Scaling the whole set keeps area
  // proportional; clamping single radii would not.
  const maxShare = Math.max(...bubbles.map((b) => b.amount)) / total;
  const band = (FRAME_R - CORE_R) / 2 - 4;
  const k = Math.min(byArea, band / Math.sqrt(maxShare));

  // Largest first: the big marks claim the space nearest the core, and the small ones
  // fill in around them rather than pushing them outward.
  const order = [...bubbles].sort((a, b) => b.amount - a.amount);
  const placed: Placed[] = [];

  order.forEach((b, i) => {
    // The floor is the only place proportionality gives way: below it a bubble is too
    // small to hold its glyph and stops being readable.
    const r = Math.max(15, Math.sqrt(b.amount / total) * k);

    let best = { x: CENTER, y: CENTER - (CORE_R + r + 12) };
    outer: for (let ring = CORE_R + r + 11; ring <= FRAME_R - r; ring += 3) {
      const base = i * 2.39996; // the golden angle, in radians
      const steps = Math.max(18, Math.round((2 * Math.PI * ring) / 9));
      for (let s = 0; s < steps; s++) {
        const a = base + (s / steps) * Math.PI * 2;
        const x = CENTER + Math.cos(a) * ring;
        const y = CENTER + Math.sin(a) * ring;
        if (placed.every((o) => Math.hypot(o.x - x, o.y - y) >= o.r + r + 9)) {
          best = { x, y };
          break outer;
        }
      }
    }

    placed.push({
      ...b,
      slot: bubbles.indexOf(b),
      r,
      x: best.x,
      y: best.y,
      lightFill: luminance(b.color) > 0.62,
    });
  });

  return placed;
}

export interface CategoryBubblesProps {
  bubbles: Bubble[];
  total: number;
  coreLabel: string;
  /** One line of plain consequence under the figure — e.g. "17 of 26 days covered". */
  coreCaption?: string;
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  /** Renders the dashed empty ring instead of a field. */
  empty?: boolean;
  /** When set, the core becomes pressable — for opening a detail view over the field. */
  onExpand?: () => void;
  expandLabel?: string;
  className?: string;
}

export function CategoryBubbles({
  bubbles,
  total,
  coreLabel,
  coreCaption,
  selectedId = null,
  onSelect,
  empty,
  onExpand,
  expandLabel = 'Open the lens',
  className,
}: CategoryBubblesProps) {
  const uid = React.useId().replace(/:/g, '');
  const placed = React.useMemo(() => layout(bubbles), [bubbles]);

  return (
    // The field scales with its column instead of holding 470px open. Every coordinate
    // stays in the 470-unit viewBox, so the layout maths, collar and tick ring are
    // untouched — only the rendered size changes. On a phone the disc fills the width.
    <div
      className={cn('relative aspect-square w-full', className)}
      style={{ maxWidth: SIZE }}
      data-slot="category-bubbles"
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="block h-full w-full">
        <defs>
          {placed.map((b) => (
            <radialGradient key={b.id} id={`${uid}-g-${b.slot}`} cx="34%" cy="30%" r="78%">
              <stop offset="0%" stopColor={b.color} stopOpacity="0.95" />
              <stop offset="100%" stopColor={b.color} stopOpacity="0.55" />
            </radialGradient>
          ))}
        </defs>

        {/* Instrument furniture: never encodes data. */}
        <g opacity="0.85">
          {[CORE_R + 30, (CORE_R + COLLAR_R) / 2, COLLAR_R - 14].map((r) => (
            <circle
              key={r}
              cx={CENTER}
              cy={CENTER}
              r={r}
              fill="none"
              stroke="var(--line-2)"
              strokeWidth="1"
              strokeDasharray="1.5 6"
            />
          ))}
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i / 36) * Math.PI * 2;
            const r2 = COLLAR_R + (i % 3 === 0 ? 8 : 4);
            return (
              <line
                key={i}
                x1={CENTER + Math.cos(a) * COLLAR_R}
                y1={CENTER + Math.sin(a) * COLLAR_R}
                x2={CENTER + Math.cos(a) * r2}
                y2={CENTER + Math.sin(a) * r2}
                stroke="var(--line-2)"
                strokeWidth="1"
              />
            );
          })}
        </g>

        <circle
          cx={CENTER}
          cy={CENTER}
          r={CORE_R - 6}
          fill="var(--paper)"
          stroke="var(--line-2)"
          strokeWidth="1"
        />

        {placed.map((b) => {
          const dim = selectedId !== null && selectedId !== b.id;
          const on = selectedId === b.id;
          return (
            <g
              key={b.id}
              onClick={onSelect ? () => onSelect(b.id) : undefined}
              className={cn('transition-opacity duration-slow ease-hairline', onSelect && 'cursor-pointer')}
              opacity={dim ? 0.22 : 1}
            >
              {on ? <circle cx={b.x} cy={b.y} r={b.r + 7} fill={b.color} opacity="0.16" /> : null}
              <circle
                cx={b.x}
                cy={b.y}
                r={b.r}
                fill={`url(#${uid}-g-${b.slot})`}
                stroke={b.color}
                strokeWidth={on ? 2 : 1}
                strokeOpacity={on ? 0.9 : 0.45}
              />
              {b.icon ? (
                <text
                  x={b.x}
                  y={b.r >= 30 ? b.y - 1 : b.y + b.r * 0.28}
                  textAnchor="middle"
                  fontSize={Math.min(24, Math.max(12, b.r * 0.6))}
                >
                  {b.icon}
                </text>
              ) : null}
              {b.r >= 30 ? (
                <text
                  x={b.x}
                  y={b.y + b.r * 0.52}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="9.5"
                  fontWeight="500"
                  // White vanishes on the yellow end of the spectrum, so the text colour
                  // is picked from the fill's brightness rather than fixed.
                  fill={b.lightFill ? 'var(--ink-1)' : '#FFFFFF'}
                  opacity={b.lightFill ? 0.78 : 0.94}
                >
                  {figure(b.amount)}
                </text>
              ) : null}
            </g>
          );
        })}

        {empty ? (
          <circle
            cx={CENTER}
            cy={CENTER}
            r={(CORE_R + COLLAR_R) / 2}
            fill="none"
            stroke="var(--line-2)"
            strokeWidth="18"
            strokeDasharray="2 14"
            strokeLinecap="round"
          />
        ) : null}
      </svg>

      {/* The core sits in HTML so the figure uses real type rather than SVG text. */}
      <div
        className={cn(
          'absolute left-1/2 top-1/2 w-[144px] -translate-x-1/2 -translate-y-1/2 text-center md:w-[190px]',
          onExpand ? 'group/core cursor-pointer' : 'pointer-events-none',
        )}
        onClick={onExpand}
        role={onExpand ? 'button' : undefined}
        tabIndex={onExpand ? 0 : undefined}
        onKeyDown={
          onExpand
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onExpand();
                }
              }
            : undefined
        }
        aria-label={onExpand ? expandLabel : undefined}
      >
        <div className="type-label text-faint truncate">{coreLabel}</div>
        <div className="type-figure-s tracking-figure text-strong tabular mt-s2 md:type-figure-m md:mt-s3">
          {figure(total)}
        </div>
        {coreCaption ? (
          <div className="mt-s3 inline-flex max-w-full items-center gap-s2 rounded-pill bg-surface-2 px-s4 py-s1 transition-[background-color] duration-fast ease-hairline group-hover/core:bg-surface-3">
            <span className="size-1.5 flex-none rounded-full bg-a-blue" />
            <span className="type-label-s text-body md:truncate">{coreCaption}</span>
          </div>
        ) : null}
        {onExpand ? (
          <div className="mt-s3 type-label-s text-faint opacity-0 transition-opacity duration-fast ease-hairline group-hover/core:opacity-100">
            {expandLabel}
          </div>
        ) : null}
      </div>
    </div>
  );
}
