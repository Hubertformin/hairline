import React from 'react';

export function Field({ label, hint, value, prefix, size = 'm', trailing, style, ...rest }) {
  const H = { m:'var(--h-field)', lg:'var(--h-field-lg)' }[size] || 'var(--h-field)';
  const valueFont = size === 'lg'
    ? '500 26px var(--font-sans)'
    : '400 14px var(--font-sans)';
  return (
    <div style={Object.assign({}, style)} {...rest}>
      {label ? <div style={{ font:'var(--type-label-s)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--ink-4)' }}>{label}</div> : null}
      <div style={{ marginTop:'10px', height:H, padding:'0 16px', display:'flex', alignItems:'center', gap:'12px',
                    borderRadius:'var(--r-field)', background:'var(--surface-field)' }}>
        {prefix ? <span style={{ font:'500 10px var(--font-mono)', letterSpacing:'0.1em', color:'var(--ink-3)' }}>{prefix}</span> : null}
        <span style={{ flex:1, minWidth:0, font:valueFont, letterSpacing: size === 'lg' ? '-0.02em' : 'normal',
                       color:'var(--ink-1)', fontVariantNumeric:'var(--numeric-data)' }}>{value}</span>
        {trailing}
      </div>
      {hint ? <div style={{ marginTop:'8px', font:'var(--type-caption)', color:'var(--ink-3)' }}>{hint}</div> : null}
    </div>
  );
}
