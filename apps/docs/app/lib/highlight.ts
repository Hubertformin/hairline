import { createHighlighter, type Highlighter } from 'shiki';

/**
 * A Shiki theme built from Hairline's own tokens.
 *
 * The system says colour is a data channel, and a rainbow code block would spend it on
 * decoration. So this is deliberately restrained: ink for code, one muted step for
 * punctuation and comments, and exactly two accents — one for strings and one for
 * component names, which are the two things you actually scan a snippet for.
 *
 * Values are literal rather than `var()` because Shiki resolves colours at build time,
 * so the dark variant is a second theme rather than a re-point.
 */
const light = {
  name: 'hairline',
  type: 'light' as const,
  colors: { 'editor.background': '#F7F8F9', 'editor.foreground': '#42454D' },
  settings: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#8E9099', fontStyle: 'italic' } },
    { scope: ['string', 'string.quoted', 'punctuation.definition.string'], settings: { foreground: '#3D7A2A' } },
    { scope: ['constant.numeric', 'constant.language'], settings: { foreground: '#2E4CB8' } },
    { scope: ['keyword', 'storage', 'storage.type', 'keyword.control'], settings: { foreground: '#111214', fontStyle: 'bold' } },
    { scope: ['entity.name.tag', 'support.class.component'], settings: { foreground: '#B84DFF' } },
    { scope: ['entity.other.attribute-name'], settings: { foreground: '#6E7178' } },
    { scope: ['punctuation', 'meta.brace'], settings: { foreground: '#8E9099' } },
  ],
};

const dark = {
  ...light,
  name: 'hairline-dark',
  type: 'dark' as const,
  colors: { 'editor.background': '#212228', 'editor.foreground': '#C6C9D0' },
  settings: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#71757E', fontStyle: 'italic' } },
    { scope: ['string', 'string.quoted', 'punctuation.definition.string'], settings: { foreground: '#7CC96A' } },
    { scope: ['constant.numeric', 'constant.language'], settings: { foreground: '#8098FF' } },
    { scope: ['keyword', 'storage', 'storage.type', 'keyword.control'], settings: { foreground: '#F4F5F7', fontStyle: 'bold' } },
    { scope: ['entity.name.tag', 'support.class.component'], settings: { foreground: '#C98BFF' } },
    { scope: ['entity.other.attribute-name'], settings: { foreground: '#9CA0A9' } },
    { scope: ['punctuation', 'meta.brace'], settings: { foreground: '#71757E' } },
  ],
};

let instance: Promise<Highlighter> | null = null;

function highlighter() {
  instance ??= createHighlighter({ themes: [light, dark], langs: ['tsx', 'bash', 'json', 'css'] });
  return instance;
}

/**
 * Highlights into both themes at once.
 *
 * Both are rendered and CSS reveals one, so switching theme never re-highlights and no
 * highlighter ships to the browser at all.
 */
export async function highlight(code: string, lang = 'tsx'): Promise<Highlighted> {
  const hl = await highlighter();
  return {
    light: hl.codeToHtml(code, { lang, theme: 'hairline' }),
    dark: hl.codeToHtml(code, { lang, theme: 'hairline-dark' }),
  };
}

export interface Highlighted {
  light: string;
  dark: string;
}
