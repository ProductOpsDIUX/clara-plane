---
title: "Operational-scenario generator"
phase: "research"
domain: "engineering"
tool: "clara"
task: "draft an operational scenario from operator research and capability brief"
expectedOutput: "A full operational scenario covering operator, mission context, environment, sequence, decisions, success/failure modes, and capability impact."
inputsFrom:
  - research-synthesiser
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "Operator research — interviews, field/exercise observations, workshop outputs"
@@if confluence@@
      description: "Pages under *Interviews*, *Exercises*, *Field notes*, *Workshops* (or with 'interview', 'observation', 'exercise', 'field-notes', 'workshop' in titles). Restrict to this programme's space."
@@endif@@
@@if plane@@
      description: "Field-note work items under the `Field-notes` node (or work items with 'interview', 'observation', 'exercise', 'field-notes', 'workshop' in titles). Restrict to this programme's Plane project."
@@endif@@
    - what: "Capability brief or statement of operational need"
@@if confluence@@
      description: "Pages under *Briefs*, *Capability*, *Mission* (or with 'capability-brief', 'operational-need', 'mission-statement' in titles)."
@@endif@@
@@if plane@@
      description: "Work items under *Briefs*, *Capability*, *Mission* (or with 'capability-brief', 'operational-need', 'mission-statement' in titles)."
@@endif@@
    - what: "Doctrinal or procedural references the operators work from (optional)"
@@if confluence@@
      description: "Pages under *Doctrine*, *Procedures*, *Standards* (or with 'doctrine', 'procedure', 'TTP' in titles)."
@@endif@@
@@if plane@@
      description: "Work items under *Doctrine*, *Procedures*, *Standards* (or with 'doctrine', 'procedure', 'TTP' in titles)."
@@endif@@
    - what: "Themes (optional)"
@@if confluence@@
      description: "Page at Themes section of `Knowledge Base/{{track}}/Research-synthesis`."
@@endif@@
@@if plane@@
      description: "Themes section of the `Knowledge Base/{{track}}/Research-synthesis` work item."
@@endif@@
    - what: "Friction points (optional)"
@@if confluence@@
      description: "Page at Friction-points section of `Knowledge Base/{{track}}/Research-synthesis`. The failure-modes section draws on this."
@@endif@@
@@if plane@@
      description: "Friction-points section of the `Knowledge Base/{{track}}/Research-synthesis` work item. The failure-modes section draws on this."
@@endif@@
  outputPathTemplate: "Knowledge Base/{{track}}/Operational scenarios/{{scenario-title}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to draft an operational scenario from operator research and a capability brief.

# context

- **Scenario title** — short (e.g. "Tank crew night transit through contested terrain", "Fighter aircraft low-altitude intercept", "Frigate surface-contact classification at dusk"). Becomes `{{scenario-title}}`.

# inputs

@@if confluence@@
- Search the programme's space for operator research — pages under *Interviews*, *Exercises*, *Field notes*, *Workshops* (or with `interview`, `observation`, `exercise`, `field-notes`, `workshop` in titles).
- Find the capability brief or statement of operational need — under *Briefs*, *Capability*, *Mission* (or with `capability-brief`, `operational-need`, `mission-statement` in titles).
@@endif@@
@@if plane@@
- Search the programme's Plane project for operator research — field-note work items under the `Field-notes` node (or work items with `interview`, `observation`, `exercise`, `field-notes`, `workshop` in titles).
- Find the capability brief or statement of operational need — work items under *Briefs*, *Capability*, *Mission* (or with `capability-brief`, `operational-need`, `mission-statement` in titles).
@@endif@@
- Optionally read doctrinal or procedural references the operators work from — under *Doctrine*, *Procedures*, *Standards* (or with `doctrine`, `procedure`, `TTP` in titles).
- Read the Themes and Friction-points sections of `Knowledge Base/{{track}}/Research-synthesis` if available. The failure-modes section draws on the friction points.
- Show the user what you found and ask them to confirm or refine before reading in detail.
@@if confluence@@
- In copy-paste mode: ask for the operator research (mark sessions / observations with their source) plus the Themes and Friction-points sections of the Research-synthesis page if available.
@@endif@@
@@if plane@@
- In copy-paste mode: ask for the operator research (mark sessions / observations with their source) plus the Themes and Friction-points sections of the Research-synthesis work item if available.
@@endif@@

# draft

A good operational scenario:
- Is specific enough that an operator reading it can point at moments and say "this isn't quite right"
- Includes both the smooth path AND the points where things go wrong
- Names decision points explicitly, with options and stakes
- Says what the proposed capability would change, concretely

Output as markdown:

## [Scenario title — specific, not "Use case 1"]

- **Operator(s):** role, training level, equipment
- **Mission context:** what they're trying to accomplish
- **Environmental conditions:** physical, informational, time pressure

### Sequence of events

[beat-by-beat]

### Decision points

- **[Decision]:** options and cost
  - Option A: [...] — cost
  - Option B: [...] — cost

### Success modes

- [outcome] — [conditions]

### Failure modes (including partial success)

- [failure] — [trigger] — [evidence from research]

### What the proposed capability changes

- Before: [current state]
- After: [with the capability]
- Specifically: [the concrete change]

If the research doesn't support a section, leave it blank or flag as an open question. Don't invent.

# filing

@@if confluence@@
- Create a new page at `Knowledge Base/{{track}}/Operational scenarios/{{scenario-title}}`. Link to source research pages.
- In copy-paste mode: return the markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create a new work item at `Knowledge Base/{{track}}/Operational scenarios/{{scenario-title}}`. Relate the work item to its source research work items (and link them).
- In copy-paste mode: return the markdown for pasting and the user will file the work item manually.
@@endif@@

# tips

- Validate the draft with at least one operator before using it in capability discussions. Their reaction is the real test.
- Pay particular attention to the failure modes — that's where the design opportunity usually hides.
- Pair the output with a visual: use [Nanobanana](/tools/nanobanana), [Luma](/tools/luma-ai), or [Forma](/tools/autodesk-forma) to make the scenario tangible.
- The output feeds the [capability-spec generator](/prompts/capability-spec-generator) and [mission-thread mapper](/prompts/mission-thread-mapper).
