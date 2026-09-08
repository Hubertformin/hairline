import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ledger — a calm design system for finance',
  description:
    'Monochrome ink on paper, mono uppercase labels, tabular figures, colour reserved for data. Installable with the shadcn CLI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
