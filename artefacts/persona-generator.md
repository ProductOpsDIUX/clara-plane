---
title: "Persona generator"
phase: "research"
domain: "digital"
tool: "clara"
task: "draft a persona from research evidence"
expectedOutput: "Markdown persona with Name, Summary, Goals, Pains, Context, Quote, and Evidence sections — every claim sourced."
inputsFrom:
  - research-synthesiser
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "Interview transcripts, observation notes, or survey responses"
@@if confluence@@
      description: "Pages under *Interviews*, *Field notes*, *Sessions*, *Surveys* (or with 'interview', 'observation', 'session-notes' in titles). Restrict to this programme's space."
@@endif@@
@@if plane@@
      description: "Field-note work items under the `Field-notes` node (or work items with 'interview', 'observation', 'session-notes' in titles). Restrict to this programme's Plane project."
@@endif@@
    - what: "Themes and Friction points from the Research synthesis (optional)"
      description: "Themes and Friction-points sections of `Knowledge Base/{{track}}/Research-synthesis`. Falls back to `Knowledge Base/Programme-wide/Research-synthesis` when no track-level version exists. Sharpens the persona's pains and goals."
  outputPathTemplate: "Knowledge Base/{{track}}/Personas/{{persona-name}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to draft a persona from research evidence.

# context

- **Persona name** — short identifier for the persona (e.g. "Field operator", "Watch officer"). Becomes `{{persona-name}}`.

# inputs

@@if confluence@@
- Search for interview transcripts, observation notes, or survey responses in the programme's Confluence space. Look for pages under *Interviews*, *Field notes*, *Sessions*, *Surveys* (or with `interview`, `observation`, `session-notes` in titles).
@@endif@@
@@if plane@@
- Search for interview transcripts, observation notes, or survey responses in the programme's Plane project. Look for field-note work items under the `Field-notes` node (or work items with `interview`, `observation`, `session-notes` in titles).
@@endif@@
- Read the Themes and Friction-points sections of `Knowledge Base/{{track}}/Research-synthesis` if available. These sharpen the persona's pains and goals.
- Show the user what you found and ask them to confirm or refine the set before reading in detail.
- In copy-paste mode: ask the user to paste interview transcripts (mark sessions with `--- Session [N] / [role] ---`) plus the Themes and Friction-points sections of the Research-synthesis page if available.

# draft

A good persona:
- Names a specific archetype, not a vague "user"
- Roots every claim in evidence (cite the Session IDs that back it)
- Has goals about outcomes, not features
- Surfaces how the archetype *varies* rather than flattening it to an average
- Marks thin/contested areas rather than inventing to fill the shape

Use this fuller structure, one `##` section per heading. Fill only the sections the evidence supports; where it's thin, keep the heading and flag the gap with `[thin]`/`[open]`/`[provisional]` rather than inventing.

### [Persona name — specific, memorable; not "User A"]

- **Snapshot** — 2-3 lines: who they are, where they sit, what they're accountable for, and the one hard part of the job. Cite the sessions.
- **Role and context** — the job as done: environment, tools, who they work with, cadence. Evidence per claim.
- **Goals** — outcome-focused, 3-5. Each with evidence.
- **How they vary** — the axes of variation the data actually shows (e.g. seniority, shift, a formative incident) — not a forced demographic split. Use direct quotes to show the range. Flag small cohorts as directional.
- **Mental model of the system** — how they believe the system/process works, including where that model is wrong or distrusted. Evidence.
- **Pains** — 3-5, with evidence and (where the synthesis provides it) severity/frequency.
- **Behaviours the design needs to support** — what any solution must accommodate, drawn from the above. Evidence.
- **Variations and non-personas** — adjacent roles seen in the data but not this persona, and explicitly who was *not* studied (mark `[open]`).
- **Evidence table** — one row per source (Session ID · profile · note link), plus a synthesis row and any cross-programme row.

If the research notes don't support a section, keep the heading and mark the gap — don't invent. End with the `## Sources` section (per Output discipline).

# filing

@@if confluence@@
- Create a new page at `Knowledge Base/{{track}}/Personas/{{persona-name}}`. Link back to source research pages.
- In copy-paste mode: return the markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create a new work item at `Knowledge Base/{{track}}/Personas/{{persona-name}}`. Relate the work item to its source research work items (and link them).
- In copy-paste mode: return the markdown for pasting and the user will file the work item manually.
@@endif@@

# tips

- Don't ask for multiple personas in one go. Generate one at a time and let each one earn its place.
- The "non-obvious trait" check matters because personas blur into one another when every persona is a "busy professional who values efficiency." The differentiating trait is what makes the persona useful in design discussions.
- The persona output feeds directly into the [journey-map drafter](/prompts/journey-map-drafter), [service-blueprint drafter](/prompts/service-blueprint-drafter), and [PRD generator](/prompts/prd-generator).
