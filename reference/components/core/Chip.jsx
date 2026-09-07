import React from 'react';

export function Chip({ children, selected = false, interactive = true, style, ...rest }) {
  const s = Object.assign({
    height:'var(--h-pill)', padding:'0 14px', display:'inline-flex', alignItems:'center',
    borderRadius:'var(--r-pill)', font:'400 12.5px var(--font-sans)',
    border:'1px solid ' + (selected ? 'var(--ink-1)' : 'var(--line-2)'),
    color: selected ? 'var(--ink-1)' : 'var(--ink-2)',
    background:'transparent', cursor: interactive ? 'pointer' : 'default',
    transition:'border-color var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)'
  }, style);
  return <span style={s} {...rest}>{children}</span>;
}
