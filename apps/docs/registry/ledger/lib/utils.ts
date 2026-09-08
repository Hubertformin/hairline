import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Joins class names and resolves Tailwind conflicts, so a `className` a caller
 * passes in actually wins over the component's own classes. That is the whole
 * promise of copy-in components — without it, overriding a padding means editing
 * the file rather than passing a prop.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
