---
title: "Research synthesiser"
phase: "research"
domain: "shared"
tool: "clara"
task: "turn interview transcripts and field observations into a single Research synthesis page covering themes, friction, problem statement, and success criteria"
expectedOutput: "A single markdown page with four sections — Themes, Friction points, Problem statement, Success criteria — internally consistent because they're produced in one pass."
inputsFrom:
  - interview-guide-generator
  - prior-knowledge-summariser
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "Interview transcripts, field/exercise observation notes, operator session notes"
@@if confluence@@
      description: "Pages under folders/pages named *Interviews*, *Field notes*, *Sessions*, *Exercises* (or with 'interview', 'transcript', 'session-notes', 'observation', 'field-notes', 'exercise' in titles). Restrict to this programme's space."
@@endif@@
@@if plane@@
      description: "Field-note pages under the `Field-notes` node (or pages with 'interview', 'transcript', 'session-notes', 'observation', 'field-notes', 'exercise' in titles). Restrict to this programme's Plane project."
@@endif@@
    - what: "Prior-knowledge summary on the topic (optional)"
      description: "Search both `Knowledge Base/{{track}}/Prior-knowledge/*` and `Knowledge Base/Programme-wide/Prior-knowledge/*`. Use it for grounding — the synthesis should build on what's already known, not re-discover it."
    - what: "Interview guide used in the field (optional)"
      description: "Search both `Knowledge Base/{{track}}/Interview-guides/*` and `Knowledge Base/Programme-wide/Interview-guides/*`. The guide's outcome question tells you what the synthesis is meant to answer."
  outputPathTemplate: "Knowledge Base/{{track}}/Research-synthesis"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to synthesise a batch of interview transcripts and field observations into a single Research-synthesis page covering themes, friction, problem statement, and success criteria — produced in one pass so all four are internally consistent.

# context

- **Outcome question** — what the research was trying to answer (one line — taken from the interview guide if one exists).

# inputs

@@if confluence@@
- Search the programme's space broadly for interview transcripts, field-notes, observation pages, and exercise debriefs. Pages under folders/pages named *Interviews*, *Field notes*, *Sessions*, *Exercises* (or with `interview`, `transcript`, `session-notes`, `observation`, `field-notes`, `exercise` in titles).
@@endif@@
@@if plane@@
- Search the programme's Plane project broadly for interview transcripts, field-notes, observation notes, and exercise debriefs. Field-note pages under the `Field-notes` node (or pages with `interview`, `transcript`, `session-notes`, `observation`, `field-notes`, `exercise` in titles).
@@endif@@
- Search both `Knowledge Base/{{track}}/Prior-knowledge/*` and `Knowledge Base/Programme-wide/Prior-knowledge/*` for prior-knowledge summaries that should ground the synthesis.
- Search both `Knowledge Base/{{track}}/Interview-guides/*` and `Knowledge Base/Programme-wide/Interview-guides/*` for the interview guide used in the field — the guide's outcome question tells you what the synthesis is meant to answer.
@@if confluence@@
- Show the user everything you found — separately for the track folder, the Programme-wide folder, and the broader space — and ask them to confirm or refine the set before reading in detail.
@@endif@@
@@if plane@@
- Show the user everything you found — separately for the track node, the Programme-wide node, and the broader project — and ask them to confirm or refine the set before reading in detail.
@@endif@@
- In copy-paste mode: ask the user to paste transcripts and observation notes. Mark sessions with `--- Session [N] / [role] / [date] ---` so citations stay traceable.

# draft

Produce a single page with four sections, in this order. The sections are produced together because each builds on the previous — themes inform friction, friction informs problem, problem informs success criteria.

Output as markdown:

# Research synthesis

**Outcome question:** [the one-line question the research was trying to answer]
**Sources:** [list of session refs / page links — these are referenced throughout]

## Themes

Recurring patterns across the sources. Not bullet points of what people said — the patterns *underneath* what people said.

- **[Theme name]** — [one-line description]. Evidence: [session refs / page links]

Aim for 4–7 themes. Fewer means the synthesis is too coarse; more means you're listing observations instead of clustering them.

## Friction points

Where users / operators struggle. Each ranked by severity × frequency and grounded in evidence.

| Friction | Severity (1–5) | Frequency | Type | Evidence |
|---|---|---|---|---|
| [pain] | [N] | [observed in X of Y sessions] | [design / training / systemic] | [session refs] |

Sort by severity × frequency descending.

## Problem statement

One paragraph. Articulates *the problem*, not a solution in disguise. Frames who has the problem, what the impact is, and why the current state persists.

> [Problem statement, 3–5 sentences. Start with "[Role] needs to / cannot / struggles to ..." — never "We need to build ...".]

**Alternatives considered:** [if multiple framings surfaced during synthesis, name them and say why the chosen framing wins]

## Success criteria

What would have to be true for work on this problem to count as a win. Measurable and capability-focused — describe what the capability or product has to be able to do, and to what threshold.

- [Criterion] — [how it would be measured / observed]

Aim for 3–5 criteria. Each criterion ties back to the problem statement and to one or more friction points.

## Open questions

Things the data didn't answer — for the next round of field engagement, or for stakeholder confirmation.

- [Open question]

# filing

@@if confluence@@
- Create or update a page at `Knowledge Base/{{track}}/Research-synthesis`. Link back to source pages. Confirm and show the link.
- In copy-paste mode: return the full markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create or update a page at `Knowledge Base/{{track}}/Research-synthesis`. Link the page to its source pages. Confirm and show the link.
- In copy-paste mode: return the full markdown for pasting and the user will file the page manually.
@@endif@@

# tips

- Themes are clusters, not summaries. If a "theme" is just one person's statement restated, it's not a theme — it's a quote.
- The friction table earns its weight when it's sorted. A friction table without rank ordering is a list of complaints; with rank ordering, it's an action queue.
- The problem statement is what separates synthesis from notes. Resist the urge to leave it open-ended — pick the framing the evidence best supports, and name the alternatives explicitly.
- Success criteria written without measurability ("users should feel more confident") aren't success criteria — they're aspirations. Push for "X% of operators complete task Y in Z seconds without secondary confirmation" or similar.
- This page is the single upstream for the rest of the Research phase. Downstream prompts (persona, journey, PRD, etc.) read sections of this page directly — that's why all four sections live together.
