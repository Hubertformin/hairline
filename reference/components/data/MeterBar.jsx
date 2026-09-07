import React from 'react';

export function MeterBar({ segments, value = 0, limit = 100, over = false, height, style, ...rest }) {
  const h = height || 'var(--stroke-meter)';
  if (segments && segments.length) {
    const total = segments.reduce((s, x) => s + x.amount, 0) || 1;
    return (
      <div style={Object.assign({ display:'flex', gap:'2px', height:h }, style)} {...rest}>
        {segments.map((s, i) => (
          <span key={i} title={s.label} style={{ flex:String(s.amount / total), background:s.color, borderRadius:'var(--r-pill)' }} />
        ))}
      </div>
    );
  }
  const pct = Math.min(100, Math.round(value / (limit || 1) * 100));
  return (
    <div style={Object.assign({ height:h, borderRadius:'var(--r-pill)', background:'var(--line-2)', overflow:'hidden' }, style)} {...rest}>
      <span style={{ display:'block', height:'100%', width:(over ? 100 : pct) + '%', borderRadius:'var(--r-pill)',
        background: over ? 'var(--alarm)' : 'var(--ink-1)' }} />
    </div>
  );
}
