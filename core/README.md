# CLARA — core

CLARA — named for the Latin *clarus*, "clear" — is an internal ProductOps tool that turns a programme's knowledge-base chaos into product clarity through automated synthesis and artefact generation.

This is **`clara-core`**: the single, platform-neutral source of truth. It is consumed by two thin platform repos via `git subtree`:

- **`clara-plane`** — CLARA for programmes whose knowledge base lives in **Plane**.
- **`clara-confluence`** — CLARA for programmes whose knowledge base lives in **Confluence**.

Both platform repos vendor this repo under `core/` and select a platform at build time. **All the drift-sensitive material — CLARA's persona, every artefact's drafting logic, and the Knowledge Base path/cascade policy — lives here, once.** Neither platform repo can fork it. Only vocabulary ("work item" vs "page") and filing mechanics differ, and those are isolated to the per-platform adapters.

## Why a shared core

Two independently-maintained repos would drift: a fix to how a persona is drafted would land in one and be forgotten in the other, and users on the two platforms would drift apart in experience. Here, the shared 90% is single-sourced. A change to drafting logic lands once in core and both platforms inherit it on the next `git subtree pull`.

## Repository layout

```
persona.md                 CLARA's voice, behaviour, refusal patterns (shared)
artefacts/                 per-artefact briefs (12 — Research, Design, Test) (shared)
conventions/               shared policy conventions:
  context.md                 confirming the run context
  kb-paths.md                Knowledge Base path convention
  cascade.md                 track ↔ programme-wide cascade
platform/                  per-platform adapters (the ONLY platform-specific layer):
  plane/
    conventions/{mcp,filing,field-notes,setup-kb}.md
    demo-kb/
  confluence/
    conventions/{mcp,filing,field-notes,setup-kb}.md
    demo-kb/
build/build.ts             platform-aware build
site/                      CLARA's brand/marketing site (platform-neutral)
```

## How platform variation works

Shared-core sources carry conditional blocks:

```
@@if plane@@
… Plane-specific wording (work item, project, native identifier) …
@@endif@@
@@if confluence@@
… Confluence-specific wording (page, space, Session ID) …
@@endif@@
```

At build time the block that doesn't match the target platform is stripped, and the matching block is unwrapped. Lines with no markers are shared verbatim. This guarantees that the same core reproduces each platform's distribution with **no drift** — a change to a shared line changes both platforms identically, and a platform-specific line is visible alongside its counterpart in the same file.

The genuinely divergent filing mechanics (MCP discipline, field-note ID scheme, KB-setup flow, demo KB) live as whole files in `platform/<name>/` rather than as conditionals.

## Build

```bash
pnpm install
CLARA_PLATFORM=plane      pnpm build   # → dist/  (Plane distribution)
CLARA_PLATFORM=confluence pnpm build   # → dist/  (Confluence distribution)
```

Each build emits:

- `dist/portal/*.mdx` — lean per-artefact invocation guides for the ProductOps Co-pilot portal.
- `dist/SKILL.md` — vendor-neutral LLM skill bundle.
- `dist/system-prompt.md` — flat system prompt for hosts without the skill protocol.

`CLARA_OUT` overrides the output directory. In the platform repos the build is run as `CLARA_PLATFORM=<platform> tsx core/build/build.ts`, with `core/` being this repo vendored in.

## Editing rules

- **Shared behaviour** (persona voice, artefact shapes, drafting instructions, KB path/cascade policy) → edit here, in `persona.md` / `artefacts/` / `conventions/`. Both platforms inherit it.
- **Platform-specific wording inside an otherwise-shared file** → wrap in `@@if plane@@ … @@endif@@` / `@@if confluence@@ … @@endif@@`. Keep both variants in the same place so they stay in step.
- **Platform-specific filing mechanics** → edit the relevant file under `platform/<name>/`.
- Never hand-edit `dist/` — it is generated.
