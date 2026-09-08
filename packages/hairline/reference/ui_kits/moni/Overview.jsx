
const NB = '\u202F';
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NB);

const CATS = [
  { id:'fees', label:'School fees', amt:360000, c:'var(--a-blue)',    note:'Two unpaid terms, now three days late. This one row takes 41 % of the ring on its own.' },
  { id:'rent', label:'Rent',        amt:250000, c:'var(--a-violet)',  note:'Paid on 4 March. Unchanged for eleven months.' },
  { id:'market', label:'Food & market', amt:86400, c:'var(--a-magenta)', note:'Tracking 34 000 under its limit with 26 days left.' },
  { id:'mum', label:'Support mum',  amt:50000,  c:'var(--a-rose)',    note:'Due on the 10th. Moving it to June clears the May shortfall.' },
  { id:'transport', label:'Transport', amt:41200, c:'var(--a-coral)', note:'Steady month to month. Nothing to act on.' },
  { id:'internet', label:'Internet', amt:35000, c:'var(--a-amber)',   note:'Fibre, paid 4 March. Fixed at 35 000.' },
  { id:'data', label:'Data & airtime', amt:27800, c:'var(--a-yellow)', note:'2 800 over its limit already.' },
  { id:'household', label:'Household', amt:18000, c:'var(--a-lemon)', note:'Well inside its 40 000 limit.' },
  { id:'eatingout', label:'Eating out', amt:12500, c:'var(--a-purple)', note:'Down for the third month running.' }
];

