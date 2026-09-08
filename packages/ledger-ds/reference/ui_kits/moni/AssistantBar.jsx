
function AssistantBar({ prompt = 'Ask Kima, or type an entry', chips = [] }) {
  return (
    <div style={{ position:'absolute', left:0, right:0, bottom:26, display:'flex', flexDirection:'column', alignItems:'center', gap:10 }}>
      {chips.length ? (
        <div style={{ display:'flex', gap:6 }}>
          {chips.map(c => (
            <span key={c} style={{ height:28, padding:'0 12px', display:'inline-flex', alignItems:'center', borderRadius:'var(--r-pill)',
              background:'rgba(255,255,255,.9)', boxShadow:'var(--shadow-raised)', font:'400 11.5px var(--font-sans)', color:'var(--ink-2)', cursor:'pointer' }}>{c}</span>
          ))}
        </div>
      ) : null}
      <div style={{ display:'flex', alignItems:'center', gap:12, height:52, padding:'0 8px 0 20px', borderRadius:'var(--r-pill)',
        background:'var(--ink-1)', boxShadow:'var(--shadow-float)' }}>
        <span style={{ font:'500 14px var(--font-mono)', color:'var(--a-green)' }}>K</span>
        <span style={{ width:1, height:20, background:'rgba(255,255,255,.16)' }} />
        <span style={{ font:'400 14px var(--font-sans)', color:'#9A9DA6', minWidth:290 }}>{prompt}</span>
        <span style={{ height:26, padding:'0 9px', display:'inline-flex', alignItems:'center', borderRadius:'var(--r-pill)',
          background:'rgba(255,255,255,.1)', font:'500 9.5px var(--font-mono)', letterSpacing:'0.08em', color:'#C8CBD2' }}>⌘K</span>
        <span style={{ width:36, height:36, borderRadius:'50%', background:'var(--paper)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12.5 6.5L19 12l-6.5 5.5" /></svg>
        </span>
      </div>
    </div>
  );
}

window.AssistantBar = AssistantBar;
