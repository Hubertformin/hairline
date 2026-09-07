import React from 'react';

const STATES = {
  plain:   { color:'var(--ink-1)' },
  demoted: { color:'var(--ink-3)' },
  struck:  { color:'var(--ink-3)', textDecoration:'line-through' },
  alarm:   { color:'var(--alarm)', fontWeight:500 }
};

export function DataRow({ name, meta, dot, amount, secondary, state = 'plain', badge, style, ...rest }) {
  return (
    <div style={Object.assign({ display:'flex', alignItems:'center', gap:'12px', padding:'var(--pad-row)', borderBottom:'1px solid var(--line-1)' }, style)} {...rest}>
      {dot ? <span style={{ width:'var(--dot-series)', height:'var(--dot-series)', borderRadius:'50%', flex:'none', background:dot }} /> : null}
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ font:'400 14px var(--font-sans)', color:'var(--ink-1)' }}>{name}</div>
        {meta ? <div style={{ marginTop:'3px', font:'var(--type-data-s)', letterSpacing:'0.06em', textTransform:'uppercase', color:'var(--ink-3)' }}>{meta}</div> : null}
      </div>
      {badge}
      <span style={Object.assign({ font:'var(--type-data)', fontVariantNumeric:'var(--numeric-data)' }, STATES[state] || STATES.plain)}>{amount}</span>
      {secondary ? <span style={{ width:'110px', textAlign:'right', font:'var(--type-data)', color:'var(--ink-3)', fontVariantNumeric:'var(--numeric-data)' }}>{secondary}</span> : null}
    </div>
  );
}
