A pill button; use `solid` for the single primary action in a view and `quiet` for everything beside it.

```jsx
<Button tone="solid">Record it</Button>
<Button tone="quiet">Move to April</Button>
<Button tone="ghost" size="s">Cancel</Button>
```

Tones: `solid` (black), `quiet` (grey fill), `ghost` (text only), `danger` (alarm wash + alarm ink). Sizes `s|m|l` map to 32/40/48px. Never place two `solid` buttons side by side.