function Overview({ Tile, StatBlock, DataRow, MeterBar, Chip }) {
  const TopNav = window.TopNav, AssistantBar = window.AssistantBar;
  const [sel, setSel] = React.useState(null);
  const total = CATS.reduce((s, c) => s + c.amt, 0);
  const chosen = CATS.find(c => c.id === sel);
  const CIRC = 2 * Math.PI * 158;

  let cursor = 0;
  const arcs = CATS.map(c => {
    const span = CIRC * (c.amt / total);
    const len = Math.max(span - 5, 3);
    const a = { c, len, off: -cursor };
    cursor += span;
    return a;
  });
  const RUN = 2 * Math.PI * 119, frac = 17 / 26;

  const label = { font:'var(--type-label)', letterSpacing:'var(--track-label)', textTransform:'uppercase', color:'var(--ink-4)' };

  return (
    <div style={{ width:1280, height:880, boxSizing:'border-box', background:'var(--paper)', borderRadius:'var(--r-board)',
      overflow:'hidden', padding:'26px 30px 30px', display:'flex', flexDirection:'column', gap:22, position:'relative',
      fontFamily:'var(--font-sans)' }}>
      <TopNav active="overview" />

      <div style={{ flex:1, minHeight:0, display:'flex', gap:'var(--gap-column)' }}>
        <div style={{ width:280, flex:'none' }}>
          <StatBlock size="xl" label="Total expenses" value={fmt(total)} />
          <div style={{ marginTop:8, font:'var(--type-data-s)', color:'var(--ink-4)' }}>XAF · MARCH 2026</div>

          <div style={{ marginTop:36, display:'flex', alignItems:'center', gap:9 }}>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--a-rose)' }} />
            <span style={{ ...label, color:'var(--ink-1)' }}>{chosen ? chosen.label : 'Insights'}</span>
          </div>

          {chosen ? (
            <>
              <div style={{ marginTop:16, display:'flex', alignItems:'baseline', gap:10 }}>
                <span style={{ font:'var(--type-figure-s)', letterSpacing:'var(--track-figure)', color:'var(--ink-1)', fontVariantNumeric:'var(--numeric-data)' }}>{fmt(chosen.amt)}</span>
                <span style={{ font:'var(--type-data-s)', color:'var(--ink-4)' }}>{Math.round(chosen.amt / total * 100)} % OF MARCH</span>
              </div>
              <div style={{ marginTop:14, font:'var(--type-body)', color:'var(--ink-2)' }}>{chosen.note}</div>
              <div style={{ marginTop:20 }}><Chip onClick={() => setSel(null)}>Back to insights</Chip></div>
            </>
          ) : (
            <>
              <div style={{ marginTop:16, font:'var(--type-lead)', color:'var(--ink-1)', letterSpacing:'-0.01em' }}>
                Two school-fee terms went unpaid and rolled into March. They now take 41 % of the ring on their own.
              </div>
              <div style={{ marginTop:14, font:'var(--type-body-s)', color:'var(--ink-2)' }}>
                Clearing both today leaves nothing until your salary lands on the 28th. Moving one term to April keeps March positive.
              </div>
            </>
          )}
        </div>

        <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', alignItems:'center', gap:26 }}>
          <div style={{ position:'relative', width:376, height:376, flex:'none' }}>
            <svg width="376" height="376" viewBox="0 0 400 400" style={{ display:'block' }}>
              <circle cx="200" cy="200" r="119" fill="none" stroke="var(--surface-3)" strokeWidth="6" />
              <circle cx="200" cy="200" r="119" fill="none" stroke="var(--ink-1)" strokeWidth="6" strokeLinecap="round"
                strokeDasharray={(RUN * frac).toFixed(1) + ' ' + (RUN * (1 - frac)).toFixed(1)} transform="rotate(-90 200 200)" />
              {arcs.map(a => (
                <circle key={a.c.id} cx="200" cy="200" r="158" fill="none" stroke={a.c.c}
                  strokeWidth={sel === a.c.id ? 34 : 24}
                  strokeDasharray={a.len.toFixed(1) + ' ' + (CIRC - a.len).toFixed(1)}
                  strokeDashoffset={a.off.toFixed(1)} transform="rotate(-90 200 200)"
                  onClick={() => setSel(sel === a.c.id ? null : a.c.id)}
                  style={{ cursor:'pointer', opacity: !sel || sel === a.c.id ? 1 : 0.16, transition:'opacity var(--dur-slow) var(--ease), stroke-width var(--dur-slow) var(--ease)' }} />
              ))}
            </svg>
            <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', textAlign:'center', width:200 }}>
              <div style={label}>{chosen ? chosen.label : 'March by category'}</div>
              <div style={{ marginTop:10, font:'var(--type-figure-m)', letterSpacing:'var(--track-figure)', color:'var(--ink-1)', fontVariantNumeric:'var(--numeric-data)' }}>
                {fmt(chosen ? chosen.amt : total)}
              </div>
              <div style={{ marginTop:14, display:'inline-flex', alignItems:'center', gap:7, height:26, padding:'0 11px', borderRadius:'var(--r-pill)', background:'var(--surface-2)' }}>
                <span style={{ width:5, height:5, borderRadius:'50%', background:'var(--ink-1)' }} />
                <span style={{ font:'var(--type-label-s)', letterSpacing:'var(--track-label)', color:'var(--ink-2)' }}>
                  {chosen ? Math.round(chosen.amt / total * 100) + ' % OF THE MONTH' : '17 OF 26 DAYS COVERED'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ width:'100%', display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'0 26px' }}>
            {CATS.map(c => (
              <div key={c.id} onClick={() => setSel(sel === c.id ? null : c.id)}
                style={{ display:'flex', alignItems:'center', gap:9, padding:'9px 0', borderBottom:'1px solid var(--line-1)', cursor:'pointer',
                  opacity: !sel || sel === c.id ? 1 : 0.42, transition:'opacity var(--dur-slow) var(--ease)' }}>
                <span style={{ width:6, height:6, borderRadius:'50%', flex:'none', background:c.c }} />
                <span style={{ flex:1, minWidth:0, font:'400 11.5px var(--font-sans)', color:'var(--ink-2)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{c.label}</span>
                <span style={{ font:'var(--type-data-s)', color:'var(--ink-1)', fontVariantNumeric:'var(--numeric-data)' }}>{fmt(c.amt)}</span>
              </div>
            ))}
          </div>
          <div style={{ padding:'0 40px 96px', textAlign:'center', font:'var(--type-caption)', color:'var(--ink-3)' }}>
            The ring is March by category, sized by amount. The inner arc is your runway — how much of the month your money covers.
          </div>
        </div>

        <div style={{ width:272, flex:'none', display:'flex', flexDirection:'column', gap:24 }}>
          <div>
            <StatBlock size="s" label="Smart score" value="61/100" />
            <div style={{ marginTop:12, height:9, borderRadius:'var(--r-pill)', background:'linear-gradient(90deg,var(--a-coral) 0%,var(--a-yellow) 42%,var(--a-green) 100%)', position:'relative' }}>
              <span style={{ position:'absolute', left:'61%', top:-3, bottom:-3, width:2, background:'var(--paper)', borderRadius:2 }} />
            </div>
            <div style={{ marginTop:12, font:'var(--type-body-s)', color:'var(--ink-3)' }}>
              Your fixed costs are under control. The score is held down by one overdue obligation, not by everyday spending.
            </div>
          </div>
          <div>
            <div style={label}>Last transactions</div>
            <DataRow dot="var(--a-coral)" name="Orange Money withdrawal" meta="Orange Money · 15:40" amount={'−20' + NB + '000'} />
            <DataRow dot="var(--a-magenta)" name="Market — Mokolo" meta="MTN MoMo · 08:20" amount={'−8' + NB + '600'} />
            <DataRow dot="var(--a-violet)" name="Rent — March" meta="MTN MoMo · 4 Mar" amount={'−250' + NB + '000'} />
            <DataRow dot="var(--a-blue)" name="Freelance invoice #24" meta="Wise · 3 Mar" amount={'+120' + NB + '000'} />
          </div>
          <div>
            <div style={label}>Where it all sits</div>
            <div style={{ marginTop:14 }}>
              <MeterBar height="12px" segments={[
                { label:'Spendable', amount:227400, color:'var(--a-green)' },
                { label:'Dollars', amount:767800, color:'var(--a-amber)' },
                { label:'Locked', amount:1486056, color:'var(--a-violet)' }]} />
            </div>
            <div style={{ marginTop:14, font:'var(--type-body-s)', color:'var(--ink-2)' }}>
              <span style={{ background:'var(--marker)', padding:'2px 6px 3px', borderRadius:4 }}>Only 9 % of what you own is spendable this month.</span>
            </div>
          </div>
        </div>
      </div>

      <AssistantBar prompt="Why does May go negative?" chips={['Move a fee term to April', 'What is safe to spend?']} />
    </div>
  );
}

window.Overview = Overview;
