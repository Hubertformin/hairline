import React from 'react';

export function Toggle({ on = false, onChange, label, note, style, ...rest }) {
  const sw = (
    <span onClick={onChange} style={{ width:'36px', height:'22px', flex:'none', borderRadius:'var(--r-pill)', position:'relative',
      cursor:'pointer', background: on ? 'var(--ink-1)' : 'var(--line-2)', transition:'background var(--dur-base) var(--ease)' }}>
      <span style={{ position:'absolute', top:'2px', left: on ? '16px' : '2px', width:'18px', height:'18px',
        borderRadius:'50%', background:'var(--paper)', transition:'left var(--dur-base) var(--ease)' }} />
    </span>
  );
  if (!label) return sw;
  return (
    <div style={Object.assign({ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'20px', padding:'var(--pad-row)', borderBottom:'1px solid var(--line-1)' }, style)} {...rest}>
      <div style={{ minWidth:0 }}>
        <div style={{ font:'400 14px var(--font-sans)', color:'var(--ink-1)' }}>{label}</div>
        {note ? <div style={{ marginTop:'3px', font:'var(--type-caption)', color:'var(--ink-3)' }}>{note}</div> : null}
      </div>
      {sw}
    </div>
  );
}
