# React Flow Incident Investigation (GitHub Pages)

Interactive, editable **production incident flow** built with **React Flow** (Vite + TypeScript).
Ships with:
- Save/Load to localStorage
- Export/Import JSON
- Minimap, Controls, Background
- GitHub Pages workflow that auto-sets base path

## Run locally
```bash
npm ci
npm run dev
```

## Deploy to GitHub Pages
1. Push to the `main` branch.
2. In GitHub: **Settings → Pages** → set **Source** to "GitHub Actions".
3. The provided workflow builds and deploys `/dist` and sets `--base "/<repo>/"` automatically.
4. Open the Pages URL from the workflow output.

## Editing the graph
- Drag nodes around, add edges by dragging from handles.
- Changes persist to `localStorage` automatically.
- **Export JSON** to share a snapshot; **Import JSON** to load one back.

## Customize
- Add custom nodes/edges in `App.tsx` (register with `nodeTypes` / `edgeTypes`).
- Pre-populate `initialNodes` / `initialEdges` from your runbook.
- Wire node clicks to external runbooks by adding `onNodeClick` and using `window.open(...)`.

## Stack
- React 18, Vite 5, TypeScript
- React Flow v11

---

MIT License
