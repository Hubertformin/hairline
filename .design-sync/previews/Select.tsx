import { Select } from 'ledger-ds';

/** The canonical use: a category with its dot and a count. */
export const WithCategory = () => (
  <div style={{ width: 360 }}>
    <Select label="Category" value="School fees" dot="var(--a-coral)" meta="3 this month" />
  </div>
);

/** Plain — no dot, no meta. */
export const Plain = () => (
  <div style={{ width: 360 }}>
    <Select label="From" value="Savings vault" />
  </div>
);

/** The category list, which is where the accent spectrum earns its keep. */
export const Categories = () => (
  <div style={{ width: 360, display: 'grid', gap: 16 }}>
    <Select label="Category" value="School fees" dot="var(--a-coral)" meta="3" />
    <Select label="Category" value="Bills" dot="var(--a-blue)" meta="7" />
    <Select label="Category" value="Food" dot="var(--a-amber)" meta="21" />
  </div>
);
