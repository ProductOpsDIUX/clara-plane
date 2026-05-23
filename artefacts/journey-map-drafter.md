---
title: "Journey-map drafter"
phase: "research"
domain: "digital"
tool: "clara"
task: "draft a current-state journey map for a persona"
expectedOutput: "Markdown journey map with stages, actions, touchpoints, emotions, friction points, and opportunities."
inputsFrom:
  - persona-generator
  - research-synthesiser
confluenceContext:
  inputs:
    - what: "Persona for the journey"
      description: "Page under `Knowledge Base/{{track}}/Personas/*`. Ask the user which persona if there are multiple."
    - what: "Interview transcripts, observation notes"
      description: "Pages under *Interviews*, *Field notes*, *Sessions* (or with 'interview', 'observation' in titles)."
    - what: "Themes (optional)"
      description: "Page at Themes section of `Knowledge Base/{{track}}/Research-synthesis`."
    - what: "Friction points (optional)"
      description: "Page at Friction-points section of `Knowledge Base/{{track}}/Research-synthesis`. When present, the friction column will be evidence-ranked."
  outputPathTemplate: "Knowledge Base/{{track}}/Journeys/{{journey-scope}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to draft a current-state journey map — how a persona currently moves through a task or experience, where the friction is, and where the opportunities are.

# context

- **Persona** — page reference, or the persona's name.
- **Journey scope** — be specific: "submitting an incident report from the field", not "using the system". Becomes `{{journey-scope}}`.

# inputs

- Look up the persona at `Knowledge Base/{{track}}/Personas/*` (fall back to `Knowledge Base/Programme-wide/Personas/*` if no track-level version exists).
- Read the Themes and Friction-points sections of `Knowledge Base/{{track}}/Research-synthesis` if available — when present, the friction column will be evidence-ranked.
- Search the programme's space for interview transcripts and observation notes that cover the journey scope.
- Show the user what you found and ask them to confirm or refine the set before reading in detail.
- In copy-paste mode: ask for the persona, the journey scope, and the Themes and Friction-points sections of the Research-synthesis page.

# draft

A good journey map:
- Maps the journey AS-IS, not as it should be
- Has stages tight enough that each stage has at most a few actions
- Names emotions specifically ("frustrated because X", not just "frustrated")
- Cites evidence for every friction point
- Flags opportunities that the research actually supports — don't invent

Output as markdown:

## Journey: [scope]
**Persona:** [name]

### Stage 1: [stage name]
- **Actions:** [what the persona does]
- **Touchpoints:** [systems, people, artefacts they interact with]
- **Emotion:** [specific feeling + because]
- **Friction:** [pain points + evidence: session refs or page links]
- **Opportunity:** [where AI / new capability could help — only if research supports it]

(repeat for each stage)

## Moments of truth

- [moment] — [why it matters]

## Opportunities summary

1. [highest-priority opportunity] — [rationale]
2. ...

If the research doesn't cover a stage, leave the cells blank and flag under "Research gaps" at the bottom. Don't invent.

# filing

- Create a new page at `Knowledge Base/{{track}}/Journeys/{{journey-scope}}`. Link to the persona page and to source research pages.
- In copy-paste mode: return the markdown and the user will file it manually.

# tips

- The current-state map is the goal. Future-state maps are a different artefact (and a different conversation).
- "Moments of truth" — the steps where the persona forms a lasting impression — are usually 2 to 4 per journey. If you find more than 5, you're confusing moments-of-truth with friction points.
- Pair the output with a visual via [Napkin AI](/tools/napkin-ai) — text-to-diagram works well for journey maps.
- The output feeds the [service-blueprint drafter](/prompts/service-blueprint-drafter) for digital teams.
