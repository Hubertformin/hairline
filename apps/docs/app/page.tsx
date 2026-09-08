import { CodeBlock } from './_components/code-block';
import { DashboardDemo } from './_components/dashboard-demo';
import { SiteFooter } from './_components/site-footer';
import { SiteNav } from './_components/site-nav';
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
        <section className="mx-auto max-w-6xl px-s7 sm:px-s9 pt-s12 sm:pt-s14 pb-s13">
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
          <div className="mx-auto max-w-6xl px-s7 sm:px-s9 py-s12 sm:py-s13 grid gap-gap-column md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.label}>
                <h2 className="type-lead text-strong m-0 mb-s5">{p.label}</h2>
                <p className="type-body-s text-muted m-0">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Components route-in */}
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-6xl px-s7 sm:px-s9 py-s12 sm:py-s13 flex flex-col md:flex-row md:items-end md:justify-between gap-s11">
            <div className="max-w-[52ch]">
              <div className="type-label text-faint mb-s5">Components</div>
              <h2 className="type-figure-m tracking-figure text-strong m-0 mb-s5 text-balance">
                Fourteen today. The ones finance actually needs, next.
              </h2>
              <p className="type-body text-body m-0">
                Live previews, the source, and an install command for each — plus machine-readable
                notes so a coding agent picks the right one.
              </p>
            </div>
            <a
              href="/components"
              className="shrink-0 inline-flex items-center justify-center gap-s3 h-control px-s8 rounded-pill no-underline type-control bg-solid text-solid-text hover:bg-ink-2 transition-[color,background-color] duration-fast ease-hairline"
            >
              Browse components
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12.5 6.5L19 12l-6.5 5.5" /></svg>
            </a>
          </div>
        </section>

        {/* Fidelity */}
        <section id="fidelity" className="border-t border-hairline scroll-mt-14">
          <div className="mx-auto max-w-6xl px-s7 sm:px-s9 py-s12 sm:py-s13">
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

            <div className="grid md:grid-cols-2 gap-gap-tile items-start min-w-0">
              <div className="min-w-0">
                <div className="type-label text-faint mb-s5">Original — .hl-* classes</div>
                <div data-fidelity="original" className="rounded-card bg-surface-1 p-s9 flex flex-col gap-s12 max-md:overflow-x-auto">
                  {PAIRS.map((pair) => (
                    <div key={pair.name}>{pair.original}</div>
                  ))}
                </div>
              </div>
              <div className="min-w-0">
                <div className="type-label text-faint mb-s5">Ported — Tailwind + CVA</div>
                <div data-fidelity="ported" className="rounded-card bg-surface-1 p-s9 flex flex-col gap-s12 max-md:overflow-x-auto">
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
