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
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "Persona for the journey"
@@if confluence@@
      description: "Page under `Knowledge Base/{{track}}/Personas/*`. Ask the user which persona if there are multiple."
@@endif@@
@@if plane@@
      description: "Page under `Knowledge Base/{{track}}/Personas/*`. Ask the user which persona if there are multiple."
@@endif@@
    - what: "Interview transcripts, observation notes"
@@if confluence@@
      description: "Pages under *Interviews*, *Field notes*, *Sessions* (or with 'interview', 'observation' in titles)."
@@endif@@
@@if plane@@
      description: "Field-note pages under the `Field-notes` node (or pages with 'interview', 'observation' in titles)."
@@endif@@
    - what: "Themes (optional)"
@@if confluence@@
      description: "Page at Themes section of `Knowledge Base/{{track}}/Research-synthesis`."
@@endif@@
@@if plane@@
      description: "Themes section of the `Knowledge Base/{{track}}/Research-synthesis` page."
@@endif@@
    - what: "Friction points (optional)"
@@if confluence@@
      description: "Page at Friction-points section of `Knowledge Base/{{track}}/Research-synthesis`. When present, the friction column will be evidence-ranked."
@@endif@@
@@if plane@@
      description: "Friction-points section of the `Knowledge Base/{{track}}/Research-synthesis` page. When present, the friction column will be evidence-ranked."
@@endif@@
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
@@if confluence@@
- Search the programme's space for interview transcripts and observation notes that cover the journey scope.
@@endif@@
@@if plane@@
- Search the programme's Plane project for field-note pages under the `Field-notes` node that cover the journey scope.
@@endif@@
- Show the user what you found and ask them to confirm or refine the set before reading in detail.
@@if confluence@@
- In copy-paste mode: ask for the persona, the journey scope, and the Themes and Friction-points sections of the Research-synthesis page.
@@endif@@
@@if plane@@
- In copy-paste mode: ask for the persona, the journey scope, and the Themes and Friction-points sections of the Research-synthesis page.
@@endif@@

# draft

A good journey map:
- Maps the journey AS-IS, not as it should be
- Has phases tight enough that each phase has at most a few actions
- Names emotions specifically ("frustrated because X", not just "frustrated")
- Cites evidence for every friction point
- Flags opportunities that the research actually supports — don't invent

Output as markdown:

## Journey: [scope]
**Persona:** [name]

**Scope:** [one or two sentences — the specific task/experience this map covers, from where to where, and what it deliberately excludes]. Open with this so the reader knows the boundaries before the phases.

### Phase 1: [phase name]
- **Trigger:** [what kicks the journey off — the event or condition that starts this first phase]
- **Actions:** [what the persona does]
- **Touchpoints:** [systems, people, artefacts they interact with]
- **Emotion:** [specific feeling + because]
- **Friction:** [pain points + evidence: Session IDs or page links]
- **Opportunity:** [where AI / new capability could help — only if research supports it]

### Phase 2: [phase name]
- **Actions:** [what the persona does]
- **Touchpoints:** [systems, people, artefacts they interact with]
- **Emotion:** [specific feeling + because]
- **Friction:** [pain points + evidence: Session IDs or page links]
- **Opportunity:** [where AI / new capability could help — only if research supports it]

(repeat for each phase; only the first phase carries a **Trigger**)

## Moments of truth

- [moment] — [why it matters]

## Opportunities summary

1. [highest-priority opportunity] — [rationale]
2. ...

If the research doesn't cover a phase, leave the cells blank and flag under "Research gaps" at the bottom. Don't invent.

End with a `## Sources` section in **table form** — one row per individual source (like the persona's Evidence table), per Output discipline:

| Source | What it is | Link |
|---|---|---|
| OP-01 | Field note — [profile] | [link] |
| … | … | … |
| Research-synthesis | Synthesis it draws on | [link] |

# filing

@@if confluence@@
- Create a new page at `Knowledge Base/{{track}}/Journeys/{{journey-scope}}`. Link to the persona page and to source research pages.
- In copy-paste mode: return the markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create a new page at `Knowledge Base/{{track}}/Journeys/{{journey-scope}}`. Link the page to the persona page and to its source research pages.
- In copy-paste mode: return the markdown for pasting and the user will file the page manually.
@@endif@@

# tips

- The current-state map is the goal. Future-state maps are a different artefact (and a different conversation).
- "Moments of truth" — the steps where the persona forms a lasting impression — are usually 2 to 4 per journey. If you find more than 5, you're confusing moments-of-truth with friction points.
- Pair the output with a visual via [Napkin AI](/tools/napkin-ai) — text-to-diagram works well for journey maps.
- The output feeds the [service-blueprint drafter](/prompts/service-blueprint-drafter) for digital teams.
