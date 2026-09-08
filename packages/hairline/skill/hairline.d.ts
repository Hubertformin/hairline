import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode, HTMLAttributes, InputHTMLAttributes } from 'react';
import * as tokens from '@hairline/tokens';
export { tokens };

/** Joins class names, dropping anything falsy. */
declare function cx(...parts: (string | false | null | undefined)[]): string;

type ButtonTone = 'solid' | 'quiet' | 'ghost' | 'danger';
type ButtonSize = 's' | 'm' | 'l';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    /** solid = the one primary action; quiet = secondary; ghost = tertiary; danger = destructive */
    tone?: ButtonTone;
    size?: ButtonSize;
    /** Optional trailing glyph, e.g. an arrow on "Continue". */
    iconRight?: ReactNode;
}
/**
 * The one pressable shape: a pill.
 *
 * `solid` black is the single primary action per view — if two solid buttons are
 * visible at once, one of them is wrong.
 */
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

type IconButtonTone = 'quiet' | 'solid' | 'bare';
interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
    children?: ReactNode;
    tone?: IconButtonTone;
    /** Diameter in px. The export's default is 34. */
    size?: number;
    /**
     * The accessible name. Required — a button holding only a glyph is
     * unreachable without one.
     */
    label: string;
}
/** A round button holding one 24-grid stroke glyph. */
declare const IconButton: react.ForwardRefExoticComponent<IconButtonProps & react.RefAttributes<HTMLButtonElement>>;

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    selected?: boolean;
    /**
     * A chip that only reports — a preset that is not pressable. It renders as a
     * `<span>`, so it never lands in the tab order or announces itself as a button.
     */
    interactive?: boolean;
}
/** An outlined pill holding a whole phrase — suggestions, presets, filters. */
declare const Chip: react.ForwardRefExoticComponent<ChipProps & react.RefAttributes<HTMLButtonElement>>;

type BadgeTone = 'neutral' | 'alarm' | 'positive' | 'info' | 'caution';
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    children?: ReactNode;
    tone?: BadgeTone;
}
/**
 * A mono uppercase state marker. Ink and wash travel together — a badge is never
 * a border-only accent.
 */
declare const Badge: react.ForwardRefExoticComponent<BadgeProps & react.RefAttributes<HTMLSpanElement>>;

type FieldSize = 'm' | 'lg';
interface FieldBase extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
    /** The mono uppercase label sitting above the value. */
    label?: ReactNode;
    /** One line of plain consequence under the field. */
    hint?: ReactNode;
    /** A mono code sitting before the value, e.g. `XAF`. */
    prefix?: ReactNode;
    /** `lg` is for the one amount on a form — never for two. */
    size?: FieldSize;
    /** A glyph or button at the trailing edge. */
    trailing?: ReactNode;
}
interface FieldProps extends FieldBase {
    /** The value shown. */
    value?: ReactNode;
    /**
     * Render a real `<input>` rather than static text.
     *
     * The original export was a display-only mock, which is right for a screen
     * design and useless in a running app. Set this and the value becomes typable;
     * pass `inputProps` for `onChange`, `placeholder`, `inputMode` and the rest.
     */
    editable?: boolean;
    inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'size' | 'className'>;
}
/**
 * A labelled value on a grey fill.
 *
 * `size="lg"` is reserved for the single amount a form is about — the figure the
 * whole screen leads with.
 */
declare const Field: react.ForwardRefExoticComponent<FieldProps & react.RefAttributes<HTMLDivElement>>;

interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
    label?: ReactNode;
    /** The chosen value, as displayed. */
    value?: ReactNode;
    /** A category dot. Its colour is data, so it is passed in as a CSS colour. */
    dot?: string;
    /** Mono detail after the value — an account number, a count. */
    meta?: ReactNode;
}
/**
 * A closed dropdown.
 *
 * This is deliberately the trigger only — it renders the closed state and calls
 * `onClick`. It does not open a menu, manage a listbox or handle keyboard
 * selection. Wire it to your own popover, or use a native `<select>` when you
 * need the platform behaviour.
 */
declare const Select: react.ForwardRefExoticComponent<SelectProps & react.RefAttributes<HTMLButtonElement>>;

interface ToggleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    on?: boolean;
    onChange?: () => void;
    /**
     * With a label, the whole settings row renders: the label, its consequence,
     * and the switch. Without one, just the switch.
     */
    label?: ReactNode;
    /** The consequence of turning it on — say the uncomfortable part. */
    note?: ReactNode;
    /** The accessible name when there is no visible label. */
    ariaLabel?: string;
}
/** A switch, or a whole settings row with its consequence. */
declare const Toggle: react.ForwardRefExoticComponent<ToggleProps & react.RefAttributes<HTMLDivElement>>;

