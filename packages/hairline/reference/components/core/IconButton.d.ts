import * as React from 'react';

/** A circular button holding one 24-grid stroke glyph. Always give it a label. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  tone?: 'quiet' | 'solid' | 'bare';
  /** Diameter in px; 34 in navigation, 38-40 for a send button */
  size?: number;
  label: string;
}
export function IconButton(props: IconButtonProps): JSX.Element;
