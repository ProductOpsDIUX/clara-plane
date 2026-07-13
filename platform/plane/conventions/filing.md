# Filing — artefacts and field notes

## Write scope and read scope

**Write scope** — CLARA files artefacts and field notes only within the programme's own Plane project, under the `Knowledge Base` work-item hierarchy. CLARA never files outside the programme project without explicit user confirmation.

**Read scope** — CLARA reads from any Plane project (and any other source) accessible to the user. When synthesising artefacts or building Prior-knowledge summaries, CLARA may draw on content from adjacent programme projects, cross-programme repositories, or any other source the user points it to. The programme project boundary applies to writing only.

This is the **write-narrow, read-wide** principle.

---

## Project resolution

Plane projects are named after their programme. CLARA resolves the project by listing projects and matching the programme name supplied at the start of each run (per `conventions/context.md`) against the project name (e.g. `SKYPROTECT` → identifier `SKYPR`). No project mapping is stored anywhere; the lookup happens at runtime on every run.

---

## Filing flow — artefacts

For every artefact CLARA drafts:

1. **Draft** — CLARA produces the artefact content in the CLI.
2. **State target path** — before asking for confirmation, CLARA states the full target path: `Knowledge Base / {{track}} / <artefact-type> / <name>`.
3. **Confirm** — CLARA asks: *"File to Plane?"* If any parent nodes along the target path are missing, CLARA lists them in the same prompt as placeholders it will create first (e.g. *"Missing parents I'll create as placeholders: `Operator-console`, `Personas`"*). The user reviews the path, the placeholder list, and confirms in one go — no separate prompt per placeholder.
4. **Create** — CLARA creates any disclosed placeholders top-down (each with its `parent` set), then the leaf work item at the target path, and returns the work item URL and identifier (e.g. `SKYPR-42`).
5. **Update case** — if a work item already exists at the target path, CLARA asks whether to update in place (`update_work_item`; Plane's activity log preserves the change history) or create a new draft at an alternative path. CLARA never silently overwrites.

---

## Setup detection

At the start of any artefact or synthesis run, CLARA checks whether a `Knowledge Base` work item exists in the programme project.

**If no Knowledge Base is found:**

CLARA stops and informs the user:

> *"There's no Knowledge Base set up for [programme] yet. I'll need to do that before I can file anything. Should I run setup-kb now?"*

- If yes — CLARA runs the setup-kb flow inline (see `conventions/setup-kb.md`), then proceeds to the notes checkpoint below.
- If no — CLARA drafts the artefact but holds filing. It warns the user that nothing will be filed until the KB exists.

---

## Notes checkpoint

When synthesis is invoked and the Field-notes node has no note children (including immediately after setup-kb completes), CLARA presents three options before proceeding:

> *"Before I can synthesise, I need your field notes. How would you like to proceed?*
> *(a) Point me to work items or pages anywhere in Plane — I'll file them as notes under the Field-notes node*
> *(b) Paste a transcript here — I'll file it as a field-note work item*
> *(c) You'll add notes under the Field-notes node yourself — let me know when they're ready"*

**Option (a)** — CLARA reads the user-pointed source (from any project), creates a structured Field-note work item under `Field-notes` using the standard template, and (with per-item confirmation) leaves a back-link comment on the original pointing to the KB copy. CLARA then proceeds directly into synthesis. The note is cited by its native identifier.

**Option (b)** — CLARA receives the pasted transcript, creates a Field-note work item under `Field-notes`, then proceeds directly into synthesis.

**Option (c)** — CLARA stops, gives the user the Field-notes node URL, and instructs them to invoke synthesis again once notes are in place.

For options (a) and (b), see `conventions/field-notes.md` for the template structure and citation convention.

---

## User-pointed notes — cross-project filing

When the user points CLARA at source material under option (a), it may live in any Plane project. CLARA reads from the source location and files a structured copy as a work item into the programme KB. The original is never moved, deleted, or overwritten — those operations are forbidden by the external-content read-only guardrail in `persona.md`.

After the KB copy is filed, CLARA *offers* to add a back-link notice (as a comment) to the original:

> *"Structured copy filed at [link] by CLARA on [date]. Edit the KB copy going forward."*

This is an additive write to external content, so it requires explicit user confirmation per source item. CLARA asks once per item (or once per batch with a "yes to all / skip all" option if multiple sources are in play). If the user declines, the KB copy still stands; only the back-link notice is skipped.
