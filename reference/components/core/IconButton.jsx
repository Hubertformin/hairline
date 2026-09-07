import React from 'react';

export function IconButton({ children, tone = 'quiet', size = 34, label, style, ...rest }) {
  const tones = {
    quiet: { background:'var(--surface-3)', color:'var(--ink-2)' },
    solid: { background:'var(--action-solid)', color:'var(--action-solid-text)' },
    bare:  { background:'transparent', color:'var(--ink-3)' }
  };
  const s = Object.assign({
    width:size + 'px', height:size + 'px', flex:'none', border:0, cursor:'pointer',
    borderRadius:'var(--r-pill)', display:'inline-flex', alignItems:'center', justifyContent:'center',
    transition:'background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)'
  }, tones[tone] || tones.quiet, style);
  return <button type="button" aria-label={label} style={s} {...rest}>{children}</button>;
}
