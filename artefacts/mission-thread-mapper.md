---
title: "Mission-thread mapper"
phase: "research"
domain: "engineering"
tool: "clara"
task: "map an end-to-end mission thread for the operational task a capability supports"
expectedOutput: "Markdown mission thread: actors, systems, data flow, decision points, dependencies, and failure modes across the full task."
inputsFrom:
  - operational-scenario-generator
confluenceContext:
  inputs:
    - what: "Operational scenario for this capability"
      description: "Page under `Knowledge Base/{{track}}/Operational scenarios/*`. Ask the user which scenario."
    - what: "System context — systems, platforms, comms involved"
      description: "Pages under *Systems*, *Architecture*, *Platforms*, *Communications* (or with 'system', 'architecture', 'platform', 'comms' in titles). Optional but useful."
  outputPathTemplate: "Knowledge Base/{{track}}/Mission threads/{{mission-task}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to map the end-to-end mission thread — the full chain of actors, systems, and data flows that produces an operational outcome.

# context

- **Operational scenario** — page reference under `Knowledge Base/{{track}}/Operational scenarios/*`.
- **Mission task** — be specific: "detect, identify, and engage an inbound air contact from a frigate", or "neutralise a hostile armoured vehicle in urban terrain" — not "air defence" or "ground operations". Becomes `{{mission-task}}`.

# inputs

- Read the operational scenario at the path the user named (`Knowledge Base/{{track}}/Operational scenarios/*` with fallback to programme-wide).
- Search the programme's space for system-context pages — under *Systems*, *Architecture*, *Platforms*, *Communications* (or with `system`, `architecture`, `platform`, `comms` in titles). Optional but useful.
- Show the user what you found and ask them to confirm or refine before reading in detail.
- In copy-paste mode: ask for the operational scenario and a description of the systems / sensors / data flows the mission task touches.

# draft

A good mission thread:
- Covers the full task from trigger to outcome — not just the part the capability touches
- Names actors (people, platforms, automated systems) at each step
- Shows data flow — what gets passed from one step to the next, and in what form
- Marks decision points and the human or automated logic that makes them
- Surfaces dependencies — what has to be true upstream for a step to work
- Names failure modes per step, with the recovery path

Output as markdown:

## Mission thread: [mission task]

### Trigger
- **Event:** [what starts the thread]
- **Initial actor:** [who or what acts first]

### Steps

| # | Actor | Action | Inputs | Outputs | Decision point | Dependencies | Failure mode |
|---|---|---|---|---|---|---|---|
| 1 | [actor] | [what they do] | [data in] | [data out] | [if applicable] | [upstream needs] | [what can go wrong + recovery] |
| 2 | ... | ... | ... | ... | ... | ... | ... |

### Outcome
- **Success:** [end state of a clean run]
- **Partial:** [what counts as a partial outcome]
- **Failure:** [what counts as failure, and where recovery routes back]

### Cross-thread dependencies
- [thing that has to be true across the whole thread, e.g. comms availability, doctrinal sign-off]

If the scenario doesn't cover a step, leave it blank and flag under "Open questions". Don't invent.

# filing

- Create a new page at `Knowledge Base/{{track}}/Mission threads/{{mission-task}}`. Link to the operational scenario page.
- In copy-paste mode: return the markdown and the user will file it manually.

# tips

- When you review CLARA's thread, aim for 5 to 12 steps end-to-end. Too coarse misses decision points; too fine documents screens. Push back if she lands outside that range.
- Look at the "failure mode + recovery" column first — the steps with the most expensive recovery paths are usually where capability investment pays off.
- Pair CLARA's output with a [Napkin AI](/tools/napkin-ai) diagram so the data flow is visible at a glance.
