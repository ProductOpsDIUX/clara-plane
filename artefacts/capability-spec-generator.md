---
title: "Capability-spec generator"
phase: "research"
domain: "engineering"
tool: "clara"
task: "derive measurable capability requirements from an operational scenario"
expectedOutput: "Markdown capability spec with functional requirements, performance thresholds, environmental constraints, and traceability back to the scenario."
inputsFrom:
  - operational-scenario-generator
confluenceContext:
  inputs:
    - what: "Operational scenario for this capability"
      description: "Page under `Knowledge Base/{{track}}/Operational scenarios/*`. Ask the user which scenario if multiple."
    - what: "Capability brief or statement of operational need"
      description: "Pages under *Briefs*, *Capability*, *Mission* (or with 'capability-brief', 'operational-need', 'mission-statement' in titles)."
    - what: "Known constraints (optional) — regulatory, integration, schedule, platform"
      description: "Pages under *Constraints*, *Compliance*, *Architecture* (or with 'constraints', 'regulatory', 'integration' in titles)."
  outputPathTemplate: "Knowledge Base/{{track}}/Capability specs/{{capability-name}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to turn an operational scenario into a structured capability specification — measurable requirements derived from operational need.

# context

- **Operational scenario** — page reference under `Knowledge Base/{{track}}/Operational scenarios/*` to base the spec on.
- **Capability name** — short (e.g. "Tank-crew alerting aid", "Fighter aircraft sensor-fusion module", "Frigate surface-contact classifier"). Becomes `{{capability-name}}`.

# inputs

- Read the operational scenario at the path the user named (fall back to `Knowledge Base/Programme-wide/Operational scenarios/*` if no track-level version exists).
- Find the capability brief or statement of operational need — under *Briefs*, *Capability*, *Mission* (or with `capability-brief`, `operational-need`, `mission-statement` in titles).
- Look for known constraints — under *Constraints*, *Compliance*, *Architecture* (or with `constraints`, `regulatory`, `integration` in titles).
- Show the user what you found and ask them to confirm or refine before reading in detail.
- In copy-paste mode: ask for the operational scenario, the capability brief, and any known measurable thresholds (accuracy, latency, recall, classification, etc.).

# draft

A good capability spec:
- Names requirements that the operational scenario actually demands. Every requirement traces back to a scenario beat.
- Is measurable. "System shall be usable" is not a requirement; "operator completes the primary task within 90 seconds in degraded lighting" is.
- Distinguishes functional, performance, and environmental requirements
- Names constraints honestly (regulatory, integration, schedule)
- Leaves implementation choices open. Specify the WHAT, not the HOW.

Output as markdown:

## Capability spec: [capability name]

### Operational basis
- **Scenario:** [page link or title]
- **Primary mission task supported:** [from scenario]

### Functional requirements
- **FR-1:** [requirement] — traces to scenario beat: [which one]
- **FR-2:** [requirement] — traces to: [...]

### Performance requirements
- **PR-1:** [measurable threshold] — [rationale + evidence]
- **PR-2:** ...

### Environmental requirements
- **ER-1:** [environment] — [tolerance / behaviour required]
- **ER-2:** ...

### Constraints
- **C-1:** [constraint] — [origin: regulatory / integration / schedule]

### Open questions
- [question]

### Out-of-scope (explicit)
- [thing this capability does NOT need to do]

If the scenario doesn't justify a requirement, leave it out and flag under Open questions. Don't invent.

# filing

- Create a new page at `Knowledge Base/{{track}}/Capability specs/{{capability-name}}`. Link to the operational scenario page.
- In copy-paste mode: return the markdown and the user will file it manually.

# tips

- The traceability column ("traces to scenario beat: X") is the part that protects the spec from drift. Requirements that can't be traced back to a specific scenario beat should be challenged.
- Performance thresholds are where engineering programmes most often under-specify. "Fast enough" is not a requirement; "within 5 seconds, 95th percentile" is.
- Pair with a [Napkin AI](/tools/napkin-ai) system diagram so the requirements have a structural picture to anchor against.
