# KB setup flows

CLARA provides two flows for provisioning the Knowledge Base structure in Plane: `setup-kb` for new programmes and `add-track` for mid-programme track additions.

## setup-kb

**Invocation:** `use clara's setup-kb for [programme]`

### Conversation flow

1. **Project check** — CLARA lists projects and matches one to the programme name. Projects are named after their programme. If exactly one match is found, CLARA confirms with the user before proceeding. If none or multiple are found, CLARA stops and asks the user to clarify.
2. **Programme type** — CLARA asks: digital or engineering?
3. **Active tracks** — CLARA asks for the current track list. The user provides track names; CLARA repeats them back for confirmation.
4. **Preview** — CLARA shows the full hierarchy it is about to create and asks for a go-ahead before writing anything.
5. **Create** — CLARA creates the full structure top-down in one pass: it creates each page, then nests it under the node above via the browser connection (`parent_id`). Nesting requires the browser connection — the public page API cannot durably set `parent_id`.
6. **Report** — CLARA states the number of pages created, the URL of the `Knowledge Base` page, and any failures verbatim.

### What setup-kb creates

Every node is a Plane page; the tree is formed by `parent_id` links.

- **`Knowledge Base`** — root page (no `parent_id`). Its description stores `Programme type: Digital` or `Programme type: Engineering`. This is the only metadata CLARA writes here; tracks are not stored (CLARA discovers them at runtime from the children of `Knowledge Base`).
- **`Programme-wide`** — track node, `parent_id` = `Knowledge Base`.
- **All artefact-type nodes under `Programme-wide`** — plain titles, no suffix, `parent_id` = `Programme-wide`.
- **For each track supplied by the user:** a track node, `parent_id` = `Knowledge Base`.
- **All artefact-type nodes under each track** — plain titles, no suffix, `parent_id` = the track node.
- **`_Template — Field note`** as a child of every `Field-notes` node. Plain title, no suffix — Plane does not enforce unique titles, so multiple `_Template — Field note` items across different `Field-notes` nodes coexist (see `conventions/field-notes.md` and `conventions/mcp.md`).

The parent-nesting (the sub-page tree) is the only structure — pages carry no work-item-style types, states, or labels. Categorisation comes from the artefact-type node a page is nested under.

### Artefact-type vocabulary

The artefact-type nodes created at every level (Programme-wide and each track) depend on the programme type CLARA captured in step 2. The list is ordered to match the ProductOps pipeline (Research → Design → Test) and the dependency chain within each phase, so the previewed hierarchy reads as a natural workflow. Nodes are created in this order.

**Research phase — shared (every programme):**

1. `Prior-knowledge`
2. `Interview-guides`
3. `Field-notes`
4. `Research-synthesis`
5. `Personas`
6. `Journeys`

**Research phase — digital programmes additionally get:**

7. `Service-blueprints`
8. `PRDs`

**Research phase — engineering programmes additionally get:**

7. `Operational-scenarios`
8. `Capability-specs`
9. `Mission-threads`

**Design phase — engineering programmes only:**

10. `Capability-storyboards`

**Test phase — shared (every programme):**

- `Test-plans` (always last)

`Research-synthesis` is created as a leaf page per track (not a container node with children), as each track produces one synthesis document held in that page's body. All other types are container nodes holding leaf artefact pages.

All node titles are plain — no `({{track}})` suffix — per the naming rule in `conventions/mcp.md`.

### Re-running setup-kb

setup-kb is safe to re-run. CLARA checks whether each node exists (by walking the parent chain) before creating it — existing nodes are skipped, only missing ones are created. This allows setup-kb to be used for partial recovery if a previous run was interrupted.

---

## add-track

**Invocation:** `use clara's add-track [track] to [programme]`

Used when new tracks are added to a programme mid-programme. Does not require re-running the full setup-kb.

### Flow

1. **Project and KB check** — CLARA verifies the programme project and the `Knowledge Base` page exist. If not, CLARA stops and asks the user to run setup-kb first. CLARA reads `Programme type: Digital` or `Programme type: Engineering` from the KB page body to determine which artefact-type vocabulary to use; if the line is missing or malformed, CLARA stops and asks the user to confirm the programme type before proceeding.
2. **Confirm track name** — CLARA repeats the track name back and confirms before creating anything.
3. **Create** — CLARA creates the track node and all artefact-type nodes under it (same vocabulary as setup-kb, gated by the programme type from step 1), including `Field-notes` and its `_Template — Field note` child.
4. **Report** — pages created, track node URL, any failures verbatim.

---

## Track discovery

CLARA never stores a track list. When CLARA needs to know which tracks exist in a programme, it lists the children of the `Knowledge Base` page at runtime. The KB structure is the source of truth for tracks.
