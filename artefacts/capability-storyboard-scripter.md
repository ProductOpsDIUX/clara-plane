---
title: "Capability-storyboard scripter"
phase: "design"
domain: "engineering"
tool: "clara"
task: "script a visual storyboard showing how a capability is exercised end-to-end"
expectedOutput: "Markdown storyboard script: beat-by-beat panels with what to show, what's happening, and what changes from the prior beat."
inputsFrom:
  - operational-scenario-generator
  - capability-spec-generator
confluenceContext:
  inputs:
    - what: "Operational scenario this storyboard depicts"
      description: "Page under `Knowledge Base/{{track}}/Operational-scenarios/*`. Falls back to `Knowledge Base/Programme-wide/Operational-scenarios/*` when no track-level version exists. Ask the user which scenario if multiple."
    - what: "Capability spec for the capability being shown (optional)"
      description: "Page under `Knowledge Base/{{track}}/Capability-specs/*` or `Knowledge Base/Programme-wide/Capability-specs/*`. Anchors the storyboard to the actual requirements."
    - what: "Persona consuming the storyboard (optional)"
      description: "Page under `Knowledge Base/{{track}}/Personas/*` or `Knowledge Base/Programme-wide/Personas/*`. Useful when the audience is operators reviewing the capability for the first time."
  outputPathTemplate: "Knowledge Base/{{track}}/Capability-storyboards/{{storyboard-title}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to script a visual storyboard of a capability in use — the panels, beats, and narration that turn an operational scenario into something operators can react to before any platform is acquired. The script is the spec; rendering (Luma, Nano Banana, Forma) happens downstream.

# context

- **Storyboard title** — short (e.g. "Tank-crew alerting under degraded comms"). Becomes `{{storyboard-title}}`.
- **Length** — number of panels. Typically 8–12; shorter (5–6) for a quick brief or longer (15+) for a full narrative.
- **Audience** — who the storyboard is for. Examples: operators reviewing the capability for the first time, an acquisition gate going to leadership, or the engineering team scoping the build.

# inputs

- Read the operational scenario at the path the user named (fall back to `Knowledge Base/Programme-wide/Operational-scenarios/*`).
- Optionally read the capability spec at `Knowledge Base/{{track}}/Capability-specs/*` (or programme-wide). Without it the storyboard still works but won't trace cleanly back to requirements.
- Optionally read the persona at `Knowledge Base/{{track}}/Personas/*` (or programme-wide) if the audience is operators encountering the capability for the first time.
- Show the user what you found and confirm length + audience before drafting.
- In copy-paste mode: ask the user for the operational scenario, capability spec (if available), length, and audience in turn.

# draft

A good storyboard script:
- Hooks the audience in the first panel — the operational situation that demands the capability.
- Shows the capability in use, not the capability as a diagram. If the storyboard could be replaced by a wiring diagram, it's labelling the capability, not showing it.
- Includes at least one failure-recovery panel — the moment where the capability earns its keep.
- Builds tension before resolution — don't lead with the outcome.
- Ends with the changed state — what is different now that this capability exists.
- Each panel describes WHAT TO SHOW (the visual subject) + WHAT'S HAPPENING (the narration). The rendering tool picks up from there.

Output as markdown:

## Storyboard: [capability name]
**Audience:** [audience]
**Panels:** [N]

### Panel 1
- **Show:** [the visual subject]
- **Happening:** [narration in 1–2 sentences]
- **Beat purpose:** [why this panel exists in the narrative]
- **Carry-over:** [what changes from the prior beat — "n/a" for panel 1]

(repeat per panel)

### Continuity notes
- Things that should stay consistent across panels (operator's equipment, time of day, environmental conditions, friendly/hostile disposition).

### Suggested rendering tool
- For each panel, recommend Luma / Nano Banana / Forma based on what the panel needs to show (environmental sequence vs hero shot vs spatial layout).

# filing

- Create a new page at `Knowledge Base/{{track}}/Capability-storyboards/{{storyboard-title}}`. Link to the operational scenario page and the capability spec (if used).
- In copy-paste mode: return the markdown and the user will file it manually.

# tips

- When you review CLARA's panels, check the carry-over field on each. Without it you get a set of disconnected hero shots, not a narrative.
- If CLARA's panels read like a system diagram, push back — the capability should be visible in use.
- CLARA's panel-level prompts are the spec for the visualisation tool, not the visualisation itself. Send them through to Luma / Nano Banana / Forma for the actual rendering.
