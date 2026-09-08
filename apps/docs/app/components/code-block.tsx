import { CopyButton } from './copy-button';

/**
 * A code block in the system's mono voice.
 *
 * No syntax highlighter: colour here is a data channel, and tinting keywords would
 * spend it on decoration. Density and the mono face carry it instead.
 */
export function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="rounded-card bg-surface-2 overflow-hidden">
      <div className="flex items-center justify-between gap-s5 pl-card-x pr-s5 py-s4 border-b border-hairline">
        <span className="type-label text-faint">{label ?? 'Code'}</span>
        <CopyButton text={code} />
      </div>
      <pre className="m-0 py-card-y px-card-x overflow-x-auto type-data text-body leading-[1.7]">
        {code}
      </pre>
    </div>
  );
}
