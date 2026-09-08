/**
 * Builds `docs/compare.html`: the original export's components rendered beside
 * the new class-based ones, on the same page, with the same content and tokens.
 *
 * This is the fidelity check. The class layer was hand-translated from inline
 * styles, and a hand translation is exactly where a 12px becomes a 14px. Putting
 * the two side by side makes any drift visible rather than theoretical.
 *
 * The original components are read straight from `reference/components/`, so
 * this compares against the actual export rather than a copy of it.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { transform } from 'esbuild';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const componentsDir = resolve(root, 'reference/components');

/**
 * Turns one component module into a self-contained expression.
 *
 * The IIFE is not decoration: several of these files declare a module-level
 * `const TONES`, and Select declares a `const caret`. Concatenated into one
 * scope they collide and the whole script fails to parse — which is exactly how
 * this page first came out blank.
 */
function toScriptSource(jsx: string, name: string): string {
  const body = jsx
    .replace(/^\s*import\s+React\s+from\s+['"]react['"];?\s*$/m, '')
    .replace(/^export\s+function/m, 'function')
    .trim();
  return `const ${name} = (function () {\n${body}\nreturn ${name};\n})();`;
}

const originals: string[] = [];
for (const group of readdirSync(componentsDir)) {
  const dir = resolve(componentsDir, group);
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.jsx'))) {
    const name = file.replace(/\.jsx$/, '');
    originals.push(toScriptSource(readFileSync(resolve(dir, file), 'utf8'), name));
  }
}

/**
 * Each specimen renders the same thing twice. `was` uses the export's component;
 * `now` is the markup the class layer expects — which is exactly what the new
 * React components emit.
 */
const specimens = `
const caret = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 10l5.5 5 5.5-5" /></svg>;
const plus = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>;

const SPECIMENS = [
  { name: 'Button — tones',
    was: <React.Fragment>
      <Button tone="solid">Record it</Button>{' '}
      <Button tone="quiet">Not now</Button>{' '}
      <Button tone="ghost">Skip</Button>{' '}
      <Button tone="danger">Delete account</Button>{' '}
      <Button tone="solid" disabled>Locked</Button>
    </React.Fragment>,
    now: <React.Fragment>
      <button className="hl-btn hl-btn--solid">Record it</button>{' '}
      <button className="hl-btn hl-btn--quiet">Not now</button>{' '}
      <button className="hl-btn hl-btn--ghost">Skip</button>{' '}
      <button className="hl-btn hl-btn--danger">Delete account</button>{' '}
      <button className="hl-btn hl-btn--solid" disabled>Locked</button>
    </React.Fragment> },

  { name: 'Button — sizes',
    was: <React.Fragment>
      <Button size="s">Small</Button>{' '}<Button size="m">Medium</Button>{' '}<Button size="l">Large</Button>
    </React.Fragment>,
    now: <React.Fragment>
      <button className="hl-btn hl-btn--solid hl-btn--s">Small</button>{' '}
      <button className="hl-btn hl-btn--solid">Medium</button>{' '}
      <button className="hl-btn hl-btn--solid hl-btn--l">Large</button>
    </React.Fragment> },

  { name: 'IconButton',
    was: <React.Fragment>
      <IconButton label="Add">{plus}</IconButton>{' '}
      <IconButton label="Add" tone="solid">{plus}</IconButton>{' '}
      <IconButton label="Add" tone="bare">{plus}</IconButton>{' '}
      <IconButton label="Add" size={44}>{plus}</IconButton>
    </React.Fragment>,
    now: <React.Fragment>
      <button className="hl-iconbtn hl-iconbtn--quiet" aria-label="Add">{plus}</button>{' '}
      <button className="hl-iconbtn hl-iconbtn--solid" aria-label="Add">{plus}</button>{' '}
      <button className="hl-iconbtn hl-iconbtn--bare" aria-label="Add">{plus}</button>{' '}
      <button className="hl-iconbtn hl-iconbtn--quiet" aria-label="Add" style={{ '--hl-iconbtn-size': '44px' }}>{plus}</button>
    </React.Fragment> },

  { name: 'Chip',
    was: <React.Fragment>
      <Chip selected>This month</Chip>{' '}<Chip>Six months forward</Chip>{' '}<Chip interactive={false}>Mobile money</Chip>
    </React.Fragment>,
    now: <React.Fragment>
      <button className="hl-chip hl-chip--selected">This month</button>{' '}
      <button className="hl-chip">Six months forward</button>{' '}
      <span className="hl-chip hl-chip--static">Mobile money</span>
    </React.Fragment> },

  { name: 'Badge',
    was: <React.Fragment>
      <Badge>Settled</Badge>{' '}<Badge tone="alarm">Needs a decision</Badge>{' '}<Badge tone="positive">Paid</Badge>{' '}
      <Badge tone="info">Scheduled</Badge>{' '}<Badge tone="caution">Held</Badge>
    </React.Fragment>,
    now: <React.Fragment>
      <span className="hl-badge hl-badge--neutral">Settled</span>{' '}
      <span className="hl-badge hl-badge--alarm">Needs a decision</span>{' '}
      <span className="hl-badge hl-badge--positive">Paid</span>{' '}
      <span className="hl-badge hl-badge--info">Scheduled</span>{' '}
      <span className="hl-badge hl-badge--caution">Held</span>
    </React.Fragment> },

  { name: 'Field',
    was: <div style={{ display:'grid', gap:20 }}>
      <Field label="Account name" value="MTN MoMo — 677 04" hint="The number the salary lands on." />
      <Field label="Amount" size="lg" prefix="XAF" value="250 000" hint="Leaves nothing until the 28th." />
    </div>,
    now: <div style={{ display:'grid', gap:20 }}>
      <div className="hl-field">
        <div className="hl-field__label">Account name</div>
        <div className="hl-field__box"><span className="hl-field__value">MTN MoMo — 677 04</span></div>
        <div className="hl-field__hint">The number the salary lands on.</div>
      </div>
      <div className="hl-field hl-field--lg">
        <div className="hl-field__label">Amount</div>
        <div className="hl-field__box"><span className="hl-field__prefix">XAF</span><span className="hl-field__value">250 000</span></div>
        <div className="hl-field__hint">Leaves nothing until the 28th.</div>
      </div>
    </div> },

  { name: 'Select',
    was: <Select label="Category" value="School fees" dot="var(--a-coral)" meta="3 this month" />,
    now: <div className="hl-select">
      <div className="hl-select__label">Category</div>
      <button className="hl-select__box">
        <span className="hl-select__main">
          <span className="hl-select__dot" style={{ background:'var(--a-coral)' }} />
          <span className="hl-select__value">School fees</span>
          <span className="hl-select__meta">3 this month</span>
        </span>
        <span className="hl-select__caret">{caret}</span>
      </button>
    </div> },

  { name: 'Toggle',
    was: <div>
      <Toggle on label="Round up every payment" note="Adds about 4 200 a month to the vault." />
      <Toggle label="Warn me before zero" note="Twenty per cent is held for a year." />
    </div>,
    now: <div>
      <div className="hl-toggle-row">
        <div style={{ minWidth:0 }}>
          <div className="hl-toggle-row__label">Round up every payment</div>
          <div className="hl-toggle-row__note">Adds about 4 200 a month to the vault.</div>
        </div>
        <button className="hl-toggle__switch hl-toggle__switch--on"><span className="hl-toggle__knob" /></button>
      </div>
      <div className="hl-toggle-row">
        <div style={{ minWidth:0 }}>
          <div className="hl-toggle-row__label">Warn me before zero</div>
          <div className="hl-toggle-row__note">Twenty per cent is held for a year.</div>
        </div>
        <button className="hl-toggle__switch"><span className="hl-toggle__knob" /></button>
      </div>
    </div> },

  { name: 'SegmentedTabs',
    was: <div style={{ display:'grid', gap:16, justifyItems:'start' }}>
      <SegmentedTabs items={['Month','Quarter','Year']} value="Month" />
      <SegmentedTabs mono={false} items={['Everything','Needs a decision','Settled']} value="Everything" />
    </div>,
    now: <div style={{ display:'grid', gap:16, justifyItems:'start' }}>
      <div className="hl-tabs">
        <button className="hl-tabs__item hl-tabs__item--on">Month</button>
        <button className="hl-tabs__item">Quarter</button>
        <button className="hl-tabs__item">Year</button>
      </div>
      <div className="hl-tabs hl-tabs--sans">
        <button className="hl-tabs__item hl-tabs__item--on">Everything</button>
        <button className="hl-tabs__item">Needs a decision</button>
        <button className="hl-tabs__item">Settled</button>
      </div>
    </div> },

  { name: 'Tile',
    was: <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
      <Tile tone="dark" label="Available"><StatBlock size="l" value="227 400" unit="XAF" /></Tile>
      <Tile tone="paper" label="Vault" action={<Badge tone="caution">Locked</Badge>}>
        <StatBlock size="s" value="600 000" note="Held for a year." />
      </Tile>
    </div>,
    now: <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
      <div className="hl-tile hl-tile--dark">
        <div className="hl-tile__head"><span className="hl-tile__label">Available</span></div>
        <div className="hl-stat hl-stat--l"><div className="hl-stat__row"><span className="hl-stat__value">227 400</span><span className="hl-stat__unit">XAF</span></div></div>
      </div>
      <div className="hl-tile hl-tile--paper">
        <div className="hl-tile__head"><span className="hl-tile__label">Vault</span><span className="hl-badge hl-badge--caution">Locked</span></div>
        <div className="hl-stat hl-stat--s"><div className="hl-stat__row"><span className="hl-stat__value">600 000</span></div><div className="hl-stat__note">Held for a year.</div></div>
      </div>
    </div> },

  { name: 'StatBlock',
    was: <StatBlock size="xl" label="Total expenses" value="1 284 900" unit="XAF" note="258 900 of it is the deferred fees." />,
    now: <div className="hl-stat hl-stat--xl">
      <div className="hl-stat__label">Total expenses</div>
      <div className="hl-stat__row"><span className="hl-stat__value">1 284 900</span><span className="hl-stat__unit">XAF</span></div>
      <div className="hl-stat__note">258 900 of it is the deferred fees.</div>
    </div> },

  { name: 'DataRow',
    was: <div>
      <DataRow dot="var(--a-coral)" name="School fees" meta="22 Mar · Mobile money" state="alarm" amount="−258 900" secondary="227 400" />
      <DataRow dot="var(--a-blue)" name="Fibre bill" meta="18 Mar · Landed twice" badge={<Badge tone="info">Disputed</Badge>} amount="−34 000" secondary="486 300" />
      <DataRow name="Salary" meta="01 Mar" state="struck" amount="750 000" secondary="520 300" />
      <DataRow name="Transport" meta="Settled" state="demoted" amount="−12 500" secondary="507 800" />
    </div>,
    now: <div>
      <div className="hl-row">
        <span className="hl-row__dot" style={{ background:'var(--a-coral)' }} />
        <div className="hl-row__main"><div className="hl-row__name">School fees</div><div className="hl-row__meta">22 Mar · Mobile money</div></div>
        <span className="hl-row__amount hl-row__amount--alarm">−258 900</span>
        <span className="hl-row__secondary">227 400</span>
      </div>
      <div className="hl-row">
        <span className="hl-row__dot" style={{ background:'var(--a-blue)' }} />
        <div className="hl-row__main"><div className="hl-row__name">Fibre bill</div><div className="hl-row__meta">18 Mar · Landed twice</div></div>
        <span className="hl-badge hl-badge--info">Disputed</span>
        <span className="hl-row__amount">−34 000</span>
        <span className="hl-row__secondary">486 300</span>
      </div>
      <div className="hl-row">
        <div className="hl-row__main"><div className="hl-row__name">Salary</div><div className="hl-row__meta">01 Mar</div></div>
        <span className="hl-row__amount hl-row__amount--struck">750 000</span>
        <span className="hl-row__secondary">520 300</span>
      </div>
      <div className="hl-row">
        <div className="hl-row__main"><div className="hl-row__name">Transport</div><div className="hl-row__meta">Settled</div></div>
        <span className="hl-row__amount hl-row__amount--demoted">−12 500</span>
        <span className="hl-row__secondary">507 800</span>
      </div>
    </div> },

  { name: 'MeterBar',
    was: <div style={{ display:'grid', gap:16 }}>
      <MeterBar value={62} limit={100} />
      <MeterBar value={120} limit={100} over />
      <MeterBar segments={[{label:'Fees',amount:4.2,color:'var(--a-coral)'},{label:'Bills',amount:2.6,color:'var(--a-blue)'},{label:'Food',amount:1.8,color:'var(--a-amber)'},{label:'Other',amount:1.1,color:'var(--a-green)'}]} />
    </div>,
    now: <div style={{ display:'grid', gap:16 }}>
      <div className="hl-meter"><span className="hl-meter__fill" style={{ width:'62%' }} /></div>
      <div className="hl-meter hl-meter--over"><span className="hl-meter__fill" style={{ width:'100%' }} /></div>
      <div className="hl-meter hl-meter--stacked">
        <span className="hl-meter__segment" style={{ flex:'4.2', background:'var(--a-coral)' }} />
        <span className="hl-meter__segment" style={{ flex:'2.6', background:'var(--a-blue)' }} />
        <span className="hl-meter__segment" style={{ flex:'1.8', background:'var(--a-amber)' }} />
        <span className="hl-meter__segment" style={{ flex:'1.1', background:'var(--a-green)' }} />
      </div>
    </div> },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    {SPECIMENS.map(s => (
      <section className="pair" key={s.name}>
        <h2>{s.name}</h2>
        <div className="side"><div className="tag">export — inline styles</div><div className="frame">{s.was}</div></div>
        <div className="side"><div className="tag">hairline.css — classes</div><div className="frame">{s.now}</div></div>
      </section>
    ))}
  </React.Fragment>
);
`;

/* Precompiled with esbuild rather than shipping Babel to the browser: the
   in-browser transformer failed silently here, and a build-time transform also
   means the page needs no transpiler at all. */
const compiled = await transform(`${originals.join('\n\n')}\n\n${specimens}`, {
  loader: 'jsx',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
});

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hairline — export vs class layer</title>
<link rel="stylesheet" href="../dist/hairline.css">
<style>
  body { background: var(--desk); margin: 0; padding: 28px; font: var(--type-body); color: var(--text-body); }
  .pair { display: grid; grid-template-columns: 150px 1fr 1fr; gap: 22px; align-items: start;
          background: var(--paper); border-radius: var(--r-board); padding: 22px 24px; margin-bottom: 18px; }
  .pair > h2 { font: var(--type-lead); color: var(--text-strong); margin: 0; }
  .tag { font: var(--type-label-s); letter-spacing: var(--track-label); text-transform: uppercase;
         color: var(--text-faint); margin-bottom: 12px; }
  .frame { padding: 16px; border-radius: var(--r-card); background: var(--surface-1);
           outline: 1px solid var(--border-hairline); }
</style>
</head>
<body>
<div id="root"></div>
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script>
/* The export's components, read verbatim from reference/components/, plus the
   specimen list — both compiled from JSX at build time. */
${compiled.code}
</script>
</body>
</html>
`;

writeFileSync(resolve(root, 'docs/compare.html'), html);
console.log(`compare → docs/compare.html (${(Buffer.byteLength(html) / 1024).toFixed(1)} kB)`);
