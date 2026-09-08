import { Button } from '@/registry/ledger/ui/button';
import { ThemeToggle } from './components/theme-toggle';

const TONES = ['solid', 'quiet', 'ghost', 'danger'] as const;

function Label({ children }: { children: React.ReactNode }) {
  return <div className="type-label text-faint mb-s4">{children}</div>;
}

function Board({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-paper rounded-board py-board-y px-board-x">
      <h2 className="type-figure-s text-strong tracking-figure m-0 mb-s11">{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-s12 py-s13 flex flex-col gap-gap-column">
      <header className="bg-paper rounded-board py-board-y px-board-x flex items-start justify-between gap-s9">
        <div>
          <h1 className="type-figure-l text-strong tracking-figure m-0 mb-s4">Ledger</h1>
          <p className="type-body text-body m-0 max-w-[62ch]">
            A calm design system for finance. Monochrome ink on paper, mono uppercase labels,
            tabular figures, generous space, and colour reserved for data. Every component on this
            page is built from the generated Tailwind theme — no hand-written CSS.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Board title="Install">
        <Label>Add the registry to components.json</Label>
        <pre className="bg-surface-2 rounded-card py-card-y px-card-x type-data text-body overflow-x-auto m-0 mb-s9">
{`"registries": {
  "@ledger": "https://ledger-ui.com/r/{name}.json"
}`}
        </pre>
        <Label>Then</Label>
        <pre className="bg-surface-2 rounded-card py-card-y px-card-x type-data text-body overflow-x-auto m-0">
          npx shadcn@latest add @ledger/button
        </pre>
      </Board>

      <Board title="Button">
        <div className="flex flex-col gap-s12">
          <div>
            <Label>Four tones — solid is the one primary action per view</Label>
            <div className="flex flex-wrap items-center gap-s5">
              {TONES.map((tone) => (
                <Button key={tone} tone={tone}>
                  {{ solid: 'Record it', quiet: 'Move to April', ghost: 'Skip this month', danger: 'Delete account' }[tone]}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>Three sizes</Label>
            <div className="flex flex-wrap items-center gap-s5">
              <Button size="s">Small</Button>
              <Button size="m">Medium</Button>
              <Button size="l">Large</Button>
            </div>
          </div>

          <div>
            <Label>Disabled</Label>
            <div className="flex flex-wrap items-center gap-s5">
              <Button disabled>Locked until 22 March</Button>
              <Button tone="quiet" disabled>Nothing to record</Button>
            </div>
          </div>

          <div>
            <Label>As a link — asChild keeps the semantics right</Label>
            <Button asChild>
              <a href="#top">Back to top</a>
            </Button>
          </div>
        </div>
      </Board>

      <Board title="Fidelity">
        <p className="type-body text-body m-0 mb-s11 max-w-[62ch]">
          The same buttons rendered by the original class layer and by the ported Tailwind
          component. These must be indistinguishable — a pixel diff of exactly this pairing runs on
          every commit.
        </p>
        <div className="grid grid-cols-2 gap-gap-tile">
          <div>
            <Label>Original — .led-* classes</Label>
            <div
              data-fidelity="original"
              className="bg-surface-1 rounded-card p-s9 flex flex-wrap items-center gap-s5"
            >
              <button className="led-btn led-btn--solid">Record it</button>
              <button className="led-btn led-btn--quiet">Move to April</button>
              <button className="led-btn led-btn--ghost">Skip this month</button>
              <button className="led-btn led-btn--danger">Delete account</button>
            </div>
          </div>
          <div>
            <Label>Ported — Tailwind + CVA</Label>
            <div
              data-fidelity="ported"
              className="bg-surface-1 rounded-card p-s9 flex flex-wrap items-center gap-s5"
            >
              {TONES.map((tone) => (
                <Button key={tone} tone={tone}>
                  {{ solid: 'Record it', quiet: 'Move to April', ghost: 'Skip this month', danger: 'Delete account' }[tone]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Board>
    </main>
  );
}
