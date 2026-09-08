/**
 * Asserts the React Native adapter's translations.
 *
 * The web layer can be verified by looking at it; the native layer cannot be, not
 * without a device. What can be checked is the arithmetic — and the arithmetic is
 * where this adapter earns its bugs, because every unit conversion between CSS and
 * React Native is a chance to drop a factor.
 */
import { theme, textStyle, shadowStyle, fontFamilyFor, requiredFonts } from '../src/native/theme.js';
import { text, palette } from '@ledger/tokens';

let failed = 0;
function check(what: string, got: unknown, want: unknown) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) {
    console.error(`  FAIL ${what}\n       want ${JSON.stringify(want)}\n       got  ${JSON.stringify(got)}`);
    failed++;
  }
}

// Font families resolve to the names @expo-google-fonts registers.
check('sans 500 family', fontFamilyFor('sans', 500), 'SchibstedGrotesk_500Medium');
check('mono 400 family', fontFamilyFor('mono', 400), 'AzeretMono_400Regular');
check('required font count', requiredFonts.length, 5);

// em tracking becomes px: the label is 9.5px at 0.12em.
check('label letterSpacing', textStyle('label').letterSpacing, Number((9.5 * 0.12).toFixed(2)));
check('label uppercase', textStyle('label').textTransform, 'uppercase');
check('label has no lineHeight', 'lineHeight' in textStyle('label'), false);

// A unitless ratio becomes px: body is 14px at 1.65.
check('body lineHeight', textStyle('body').lineHeight, Math.round(14 * 1.65));
check('body letterSpacing absent', textStyle('body').letterSpacing, undefined);

// Figures carry their negative tracking.
check('figure-xl letterSpacing', textStyle('figure-xl').letterSpacing, Number((46 * -0.03).toFixed(2)));
check('figure-xl lineHeight', textStyle('figure-xl').lineHeight, 46);

// Tabular figures survive the translation — the whole system depends on them.
check('data fontVariant', textStyle('data').fontVariant, ['tabular-nums']);
check('body has no fontVariant', textStyle('body').fontVariant, undefined);

// Every token is translated, and none silently loses its family.
for (const name of Object.keys(text) as (keyof typeof text)[]) {
  const s = theme.type[name];
  if (!s.fontFamily || !s.fontSize) {
    console.error(`  FAIL ${name} translated to ${JSON.stringify(s)}`);
    failed++;
  }
}

// The rgba in a shadow token is split into iOS's colour + opacity.
check('raised shadowColor', shadowStyle('raised').shadowColor, 'rgb(17, 18, 20)');
check('raised shadowOpacity', shadowStyle('raised').shadowOpacity, 0.08);
check('raised shadowRadius', shadowStyle('raised').shadowRadius, 1);
check('float shadowOpacity', shadowStyle('float').shadowOpacity, 0.22);

// Aliases resolve to literal hex, since React Native has no var().
check('action-solid resolved', theme.color['action-solid'], palette['ink-1']);
check('surface-field resolved', theme.color['surface-field'], palette['surface-2']);
check('no var() left', Object.values(theme.color).some((v) => String(v).includes('var(')), false);

if (failed) {
  console.error(`\nnative adapter: ${failed} check(s) failed`);
  process.exit(1);
}
console.log('native adapter ok — units, fonts, shadows and aliases all translate');
