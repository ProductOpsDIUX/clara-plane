# Field notes convention

Field notes are the raw input material users drop into the Knowledge Base — interview transcripts, field observation notes, walkthrough reactions. They are the upstream source CLARA synthesises from when authoring artefacts.

## Node placement

A `Field-notes` node exists at every level of the KB:

```
Knowledge Base / Programme-wide / Field-notes /
Knowledge Base / {{track}} / Field-notes /
```

`Field-notes` is a work item whose `parent` is the track node. It carries no `({{track}})` suffix — Plane does not enforce unique titles, and the parent chain disambiguates the Programme-wide `Field-notes` from each track's `Field-notes`. A `_Template — Field note` child work item is created as the first child of each `Field-notes` node at KB setup time.

## Template structure

Each field note is a work item nested under the appropriate `Field-notes` node, with the note content in the work item description. The template body:

```
## How to use this template

1. **Add a new work item** under this `Field-notes` node (or duplicate this template).
2. **Name it** something memorable — e.g. `Operator-session-2026-05-22`, `Site-Alpha-night-shift-observation-2026-05-30`. Use whatever scheme suits you; CLARA reads the description, not the title.
   - Drop the `_Template — ` prefix.
3. **Leave Session ID blank.** CLARA stamps it the first time she processes the note; do not edit this field yourself.
4. **Fill in the rest.** Participants and User group are optional but useful; Raw notes and Verbatim quotes are the substance.
5. Delete this *How to use* block before saving — it's guidance for you, not part of the note.

---

- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** e.g. Console operator (x2), Air-defence commander (x1)
- **User group:** 

---

## Raw notes

_Drop your notes here. No structure required._

---

## Verbatim quotes

_Exact words from participants only. Attribute to role where possible — e.g. Console operator: "..."_
```

### Metadata fields

- **Session ID** — assigned by CLARA on first process (see below). Users must not edit this field.
- **Participants** — roles of people present, with headcount for multiples. Format: `Console operator (x2), Air-defence commander (x1)`. Use role names from the programme's persona vocabulary where possible. Unrecognised roles are treated as anonymous participants with no persona inference.
- **User group** — the organisational group or user community represented. Free text, optional.

The following are read from work-item metadata — users never fill them in:

- **Date** — read from the work item creation date
- **Conducted by** — read from the work item creator
- **Track** — inferred from the `Field-notes` node the item is nested under

### Body sections

- **Raw notes** — freeform. No structure required. Users write however they like.
- **Verbatim quotes** — exact words from participants only. Attribute to role where possible: `Console operator: "..."`.

## Session ID assignment

Session IDs are assigned by CLARA, not users. Users never fill in or edit the Session ID field.

**Format:** track-prefixed sequential — `PW-01`, `PW-02` for Programme-wide; one prefix per track derived from the track (e.g. `OP-01`, `OP-02` for an operator track/user-group). The prefix is agreed at KB setup time if the track name is ambiguous; keep it stable once chosen.

**Write-back mechanism:** The first time CLARA processes a field note with no Session ID stamped, it assigns the next available ID for that track and writes it back into the Session ID field of the work item (both the metadata block in the description and, where used, the title prefix). On all subsequent runs, CLARA reads the stamped ID and never reassigns it. IDs are therefore stable across all future CLARA sessions.

**Carve-out from the "ask before every KB write" guardrail.** Session-ID write-back is the one exception to the general rule in `persona.md` that every write inside the KB requires explicit user confirmation. The field is reserved CLARA territory by template convention (*"assigned by CLARA — do not edit"*), the write is non-destructive (it fills an empty slot), and synthesis depends on it being stable. CLARA stamps Session IDs automatically without prompting. Every other write inside the KB still asks first.

**Write-back failure:** If CLARA cannot write back the Session ID (e.g. insufficient permissions), it must stop and report the failure. It must not proceed with synthesis using an unstamped note — a note cited without a stable ID may receive a different ID in a future session, making citations wrong. This follows the no-silent-fallbacks rule in `mcp.md`.

**Citations:** When CLARA cites a field note in an artefact, it uses both:
1. **Inline Session ID** — `*evidence: OP-03, PW-01*` — for scannability
2. **Work item link** — embedded in the artefact body — for navigation

**Synthesis scope:** When synthesising for a given track, CLARA reads field notes from both the track-level and programme-wide `Field-notes` nodes, consistent with the cascade convention in `cascade.md`. Track-level notes take precedence; programme-wide notes are the fallback.

## CLARA's behaviour when processing field notes

**No duplicates.** If the user has already added a field note for a session, CLARA never creates a second copy of it. It stamps the Session ID onto the existing note (renaming/prefixing the title where that is the convention) and cites that. CLARA only creates a new field-note work item when the user explicitly asks it to file one (e.g. from a pasted transcript or a user-pointed source), per the synthesis-time options in `filing.md`.

**Session type inference:** CLARA infers whether a note is an interview, field observation, or walkthrough from the combination of Participants (present/blank), User group (present/blank), and body content (quotes-heavy vs. notes-heavy). If the type is genuinely ambiguous, CLARA flags it at synthesis time and asks the user to confirm before proceeding.

## User workflow

1. Open the `Field-notes` node for the track in Plane
2. Add a new child work item (or duplicate `_Template — Field note`) and name it (e.g. `Operator-session-2026-05-22`)
3. Fill in Participants and User group (both optional), then write Raw notes and Verbatim quotes. Leave Session ID blank.
4. CLARA stamps the Session ID the first time she processes the note; from then on the note is citable by that stable ID
