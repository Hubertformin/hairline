/**
 * The `ledger-ds/tokens` subpath.
 *
 * Tokens live in their own package (`@ledger/tokens`) so the docs site and the
 * Tailwind theme can consume them without pulling in this package. This file keeps
 * the existing `ledger-ds/tokens` import working unchanged.
 */
export * from '@ledger/tokens';
