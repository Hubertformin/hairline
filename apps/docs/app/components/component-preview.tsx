'use client';

import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';
import { CopyButton } from './copy-button';

/**
 * A live preview with its source behind a tab.
 *
 * The preview is the real component, not a screenshot — a design system's docs have to
 * be built out of the thing they document, or the docs and the library drift.
 */
export function ComponentPreview({
  name,
  description,
  install,
  code,
  children,
}: {
  name: string;
  description: string;
  install: string;
  code: string;
  children: React.ReactNode;
}) {
  const [tab, setTab] = React.useState<'preview' | 'code'>('preview');

  return (
    <section className="scroll-mt-24" id={name.toLowerCase()}>
      <div className="flex items-start justify-between gap-s9 flex-wrap mb-s7">
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
        <div className="rounded-card bg-surface-1 border border-hairline p-s11 flex flex-wrap items-center justify-center gap-s9 min-h-[128px]">
          {children}
        </div>
      ) : (
        <pre className="m-0 rounded-card bg-surface-2 py-card-y px-card-x overflow-x-auto type-data text-body leading-[1.7]">
          {code}
        </pre>
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
