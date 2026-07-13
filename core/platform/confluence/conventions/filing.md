# Filing — artefacts and field notes

## Write scope and read scope

**Write scope** — CLARA files artefacts and field notes only within the programme's own Confluence space, under the `Knowledge Base` hierarchy. CLARA never files outside the programme space without explicit user confirmation.

**Read scope** — CLARA reads from any Confluence space accessible to the user. When synthesising artefacts or building Prior-knowledge summaries, CLARA may draw on content from adjacent programme spaces, cross-programme repositories, or any other space the user points it to. The programme space boundary applies to writing only.

This is the **write-narrow, read-wide** principle.

---

## Space resolution

Confluence spaces are named after their programme. CLARA resolves the space by searching for a space matching the programme name supplied at the start of each run (per `conventions/context.md`). No space mapping is stored anywhere; the lookup happens at runtime on every run.

---

## Filing flow — artefacts

For every artefact CLARA drafts:

1. **Draft** — CLARA produces the artefact content in the CLI.
2. **State target path** — before asking for confirmation, CLARA states the full target path: `Knowledge Base / {{track}} / <artefact-type> ({{track}}) / <name>`.
3. **Confirm** — CLARA asks: *"File to Confluence?"* If any parent pages along the target path are missing, CLARA lists them in the same prompt as placeholders it will create first (e.g. *"Missing parents I'll create as placeholders: `Operator-console`, `Personas (Operator-console)`"*). The user reviews the path, the placeholder list, and confirms in one go — no separate prompt per placeholder.
4. **Create** — CLARA creates any disclosed placeholders top-down, then the page at the target path, and returns the page URL.
5. **Update case** — if a page already exists at the target path, CLARA asks whether to update in place (Confluence page history preserved) or create a new draft at an alternative path. CLARA never silently overwrites.

---

## Setup detection

At the start of any artefact or synthesis run, CLARA checks whether a `Knowledge Base` page exists in the programme space.

**If no Knowledge Base is found:**

CLARA stops and informs the user:

> *"There's no Knowledge Base set up for [programme] yet. I'll need to do that before I can file anything. Should I run setup-kb now?"*

- If yes — CLARA runs the setup-kb flow inline (see `conventions/setup-kb.md`), then proceeds to the notes checkpoint below.
- If no — CLARA drafts the artefact but holds filing. It warns the user that nothing will be filed until the KB exists.

---

## Notes checkpoint

When synthesis is invoked and the Field-notes folder is empty (including immediately after setup-kb completes), CLARA presents three options before proceeding:

> *"Before I can synthesise, I need your field notes. How would you like to proceed?*
> *(a) Point me to pages in any Confluence space — I'll file them into the Field-notes folder*
> *(b) Paste a transcript here — I'll file and id it*
> *(c) You'll add notes to the Field-notes folder yourself — let me know when they're ready"*

**Option (a)** — CLARA reads the user-pointed pages (from any space), creates a structured Field note page in `Field-notes ({{track}})` using the standard template, assigns a session ID via write-back, and leaves a notice on the original page pointing to the KB copy. CLARA then proceeds directly into synthesis.

**Option (b)** — CLARA receives the pasted transcript, creates a Field note page in `Field-notes ({{track}})`, assigns a session ID via write-back, then proceeds directly into synthesis.

**Option (c)** — CLARA stops, gives the user the Field-notes folder URL, and instructs them to invoke synthesis again once notes are in place.

For options (a) and (b), see `conventions/field-notes.md` for the session ID write-back mechanism and template structure.

---

## User-pointed notes — cross-space filing

When the user points CLARA at source pages under option (a), those pages may be in any Confluence space. CLARA reads from the source location and files a structured copy into the programme KB. The original is never moved, deleted, or overwritten — those operations are forbidden by the external-content read-only guardrail in `persona.md`.

After the KB copy is filed, CLARA *offers* to add a back-link notice to the original page:

> *"Structured copy filed at [link] by CLARA on [date]. Edit the KB copy going forward."*

This is an additive write to external content, so it requires explicit user confirmation per source page. CLARA asks once per page (or once per batch with a "yes to all / skip all" option if multiple source pages are in play). If the user declines, the KB copy still stands; only the back-link notice is skipped.
