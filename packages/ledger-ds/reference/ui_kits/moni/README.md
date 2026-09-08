# Moni — UI kit

A recreation of the product this direction came from: a personal-finance app in
XAF with a planner, a ledger, accounts, on-chain vaults and an assistant.

- `index.html` — the overview screen, click-through: select an arc or a legend
  row and the left panel and the dial centre follow.
- `Overview.jsx` — the screen, composed from `components/`.
- `TopNav.jsx` — the centred icon+label navigation used on every screen.
- `AssistantBar.jsx` — the floating black pill at the bottom centre.

The full nine-screen set (planner grid, ledger, accounts, vaults, settings,
Kima chat and session, command palette) lives in the project root as Design
Components: `MoniOverview.dc.html` and `MoniForms.dc.html`. Those are the
reference; this kit shows how the primitives compose into one of them.
