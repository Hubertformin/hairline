---
category: Forms
---

The system's only tab pattern: a grey track, the active segment raised in white.

```jsx
<SegmentedTabs items={['ALL','MONEY OUT','MONEY IN']} value={f} onChange={setF} />
<SegmentedTabs mono={false} items={[{id:'w',label:'Weekly'},{id:'m',label:'Monthly'}]} value={p} onChange={setP} />
```
