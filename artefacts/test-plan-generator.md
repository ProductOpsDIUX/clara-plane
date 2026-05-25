---
title: "Test-plan generator"
phase: "test"
domain: "shared"
tool: "clara"
task: "draft a complete test plan with scenarios, participants, measurement, and analysis"
expectedOutput: "Markdown test plan with objective, scenarios as a numbered section, participants, session structure, measurement, analysis, and validity risks."
inputsFrom:
  - prd-generator
  - operational-scenario-generator
  - capability-spec-generator
  - research-synthesiser
confluenceContext:
  inputs:
    - what: "Relevant artefacts"
      description: "The artefact being tested. For digital tests: a PRD under `Knowledge Base/{{track}}/PRDs/*` (or programme-wide). For engineering tests: the pair of `Knowledge Base/{{track}}/Operational-scenarios/*` + `Knowledge Base/{{track}}/Capability-specs/*`. Ask the user which artefact (or pair) the test is for."
    - what: "Success criteria"
      description: "Success-criteria section of `Knowledge Base/{{track}}/Research-synthesis` (fall back to `Knowledge Base/Programme-wide/Research-synthesis`). These are what the scenarios must exercise."
    - what: "Field notes for scenario seeding (optional)"
      description: "Pages under `Knowledge Base/{{track}}/Field-notes (* )/*`. Useful for grounding scenarios in observed alert content, edge cases, and ambiguity. Reference field-note IDs in the scenarios so readers can trace back."
  outputPathTemplate: "Knowledge Base/{{track}}/Test-plans/{{test-name}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to draft a complete test plan — including scenarios — in one pass. The output is a single document a team can read, agree to, and run from. Findings flow directly into the next design iteration; there is no separate synthesis prompt for test data.

# context

- **Test type** — what kind of test this is. Examples: usability test on interactive prototype, moderated walk-through of a clickable prototype with operators, instrumented A/B on a deployed feature, capability rehearsal in scripted exercise.
- **Test name** — short (e.g. "Console-v1-usability-test", "Tank-crew-alerting-rehearsal"). Becomes `{{test-name}}`.
- **Test focus (optional)** — describe what this round of testing should cover. Leave blank to test against all the artefact's success criteria. Otherwise narrow the scope: a specific user story (e.g. "submit-incident-report"), one or two success criteria, the features shipping in this PI, or the storyboard beats being rehearsed.
- **Constraints (optional)** — time budget, recruiting limits, environment, classification, secrecy.

# inputs

- Identify the artefact being tested. For digital: a PRD page. For engineering: an operational-scenario + capability-spec pair. Confirm the path(s) with the user before reading in detail.
- Read the Success-criteria section of the relevant Research-synthesis page (track-level, fall back to programme-wide).
- Optionally scan field notes for material that scenarios can be seeded from — anonymised alert content, ambiguity that operators experienced, recurring edge cases. Reference the field-note IDs in the scenarios you write.
- Show the user what you found and confirm test type, test focus, and constraints before drafting. If the user didn't name a focus, restate the success criteria you found and confirm "all of these" is the intent.
- In copy-paste mode: ask the user for the artefact, success criteria, test type, test focus, and constraints in turn.

# draft

**Objective checkpoint (before drafting the rest).** Propose the test objective in one sentence — what question this test is supposed to answer — and show it to the user. If you can't compress it to one sentence, tell the user the test focus is too broad and ask them to narrow it before proceeding. Only continue to the full draft after the user confirms (or refines) the objective. The confirmed sentence becomes the Objective section of the output.

A good test plan:
- States the objective in one sentence — what question this test is supposed to answer.
- Derives 3–6 scenarios that, together, exercise the success criteria. Each scenario has setup, steps, expected result, and evidence to capture.
- Names the participants: how many, what type, recruiting source, exclusion criteria.
- Structures the session: pre-task, scenarios, post-task, total duration.
- Names what gets measured: behavioural observations, metrics, post-session questions, planned DASH survey type (prototype survey or system survey).
- Names how findings will translate into design adjustments.
- Lists what could invalidate the test (and the mitigations).

Output as markdown:

## Test plan: [name]

### Objective
[One sentence — what question this test answers]

### Success criteria tested
- [criterion] — covered by scenario(s): [refs]

### Scenarios

#### Scenario 1: [name]
- **Setup:** [pre-conditions, system state, participant context]
- **Steps:** [numbered actions the participant takes]
- **Expected:** [what success looks like]
- **Evidence to capture:** [observations, metrics, artefacts]
- **Maps to:** [success criteria refs]

#### Scenario 2: [name]
[same structure]

[3–6 scenarios total, ordered from foundational to complex]

### Participants
- **Number:** [N]
- **Profile:** [who they are — operators, end users, SMEs]
- **Recruiting source:** [how you'll find them]
- **Exclusions:** [who NOT to include and why]

### Session structure
- **Pre-task (5–10 min):** [briefing, consent, warmup]
- **Scenarios:** [refs, in order, with time budget per scenario]
- **Post-task (10 min):** [debrief questions, planned DASH survey]
- **Total duration:** [N minutes]

### Measurement
- **Behavioural observations:** [task completion, hesitation, errors, recovery, where they look for help]
- **Metrics:** [if instrumented — what to log]
- **DASH survey:** [prototype survey (post-iteration) OR system survey (post-deployment) — name which and why]
- **Open questions:** [what to ask in the debrief]

### Analysis
- [how raw observations turn into design adjustments]
- [who reviews the DASH output; how findings flow back into the next design iteration]

### Validity risks
- **[risk]:** [mitigation]
- **[risk]:** [mitigation]

Rules:
- Every scenario must map to at least one success criterion **within the test focus**. Criteria outside the focus are out of scope for this round — note them under "Success criteria tested" as "deferred to a later round" rather than inventing scenarios for them.
- If a scenario is seeded from a field note, reference the field-note ID (e.g. `S03`, `Field Alpha 2`) so readers can trace it back.
- Don't invent participant counts or recruiting sources. If the user hasn't named one, ask or leave a flagged placeholder.

# filing

- Create a new page at `Knowledge Base/{{track}}/Test-plans/{{test-name}}`. Link to the artefact being tested (PRD or operational-scenario + capability-spec) and the Research-synthesis page the success criteria come from.
- In copy-paste mode: return the markdown and the user will file it manually.

# tips

- The Objective sentence is the test of the test plan. CLARA proposes it before drafting the rest and waits for your confirmation — if she can't compress it to one line, treat that as a signal to narrow the test focus and rerun.
- When you review CLARA's scenarios, each should map to a success criterion. If a scenario can't fail, it isn't a test — ask CLARA to rework it.
