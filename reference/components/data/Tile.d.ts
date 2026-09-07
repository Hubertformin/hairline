import * as React from 'react';

/** The container everything sits in: a fill, a radius, no border. One dark tile per page at most. */
export interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  tone?: 'quiet' | 'paper' | 'dark' | 'alarm' | 'info' | 'caution';
  /** Mono uppercase label in the tile's header row */
  label?: string;
  /** Right-hand element in the header row — a link, a badge, a small button */
  action?: React.ReactNode;
}
export function Tile(props: TileProps): JSX.Element;
