import React from 'react';

const BASE = {
  display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'8px',
  border:0, cursor:'pointer', whiteSpace:'nowrap',
  borderRadius:'var(--r-pill)', font:'500 13px var(--font-sans)',
  transition:'background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)'
};

const SIZES = {
  s: { height:'32px', padding:'0 14px', font:'500 12px var(--font-sans)' },
  m: { height:'var(--h-control)', padding:'0 18px' },
  l: { height:'48px', padding:'0 22px', font:'500 14px var(--font-sans)' }
};

const TONES = {
  solid:   { background:'var(--action-solid)', color:'var(--action-solid-text)' },
  quiet:   { background:'var(--surface-3)', color:'var(--ink-1)' },
  ghost:   { background:'transparent', color:'var(--ink-2)' },
  danger:  { background:'var(--alarm-wash)', color:'var(--alarm)' }
};

export function Button({ children, tone = 'solid', size = 'm', disabled = false, iconRight = null, style, ...rest }) {
  const s = Object.assign({}, BASE, SIZES[size] || SIZES.m, TONES[tone] || TONES.solid,
    disabled ? { opacity:.45, cursor:'default' } : null, style);
  return (
    <button type="button" disabled={disabled} style={s} {...rest}>
      {children}
      {iconRight}
    </button>
  );
}
