---
title: "Service-blueprint drafter"
phase: "research"
domain: "digital"
tool: "clara"
task: "draft a service blueprint linking user actions to front-stage and back-stage support"
expectedOutput: "Markdown service blueprint with stages, customer actions, front-stage, back-stage, and support processes."
inputsFrom:
  - journey-map-drafter
  - persona-generator
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "Journey map for the same scope"
@@if confluence@@
      description: "Page under `Knowledge Base/{{track}}/Journeys/*`. Ask the user which journey if there are multiple."
@@endif@@
@@if plane@@
      description: "Work item under `Knowledge Base/{{track}}/Journeys/*`. Ask the user which journey if there are multiple."
@@endif@@
    - what: "Persona for the journey"
@@if confluence@@
      description: "Page under `Knowledge Base/{{track}}/Personas/*`."
@@endif@@
@@if plane@@
      description: "Work item under `Knowledge Base/{{track}}/Personas/*`."
@@endif@@
    - what: "System context — systems, tools, and back-stage teams involved"
@@if confluence@@
      description: "Pages under *Systems*, *Architecture*, *Operations*, *Teams* (or with 'system', 'architecture', 'team' in titles). If little is available, the back-stage cells will be flagged as research gaps."
@@endif@@
@@if plane@@
      description: "Work items under *Systems*, *Architecture*, *Operations*, *Teams* (or with 'system', 'architecture', 'team' in titles). If little is available, the back-stage cells will be flagged as research gaps."
@@endif@@
  outputPathTemplate: "Knowledge Base/{{track}}/Service blueprints/{{journey-scope}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to extend a journey map into a service blueprint — making the back-stage (the systems, processes, and people that support each touchpoint) visible.

# context

- **Journey** — page reference under `Knowledge Base/{{track}}/Journeys/*`.

# inputs

- Read the journey map at the path the user named (fall back to `Knowledge Base/Programme-wide/Journeys/*` if no track-level version exists).
- Look up the persona referenced by the journey at `Knowledge Base/{{track}}/Personas/*` (fall back to programme-wide).
@@if confluence@@
- Search the programme's space for system-context pages — under *Systems*, *Architecture*, *Operations*, *Teams* (or with `system`, `architecture`, `team` in titles). If little is available, the back-stage cells will be flagged as research gaps.
@@endif@@
@@if plane@@
- Search the programme's Plane project for system-context work items — under *Systems*, *Architecture*, *Operations*, *Teams* (or with `system`, `architecture`, `team` in titles). If little is available, the back-stage cells will be flagged as research gaps.
@@endif@@
- Show the user what you found and ask them to confirm or refine before reading in detail.
- In copy-paste mode: ask for the journey map, the persona, and a description of the back-stage systems and teams that support the user-facing experience.

# draft

A good service blueprint:
- Lines up customer actions, front-stage, back-stage, and support across the same set of stages
- Surfaces invisible work (the back-stage actions that customers don't see but depend on)
- Names the systems and people involved at each step
- Highlights handoffs — they're where failure usually lives
- Groups the stages into a few phases, so a long process stays readable

Output as markdown. Group the journey's stages into **phases** (2-4), and render one compact table per phase rather than a single wide table — this keeps a long process legible. Lead with a phase-overview table.

## Service blueprint: [journey scope]
**Persona:** [name]

**Scope:** [same scope as the source journey map, one line].

### Phase overview

| Phase | Stages |
|---|---|
| [phase 1 name] | [stage · stage] |
| [phase 2 name] | [stage · stage] |

### Phase 1: [name]

|  | [stage] | [stage] |
|---|---|---|
| **Customer action** | [what they do] | … |
| **Front-stage** | [visible interactions] | … |
| **Back-stage** | [hidden systems / actions] | … |
| **Support** | [supporting processes] | … |

(repeat one table per phase; attributes as rows, that phase's stages as columns)

### Handoffs

- **[Stage] → [Stage]:** [what passes between front-stage and back-stage, and how]

### Visible gaps

- [gap] — [evidence or "research needed"]

If the system context doesn't cover a back-stage cell, leave it blank and flag it as a research gap. Don't invent. End with a `## Sources` section (journey map, persona, field notes by Session ID), per Output discipline.

# filing

@@if confluence@@
- Create a new page at `Knowledge Base/{{track}}/Service blueprints/{{journey-scope}}`. Link to the journey map page.
- In copy-paste mode: return the markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create a new work item at `Knowledge Base/{{track}}/Service blueprints/{{journey-scope}}`. Relate the work item to the journey map work item (and link it).
- In copy-paste mode: return the markdown for pasting and the user will file the work item manually.
@@endif@@

# tips

- Service blueprints expose the cost of design choices the journey map doesn't show. A "simpler" front-stage often means more back-stage work, not less.
- The handoffs section is where the most surprising findings tend to surface. A back-stage handover that goes through three teams is a place where things break.
- Pair the output with a [Napkin AI](/tools/napkin-ai) diagram so the layers are visually distinct.
