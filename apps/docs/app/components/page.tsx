import type { Metadata } from 'next';

import { ComponentPreview } from '../_components/component-preview';
import { ComponentSidebar, type SidebarGroup } from '../_components/component-sidebar';
import { SiteFooter } from '../_components/site-footer';
import { SiteNav } from '../_components/site-nav';
import { GALLERY } from '../gallery';
import { highlight } from '../lib/highlight';

export const metadata: Metadata = {
  title: 'Components — Hairline',
  description: 'Every Hairline component, with live previews, source and an install command.',
};

const ORDER = ['Core', 'Forms', 'Data', 'Charts'] as const;

export default async function ComponentsPage() {
  // Highlighted once at build time, so no highlighter ships to the browser.
  const highlighted = await Promise.all(
    GALLERY.map(async (entry) => ({ ...entry, codeHtml: await highlight(entry.code) })),
  );

  const groups: SidebarGroup[] = ORDER.map((label) => ({
    label,
    items: GALLERY.filter((g) => g.group === label).map((g) => ({ name: g.name, slug: g.slug })),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <SiteNav />
      <ComponentSidebar groups={groups} />

      {/* The floating sidebar overlaps the page rather than docking, so the content
          only needs to clear it at the width where it appears. */}
      <main className="mx-auto max-w-4xl px-s7 sm:px-s9 py-s12 sm:py-s13 lg:pl-[236px] xl:pl-s9">
        <header className="mb-s13">
          <div className="type-label text-faint mb-s5">Components</div>
          <h1 className="type-figure-l tracking-figure text-strong m-0 mb-s7 text-balance">
            {GALLERY.length} components, each installable on its own.
          </h1>
          <p className="type-body text-body m-0 max-w-[62ch]">
            Every one brings only what it uses. Copy the command, or point a coding agent at the
            registry and let it choose — each item ships machine-readable notes on when to reach for
            it and when not to.
          </p>
        </header>

        <div className="flex flex-col gap-s14">
          {ORDER.map((label) => {
            const entries = highlighted.filter((e) => e.group === label);
            if (entries.length === 0) return null;
            return (
              <section key={label} className="flex flex-col gap-s14">
                <div className="flex items-center gap-s5">
                  <h2 className="type-label text-faint m-0">{label}</h2>
                  <span className="flex-1 h-px bg-hairline" />
                </div>
                {entries.map((entry) => (
                  <ComponentPreview
                    key={entry.slug}
                    slug={entry.slug}
                    name={entry.name}
                    description={entry.description}
                    install={`npx shadcn@latest add @hairline/${entry.slug}`}
                    code={entry.code}
                    codeHtml={entry.codeHtml}
                  >
                    {entry.demo}
                  </ComponentPreview>
                ))}
              </section>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
