'use client';

import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';
import { CopyButton } from './copy-button';
import type { Highlighted } from '../lib/highlight';

/**
 * A live preview with its source behind a tab.
 *
 * The preview is the real component, not a screenshot — a design system's docs have to
 * be built out of the thing they document, or the docs and the library drift.
 */
export function ComponentPreview({
  slug,
  name,
  description,
  install,
  code,
  codeHtml,
  children,
}: {
  slug: string;
  name: string;
  description: string;
  install: string;
  code: string;
  codeHtml: Highlighted;
  children: React.ReactNode;
}) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');

  return (
    <section className="scroll-mt-24" id={slug}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-s5 sm:gap-s9 mb-s7">
        <div className="min-w-0">
          <h3 className="type-lead text-strong m-0">{name}</h3>
          <p className="type-body-s text-muted m-0 mt-s2 max-w-[58ch]">{description}</p>
        </div>
        <div className="flex items-center gap-s3">
          {(['preview', 'code'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                'h-pill px-s6 rounded-pill border-0 cursor-pointer type-label',
                'transition-[color,background-color] duration-fast ease-hairline focus-visible:focus-ring-inset',
                tab === t ? 'bg-card text-strong' : 'bg-transparent text-muted hover:text-strong',
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {tab === 'preview' ? (
        <div className="rounded-card bg-surface-1 border border-hairline p-s7 sm:p-s11 flex flex-wrap items-center justify-center gap-s7 sm:gap-s9 min-h-[128px] overflow-x-auto">
          {children}
        </div>
      ) : (
        <div className="rounded-card bg-surface-2 overflow-hidden">
          <div className="hl-code dark:hidden" dangerouslySetInnerHTML={{ __html: codeHtml.light }} />
          <div className="hl-code hidden dark:block" dangerouslySetInnerHTML={{ __html: codeHtml.dark }} />
        </div>
      )}

      <div className="mt-s5 flex items-center gap-s3">
        <code className="flex-1 min-w-0 rounded-field bg-surface-2 px-s6 py-s4 type-data-s text-muted overflow-x-auto whitespace-nowrap">
          {install}
        </code>
        <CopyButton text={install} />
      </div>
    </section>
  );
}
