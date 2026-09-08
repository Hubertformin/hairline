/**
 * Hairline motion.
 *
 * 140–260ms; opacity, colour and background only. Selection dims siblings rather
 * than moving them. One exception: an amount moved between months arcs to its
 * destination over `travel`.
 */

/** The CSS timing function. */
export const ease = 'cubic-bezier(.4,0,.2,1)';

/**
 * The same curve as control points, for React Native's `Easing.bezier`.
 * Keep the two in step — they are one curve written twice.
 */
export const easeBezier = [0.4, 0, 0.2, 1] as const;

/** Milliseconds. */
export const duration = {
  fast: 140,
  base: 180,
  slow: 260,
  /** An amount arcing from one place to another. */
  travel: 620,
} as const;

export type DurationName = keyof typeof duration;
