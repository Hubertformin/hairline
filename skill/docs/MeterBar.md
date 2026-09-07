---
category: Data
---

Two shapes in one: a limit meter, or a stacked share bar.

```jsx
<MeterBar value={86400} limit={120000} />
<MeterBar over />
<MeterBar segments={[{amount:227400,color:'var(--a-green)'},{amount:767800,color:'var(--a-amber)'},{amount:1486056,color:'var(--a-blue)'}]} />
```

Label the segments underneath with a dot, a name and a share — the bar alone never carries the numbers.
