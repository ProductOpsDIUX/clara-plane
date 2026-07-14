---
title: "Interview-guide generator"
phase: "research"
domain: "shared"
tool: "clara"
task: "generate a field-ready interview guide that surfaces the data the team needs"
expectedOutput: "A structured interview guide with warmup, core, probe, and wrap-up sections — each question annotated with what to listen for."
inputsFrom:
  - prior-knowledge-summariser
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "Prior-knowledge summary on the topic (optional)"
      description: "Look in `Knowledge Base/{{track}}/Prior-knowledge/*` and `Knowledge Base/Programme-wide/Prior-knowledge/*`. Use the prior-knowledge summary to avoid asking questions the team already has answers to, and to pre-load the LLM on context."
  outputPathTemplate: "Knowledge Base/{{track}}/Interview-guides/{{topic}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to generate a field-ready interview guide targeted at the data the team actually needs to surface.

# context

- **Topic** — a short identifier for the interview topic (e.g. "operator decision-making under time pressure", "shift handover friction"). Becomes `{{topic}}` and shapes the questions.
- **Interviewee** — role, seniority, and number of sessions planned.
- **Outcome question** — what the research needs to answer. Be specific: "do operators trust the alert system enough to act on it without secondary confirmation?", not "how do operators feel about alerts".

# inputs

- Search `Knowledge Base/{{track}}/Prior-knowledge/*` and `Knowledge Base/Programme-wide/Prior-knowledge/*` for prior-knowledge summaries on this topic. If found, read them — the guide should avoid asking questions the team already has answers to. Show the user what you found and ask them to confirm.
- In copy-paste mode: ask the user to paste any prior-knowledge summary or context that should shape the guide.

# draft

Produce a guide that an interviewer can run without rehearsal. For each question, include:
- The question itself (open-ended, non-leading)
- What we're listening for (1 line — the signal that would answer the outcome question)
- A probe or two ("can you walk me through the last time that happened?", "what would have changed your answer?")

Structure:

## Interview guide — {{topic}}

**Purpose:** [restate the outcome question]
**Interviewee:** [role / seniority]
**Estimated duration:** [target minutes]

### Warmup (5 min)
Low-stakes questions to establish rapport and context.

- [Question]
  - *Listening for:* [signal]

### Core (20–30 min)
The questions that earn their keep. These are the ones that can answer the outcome question.

- [Question]
  - *Listening for:* [signal]
  - *Probe:* [follow-up]

### Probes (use as needed)
Reusable follow-ups for when an answer is shallow.

- "Can you give me an example?"
- "What were you thinking at that moment?"
- "What would have changed your answer?"

### Wrap-up (5 min)
- "Anything I should have asked but didn't?"
- "Who else should I be talking to about this?"

## Anti-leading checks (apply before running)

Self-check before using the guide:
- No question presupposes the answer ("how frustrating is X?" → "what did you think when X happened?")
- No question references a solution the team has imagined ("would you use feature Y?" → "what would help you with Z?")
- Every Core question maps to a piece of the outcome question — drop any that don't

# filing

@@if confluence@@
- Create a new page at `Knowledge Base/{{track}}/Interview-guides/{{topic}}` with the guide. Confirm the page is created and show the link.
- In copy-paste mode: return the markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create a new page at `Knowledge Base/{{track}}/Interview-guides/{{topic}}` with the guide. Confirm the page is created and show the link.
- In copy-paste mode: return the markdown for pasting and the user will file the page manually.
@@endif@@

# tips

- The "Listening for" annotation is the cheat code. It keeps the interviewer focused on signal instead of just collecting answers.
- Resist the temptation to add more questions. A guide with 8 sharp questions beats a guide with 20 vague ones. The wrap-up "anything I should have asked" question covers what you missed.
- Re-run this prompt for each interviewee role rather than building one giant guide that covers everyone. Different roles need different probes.
- After running interviews, the transcripts feed into the [research synthesiser](/prompts/research-synthesiser).
