/**
 * Ledger — React Native.
 *
 * Same components, same prop names as the web build wherever the platform allows
 * it. The differences are the ones React Native forces, and each is documented on
 * the component:
 *
 *   - `onPress` replaces `onClick`;
 *   - text props are strings rather than ReactNode, because RN cannot render a
 *     bare string outside `<Text>`;
 *   - `Select` and `IconButton` take a `caret` / `children` glyph rather than
 *     shipping an inline SVG, since RN has no SVG without `react-native-svg`;
 *   - `Toggle` positions its knob rather than animating it.
 *
 * Load the fonts before your first paint — without them RN falls back to the
 * system face and the tabular figures the system depends on are lost. See
 * `requiredFonts`.
 */

export { theme, textStyle, shadowStyle, fontFamilyFor, requiredFonts, type Theme } from './theme.js';
export { renderText } from './text.js';

export { Button, type ButtonProps, type ButtonTone, type ButtonSize } from './Button.js';
export { IconButton, type IconButtonProps, type IconButtonTone } from './IconButton.js';
export { Chip, type ChipProps } from './Chip.js';
export { Badge, type BadgeProps, type BadgeTone } from './Badge.js';

export { Field, type FieldProps, type FieldSize } from './Field.js';
export { Select, type SelectProps } from './Select.js';
export { Toggle, type ToggleProps } from './Toggle.js';
export { SegmentedTabs, type SegmentedTabsProps, type TabItem } from './SegmentedTabs.js';

export { Tile, type TileProps, type TileTone } from './Tile.js';
export { StatBlock, type StatBlockProps, type StatSize, type StatTone } from './StatBlock.js';
export { DataRow, type DataRowProps, type DataRowState } from './DataRow.js';
export { MeterBar, type MeterBarProps, type MeterSegment } from './MeterBar.js';
