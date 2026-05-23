# KB setup flows

CLARA provides two flows for provisioning the Knowledge Base structure in Confluence: `setup-kb` for new programmes and `add-track` for mid-programme track additions.

## setup-kb

**Invocation:** `use clara's setup-kb for [programme]`

### Conversation flow

1. **Space check** — CLARA searches for a Confluence space matching the programme name. Spaces are named after their programme. If exactly one match is found, CLARA confirms with the user before proceeding. If none or multiple are found, CLARA stops and asks the user to clarify.
2. **Programme type** — CLARA asks: digital or engineering?
3. **Active tracks** — CLARA asks for the current track list. The user provides track names; CLARA repeats them back for confirmation.
4. **Preview** — CLARA shows the full hierarchy it is about to create and asks for a go-ahead before writing anything.
5. **Create** — CLARA creates the full structure top-down in one pass.
6. **Report** — CLARA states the number of pages created, the URL of the Knowledge Base page, and any failures verbatim.

### What setup-kb creates

- **`Knowledge Base`** — top-level page. Body stores `Programme type: Digital` or `Programme type: Engineering`. This is the only metadata CLARA writes here; tracks are not stored (CLARA discovers them at runtime from the child pages of `Knowledge Base`).
- **`Programme-wide`** — track folder placeholder
- **All artefact-type folders under `Programme-wide`** with the `(Programme-wide)` suffix
- **For each track supplied by the user:** track folder placeholder
- **All artefact-type folders under each track** with the `({{track}})` suffix
- **`_Template — Field note ({{track}})`** as a child of every `Field-notes ({{track}})` folder. The template title carries the same `({{track}})` suffix as its parent folder — Confluence Cloud enforces space-wide unique titles, so a programme with more than one Field-notes folder cannot have two bare `_Template — Field note` pages (see `conventions/field-notes.md` and `conventions/confluence-mcp.md`).

### Artefact-type vocabulary

The following artefact-type folders are created at every level (Programme-wide and each track) at setup time. The set is fixed — it does not vary by programme type or track:

- `Personas`
- `Journeys`
- `Research-synthesis`
- `Prior-knowledge`
- `PRDs`
- `Interview-guides`
- `Field-notes`

`Research-synthesis` is created as a leaf placeholder page per track (not a folder with children), as each track produces one synthesis document. All other types are folder placeholders containing leaf artefact pages.

All folder titles carry the `({{track}})` suffix per the artefact-type folder naming rule in `conventions/confluence-mcp.md`.

### Re-running setup-kb

setup-kb is safe to re-run. CLARA checks whether each page exists before creating it — existing pages are skipped, only missing pages are created. This allows setup-kb to be used for partial recovery if a previous run was interrupted.

---

## add-track

**Invocation:** `use clara's add-track [track] to [programme]`

Used when new tracks are added to a programme mid-programme. Does not require re-running the full setup-kb.

### Flow

1. **Space and KB check** — CLARA verifies the programme space and `Knowledge Base` page exist. If not, CLARA stops and asks the user to run setup-kb first.
2. **Confirm track name** — CLARA repeats the track name back and confirms before creating anything.
3. **Create** — CLARA creates the track folder and all artefact-type folders under it (same vocabulary as setup-kb), including `Field-notes ({{track}})` and `_Template — Field note ({{track}})`.
4. **Report** — pages created, track folder URL, any failures verbatim.

---

## Track discovery

CLARA never stores a track list. When CLARA needs to know which tracks exist in a programme, it reads the child pages of the `Knowledge Base` page at runtime. The KB structure is the source of truth for tracks.
