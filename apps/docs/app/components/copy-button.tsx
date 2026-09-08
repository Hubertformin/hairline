'use client';

import * as React from 'react';

import { cn } from '@/registry/hairline/lib/utils';

const check = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l5 5L19 7" /></svg>
);
const copy = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2.5" /><path d="M15 5.5A2.5 2.5 0 0012.5 3h-7A2.5 2.5 0 003 5.5v7A2.5 2.5 0 005.5 15" /></svg>
);

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [done, setDone] = React.useState(false);

  return (
    <button
      type="button"
      aria-label={done ? 'Copied' : 'Copy to clipboard'}
      onClick={() => {
        void navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1600);
      }}
      className={cn(
        'inline-flex items-center justify-center size-8 shrink-0 rounded-field border-0 cursor-pointer',
        'bg-transparent text-muted hover:bg-quiet hover:text-strong',
        'transition-[color,background-color] duration-fast ease-hairline focus-visible:focus-ring-inset',
        className,
      )}
    >
      {done ? check : copy}
    </button>
  );
}
