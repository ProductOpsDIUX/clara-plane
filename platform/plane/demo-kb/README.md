# Demo KBs

Demo Knowledge Bases are self-contained setup scripts that an AI assistant with Plane MCP tools follows to populate a Plane project with realistic, internally-coherent demo data. They are used to test CLARA's behaviour and to show the portal end-to-end without needing a live programme.

Each demo lives in a single Markdown file in this folder — e.g. [`SKYPROTECT-setup.md`](./SKYPROTECT-setup.md). The file is the *script*, not the data: the assistant reads it and creates pages in Plane accordingly.

## Conventions for new demo KBs

When authoring a new demo KB setup file, follow the conventions below. These are what make demos render correctly in Plane, cite each other cleanly, and file into a coherent page hierarchy. Some are easy to miss — the canonical conventions documents in [`../conventions/`](../conventions/) cover the same ground for live KBs, and demo files must match.

### 1. Hierarchy is the parent chain — no title suffixes

Every node in the Knowledge Base is a **page**, and hierarchy is expressed by the `parent_id` field: `Knowledge Base / {{track}} / <artefact-type> / <name>`, where each segment is a page whose `parent_id` is the segment above it. Artefact-type groupings (Personas, Journeys, PRDs, Field-notes, etc.) and leaf artefacts are titled plainly — `Personas`, `Field-notes`, `Console-operator`. Plane does not enforce unique titles, so two `Personas` pages in the same project are fine; they are disambiguated by their parent chain, not by any suffix.

See [`../conventions/mcp.md`](../conventions/mcp.md).

### 2. Field-note metablock — bullet list, not pipe-table

Field-note pages (templates and real notes) use a bullet-list metablock with bold labels, not a pipe-delimited table:

```
- **Participants:** ...
- **User group:** ...
```

A pipe-table without a header-separator row (`|---|---|`) renders as plain pipe-text — no alignment, no table styling. Bullets render cleanly in every converter and match the style used in personas (`- **Summary:** ...`).

### 3. Field-note templates include a self-deleting "How to use" block

Every `_Template — Field note` page in a demo KB must open with a "How to use this template" section that tells the human user how to create a new page under the `Field-notes` grouping (setting its `parent_id`), what to name it, that the note is cited by its native Plane identifier (assigned on creation, not set by hand), and that the How-to-use block itself should be deleted before saving. See the canonical template in [`../conventions/field-notes.md`](../conventions/field-notes.md) — copy it verbatim into the demo file, replacing `{{track}}` with the actual track name.

### 4. Cite field notes by native Plane identifier

Plane assigns each page a native identifier (e.g. `SKYPR-42`) **on creation**, and that identifier depends on creation order — so you cannot know it in advance. Do not pre-assign or invent fixed identifiers in the demo file. Instead, the demo's artefact bodies cite each note by its own short reference (`S01`, `WT02`, `Field Alpha 1`) as the visible label, and the executing assistant records the actual Plane identifier each note receives when it is created, then links citations to those identifiers.

### 5. Every cited source must exist as a page

If an artefact body cites `S01` or `WT01` or `Field Alpha 1`, a corresponding field-note page must exist in the demo. No dead citations — they look broken under inspection and they erode the demo's credibility. The concept is unchanged from the old model; only the identifier scheme (native Plane identifiers, assigned on creation, instead of pre-agreed reference codes) has changed.

### 6. Render citations as page links

Inside artefact bodies, every reference to a cited note should be rendered as a link to the corresponding field-note page. Keep the note's short reference as the visible link text — `*evidence: S01, S03*` becomes two inline links labelled `S01` and `S03`, each pointing at the page the assistant created for that note. This matches the citation convention in [`../conventions/field-notes.md`](../conventions/field-notes.md) — short reference for scannability, page link for navigation.

The setup file should include this as an explicit filing-discipline rule the assistant follows when creating each artefact.

### 7. Filing discipline section near the top of the file

The setup file must open with a "Filing discipline" section that tells the executing assistant:

- Verify the target project exists; don't create it
- Verify each parent page exists before creating a child (top-down), setting the child's `parent_id` to the page above it
- Create missing parents as placeholders before filing children
- No silent fallbacks — stop and report on any failure, never file at the project root
- Labels are optional Plane labels applied at creation; the hierarchy is carried by the parent chain, so no label is required or load-bearing
- Create pages in the order listed (the order encodes the hierarchy, so every parent precedes its children)

See [`SKYPROTECT-setup.md`](./SKYPROTECT-setup.md) for the canonical form of this section.

### 8. Hierarchy diagram lists every leaf page, not just groupings

The target-hierarchy diagram near the top of the file must include every leaf page the demo creates — personas, syntheses, journeys, PRDs, *and* field-note pages. A reader skimming the diagram should be able to count pages and recognise what cites what. Don't show only the artefact-type groupings.

### 9. Pages numbered in dependency order

Each page in the setup file gets a numbered heading (`### Page N — title`). The numbering must follow creation order: a child's number must be higher than its parent's. The assistant creates pages in numbered order, so a child appearing before its parent in the file would break the dependency rule.

## Adding a new demo

1. Copy [`SKYPROTECT-setup.md`](./SKYPROTECT-setup.md) as `<programme>-setup.md`.
2. Replace the programme context, hierarchy diagram, and page content.
3. Walk down this checklist before considering it ready.
4. Open a PR; the demo's test is running it against a fresh Plane project and inspecting the result.
