# Knowledge Base path convention

@@if confluence@@
All research artefacts produced across the Research, Design, and Test phases of the ProductOps pipeline file inside a programme's own Confluence space, under a single top-level page named **Knowledge Base**. The full template is:
@@endif@@
@@if plane@@
All research artefacts produced across the Research, Design, and Test phases of the ProductOps pipeline live inside a programme's own Plane **project**, nested under a single top-level work item named **Knowledge Base**. The full template is:
@@endif@@

```
Knowledge Base / {{track}} / <artefact-type> / <name>
```

@@if plane@@
Each segment is a Plane **work item**, and each level is the `parent` of the one below it. The nesting *is* the hierarchy — Plane renders it as an expandable sub-item tree, and the parent chain is the canonical retrieval path.

@@endif@@
## Segments

@@if confluence@@
- **`Knowledge Base`** — literal page name. The top-level container for all research artefacts produced across the Research, Design, and Test phases in a programme's space. One per space.
- **`{{track}}`** — the track this artefact belongs to. Tracks vary by programme — workstream, capability area, feature line, sub-system, or any other meaningful slice. If the artefact spans tracks, the literal track name is **`Programme-wide`**.
- **`<artefact-type>`** — the artefact category (e.g. `Personas`, `Journeys`, `Research-synthesis`, `Prior-knowledge`, `PRDs`, `Interview-guides`, `Capability-storyboards`, `Test-plans`, `Field-notes`). The artefact brief tells you which value to use.
- **`<name>`** — the specific artefact, e.g. a persona name, a journey scope, a topic slug.
@@endif@@
@@if plane@@
- **`Knowledge Base`** — a work item at the root of the project (its `parent` is empty). The top-level container for all research artefacts produced across the Research, Design, and Test phases in a programme's project. One per project.
- **`{{track}}`** — the track this artefact belongs to, a work item whose `parent` is `Knowledge Base`. Tracks vary by programme — workstream, capability area, feature line, sub-system, or any other meaningful slice. If the artefact spans tracks, the literal track name is **`Programme-wide`**.
- **`<artefact-type>`** — the artefact category (e.g. `Personas`, `Journeys`, `Research-synthesis`, `Prior-knowledge`, `PRDs`, `Interview-guides`, `Capability-storyboards`, `Test-plans`, `Field-notes`), a work item whose `parent` is the track node. The artefact brief tells you which value to use.
- **`<name>`** — the specific artefact (a persona name, a journey scope, a topic slug), a leaf work item whose `parent` is the artefact-type node. The artefact's own content lives in this work item's description.

## No title suffix

Unlike the old Confluence hierarchy, artefact-type and Field-notes nodes do **not** carry a `({{track}})` suffix. Plane does not enforce unique work-item titles within a project, so two `Personas` nodes under different tracks coexist without collision. The parent chain disambiguates them. Title nodes plainly: `Personas`, `Field-notes`, `Journeys`.
@@endif@@

## Examples

- `Knowledge Base / Operator-console / Personas / Console-operator`
- `Knowledge Base / Programme-wide / Research-synthesis`
- `Knowledge Base / Tasking-engine / Prior-knowledge / Shift-pattern-effects`
@@if confluence@@
- `Knowledge Base / Operator-console / Field-notes (Operator-console) / Operator-session-2026-05-22`
- `Knowledge Base / Programme-wide / Field-notes (Programme-wide) / _Template — Field note`
@@endif@@
@@if plane@@
- `Knowledge Base / Operator-console / Field-notes / Operator-session-2026-05-22`

## Retrieval

Because every artefact is a work item, retrieval is a query, not a path-string parse. To find all personas in a track, resolve the track's `Personas` node and list its children, or filter work items by parent chain. The parent link is the contract — every artefact is reachable by walking down from `Knowledge Base`.
@@endif@@

## Field notes

@@if confluence@@
`Field-notes` is a reserved artefact-type folder present at every track level, including `Programme-wide`. It is created at KB setup time and contains raw user-dropped notes plus a `_Template — Field note` placeholder page. Unlike other artefact-type folders, `Field-notes` folders are never populated by CLARA — users drop their own notes in. CLARA reads from them when synthesising. See `conventions/field-notes.md` for the full convention.
@@endif@@
@@if plane@@
`Field-notes` is a reserved artefact-type node present at every track level, including `Programme-wide`. It is created at KB setup time and holds raw user-dropped notes as child work items plus a `_Template — Field note` child. Unlike other artefact-type nodes, `Field-notes` nodes are never populated by CLARA — users add their own notes as children. CLARA reads from them when synthesising, and stamps each with a CLARA-assigned Session ID (e.g. `OP-03`) it can cite. See `conventions/field-notes.md`.
@@endif@@

## What this convention is not

@@if confluence@@
- Not a global structure across programmes. Each programme's space owns its own `Knowledge Base` page; there is no cross-programme `Programmes/<programme>/` container.
@@endif@@
@@if plane@@
- Not a global structure across programmes. Each programme's project owns its own `Knowledge Base` work item; there is no cross-programme container.
@@endif@@
- Does not include stage labels (`discovery`, `synthesis`, `framing`). Artefact type is sufficient.
- Does not include iteration dates. Research is the **outer loop** of the flywheel — it happens once at programme/track start, not per-iteration.
