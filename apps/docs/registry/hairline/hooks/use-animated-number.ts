'use client';

import * as React from 'react';

/**
 * Animates a number toward a target.
 *
 * Hairline's one permitted flourish is data motion — a figure counting to its value —
 * rather than glow or movement. Kept dependency-free on rAF: a spring library is
 * 40 kB and its whole idiom (spring, layout, transform) is banned by the spec anyway.
 *
 * `prefers-reduced-motion` is honoured *inside* the hook rather than at the call site,
 * so no component can forget it, and the server always renders the final value —
 * otherwise the first paint would show a number mid-count.
 */
export function useAnimatedNumber(target: number, durationMs = 900): number {
  const reduced = React.useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => true, // On the server, assume reduced: never render a half-counted figure.
  );

  const [value, setValue] = React.useState(reduced ? target : 0);
  const from = React.useRef(0);

  React.useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const origin = from.current;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // Ease-out cubic: fast to begin, settling rather than braking.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(origin + (target - origin) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
      else from.current = target;
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs, reduced]);

  return value;
}
