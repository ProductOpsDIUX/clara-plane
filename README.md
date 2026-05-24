# CLARA

**Confluence Learning & AI Research Assistant** — an internal ProductOps tool that turns Confluence documentation chaos into product clarity through automated synthesis and artefact generation.

CLARA is **Confluence-only**. She reads, traverses, and queries a programme's Confluence knowledge base via MCP, drafts research artefacts (personas, journeys, synthesis pages, PRDs, capability storyboards, test plans, and the rest) across the Research, Design, and Test phases of the ProductOps pipeline, and files them back into the knowledge base under a disciplined hierarchy. She refuses to fabricate, cites source pages, and stops loudly when filing constraints aren't met rather than silently falling back. Prototype scaffolding is out of scope — that's Claude Code's job.

## Repository layout

```
persona.md             CLARA's voice, behaviour, refusal patterns
conventions/           shared rules (MCP discipline, KB paths, cascade, context)
artefacts/             per-artefact briefs (12 of them — Research, Design, Test)
demo-kb/               SKYPROTECT demo knowledge base — test data for CLARA
site/                  CLARA's brand/marketing site
build/build.ts         assembles modular sources into dist/
dist/                  generated outputs — do not hand-edit
  portal/              per-artefact MDX, portal-ready
  SKILL.md             vendor-neutral LLM skill bundle
  system-prompt.md     flat system prompt for hosts without skill protocol
```

## How CLARA is authored

CLARA is authored as **modular Markdown sources** that the build script stitches into derived outputs:

- `persona.md` defines CLARA's identity and is the same across every artefact.
- `conventions/*.md` define shared rules (Confluence filing discipline, KB paths, cascade behaviour, context elicitation) that apply to every artefact.
- `artefacts/*.md` define the artefact-specific brief — what the artefact is, what inputs it needs, what shape it takes, how it files. Each carries YAML frontmatter mirroring the portal's MDX shape.

The build assembles these into per-artefact MDX files in `dist/prompts/`. Each output bundles the persona, conventions, and artefact brief into a self-contained prompt the user can paste into any LLM.

## Build

```bash
pnpm install
pnpm build
```

Outputs `dist/prompts/*.mdx`, one file per artefact.

## How CLARA is delivered

CLARA reaches users through three channels, all generated from the same source:

1. **As a Claude Code skill** (`dist/SKILL.md`) — load CLARA as a skill in Claude Code or the Agent SDK and let her drive the chain end-to-end.
2. **As a system prompt** (`dist/system-prompt.md`) — paste into any MCP host that doesn't support skills.
3. **As per-artefact copy-paste prompts** (`dist/prompts/*.mdx`) — pulled into the ProductOps Co-pilot portal by its `pnpm sync:clara` script, displayed in the portal's prompt library for users without LLM tooling.

## Boundary with the portal

CLARA is the canonical source for Research+Confluence prompts. The portal pulls from `dist/prompts/` at build time and stamps each synced file with `source: clara` plus the CLARA commit SHA. The sync is one-way: CLARA → portal. The portal never edits CLARA prompts in place; changes are made in CLARA's source files and propagated by re-running the sync.
