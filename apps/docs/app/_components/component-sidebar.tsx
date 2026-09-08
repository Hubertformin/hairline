'use client';

import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';

export interface SidebarGroup {
  label: string;
  items: { name: string; slug: string }[];
}

/**
 * A floating index of the page, with the section you are reading marked.
 *
 * It floats rather than sitting in a column because the component previews want the
 * full measure — a docked sidebar would squeeze every demo by 240px for the whole
 * scroll. On narrow screens it drops to a horizontally scrolling strip pinned under
 * the header, which is the only shape that stays usable one-handed.
 */
export function ComponentSidebar({ groups }: { groups: SidebarGroup[] }) {
  const slugs = React.useMemo(() => groups.flatMap((g) => g.items.map((i) => i.slug)), [groups]);
  const [active, setActive] = React.useState(slugs[0] ?? '');

  React.useEffect(() => {
    const sections = slugs
      .map((s) => document.getElementById(s))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Track the section nearest the top of the viewport rather than whichever is
    // "most visible": with previews of wildly different heights, an intersection
    // ratio jumps around and the marker flickers between neighbours.
    const onScroll = () => {
      let best = sections[0]!.id;
      let bestDist = Number.POSITIVE_INFINITY;
      for (const el of sections) {
        const dist = Math.abs(el.getBoundingClientRect().top - 120);
        if (dist < bestDist) {
          bestDist = dist;
          best = el.id;
        }
      }
      setActive(best);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slugs]);

  return (
    <>
      {/* Narrow: a scrolling strip under the header. */}
      <nav
        aria-label="Components"
        className="lg:hidden sticky top-14 z-10 py-s5 bg-paper/90 backdrop-blur-sm border-b border-hairline"
      >
        <div className="flex gap-s3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {groups.flatMap((g) =>
            g.items.map((i) => (
              <a
                key={i.slug}
                href={`#${i.slug}`}
                className={cn(
                  'shrink-0 h-pill px-s6 inline-flex items-center rounded-pill no-underline type-label',
                  'transition-[color,background-color] duration-fast ease-hairline',
                  active === i.slug ? 'bg-solid text-solid-text' : 'bg-surface-2 text-muted',
                )}
              >
                {i.name}
              </a>
            )),
          )}
        </div>
      </nav>

      {/* Wide: a floating panel. */}
      <nav
        aria-label="Components"
        className="hidden lg:block fixed left-s9 top-1/2 -translate-y-1/2 z-10 w-[196px]"
      >
        <div className="rounded-card bg-paper/85 backdrop-blur-sm border border-hairline p-s5 shadow-raised max-h-[76vh] overflow-y-auto">
          {groups.map((group) => (
            <div key={group.label} className="mb-s7 last:mb-0">
              <div className="type-label text-faint px-s4 mb-s3">{group.label}</div>
              {group.items.map((i) => (
                <a
                  key={i.slug}
                  href={`#${i.slug}`}
                  className={cn(
                    'block px-s4 py-s3 rounded-field no-underline type-body-s',
                    'transition-[color,background-color] duration-fast ease-hairline',
                    active === i.slug
                      ? 'bg-surface-2 text-strong'
                      : 'text-muted hover:text-strong hover:bg-surface-1',
                  )}
                >
                  {i.name}
                </a>
              ))}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
