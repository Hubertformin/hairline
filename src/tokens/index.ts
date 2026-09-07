/**
 * The Ledger token layer — the single source of truth.
 *
 * These modules are authored once and generated into two forms:
 *   - `ledger/ledger.css`, where they become `--ink-1` and friends;
 *   - this module, imported directly by the React Native components, which have
 *     no `var()` to read.
 *
 * Never hand-edit the generated CSS. Edit here and run `pnpm build:tokens`.
 */

export * from './color.js';
export * from './typography.js';
export * from './space.js';
export * from './shape.js';
export * from './motion.js';
