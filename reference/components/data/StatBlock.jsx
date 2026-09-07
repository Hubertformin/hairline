import React from 'react';

const SIZE = {
  xl:{ font:'var(--type-figure-xl)' }, l:{ font:'var(--type-figure-l)' },
  m:{ font:'var(--type-figure-m)' },  s:{ font:'var(--type-figure-s)' }
};

export function StatBlock({ label, value, unit, note, size = 'm', tone = 'ink', style, ...rest }) {
  const colors = { ink:'var(--ink-1)', alarm:'var(--alarm)', positive:'var(--positive)', info:'var(--info)' };
  return (
    <div style={Object.assign({}, style)} {...rest}>
      {label ? <div style={{ font:'var(--type-label)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--ink-4)' }}>{label}</div> : null}
      <div style={{ marginTop:'12px', display:'flex', alignItems:'baseline', gap:'12px' }}>
        <span style={Object.assign({ letterSpacing:'var(--track-figure)', color:colors[tone] || colors.ink, fontVariantNumeric:'var(--numeric-data)' }, SIZE[size] || SIZE.m)}>{value}</span>
        {unit ? <span style={{ font:'var(--type-data-s)', letterSpacing:'0.08em', color:'var(--ink-3)', textTransform:'uppercase' }}>{unit}</span> : null}
      </div>
      {note ? <div style={{ marginTop:'10px', font:'var(--type-body-s)', color:'var(--ink-3)' }}>{note}</div> : null}
    </div>
  );
}
