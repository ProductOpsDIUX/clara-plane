---
title: "Persona generator"
phase: "research"
domain: "digital"
tool: "clara"
task: "draft a persona from research evidence"
expectedOutput: "Markdown persona with Name, Summary, Goals, Pains, Context, Quote, and Evidence sections — every claim sourced."
inputsFrom:
  - research-synthesiser
confluenceContext:
  inputs:
    - what: "Interview transcripts, observation notes, or survey responses"
      description: "Pages under *Interviews*, *Field notes*, *Sessions*, *Surveys* (or with 'interview', 'observation', 'session-notes' in titles). Restrict to this programme's space."
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

- Search for interview transcripts, observation notes, or survey responses in the programme's Confluence space. Look for pages under *Interviews*, *Field notes*, *Sessions*, *Surveys* (or with `interview`, `observation`, `session-notes` in titles).
- Read the Themes and Friction-points sections of `Knowledge Base/{{track}}/Research-synthesis` if available. These sharpen the persona's pains and goals.
- Show the user what you found and ask them to confirm or refine the set before reading in detail.
- In copy-paste mode: ask the user to paste interview transcripts (mark sessions with `--- Session [N] / [role] ---`) plus the Themes and Friction-points sections of the Research-synthesis page if available.

# draft

A good persona:
- Names a specific archetype, not a vague "user"
- Roots every claim in evidence (cite which sessions or pages back the claim)
- Has goals about outcomes, not features
- Has at least one surprising or non-obvious trait

Output as markdown:

### [Persona name — specific, memorable; not "User A"]

- **Summary:** [one line]
- **Goals (3 to 5):** outcome-focused
  - [goal] — [evidence: session refs or page links]
- **Pains (3 to 5):** with evidence
  - [pain] — [evidence: session refs or page links]
- **Context:** when, where, with whom they do the work
- **Real quote:** "[verbatim]" — [session ref or page link]
- **Non-obvious trait:** [the differentiating thing]
- **Evidence sources:** [list of sessions or pages this persona is built from]

If the research notes don't support a section, leave it blank — don't invent.

# filing

- Create a new page at `Knowledge Base/{{track}}/Personas/{{persona-name}}`. Link back to source research pages.
- In copy-paste mode: return the markdown and the user will file it manually.

# tips

- Don't ask for multiple personas in one go. Generate one at a time and let each one earn its place.
- The "non-obvious trait" check matters because personas blur into one another when every persona is a "busy professional who values efficiency." The differentiating trait is what makes the persona useful in design discussions.
- The persona output feeds directly into the [journey-map drafter](/prompts/journey-map-drafter), [service-blueprint drafter](/prompts/service-blueprint-drafter), and [PRD generator](/prompts/prd-generator).
