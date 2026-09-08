# design-sync notes — hairline

Repo-specific gotchas. Read this before a re-sync.

## Setup

- **`react-dom` must be installed** even though the package doesn't import it.
  The converter vendors React + ReactDOM into `_vendor/` for the preview cards, and
  without it the build dies at `Could not resolve "react-dom"` before doing anything.
  It is a devDependency here for exactly that reason.
- **Playwright: do NOT install a browser.** Chromium is already cached at
  `~/Library/Caches/ms-playwright` (macOS puts it there, not `~/.cache`, so the
  skill's first check comes up empty and looks like nothing is installed).
  `playwright@1.58.2` pins chromium build 1208, which is in that cache. Installing a
  different playwright version means a 200 MB download for nothing.
- `--entry ./dist/index.js` is required: `node_modules/hairline` doesn't exist
  (npm won't self-install a package into its own repo).
- Run `pnpm build` first — the converter reads `dist/`, not `src/`.

## Config decisions, and why

- **`componentSrcMap` pins every component to `src/react/<Name>.tsx`.** Without it the
  fuzzy source match picks `src/native/<Name>.tsx` instead — same twelve names exist in
  both trees — and every component lands in a group called `native`. The bundle is
  unaffected (it is built from the web entry) but the grouping and prompt synthesis
  are wrong. If a component is ever added, add its pin too.
- **`docsDir: skill/docs`, not `skill/components`.** The converter matches `<Name>.md`,
  not `<Name>.prompt.md`. `scripts/build-skill.ts` generates `skill/docs/<Name>.md`
  with a frontmatter `category:` that sets the component's group (Core/Forms/Data).
  **Re-run `pnpm build:skill` before a re-sync** or the docs will be stale.
- **`overrides.*.cardMode: "column"`** on nine components. Their previews are wider
  than a grid cell (forms are 360px, DataRow 520px), so the product card cropped them.
  Column mode gives each story the full card width. `Badge`, `IconButton` and
  `SegmentedTabs` fit the grid and are deliberately left alone.
- `cssEntry: dist/hairline.css` carries both tokens and component classes, so there is
  no separate `tokens/` directory in the bundle — everything is in `_ds_bundle.css`,
  reachable from `styles.css`. That is correct, not a missing step.

## Known render warns

- **`[FONT_REMOTE]`** for "Schibsted Grotesk" and "Azeret Mono" — expected. The fonts
  come from a Google Fonts `@import` in `tokens/fonts.css`, by design; the system ships
  no font binaries. Not `[FONT_MISSING]`, and nothing to fix.
- An esbuild warning about `dist/chunk-*.js` being dropped for `sideEffects` is benign:
  the dropped import is a redundant bare import of the token chunk, which is also
  imported properly by the chunk that re-exports it. Bundle contents verified complete.

## Re-sync risks

- **The previews import from `'@hairline/ds'` by package name.** If the package is ever
  renamed, all twelve `.design-sync/previews/*.tsx` break at once.
- **`skill/docs/` is generated.** It is committed, but it is downstream of
  `reference/components/*.prompt.md`. Editing a prompt doc means re-running
  `pnpm build:skill` before the sync, or the uploaded `.prompt.md` silently lags.
- **The preview content is Moni-specific** (XAF amounts, mobile money, school fees).
  That is deliberate — the design system was extracted from Moni — but if Hairline is
  ever rebranded for another product, the cards will read as the wrong product.
- **The react/native split is the standing hazard.** Anything that resolves components
  by fuzzy path will prefer whichever tree it hits first. Any new component needs its
  `componentSrcMap` pin at the same time it is added, or the next sync regroups it.
- **Not verified on a device**: the `@hairline/ds/native` components are typechecked and
  their token translations asserted by `scripts/check-native.ts`, but nothing in this
  sync renders React Native. The uploaded design system is the web build only.
