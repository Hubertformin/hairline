import React from 'react';

export function SegmentedTabs({ items = [], value, onChange, mono = true, style, ...rest }) {
  return (
    <div style={Object.assign({ display:'inline-flex', gap:'4px', padding:'4px', borderRadius:'var(--r-pill)', background:'var(--surface-2)' }, style)} {...rest}>
      {items.map(it => {
        const id = typeof it === 'string' ? it : it.id;
        const label = typeof it === 'string' ? it : it.label;
        const on = id === value;
        return (
          <div key={id} onClick={() => onChange && onChange(id)}
            style={{ height:'34px', padding:'0 16px', display:'flex', alignItems:'center', gap:'8px', cursor:'pointer',
              borderRadius:'var(--r-pill)',
              font: mono ? 'var(--type-label)' : '500 12.5px var(--font-sans)',
              letterSpacing: mono ? 'var(--track-label)' : 'normal',
              textTransform: mono ? 'uppercase' : 'none',
              color: on ? 'var(--ink-1)' : 'var(--ink-3)',
              background: on ? 'var(--paper)' : 'transparent',
              boxShadow: on ? 'var(--shadow-raised)' : 'none',
              transition:'background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)' }}>
            {typeof it === 'object' && it.icon ? it.icon : null}
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
