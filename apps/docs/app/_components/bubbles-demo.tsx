'use client';

import * as React from 'react';

import { CategoryBubbles, type Bubble } from '@/registry/hairline/ui/category-bubbles';

const BUBBLES: Bubble[] = [
  { id: 'fees', label: 'School fees', icon: '🎓', amount: 258900, color: '#FF6B4A' },
  { id: 'bills', label: 'Bills', icon: '💡', amount: 142000, color: '#3B5BFF' },
  { id: 'food', label: 'Food', icon: '🍚', amount: 98000, color: '#FFA83D' },
  { id: 'transport', label: 'Transport', icon: '🚌', amount: 42000, color: '#8CD44A' },
  { id: 'airtime', label: 'Airtime', icon: '📱', amount: 18500, color: '#B84DFF' },
  { id: 'other', label: 'Other', icon: '•', amount: 9200, color: '#8B5CF6' },
];

export function BubblesDemoClient() {
  const [selected, setSelected] = React.useState<string | null>(null);
  const total = BUBBLES.reduce((s, b) => s + b.amount, 0);

  return (
    <CategoryBubbles
      bubbles={BUBBLES}
      total={total}
      coreLabel="Total expenses"
      coreCaption="17 OF 26 DAYS COVERED"
      selectedId={selected}
      onSelect={(id) => setSelected((cur) => (cur === id ? null : id))}
    />
  );
}
