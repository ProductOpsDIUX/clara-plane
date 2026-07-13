# CLARA — Plane

CLARA for programmes whose knowledge base lives in **Plane**.

This repo is a thin platform build. All of CLARA's shared logic — her persona,
the 12 artefact briefs, and the Knowledge Base path/cascade policy — lives in
[`clara-core`](https://github.com/ProductOpsDIUX/clara-core), vendored here
under [`core/`](core/) via `git subtree`. Only the Plane-specific filing
mechanics (`core/platform/plane/`) differ from the Confluence build.

## Build

```bash
pnpm install
pnpm build          # → dist/  (Plane distribution)
```

Emits `dist/SKILL.md`, `dist/system-prompt.md`, and `dist/portal/*.mdx`.

## Updating the shared core

```bash
pnpm core:pull      # git subtree pull from clara-core
```

Never edit `core/` here for shared behaviour — make the change in `clara-core`
so the Confluence build inherits it too. Plane-only filing mechanics live in
`core/platform/plane/`.

See [`core/DEPLOYMENT.md`](core/DEPLOYMENT.md) for install guidance.

> Historical note: the pre-migration standalone layout is preserved in this
> repo's git history below the "retire standalone layout" commit.
