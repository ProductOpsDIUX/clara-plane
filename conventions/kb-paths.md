# Knowledge Base path convention

All Research artefacts file inside a programme's own Confluence space, under a single top-level page named **Knowledge Base**. The full template is:

```
Knowledge Base / {{track}} / <artefact-type> / <name>
```

## Segments

- **`Knowledge Base`** — literal page name. The top-level container for all Research artefacts in a programme's space. One per space.
- **`{{track}}`** — the track this artefact belongs to. Tracks vary by programme — workstream, capability area, feature line, sub-system, or any other meaningful slice. If the artefact spans tracks, the literal track name is **`Programme-wide`**.
- **`<artefact-type>`** — the artefact category (e.g. `Personas`, `Journeys`, `Research-synthesis`, `Prior-knowledge`, `PRDs`, `Interview-guides`, `Field-notes`). The artefact brief tells you which value to use.
- **`<name>`** — the specific artefact, e.g. a persona name, a journey scope, a topic slug.

## Examples

- `Knowledge Base / Operator-console / Personas / Console-operator`
- `Knowledge Base / Programme-wide / Research-synthesis`
- `Knowledge Base / Tasking-engine / Prior-knowledge / Shift-pattern-effects`
- `Knowledge Base / Operator-console / Field-notes (Operator-console) / Operator-session-2026-05-22`
- `Knowledge Base / Programme-wide / Field-notes (Programme-wide) / _Template — Field note`

## Field notes

`Field-notes` is a reserved artefact-type folder present at every track level, including `Programme-wide`. It is created at KB setup time and contains raw user-dropped notes plus a `_Template — Field note` placeholder page. Unlike other artefact-type folders, `Field-notes` folders are never populated by CLARA — users drop their own notes in. CLARA reads from them when synthesising. See `conventions/field-notes.md` for the full convention.

## What this convention is not

- Not a global structure across programmes. Each programme's space owns its own `Knowledge Base` page; there is no cross-programme `Programmes/<programme>/` container.
- Does not include stage labels (`discovery`, `synthesis`, `framing`). Artefact type is sufficient.
- Does not include iteration dates. Research is the **outer loop** of the flywheel — it happens once at programme/track start, not per-iteration.
