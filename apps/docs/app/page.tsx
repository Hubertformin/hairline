import { CodeBlock } from './components/code-block';
import { ComponentPreview } from './components/component-preview';
import { DashboardDemo } from './components/dashboard-demo';
import { SiteFooter } from './components/site-footer';
import { SiteNav } from './components/site-nav';
import { GALLERY } from './gallery';
import { PAIRS } from './fidelity';

const PRINCIPLES = [
  {
    label: 'Colour is data',
    body: 'Chrome is monochrome. An accent means a category, a series or a status — never decoration, and never a border-only accent. Semantic colours travel as an ink and a wash together.',
  },
  {
    label: 'Figures are tabular',
    body: 'Every number in a table is mono, tabular and slashed-zero, so columns line up and a figure never jitters as it changes. Prose never appears in the mono; a figure never appears in the sans.',
  },
  {
    label: 'Structure by hairline',
    body: 'Rows are separated by one-pixel rules. No vertical rules, no zebra striping, no cell borders. Cards take a fill, not a border — which is the rule the system is named for.',
  },
];

export default function Home() {
  return (
    <>
      <SiteNav />

      <main id="top">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-s9 pt-s14 pb-s13">
          <div className="grid gap-gap-column lg:grid-cols-[1.35fr_1fr] lg:items-end mb-s13">
            <div>
              <div className="type-label text-faint mb-s7">A design system for finance</div>
              <h1 className="type-figure-xl tracking-figure text-strong m-0 mb-s9 text-balance">
                Interfaces that read like a statement, not a dashboard.
              </h1>
              <p className="type-lead text-body m-0 max-w-[52ch]">
                Monochrome ink on paper, mono uppercase labels, tabular figures, generous space, and
                colour reserved for data.
              </p>
            </div>
            <div>
              <CodeBlock label="Install" code={'npx shadcn@latest add @hairline/button'} />
              <p className="type-body-s text-muted mt-s6 m-0">
                Twelve components, installable with the shadcn CLI. Copy the source, own the code.
              </p>
            </div>
          </div>

          <DashboardDemo />
          <p className="type-body-s text-muted mt-s7 m-0">
            Every element above is a Hairline component. Nothing here is a mockup.
          </p>
        </section>

        {/* Principles */}
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-6xl px-s9 py-s13 grid gap-gap-column md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.label}>
                <h2 className="type-lead text-strong m-0 mb-s5">{p.label}</h2>
                <p className="type-body-s text-muted m-0">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Components */}
        <section id="components" className="border-t border-hairline scroll-mt-14">
          <div className="mx-auto max-w-4xl px-s9 py-s13">
            <div className="mb-s13">
              <div className="type-label text-faint mb-s5">Components</div>
              <h2 className="type-figure-m tracking-figure text-strong m-0 mb-s5 text-balance">
                Twelve today. The ones finance actually needs, next.
              </h2>
              <p className="type-body text-body m-0">
                Each installs on its own and brings only what it uses. Copy the command, or point a
                coding agent at the registry and let it choose.
              </p>
            </div>

            <div className="flex flex-col gap-s14">
              {GALLERY.map((entry) => (
                <ComponentPreview
                  key={entry.slug}
                  name={entry.name}
                  description={entry.description}
                  install={`npx shadcn@latest add @hairline/${entry.slug}`}
                  code={entry.code}
                >
                  {entry.demo}
                </ComponentPreview>
              ))}
            </div>
          </div>
        </section>

        {/* Fidelity */}
        <section id="fidelity" className="border-t border-hairline scroll-mt-14">
          <div className="mx-auto max-w-6xl px-s9 py-s13">
            <div className="mb-s11 max-w-[62ch]">
              <div className="type-label text-faint mb-s5">Fidelity</div>
              <h2 className="type-figure-m tracking-figure text-strong m-0 mb-s5">
                Verified against the original, on every commit.
              </h2>
              <p className="type-body text-body m-0">
                The design system was authored before this library existed. Both implementations are
                rendered here from the same content, and a pixel diff of exactly this pairing runs in
                light and dark on every commit — so a port cannot quietly drift from the design.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-gap-tile items-start">
              <div>
                <div className="type-label text-faint mb-s5">Original — .hl-* classes</div>
                <div data-fidelity="original" className="rounded-card bg-surface-1 p-s9 flex flex-col gap-s12">
                  {PAIRS.map((pair) => (
                    <div key={pair.name}>{pair.original}</div>
                  ))}
                </div>
              </div>
              <div>
                <div className="type-label text-faint mb-s5">Ported — Tailwind + CVA</div>
                <div data-fidelity="ported" className="rounded-card bg-surface-1 p-s9 flex flex-col gap-s12">
                  {PAIRS.map((pair) => (
                    <div key={pair.name}>{pair.ported}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
