export function SiteFooter() {
  return (
    <footer className="border-t border-hairline mt-s14">
      <div className="mx-auto max-w-6xl px-s9 py-s13 flex flex-wrap items-start justify-between gap-s11">
        <div className="max-w-[46ch]">
          <div className="flex items-center gap-s4 mb-s5">
            <span className="block w-6 h-px bg-ink-1" />
            <span className="type-lead text-strong">Hairline</span>
          </div>
          <p className="type-body-s text-muted m-0">
            A calm design system for finance, extracted from the Moni mockups. Colour is a data
            channel; restraint is the point.
          </p>
        </div>
        <div className="flex gap-s13">
          <div>
            <div className="type-label text-faint mb-s5">Install</div>
            <code className="type-data-s text-body">npx shadcn add @hairline/button</code>
          </div>
          <div>
            <div className="type-label text-faint mb-s5">Source</div>
            <a
              href="https://github.com/Hubertformin/ledger-ds"
              className="type-body-s text-body hover:text-strong no-underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
