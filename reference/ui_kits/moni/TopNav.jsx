
const D = {
  overview:'M4.2 12.4l7.8-7.6 7.8 7.6M6.6 10.8v8.4h10.8v-8.4',
  planner:'M4.4 8.6A3.2 3.2 0 017.6 5.4h8.8a3.2 3.2 0 013.2 3.2v6.8a3.2 3.2 0 01-3.2 3.2H7.6a3.2 3.2 0 01-3.2-3.2zM4.4 10.8h15.2M9.8 10.8v7.8',
  spending:'M4.6 8h14.8M4.6 13h9.8M4.6 18h5.8',
  accounts:'M4 9.6A3.2 3.2 0 017.2 6.4h9.6A3.2 3.2 0 0120 9.6v4.8a3.2 3.2 0 01-3.2 3.2H7.2A3.2 3.2 0 014 14.4zM16 12h.4',
  vault:'M7.9 10.7V8.8a4.1 4.1 0 018.2 0v1.9M8 10.7h8a2.4 2.4 0 012.4 2.4v3.4a2.4 2.4 0 01-2.4 2.4H8a2.4 2.4 0 01-2.4-2.4v-3.4A2.4 2.4 0 018 10.7z'
};
const ITEMS = [['overview','OVERVIEW'],['planner','PLANNER'],['spending','SPENDING'],['accounts','ACCOUNTS'],['vault','VAULTS']];

function Glyph({ d, size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>;
}

function TopNav({ active = 'overview', onSelect }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
      <div style={{ width:38, height:38, borderRadius:'50%', background:'var(--ink-1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <span style={{ width:13, height:13, borderRadius:'50%', border:'3.5px solid var(--paper)' }} />
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:3 }}>
        {ITEMS.map(([id, label]) => {
          const on = id === active;
          return (
            <div key={id} onClick={() => onSelect && onSelect(id)}
              style={{ display:'flex', alignItems:'center', gap:7, height:32, padding:'0 13px', borderRadius:'var(--r-pill)', cursor:'pointer',
                background: on ? 'var(--surface-3)' : 'transparent', color: on ? 'var(--ink-1)' : 'var(--ink-3)',
                transition:'background var(--dur-fast) var(--ease), color var(--dur-fast) var(--ease)' }}>
              <Glyph d={D[id]} />
              <span style={{ font:'var(--type-label)', letterSpacing:'var(--track-label)' }}>{label}</span>
            </div>
          );
        })}
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:34, height:34, borderRadius:'50%', background:'var(--surface-3)', color:'var(--ink-2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <Glyph size={15} d="M11 4.6a6.4 6.4 0 100 12.8 6.4 6.4 0 000-12.8M19.6 19.6l-4.1-4.1" />
        </div>
        <div style={{ width:34, height:34, borderRadius:'50%', background:'var(--surface-3)', color:'var(--ink-2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <Glyph size={16} d="M12 9.2a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6M12 3.6l1 2.1 2.3-.5 1.2 2-1.4 1.9 1.4 1.9-1.2 2-2.3-.5-1 2.1h-.1l-1-2.1-2.3.5-1.2-2 1.4-1.9L7.4 9.2l1.2-2 2.3.5 1-2.1z" />
        </div>
        <div style={{ width:38, height:38, borderRadius:'50%', background:'var(--line-2)', display:'flex', alignItems:'center', justifyContent:'center', font:'500 12px var(--font-sans)', color:'var(--ink-2)' }}>AN</div>
      </div>
    </div>
  );
}

window.TopNav = TopNav;
