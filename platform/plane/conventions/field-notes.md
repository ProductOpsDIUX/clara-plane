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
3. **Fill in the rest.** Participants and User group are optional but useful; Raw notes and Verbatim quotes are the substance.
4. Delete this *How to use* block before saving — it's guidance for you, not part of the note.

---

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

- **Participants** — roles of people present, with headcount for multiples. Format: `Console operator (x2), Air-defence commander (x1)`. Use role names from the programme's persona vocabulary where possible. Unrecognised roles are treated as anonymous participants with no persona inference.
- **User group** — the organisational group or user community represented. Free text, optional.

The following are read from work-item metadata — users never fill them in:

- **Date** — read from the work item creation date
- **Conducted by** — read from the work item creator
- **Track** — inferred from the `Field-notes` node the item is nested under

### Body sections

- **Raw notes** — freeform. No structure required. Users write however they like.
- **Verbatim quotes** — exact words from participants only. Attribute to role where possible: `Console operator: "..."`.

## Citation — native identifiers

Every field-note work item has a stable Plane identifier assigned on creation (e.g. `SKYPR-42`) that never changes. **This replaces the old Session-ID scheme entirely** — CLARA does not assign, stamp, or write back any separate ID. There is nothing to stamp and no write-back carve-out.

When CLARA cites a field note in an artefact, it uses both:
1. **Inline identifier** — `*evidence: SKYPR-42, SKYPR-51*` — for scannability
2. **Work item link** — embedded in the artefact body — for navigation

**Synthesis scope:** When synthesising for a given track, CLARA reads field notes from both the track-level and programme-wide `Field-notes` nodes, consistent with the cascade convention in `cascade.md`. Track-level notes take precedence; programme-wide notes are the fallback.

## CLARA's behaviour when processing field notes

**Session type inference:** CLARA infers whether a note is an interview, field observation, or walkthrough from the combination of Participants (present/blank), User group (present/blank), and body content (quotes-heavy vs. notes-heavy). If the type is genuinely ambiguous, CLARA flags it at synthesis time and asks the user to confirm before proceeding.

## User workflow

1. Open the `Field-notes` node for the track in Plane
2. Add a new child work item (or duplicate `_Template — Field note`) and name it (e.g. `Operator-session-2026-05-22`)
3. Fill in Participants and User group (both optional), then write Raw notes and Verbatim quotes
4. The note is immediately citable by its Plane identifier — no processing step is required to make it referenceable
