import React from 'react';

const caret = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 10l5.5 5 5.5-5" /></svg>
);

export function Select({ label, value, dot, meta, style, ...rest }) {
  return (
    <div style={Object.assign({}, style)} {...rest}>
      {label ? <div style={{ font:'var(--type-label-s)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--ink-4)' }}>{label}</div> : null}
      <div style={{ marginTop:'10px', height:'var(--h-field)', padding:'0 16px', display:'flex', alignItems:'center',
                    justifyContent:'space-between', borderRadius:'var(--r-field)', background:'var(--surface-field)', cursor:'pointer' }}>
        <span style={{ display:'flex', alignItems:'baseline', gap:'10px', minWidth:0 }}>
          {dot ? <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:dot, alignSelf:'center', flex:'none' }} /> : null}
          <span style={{ font:'400 13.5px var(--font-sans)', color:'var(--ink-1)' }}>{value}</span>
          {meta ? <span style={{ font:'var(--type-data-s)', color:'var(--ink-3)' }}>{meta}</span> : null}
        </span>
        <span style={{ color:'var(--ink-3)', display:'flex' }}>{caret}</span>
      </div>
    </div>
  );
}