interface TabItem {
    id: string;
    label: ReactNode;
    icon?: ReactNode;
}
interface SegmentedTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** A bare string is shorthand for `{ id: s, label: s }`. */
    items?: (TabItem | string)[];
    value?: string;
    onChange?: (id: string) => void;
    /** Mono uppercase labels — the default, and the system's signature. */
    mono?: boolean;
}
/** Grey track, one raised white segment. The only tab pattern in the system. */
declare const SegmentedTabs: react.ForwardRefExoticComponent<SegmentedTabsProps & react.RefAttributes<HTMLDivElement>>;

type TileTone = 'quiet' | 'paper' | 'dark' | 'alarm' | 'info' | 'caution';
interface TileProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    tone?: TileTone;
    /** The mono uppercase label in the tile's head row. */
    label?: ReactNode;
    /** A control at the trailing edge of the head row. */
    action?: ReactNode;
}
/**
 * The only card shape: a fill, a radius, no border.
 *
 * `dark` is the one large coloured area the system allows, and it appears once
 * per page, holding the primary figure.
 */
declare const Tile: react.ForwardRefExoticComponent<TileProps & react.RefAttributes<HTMLDivElement>>;

type StatSize = 'xl' | 'l' | 'm' | 's';
type StatTone = 'ink' | 'alarm' | 'positive' | 'info';
interface StatBlockProps extends HTMLAttributes<HTMLDivElement> {
    label?: ReactNode;
    /** The figure. Group thousands with a thin space: 250 000. */
    value?: ReactNode;
    /** A currency code or unit, set in mono uppercase. */
    unit?: ReactNode;
    /** One line of plain consequence. Say the number, then say what it means. */
    note?: ReactNode;
    size?: StatSize;
    tone?: StatTone;
}
/** Label, big tight figure, one line of meaning. */
declare const StatBlock: react.ForwardRefExoticComponent<StatBlockProps & react.RefAttributes<HTMLDivElement>>;

type DataRowState = 'plain' | 'demoted' | 'struck' | 'alarm';
interface DataRowProps extends HTMLAttributes<HTMLDivElement> {
    name?: ReactNode;
    /** Mono uppercase detail under the name — a date, a method, a category. */
    meta?: ReactNode;
    /** A category dot. Its colour is data, so it is passed in as a CSS colour. */
    dot?: string;
    /** The figure, in mono tabular numerals. */
    amount?: ReactNode;
    /** The running total, in its own right-aligned column. */
    secondary?: ReactNode;
    /**
     * `demoted` and `struck` mark a settled, paid or skipped line. Both keep the
     * value at --ink-3 and add a mark, because lightness alone is not readable.
     */
    state?: DataRowState;
    badge?: ReactNode;
}
/** A hairline line: dot, name, mono meta, figure, running total. */
declare const DataRow: react.ForwardRefExoticComponent<DataRowProps & react.RefAttributes<HTMLDivElement>>;

interface MeterSegment {
    label?: string;
    amount: number;
    /** A CSS colour, normally one of the accent tokens. */
    color: string;
}
interface MeterBarProps extends HTMLAttributes<HTMLDivElement> {
    /** Pass segments for a stacked composition bar; omit them for a limit meter. */
    segments?: MeterSegment[];
    value?: number;
    limit?: number;
    /** Over the limit: the whole track fills, in alarm. */
    over?: boolean;
    /** Any CSS length. Defaults to --stroke-meter. */
    height?: string | number;
}
/** A limit meter, or a stacked composition bar. */
declare const MeterBar: react.ForwardRefExoticComponent<MeterBarProps & react.RefAttributes<HTMLDivElement>>;

export { Badge, type BadgeProps, type BadgeTone, Button, type ButtonProps, type ButtonSize, type ButtonTone, Chip, type ChipProps, DataRow, type DataRowProps, type DataRowState, Field, type FieldProps, type FieldSize, IconButton, type IconButtonProps, type IconButtonTone, MeterBar, type MeterBarProps, type MeterSegment, SegmentedTabs, type SegmentedTabsProps, Select, type SelectProps, StatBlock, type StatBlockProps, type StatSize, type StatTone, type TabItem, Tile, type TileProps, type TileTone, Toggle, type ToggleProps, cx };
