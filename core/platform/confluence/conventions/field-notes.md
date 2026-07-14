# Field notes convention

Field notes are the raw input material users drop into the Knowledge Base — interview transcripts, field observation notes, walkthrough reactions. They are the upstream source CLARA synthesises from when authoring artefacts.

## Folder placement

A `Field-notes` folder exists at every level of the KB:

```
Knowledge Base / Programme-wide / Field-notes (Programme-wide) /
Knowledge Base / {{track}} / Field-notes ({{track}}) /
```

The folder follows the same `({{track}})` suffix rule as all artefact-type folders. A `_Template — Field note ({{track}})` page is created as the first child of each folder at KB setup time — the template title carries the same `({{track}})` suffix because Confluence Cloud enforces space-wide unique page titles and a programme has more than one Field-notes folder.

## Template structure

Each field note is a Confluence page filed under the appropriate `Field-notes ({{track}})` folder. The template:

```
## How to use this template

1. **Duplicate this page** into the `Field-notes ({{track}})` folder (Confluence: page `⋯` menu → *Copy*).
2. **Rename your copy** to something memorable — e.g. `Operator-session-2026-05-22`, `Site-Alpha-night-shift-observation-2026-05-30`. Use whatever scheme suits you; CLARA reads the body, not the title.
    - Drop the `_Template — ` prefix.
    - Drop the `({{track}})` suffix too — leaf field-note pages don't carry the track suffix (only the *folder* does).
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

- **Session ID** — assigned by CLARA on first process. Users must not edit this field.
- **Participants** — roles of people present, with headcount for multiples. Format: `Console operator (x2), Air-defence commander (x1)`. Use role names from the programme's persona vocabulary where possible. Unrecognised roles are treated as anonymous participants with no persona inference.
- **User group** — the organisational group or user community represented. Free text, optional.

The following are read from Confluence page metadata — users never fill them in:

- **Date** — read from Confluence page creation date
- **Conducted by** — read from Confluence page author
- **Track** — inferred from the `Field-notes ({{track}})` folder path

### Body sections

- **Raw notes** — freeform. No structure required. Users write however they like.
- **Verbatim quotes** — exact words from participants only. Attribute to role where possible: `Console operator: "..."`.

## Session ID assignment

Session IDs are assigned by CLARA, not users. Users never fill in or edit the Session ID field.

**Format:** track-prefixed sequential — `PW-01`, `PW-02` for Programme-wide; one prefix per track derived from the folder name (e.g. `OC-01`, `OC-02` for Operator-console). The prefix is the initials of the track name; agree the prefix at KB setup time if the track name is ambiguous.

**Write-back mechanism:** The first time CLARA processes a field note with no Session ID stamped, it assigns the next available ID for that track and writes it back into the Session ID field. On all subsequent runs, CLARA reads the stamped ID and never reassigns it. IDs are therefore stable across all future CLARA sessions.

**Carve-out from the "ask before every KB write" guardrail.** Session-ID write-back is the one exception to the general rule in `persona.md` that every write inside the KB requires explicit user confirmation. The field is reserved CLARA territory by template convention (*"assigned by CLARA — do not edit"*), the write is non-destructive (it fills an empty slot), and synthesis depends on it being stable. CLARA stamps Session IDs automatically without prompting. Every other write inside the KB still asks.

**Write-back failure:** If CLARA cannot write back the Session ID (e.g. insufficient permissions), it must stop and report the failure. It must not proceed with synthesis using an unstamped note — a note cited without a stable ID may receive a different ID in a future session, making citations wrong. This follows the no-silent-fallbacks rule in `mcp.md`.

## CLARA's behaviour when processing field notes

**Session type inference:** CLARA infers whether a note is an interview, field observation, or walkthrough from the combination of Participants (present/blank), User group (present/blank), and body content (quotes-heavy vs. notes-heavy). If the type is genuinely ambiguous, CLARA flags it at synthesis time and asks the user to confirm before proceeding.

**Citations:** When CLARA cites a field note in an artefact, it uses both:
1. **Inline session ID** — `*evidence: OC-03, PW-01*` — for scannability
2. **Confluence page link** — embedded in the artefact body — for navigation

**Synthesis scope:** When synthesising for a given track, CLARA reads field notes from both the track-level and programme-wide Field-notes folders, consistent with the cascade convention in `cascade.md`. Track-level notes take precedence; programme-wide notes are the fallback.

## User workflow

1. Open the `Field-notes ({{track}})` folder in Confluence
2. Duplicate `_Template — Field note ({{track}})` and rename the copy (e.g. `Operator-session-2026-05-22`)
3. Fill in Participants and User group (both optional), then write Raw notes and Verbatim quotes
4. When CLARA next processes field notes for this track, it stamps a Session ID and the note becomes citable
