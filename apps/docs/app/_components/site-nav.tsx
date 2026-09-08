import { cn } from '@/registry/hairline/lib/utils';
import { ThemeToggle } from './theme-toggle';

const LINKS = [
  { href: '/components', label: 'Components' },
  { href: '/#fidelity', label: 'Fidelity' },
  { href: 'https://github.com/Hubertformin/ledger-ds', label: 'GitHub' },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-s7 sm:px-s9 h-14 flex items-center justify-between gap-s5">
        <a href="/" className="flex items-center gap-s4 no-underline">
          {/* A hairline: the mark is the rule the system is named for. */}
          <span className="block w-6 h-px bg-ink-1" />
          <span className="type-lead text-strong">Hairline</span>
        </a>
        <nav className="flex items-center gap-s1 sm:gap-s3 min-w-0">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                'type-body-s text-muted hover:text-strong no-underline px-s4 sm:px-s5 py-s3 rounded-pill',
                'transition-[color,background-color] duration-fast ease-hairline hover:bg-surface-2',
                // GitHub is the first thing to go on a narrow screen: it is the one
                // link that is not about using the library.
                l.href.startsWith('http') && 'hidden sm:inline-flex',
              )}
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
