import React from 'react';

const TONES = {
  neutral:  { background:'var(--surface-3)', color:'var(--ink-3)' },
  alarm:    { background:'var(--alarm-wash)', color:'var(--alarm)' },
  positive: { background:'var(--positive-wash)', color:'var(--positive)' },
  info:     { background:'var(--info-wash)', color:'var(--info)' },
  caution:  { background:'var(--caution-wash)', color:'var(--caution)' }
};

export function Badge({ children, tone = 'neutral', style, ...rest }) {
  const s = Object.assign({
    height:'20px', padding:'0 9px', display:'inline-flex', alignItems:'center',
    borderRadius:'var(--r-pill)', font:'var(--type-label-s)', letterSpacing:'var(--track-label)',
    textTransform:'uppercase', whiteSpace:'nowrap'
  }, TONES[tone] || TONES.neutral, style);
  return <span style={s} {...rest}>{children}</span>;
}
