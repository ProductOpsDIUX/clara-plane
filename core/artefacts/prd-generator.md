---
title: "PRD generator"
phase: "research"
domain: "digital"
tool: "clara"
task: "draft a v0 PRD from research synthesis and prior framing"
expectedOutput: "Markdown PRD with 7 standard sections, with clarifying questions where input is incomplete."
inputsFrom:
  - research-synthesiser
  - persona-generator
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "Problem statement and Success criteria"
      description: "Problem-statement and Success-criteria sections of `Knowledge Base/{{track}}/Research-synthesis`. Falls back to `Knowledge Base/Programme-wide/Research-synthesis` when no track-level version exists."
    - what: "Persona for the PRD"
@@if confluence@@
      description: "Page under `Knowledge Base/{{track}}/Personas/*` or `Knowledge Base/Programme-wide/Personas/*`. Ask the user which persona if multiple."
@@endif@@
@@if plane@@
      description: "Work item under `Knowledge Base/{{track}}/Personas/*` or `Knowledge Base/Programme-wide/Personas/*`. Ask the user which persona if multiple."
@@endif@@
    - what: "Themes from the Research synthesis (optional)"
      description: "Themes section of `Knowledge Base/{{track}}/Research-synthesis` or `Knowledge Base/Programme-wide/Research-synthesis`."
    - what: "Original stakeholder ask"
@@if confluence@@
      description: "Programme brief / charter / requesting note. Pages with 'brief', 'ask', 'charter' in titles."
@@endif@@
@@if plane@@
      description: "Programme brief / charter / requesting note. Work items with 'brief', 'ask', 'charter' in titles."
@@endif@@
  outputPathTemplate: "Knowledge Base/{{track}}/PRDs/{{prd-title}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to draft a first-pass PRD from research synthesis and stakeholder context.

# context

- **PRD title** — short (e.g. "Incident-report capture v1"). Becomes `{{prd-title}}`.

# inputs

- Read the Problem-statement and Success-criteria sections of `Knowledge Base/{{track}}/Research-synthesis` (fall back to programme-wide when no track-level version exists).
- Look up the persona at `Knowledge Base/{{track}}/Personas/*` (fall back to programme-wide). Ask the user which persona if multiple.
- Optionally read the Themes section of `Knowledge Base/{{track}}/Research-synthesis` (or programme-wide).
@@if confluence@@
- Find the original stakeholder ask — programme brief / charter / requesting note. Pages with `brief`, `ask`, `charter` in titles.
@@endif@@
@@if plane@@
- Find the original stakeholder ask — programme brief / charter / requesting note. Work items with `brief`, `ask`, `charter` in titles.
@@endif@@
- Show the user what you found and ask them to confirm or refine before reading in detail.
- In copy-paste mode: ask the user for each of these inputs in turn.

# draft

Produce a PRD using this structure:

1. Problem statement (1 paragraph)
2. Target users / operators
3. Success criteria (measurable, capability-focused)
4. In scope / out of scope
5. User stories or jobs-to-be-done (outcomes, not features)
6. Constraints and dependencies
7. Open questions

Rules:
- Where input is incomplete, ask the user up to 3 clarifying questions BEFORE drafting. Don't invent details.
- Keep each section to 1-2 paragraphs.
- If you'd be guessing, put a placeholder and flag it under "Open questions."

Output as markdown with one `##` heading per section.

# filing

@@if confluence@@
- Create a new page at `Knowledge Base/{{track}}/PRDs/{{prd-title}}`. Link to the problem statement, success criteria, and persona pages.
- In copy-paste mode: return the markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create a new work item at `Knowledge Base/{{track}}/PRDs/{{prd-title}}`. Relate the work item to the problem statement, success criteria, and persona work items (and link them).
- In copy-paste mode: return the markdown for pasting and the user will file the work item manually.
@@endif@@

# tips

- CLARA asks clarifying questions when inputs are thin. Answer honestly even if it's "I don't know yet" — the Open questions section preserves the unknown.
- Treat CLARA's v0 PRD as a starting position, not a final document. Manual editing after generation is the norm, not the exception.

## Before you circulate — self-review checklist

Before sharing the PRD with stakeholders, walk through these checks. Most teams will edit the draft directly to fix gaps; a few questions surface things the draft can't fix on its own.

- **Problem statement** is one paragraph, framed as a problem (not a solution in disguise). Has a clear "who has the problem."
- **Success criteria** are measurable and capability-focused — what the capability or product has to be able to do, and to what threshold. No "users will feel more confident" non-criteria.
- **Scope** is bounded both ways — what's in *and* what's out. "Out of scope" usually shortens later debates.
- **User stories / jobs-to-be-done** describe outcomes, not features.
- **Constraints and dependencies** name every external thing the work depends on. Re-read with "what would block this?" in mind.
- **Open questions** are honest. The first draft is supposed to be wrong in interesting ways; the open questions are where you flag what you don't know.
- **Persona references** link to specific persona pages — no implicit "the user".
