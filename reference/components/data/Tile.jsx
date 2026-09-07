import React from 'react';

const TONES = {
  quiet:    { background:'var(--surface-2)', color:'var(--ink-1)' },
  paper:    { background:'var(--paper)', color:'var(--ink-1)', boxShadow:'var(--shadow-raised)' },
  dark:     { background:'var(--ink-1)', color:'var(--paper)' },
  alarm:    { background:'var(--alarm-wash)', color:'var(--ink-1)' },
  info:     { background:'var(--info-wash)', color:'var(--ink-1)' },
  caution:  { background:'var(--caution-wash)', color:'var(--ink-1)' }
};

export function Tile({ children, tone = 'quiet', label, action, style, ...rest }) {
  return (
    <div style={Object.assign({ padding:'var(--pad-card)', borderRadius:'var(--r-card)' }, TONES[tone] || TONES.quiet, style)} {...rest}>
      {(label || action) ? (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'12px', marginBottom:'14px' }}>
          {label ? <span style={{ font:'var(--type-label)', letterSpacing:'var(--track-label)', textTransform:'uppercase',
            color: tone === 'dark' ? 'rgba(255,255,255,.66)' : 'var(--ink-4)' }}>{label}</span> : <span />}
          {action}
        </div>
      ) : null}
      {children}
    </div>
  );
}
