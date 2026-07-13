---
title: "Prior-knowledge summariser"
phase: "research"
domain: "shared"
tool: "clara"
task: "summarise prior knowledge from past programmes on a specific topic"
expectedOutput: "A structured summary of past programme learnings with patterns, contradictions, adjacent work, and source citations."
inputsFrom: []
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "Past programme writeups touching the topic"
@@if confluence@@
      description: "Search Confluence broadly for pages mentioning the topic across all programmes. Common locations: programme spaces, research writeups, retrospectives, lessons-learned pages, post-iteration reviews. Look for pages with 'research', 'retrospective', 'lessons-learned' in titles."
@@endif@@
@@if plane@@
      description: "Search the Plane project broadly for work items mentioning the topic across all programmes. Common locations: programme projects, research writeups, retrospectives, lessons-learned work items, post-iteration reviews. Look for work items with 'research', 'retrospective', 'lessons-learned' in titles."
@@endif@@
  outputPathTemplate: "Knowledge Base/{{track}}/Prior-knowledge/{{topic}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to surface what's already known about a topic across past programmes — before starting fresh research.

# context

- **Topic** — what topic or domain you're researching. Be specific: "scheduling operator interviews around shift patterns", not "user research". Becomes `{{topic}}`.

# inputs

@@if confluence@@
- Search Confluence **broadly** — across all programmes / spaces you can reach, not just the current programme. Look for pages under research writeups, retrospective notes, post-iteration reviews, and any other space's Knowledge Base (or with `research`, `retrospective`, `lessons-learned` in titles).
- Show the user the list of pages you found and ask them to confirm or refine the set before reading them in detail.
@@endif@@
@@if plane@@
- Search the Plane project **broadly** — across all programmes / projects you can reach, not just the current programme. Look for work items under research writeups, retrospective notes, post-iteration reviews, and any other project's Knowledge Base (or with `research`, `retrospective`, `lessons-learned` in titles).
- Show the user the list of work items you found and ask them to confirm or refine the set before reading them in detail.
@@endif@@
- In copy-paste mode: ask the user to paste past writeups or research summaries on the topic.

# draft

Summarise everything we know about the topic across the confirmed sources. Identify:

- Recurring patterns or learnings
- Unresolved questions or contradictions
- Adjacent work that touched on this

For each finding, cite the source pages so the user can read deeper. If the corpus has nothing material on this, say so plainly — do not invent prior work.

Output as markdown with these sections:
## Recurring patterns
## Unresolved questions
## Adjacent work
## Sources

# filing

@@if confluence@@
- Create a new page at `Knowledge Base/{{track}}/Prior-knowledge/{{topic}}`. Confirm the page is created and show the link.
- In copy-paste mode: return the markdown and the user will file it by hand using the path above.
@@endif@@
@@if plane@@
- Create a new work item at `Knowledge Base/{{track}}/Prior-knowledge/{{topic}}`. Confirm the work item is created and show the link.
- In copy-paste mode: return the markdown for pasting and the user will file the work item by hand using the path above.
@@endif@@

# tips

- Be specific with the topic. Broader queries return mush.
- If the response is shallow, follow up with: "Go deeper on the recurring patterns — what specifically were the failure modes?"
- Treat citations as the deliverable. If a finding has no citation, treat it as a hypothesis, not a fact.
- Confirm CLARA's source list before she generates the summary. Wrong pages picked up here cascade into every downstream artefact — catch it upfront.
