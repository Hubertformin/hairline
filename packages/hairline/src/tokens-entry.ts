/**
 * The `hairline/tokens` subpath.
 *
 * Tokens live in their own package (`@hairline/tokens`) so the docs site and the
 * Tailwind theme can consume them without pulling in this package. This file keeps
 * the existing `hairline/tokens` import working unchanged.
 */
export * from '@hairline/tokens';
