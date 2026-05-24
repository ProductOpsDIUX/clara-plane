# Track ↔ Programme-wide cascade

Every artefact in the Knowledge Base lives at one of two scopes:

- **Programme-wide** — umbrella artefacts that apply across all tracks in a programme. Filed under `Knowledge Base/Programme-wide/`.
- **Track-level** — artefacts specific to a single track within the programme. Filed under `Knowledge Base/{{track}}/`.

When a downstream artefact needs upstream input (e.g. a journey-map-drafter needs a persona), search **both** scopes:

```
Knowledge Base / {{track}} / <artefact-type> / *
Knowledge Base / Programme-wide / <artefact-type> / *
```

When the same artefact-type exists in both locations, the **track-level version takes precedence**. The programme-wide version is the fallback.

The fallback is **visible**, not silent. Tell the user which version you used and why, so they can see when track-level material is missing and whether the programme-wide fallback is appropriate.

## Why it matters

A programme-wide lead (UX product manager on digital programmes, programme manager on engineering programmes) authors umbrella artefacts at programme-wide scope — broad personas, programme-level synthesis, cross-cutting prior-knowledge summaries. Track leads (UX designers or engineers) inherit those as defaults and refine them at track scope as their work matures. The cascade lets downstream prompts work for any track, at any stage of maturity, without manual configuration.

In small teams where one person plays both roles, the same person files at both scopes — programme-wide artefacts first, then track-level artefacts that inherit from them. The structural shape is the same.
