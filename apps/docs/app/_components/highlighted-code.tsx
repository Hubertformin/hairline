import type { Highlighted } from '../lib/highlight';
import { CopyButton } from './copy-button';

/**
 * Renders pre-highlighted code, both themes stacked, with CSS choosing.
 *
 * `dangerouslySetInnerHTML` is safe here in the way that word rarely is: the HTML is
 * produced at build time by Shiki from source files in this repo, never from user input.
 */
export function HighlightedCode({
  html,
  code,
  label,
  className,
}: {
  html: Highlighted;
  code: string;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`rounded-card bg-surface-2 overflow-hidden ${className ?? ''}`}>
      {label ? (
        <div className="flex items-center justify-between gap-s5 pl-card-x pr-s5 py-s4 border-b border-hairline">
          <span className="type-label text-faint">{label}</span>
          <CopyButton text={code} />
        </div>
      ) : null}
      <div className="relative">
        {!label ? <CopyButton text={code} className="absolute right-s4 top-s4 z-10" /> : null}
        <div
          className="hl-code dark:hidden"
          dangerouslySetInnerHTML={{ __html: html.light }}
        />
        <div
          className="hl-code hidden dark:block"
          dangerouslySetInnerHTML={{ __html: html.dark }}
        />
      </div>
    </div>
  );
}
