# Demo KBs

Demo Knowledge Bases are self-contained setup scripts that an AI assistant with Confluence MCP tools follows to populate a Confluence space with realistic, internally-coherent demo data. They are used to test CLARA's behaviour and to show the portal end-to-end without needing a live programme.

Each demo lives in a single Markdown file in this folder — e.g. [`SKYPROTECT-setup.md`](./SKYPROTECT-setup.md). The file is the *script*, not the data: the assistant reads it and creates pages in Confluence accordingly.

## Conventions for new demo KBs

When authoring a new demo KB setup file, follow the conventions below. These are what make demos render correctly in Confluence, cite each other cleanly, and survive CLARA's automated behaviours (e.g. Session ID stamping). Some are easy to miss — the canonical conventions documents in [`../conventions/`](../conventions/) cover the same ground for live KBs, and demo files must match.

### 1. Folder naming — artefact-type folders carry the `({{track}})` suffix

Every artefact-type folder (Personas, Journeys, PRDs, Field-notes, etc.) must include its parent track in parentheses — `Personas (Programme-wide)`, `Personas (Operator-console)`, `Field-notes (ABC)`. Track folders and leaf artefact pages do *not* take the suffix. Confluence Cloud enforces space-wide unique titles, so two `Personas` folders in the same space would otherwise collide.

See [`../conventions/mcp.md`](../conventions/mcp.md).

### 2. Field-note metablock — bullet list, not pipe-table

Field-note pages (templates and real notes) use a bullet-list metablock with bold labels, not a pipe-delimited table:

```
- **Session ID:** ...
- **Participants:** ...
- **User group:** ...
```

A pipe-table without a header-separator row (`|---|---|`) renders as plain pipe-text in Confluence — no alignment, no table styling. Bullets render cleanly in every converter and match the style used in personas (`- **Summary:** ...`).

### 3. Field-note templates include a self-deleting "How to use" block

Every `_Template — Field note ({{track}})` page in a demo KB must open with a "How to use this template" section that tells the human user how to duplicate the page, what to rename it to, that the Session ID stays blank, and that the How-to-use block itself should be deleted before saving. See the canonical template in [`../conventions/field-notes.md`](../conventions/field-notes.md) — copy it verbatim into the demo file, replacing `{{track}}` with the actual track name.

### 4. Pre-stamp Session IDs on field-note pages in the demo

CLARA auto-stamps Session IDs the first time she processes an unstamped field note (per [`../conventions/field-notes.md`](../conventions/field-notes.md)). If the demo creates a note with the Session ID line left blank, CLARA's auto-stamp will overwrite it with her own scheme (`PW-01`, `OC-01`, etc.) — which will then *not* match the IDs cited in the demo's artefacts.

So: every demo field-note page must ship with its Session ID pre-stamped (`S01`, `S13`, `Field Alpha 1`, etc.) so CLARA reads the stamped value and never reassigns. The IDs used in the demo's citations and the IDs stamped on the field notes must agree exactly.

### 5. Every cited source must exist as a page

If an artefact body cites `S01` or `WT01` or `Field Alpha 1`, a corresponding field-note page with that Session ID must exist in the demo. No dead citations — they look broken under inspection and they erode the demo's credibility.

### 6. Render citations as Confluence page links

Inside artefact bodies, every reference to a session ID must be rendered as a Confluence link to the corresponding field-note page. Keep the short ID as the visible link text — `*evidence: S01, S03*` becomes two inline links labelled `S01` and `S03`. This matches the citation convention in [`../conventions/field-notes.md`](../conventions/field-notes.md) — inline ID for scannability, page link for navigation.

The setup file should include this as an explicit filing-discipline rule the assistant follows when creating each artefact.

### 7. Filing discipline section near the top of the file

The setup file must open with a "Filing discipline" section that tells the executing assistant:

- Verify the target space exists; don't create it
- Verify each parent page exists before creating a child (top-down)
- Create missing parents as placeholders before filing children
- No silent fallbacks — stop and report on any failure, never file at the space root
- Apply the specified labels on each page
- Create pages in the order listed (the order encodes the hierarchy)

See [`SKYPROTECT-setup.md`](./SKYPROTECT-setup.md) for the canonical form of this section.

### 8. Hierarchy diagram lists every leaf page, not just folders

The target-hierarchy diagram near the top of the file must include every leaf page the demo creates — personas, syntheses, journeys, PRDs, *and* field-note pages. A reader skimming the diagram should be able to count pages and recognise what cites what. Don't show only folders.

### 9. Pages numbered in dependency order

Each page in the setup file gets a numbered heading (`### Page N — title`). The numbering must follow creation order: a child page's number must be higher than its parent's. The assistant creates pages in numbered order, so a child appearing before its parent in the file would break the dependency rule.

## Adding a new demo

1. Copy [`SKYPROTECT-setup.md`](./SKYPROTECT-setup.md) as `<programme>-setup.md`.
2. Replace the programme context, hierarchy diagram, and page content.
3. Walk down this checklist before considering it ready.
4. Open a PR; the demo's test is running it against a fresh Confluence space and inspecting the result.
