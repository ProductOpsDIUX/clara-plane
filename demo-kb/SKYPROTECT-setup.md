# Set up the SKYPROTECT demo Knowledge Base in Confluence

## Who is reading this

You are an AI assistant with Confluence MCP tools. Your task is to populate a Confluence space named **`SKYPROTECT`** with a demo Knowledge Base for a fictional drone-defence C3 programme. The space already exists; do not create it.

The user is testing a ProductOps Co-pilot portal that produces structured research artefacts and files them into Confluence. SKYPROTECT is being used as test data.

## Filing discipline (apply to every page below)

1. **Space check.** Verify the `SKYPROTECT` space exists. If it does not, stop and report — do not create the space yourself.
2. **Hierarchy check.** Before creating any artefact page, verify every parent page in its path exists. If a parent is missing, create it as a placeholder first (top-down), with title equal to the path-level name and body equal to *"Placeholder — created to support filing structure."*
3. **No silent fallbacks.** If a path cannot be created (permissions, missing space, anything), stop and report. Never file at the space root or anywhere else without explicit confirmation.
4. **Apply the specified labels** on each page where given.
5. **Create pages in the order listed below** — that order respects the hierarchy.
6. **Render citations as Confluence page links.** Inside the artefact bodies (synthesis, persona, journey, PRD), every reference to a session ID (`S01`-`S16`), a walk-through (`WT01`-`WT04`), or a field observation (`Field Alpha 1`, `Field Alpha 2`, `Field Bravo 1`, `Field Bravo 2`) must be rendered as a Confluence link to the corresponding field-note page. Keep the short ID as the visible link text — *e.g.* `*evidence: S01, S03, S05*` becomes three inline links labelled `S01`, `S03`, `S05` pointing at their respective pages. Apply this rule when creating *any* artefact below — the page titles to link to are listed in the hierarchy and defined in pages 25-48.

## Target hierarchy

Everything sits inside the `SKYPROTECT` space, under a single top-level page named **Knowledge Base**:

```
SKYPROTECT (space)
└── Knowledge Base/
    ├── Programme-wide/
    │   ├── Personas (Programme-wide)/
    │   │   └── Air-defence-commander
    │   ├── Journeys (Programme-wide)/
    │   ├── Research-synthesis (Programme-wide)
    │   ├── Prior-knowledge (Programme-wide)/
    │   │   └── Counter-drone-systems
    │   ├── PRDs (Programme-wide)/
    │   ├── Interview-guides (Programme-wide)/
    │   └── Field-notes (Programme-wide)/
    │       ├── _Template — Field note (Programme-wide)
    │       ├── S13 — Air-defence commander interview
    │       ├── S14 — Air-defence commander interview
    │       ├── S15 — Air-defence commander interview
    │       └── S16 — Air-defence commander interview
    └── Operator-console/
        ├── Personas (Operator-console)/
        │   └── Console-operator
        ├── Journeys (Operator-console)/
        │   └── Engage-incoming-threat
        ├── Research-synthesis (Operator-console)
        ├── Prior-knowledge (Operator-console)/
        ├── PRDs (Operator-console)/
        │   └── Console-v1
        ├── Interview-guides (Operator-console)/
        └── Field-notes (Operator-console)/
            ├── _Template — Field note (Operator-console)
            ├── S01 — Console operator interview
            ├── S02 — Console operator interview
            ├── S03 — Console operator interview
            ├── S04 — Console operator interview
            ├── S05 — Console operator interview
            ├── S06 — Console operator interview
            ├── S07 — Console operator interview
            ├── S08 — Console operator interview
            ├── S09 — Console operator interview
            ├── S10 — Console operator interview
            ├── S11 — Console operator interview
            ├── S12 — Console operator interview
            ├── WT01 — Console paper-prototype walk-through
            ├── WT02 — Reconciliation view walk-through
            ├── WT03 — Site-context surfacing walk-through
            ├── WT04 — Commander acknowledgement walk-through
            ├── Field Alpha 1 — Site Alpha day shift
            ├── Field Alpha 2 — Site Alpha night shift
            ├── Field Bravo 1 — Site Bravo day shift
            └── Field Bravo 2 — Site Bravo night shift
```

Artefact-type folder titles carry the parent-track suffix in parentheses. This is the canonical filing convention from [`conventions/confluence-mcp.md`](../conventions/confluence-mcp.md) — Confluence Cloud enforces space-wide unique page titles, so two `Personas` folders in the same space would collide. The suffix makes disambiguation predictable. Track folders and leaf artefact pages do not take the suffix.

`Programme-wide` and `Operator-console` are **tracks**. Programme-wide holds umbrella artefacts that apply across all tracks; the Operator-console track holds artefacts specific to that slice of the work. SKYPROTECT is a digital programme — there are no engineering-track artefacts in this demo.

## SKYPROTECT — programme context

A digital command-and-control system for counter-UAS (counter-unmanned-aircraft-systems) operations protecting fixed sites — military bases, critical infrastructure, defence-led security at public events. The system unifies feeds from radar, RF detection, and EO/IR cameras into a single operator console, and supports the decision chain from alert through to engagement authorisation.

The current toolchain in use across DSTA-supported sites is described by operators as *"three windows duct-taped together"* — separate vendor systems for each sensor type, with the operator manually reconciling contradictions. SKYPROTECT replaces that with a single fused-sensor console plus a commander oversight view.

Use these names consistently across all pages so the demo coheres internally.

---

## Pages to create

### Page 1 — `Knowledge Base` (top-level parent placeholder)

- **Path:** `SKYPROTECT > Knowledge Base`
- **Title:** `Knowledge Base`
- **Labels:** none
- **Body:**

```
This is the SKYPROTECT programme's Knowledge Base. All AI-generated research artefacts file under here, organised by track.

Programme type: Digital

Tracks in this programme:
- Programme-wide — umbrella artefacts that apply across all tracks
- Operator-console — the operator-facing console

Filing convention: `Knowledge Base / <track> / <artefact-type> / <name>`.
```

---

### Page 2 — `Programme-wide` (track parent placeholder)

- **Path:** `Knowledge Base > Programme-wide`
- **Title:** `Programme-wide`
- **Labels:** none
- **Body:**

```
Programme-wide artefacts — personas, prior-knowledge summaries, and research synthesis that apply across all tracks in SKYPROTECT. Track-level artefacts may inherit from these as foundation.
```

---

### Page 3 — `Prior-knowledge (Programme-wide)` (folder placeholder under Programme-wide)

- **Path:** `Programme-wide > Prior-knowledge (Programme-wide)`
- **Title:** `Prior-knowledge (Programme-wide)`
- **Labels:** none
- **Body:** `Placeholder — created to support filing structure.`

---

### Page 4 — `Counter-drone-systems` (prior-knowledge artefact)

- **Path:** `Programme-wide > Prior-knowledge (Programme-wide) > Counter-drone-systems`
- **Title:** `Counter-drone-systems`
- **Labels:** `research`, `prior-knowledge`
- **Body:**

```
# Counter-drone systems — prior knowledge summary

A summary of what's already known across past programmes about counter-UAS systems and the operator workflows they support.

## Recurring patterns

- **Operators trust visual confirmation more than classifier confidence.** Across SHIELDWATCH (2023) and AEGIS-LITE (2024), operator after-action reports consistently cited "I looked at the camera feed before believing the radar return." Even when the classifier confidence was >90%, operators reached for the EO feed before escalating.
- **Multi-sensor disagreement is the dominant friction.** Single-sensor detection is largely solved at the algorithm level. The hard problem is what to do when radar says "small UAS, low altitude" and RF says "no UAS signature detected" — current systems present both readings and leave the operator to reconcile.
- **False-positive load on night shifts is materially higher.** Bird-strike season generates 3-5× the alert volume of off-season shifts. Operators on the OWLEYE programme described developing personal heuristics ("I just ignore anything below 80m near the lake") that worked for them but were never captured by the system.

## Unresolved questions

- Are operators' personal heuristics about false-positive sources transferable across sites, or are they site-specific? OWLEYE concluded they were largely site-specific; SHIELDWATCH suggested some generalised.
- How much classifier *explanation* (versus classifier *confidence*) does an operator actually need to act? Hard to disentangle in past data because confidence and explanation were always presented together.
- What's the right level of commander oversight? AEGIS-LITE found commanders wanted more visibility; operators found that visibility increased their hesitation. No resolution.

## Adjacent work

- **OWLEYE (2022-2024)** — counter-UAS at maritime sites. Heavier emphasis on RF detection due to over-water radar limitations. Lessons about RF false-positives from civilian maritime traffic.
- **SHIELDWATCH (2023)** — counter-UAS at fixed land sites. Closest analog to SKYPROTECT's use case. Their final report cited "alert fatigue on night shifts" as the unresolved issue going into SKYPROTECT.
- **AEGIS-LITE (2024)** — pilot for unified C2 view across multiple counter-UAS sites. Concluded that fusion was valuable but the implementation was too brittle to scale. SKYPROTECT is in part a re-attempt at unified C2 with better-engineered fusion.

## Sources

- SHIELDWATCH after-action report (Confluence: SHIELDWATCH space, "Lessons learned 2023")
- OWLEYE final synthesis (Confluence: OWLEYE space, "Programme close-out 2024")
- AEGIS-LITE pilot writeup (Confluence: AEGIS-LITE space, "Pilot report Q3 2024")
- Internal operator-fatigue study (Confluence: HUMAN-FACTORS space, "Night shift alert load 2024")
```

---

### Page 5 — `Research-synthesis (Programme-wide)` (programme-wide synthesis)

- **Path:** `Programme-wide > Research-synthesis (Programme-wide)`
- **Title:** `Research-synthesis (Programme-wide)`
- **Labels:** `research`, `synthesis`
- **Body:**

```
# Research synthesis — Programme-wide

**Outcome question:** What is the workflow change that would let air-defence operators move from multi-sensor alert to engagement decision quickly enough for soft-kill measures to remain the primary response?

**Sources:**
- Interview sessions S01-S12 (operators, mixed sites, Mar-Apr)
- Interview sessions S13-S16 (commanders, central operations room)
- Field observation notes — Site Alpha, 3 shifts
- Field observation notes — Site Bravo, 2 shifts
- SHIELDWATCH and AEGIS-LITE prior-programme writeups

## Themes

- **Operators trust their eyes more than the classifier.** Every session-level operator described falling back to the EO feed before believing a radar-derived classification. *Evidence: S01, S03, S05, S07, S09, S11.*
- **"Why" data matters more than "what" data.** Operators repeatedly asked for the basis of a classification — which sensor saw what, with what confidence — rather than just the classification label itself. *Evidence: S02, S04, S08, S10.*
- **Multi-sensor disagreement is the harder problem.** Single-sensor detection is largely fine; reconciling contradictions across radar / RF / EO is where time is lost. *Evidence: S01, S06, S08, S12; Field observation Alpha shift 2.*
- **Cross-shift handover loses context the system doesn't capture.** Each shift inherits the previous shift's situational picture verbally. Operators described re-discovering known false-positive sources (e.g. "the heli pad at Site Charlie always gives a return at 0600") shift after shift. *Evidence: S02, S05, S11; Field observation Bravo shifts 1+2.*
- **Commander oversight increases hesitation.** When commanders are actively watching the operator's screen, operators slow down by an average of ~20s per decision (self-reported). *Evidence: S03, S07; S13, S15.*

## Friction points

| Friction | Severity (1-5) | Frequency | Type | Evidence |
|---|---|---|---|---|
| Multi-sensor contradiction with no in-system reconciliation tool | 5 | Observed in 9 of 12 operator sessions | Design / systemic | S01, S06, S08, S12 |
| Commander acknowledgement latency stretching engagement window | 5 | Observed in 7 of 12 sessions; both commander sessions confirmed | Systemic | S03, S07, S09, S13, S15 |
| Night-shift alert fatigue from bird returns and civilian drones | 4 | All 4 night-shift observations | Design / training | Field Alpha 2, Field Bravo 2 |
| Lost context across shift handover | 4 | 11 of 12 sessions referenced it unprompted | Systemic | S02, S05, S07, S08, S11 |
| Classifier "confidence" presented without basis ("why") | 3 | 8 of 12 sessions | Design | S02, S04, S08, S10 |
| Operator personal heuristics never captured in the tool | 3 | All sessions | Design | All |
| Vendor-system context-switching during a single alert | 5 | Every observed alert response | Design / systemic | Field Alpha 1+2, Field Bravo 1+2 |

## Problem statement

> Air-defence operators monitoring multi-sensor feeds for unauthorised UAS activity cannot move quickly enough from alert to engagement decision because the current toolchain forces them to manually reconcile contradictions across three separate vendor systems while explaining their reasoning to commanders who are looking at different screens. The result is escalation latency that reduces the window for soft-kill measures and increases reliance on kinetic options.

**Alternatives considered:**
- *Frame as a classifier-accuracy problem* — rejected. Classifier accuracy is acceptable; the friction is reconciliation and explanation, not raw accuracy.
- *Frame as a commander-oversight problem* — partially correct, but addressing only the commander side misses the operator-side reconciliation friction that creates most of the time loss.

## Success criteria

- **Median alert-to-engagement-decision time** reduced from current baseline (measured 4-7 minutes across observed sessions) to **under 90 seconds for high-confidence threats**. Measured at operator desks via DASH 2.0 post-iteration prototype surveys.
- **80% of operator engagement decisions reference fused-sensor evidence** rather than single-sensor evidence. Measured via in-session decision logging.
- **Commander acknowledgement latency** reduced from current baseline (60-180s observed) to **under 30 seconds** for routine acknowledgement; commander deliberation time excluded from this metric.
- **False-positive rate at the operator desk** reduced by 50% relative to current baseline, through fusion-aware classification confidence (the classifier shows lower confidence when sensors disagree, not just averaged confidence).

## Open questions

- Should the cross-shift handover problem be solved inside SKYPROTECT (a structured handover artefact) or treated as outside scope (training / SOPs)?
- Are operators willing to log their personal heuristics into the system if it means a future operator on a different site sees them? Worth a follow-up round of interviews.
- Is the "commander oversight increases hesitation" finding stable across different commander-operator pair familiarities, or only present with newer pairings?
```

---

### Page 6 — `Personas (Programme-wide)` (folder placeholder under Programme-wide)

- **Path:** `Programme-wide > Personas (Programme-wide)`
- **Title:** `Personas (Programme-wide)`
- **Labels:** none
- **Body:** `Placeholder — created to support filing structure.`

---

### Page 7 — `Air-defence-commander` (programme-wide persona)

- **Path:** `Programme-wide > Personas (Programme-wide) > Air-defence-commander`
- **Title:** `Air-defence-commander`
- **Labels:** `research`, `artefact`, `persona`
- **Body:**

```
# Air-defence commander

- **Summary:** Senior officer responsible for engagement authorisation across 3-5 fixed sites simultaneously from a central operations room. Final decision-maker on response options.

- **Goals (4):**
  - Maintain a coherent threat picture across all sites under their command — *evidence: S13, S15.*
  - Authorise engagement quickly enough to keep soft-kill measures viable — *evidence: S13, S14, S15, S16.*
  - Stay confident in the decision afterwards (auditable rationale) — *evidence: S15, S16.*
  - Avoid disrupting operator focus during active alerts — *evidence: S13, S15.*

- **Pains (4):**
  - Cannot see what the operator is seeing without explicitly asking — *evidence: S13, S15.*
  - Acknowledgement workflow is too heavy for routine cases, too light for high-stakes ones (no differentiation) — *evidence: S14, S16.*
  - Multi-site picture currently requires switching between site-specific dashboards manually — *evidence: S13, S15.*
  - Reasoning behind classifier confidence is opaque, so they ask the operator to explain — adding 20-60s per decision — *evidence: S15.*

- **Context:** Works from a central operations room at the regional defence HQ, overseeing operators distributed across protected sites. Typically a senior officer (Lt Col equivalent or above) with 15+ years' experience. On duty in 8-hour shifts; usually 1-2 active alerts per shift requiring authorisation.

- **Real quote:** *"My job in those 30 seconds isn't to second-guess them — it's to confirm I'd make the same call if I were sitting there. But to do that, I need to see what they're seeing, and right now I don't."* — S15.

- **Non-obvious trait:** Commanders prefer *less* automated assistance for themselves than for operators. Where operators welcome classifier explanations and fusion confidence scores, commanders explicitly said they want to see the *raw operator reasoning*, not an additional layer of system-generated context. Quote from S16: *"If the system pre-digests it for me, I lose the read on what the operator is actually thinking."*

- **Evidence sources:** S13 (interview), S14 (interview), S15 (interview, primary), S16 (interview).
```

---

### Page 8 — `Operator-console` (track parent placeholder)

- **Path:** `Knowledge Base > Operator-console`
- **Title:** `Operator-console`
- **Labels:** none
- **Body:**

```
The Operator-console track. The operator-facing console is the primary user-facing artefact of SKYPROTECT — the unified screen that replaces the previous three-vendor toolchain.

Artefacts in this track are scoped to operators' use of the console. Programme-wide personas, prior-knowledge summaries, and the umbrella research synthesis cascade in as foundation.
```

---

### Page 9 — `Research-synthesis (Operator-console)` (track-level)

- **Path:** `Operator-console > Research-synthesis (Operator-console)`
- **Title:** `Research-synthesis (Operator-console)`
- **Labels:** `research`, `synthesis`
- **Body:**

```
# Research synthesis — Operator-console track

**Outcome question:** What console interactions would let an operator move from a multi-sensor alert to a high-confidence engagement decision in under 90 seconds without sacrificing decision auditability?

**Sources:**
- Interview sessions S01-S12 (operators)
- Field observation notes — Site Alpha (3 shifts), Site Bravo (2 shifts)
- Console mock walk-through sessions WT01-WT04 (with operators reacting to paper prototypes)
- Programme-wide Research-synthesis (inherited as foundation)

## Themes

- **Operators want a "single screen" they can stay on through an entire engagement.** Context-switching between sensor views is the most consistently named friction. *Evidence: S01, S03, S05, S06, S08, S11; Field Alpha 1+2.*
- **Sensor-disagreement is a first-class console state, not an exception.** When sensors disagree, operators want a dedicated reconciliation view, not a banner on the main display. *Evidence: S04, S08, S10; WT02, WT03.*
- **Operators want the console to surface previously-noted false-positive sources for the current site.** "If someone before me flagged that the heli pad gives 0600 returns, show me." *Evidence: S02, S05, S07.*
- **Engagement-decision logging needs to be 1-2 clicks, not a form.** Operators currently avoid logging mid-engagement because the form is too heavy; rationale gets reconstructed afterwards from memory. *Evidence: S03, S09, S11; WT01.*

## Friction points

| Friction | Severity (1-5) | Frequency | Type | Evidence |
|---|---|---|---|---|
| Context-switch between sensor vendor views during a single alert | 5 | Every observed alert response | Design / systemic | Field Alpha 1+2, Field Bravo 1+2 |
| Reconciliation of contradicting sensors has no dedicated tool | 5 | 9 of 12 sessions | Design | S01, S04, S06, S08, S10, S12 |
| Engagement-decision logging is too heavy to complete in-flight | 4 | 8 of 12 sessions; observed in all field shifts | Design | S03, S09, S11; Field all |
| Site-specific false-positive context is lost between shifts | 4 | 11 of 12 sessions | Systemic | S02, S05, S07, S08, S11 |
| Commander-acknowledgement state not visible on operator screen | 3 | 6 of 12 sessions | Design | S03, S07, S09, S15 |
| Classifier confidence shown without sensor-level basis | 3 | 8 of 12 sessions | Design | S02, S04, S08, S10 |

## Problem statement

> Operators using the current toolchain cannot complete an alert-to-engagement workflow on a single screen because each sensor type lives in a separate vendor system. Reconciling contradicting sensors, logging the decision rationale, and acknowledging commander oversight all happen in different places — adding time, fragmenting attention, and producing post-hoc rationale rather than in-flight reasoning. A unified operator console that treats fusion, reconciliation, and logging as first-class console states (not exceptions) is the path forward.

**Alternatives considered:**
- *Improve the existing three-vendor toolchain via integration layers* — rejected. Operator interviews and prior-programme writeups (AEGIS-LITE) suggest integration patches don't address the fundamental attention fragmentation.

## Success criteria

- **Median alert-to-engagement-decision time** on the new console is under 90 seconds for high-confidence threats. Measured via DASH 2.0 prototype surveys after each iteration.
- **100% of operator decisions** are logged in-flight (during the engagement, not reconstructed afterwards). Measured via console telemetry.
- **80% of operators** report (DASH survey) that the console gives them everything they need on one screen for ≥90% of alerts.
- **Reconciliation view used in ≥60% of contradicting-sensor alerts** during evaluation. Measured via console telemetry.

## Open questions

- Should commander-acknowledgement state appear inline in the operator's primary view, or as a peripheral indicator? Operators split roughly evenly in WT04.
- Is site-specific false-positive context something the console should *suggest* (passive) or *prompt* (active) at start-of-shift? Both modes tested in WT03; no clear winner.
```

---

### Page 10 — `Personas (Operator-console)` (folder placeholder under Operator-console)

- **Path:** `Operator-console > Personas (Operator-console)`
- **Title:** `Personas (Operator-console)`
- **Labels:** none
- **Body:** `Placeholder — created to support filing structure.`

---

### Page 11 — `Console-operator` (track-specific persona)

- **Path:** `Operator-console > Personas (Operator-console) > Console-operator`
- **Title:** `Console-operator`
- **Labels:** `research`, `artefact`, `persona`
- **Body:**

```
# Console operator

- **Summary:** Mid-career shift-based operator (4-12 years' experience) sitting in front of the unified console for a 12-hour shift. Primary user of SKYPROTECT.

- **Goals (4):**
  - Get to a high-confidence engagement decision quickly — *evidence: S01, S03, S06, S08, S11.*
  - Stay confident in their own decision afterwards (auditable, defensible) — *evidence: S03, S09, S11.*
  - Keep alert-fatigue low across a long shift — *evidence: S05, S07; Field Alpha 2 (night).*
  - Hand a coherent picture to the next shift — *evidence: S02, S05, S08, S11.*

- **Pains (5):**
  - Context-switching between vendor systems during an active alert — *evidence: S01, S06, S08; Field all.*
  - Sensor disagreement with no in-tool reconciliation — *evidence: S04, S08, S10.*
  - Decision logging is heavy enough that they skip it mid-engagement — *evidence: S03, S09, S11.*
  - Re-discovering false-positive sources each shift — *evidence: S02, S05, S07.*
  - Commander acknowledgement state invisible on their screen, forcing voice check — *evidence: S03, S07.*

- **Context:** Works in a fixed C2 cell at a protected site, 12-hour shifts on rotation. Comfortable with multi-screen workflows but increasingly intolerant of context-switching after years of patching together vendor tools. Trusts their own eyes (EO feed) and their experience-derived heuristics over classifier confidence scores.

- **Real quote:** *"The classifier says 87%. Fine. But 87% of what? Until I see the EO feed I'm not moving. And by then the soft-kill window is half gone."* — S08.

- **Non-obvious trait:** Console operators are *more* willing to act on a fused-sensor low-confidence signal than on a single-sensor high-confidence signal. Counterintuitive but consistent: across S04, S06, S08, S10, operators preferred "radar+RF+EO all weakly agree" to "radar strongly says yes, RF and EO silent." Their stated reason: a single sensor can be fooled; three weak agreements is harder to fake.

- **Evidence sources:** S01, S03, S04, S05, S06, S07, S08, S09, S10, S11; Field Alpha 1+2, Field Bravo 1+2.
```

---

### Page 12 — `Journeys (Operator-console)` (folder placeholder under Operator-console)

- **Path:** `Operator-console > Journeys (Operator-console)`
- **Title:** `Journeys (Operator-console)`
- **Labels:** none
- **Body:** `Placeholder — created to support filing structure.`

---

### Page 13 — `Engage-incoming-threat` (journey map)

- **Path:** `Operator-console > Journeys (Operator-console) > Engage-incoming-threat`
- **Title:** `Engage-incoming-threat`
- **Labels:** `research`, `artefact`, `journey-map`
- **Body:**

```
# Journey map — Engage incoming threat (current state)

**Persona:** Console operator
**Scope:** From initial multi-sensor alert through to engagement authorisation and post-engagement logging. Current-state, three-vendor toolchain.
**Evidence base:** Field observation Alpha 1+2, Field Bravo 1+2, sessions S01-S12.

## Stage 1 — Alert received

**Actions:** Operator hears alert tone, glances at radar vendor screen, notes timestamp + bearing.

**Emotion:** Alert but not yet committed. Suspicious by default (false-positive rate is high).

**Friction:**
- Alert tone is the same for low and high confidence — operator must look at the screen to triage.
- Radar screen shows only one sensor's view; operator must mentally hold the bearing while opening the next sensor view.

**Opportunity:** Pre-fused alert with confidence tier (high / medium / low) and the bearing held on a single screen.

## Stage 2 — Triage across sensors

**Actions:** Operator opens RF vendor system, looks for matching detection on bearing. If found, opens EO/IR vendor system, slews camera, confirms visually.

**Emotion:** Frustration if sensors disagree. Time pressure climbing.

**Friction:**
- Three vendor systems means two context switches and two re-enterings of bearing data.
- Sensors often disagree; no tool for reconciliation. Operator builds a mental model and lives with the uncertainty.
- 60-180s typically spent here, per field observations.

**Opportunity:** Single unified view with a dedicated reconciliation tool when sensors disagree.

## Stage 3 — Classify and decide

**Actions:** Operator forms a judgement (real threat / false positive / inconclusive). If real, decides on engagement option (soft-kill RF / kinetic escalation / monitor).

**Emotion:** Commitment moment. High cognitive load.

**Friction:**
- Classifier confidence is shown but without sensor-level basis. Operator typically discounts it.
- Personal heuristics ("the heli pad always gives false at 0600") not captured in the system — operator relies on shift experience.

**Opportunity:** Surface site-specific false-positive context proactively; show sensor-level basis for classifier confidence.

## Stage 4 — Escalate for commander acknowledgement

**Actions:** Operator radios commander, summarises situation verbally, awaits acknowledgement before acting on soft-kill.

**Emotion:** Time-anxious. Engagement window narrowing.

**Friction:**
- Acknowledgement is voice-only; no shared view between operator and commander.
- Operator describes the situation twice — once to themselves while triaging, once to the commander.
- 30-90s typically spent here.

**Opportunity:** Commander acknowledgement workflow integrated into the console; commander sees the operator's screen state.

## Stage 5 — Act and log

**Actions:** Operator executes the authorised response. After the immediate threat is resolved, opens the logging form and reconstructs the rationale.

**Emotion:** Relief, then administrative burden.

**Friction:**
- Logging form is multi-field, multi-screen — heavy enough that operators consistently complete it post-hoc, reconstructing rationale from memory.
- Information that *would* be valuable for the next shift (site-specific false-positive contexts noticed during this engagement) often doesn't make it into the log.

**Opportunity:** In-flight 1-2 click logging that captures the *sensor evidence in the operator's view at decision-time*, not a free-text reconstruction.

## Moments of truth

- **Stage 2 reconciliation** — if the operator loses confidence here, the rest of the workflow is shaky.
- **Stage 4 commander acknowledgement** — the time spent here is fully outside the operator's control and most directly affects whether soft-kill measures stay viable.
- **Stage 5 logging fidelity** — the difference between a programme that gets richer over shifts and one that doesn't.
```

---

### Page 14 — `PRDs (Operator-console)` (folder placeholder under Operator-console)

- **Path:** `Operator-console > PRDs (Operator-console)`
- **Title:** `PRDs (Operator-console)`
- **Labels:** none
- **Body:** `Placeholder — created to support filing structure.`

---

### Page 15 — `Console-v1` (PRD)

- **Path:** `Operator-console > PRDs (Operator-console) > Console-v1`
- **Title:** `Console-v1`
- **Labels:** `research`, `artefact`, `prd`
- **Body:**

```
# PRD — Console v1

## 1. Problem statement

Air-defence operators using the current three-vendor toolchain cannot complete an alert-to-engagement workflow on a single screen. Context-switching between sensor systems, manually reconciling contradicting sensors, and reconstructing decision rationale after the fact together produce an alert-to-engagement-decision latency of 4-7 minutes — long enough that soft-kill measures are often no longer viable by the time engagement is authorised. Console v1 replaces the three vendor systems with a single unified operator screen.

## 2. Target users / operators

Primary: **Console operators** (see the track-level persona at `Operator-console / Personas (Operator-console) / Console-operator`).

Secondary: **Air-defence commanders** (see `Programme-wide / Personas (Programme-wide) / Air-defence-commander`) — they consume the acknowledgement workflow but are not the primary console user. A separate commander view will be scoped after Console v1 ships.

## 3. Success criteria

- Median alert-to-engagement-decision time under **90 seconds** for high-confidence threats (baseline 4-7 minutes). Measured via DASH 2.0 prototype surveys at the end of each evaluation iteration.
- **100% of operator decisions logged in-flight** (during the engagement, captured from console state at decision-time — not reconstructed). Measured via console telemetry.
- **80% of operators** report (DASH survey) that the console gives them everything they need on one screen for ≥90% of alerts.
- Operators use the **dedicated reconciliation view in ≥60%** of contradicting-sensor alerts in evaluation.

## 4. In scope / out of scope

**In scope:**
- Unified single-screen view fusing radar, RF, and EO/IR feeds
- Dedicated reconciliation view triggered when sensors disagree above a configurable threshold
- 1-2 click in-flight engagement-decision logging from current console state
- Site-specific false-positive context surfaced at start-of-shift
- Commander acknowledgement state visible inline (without forcing voice-only escalation)

**Out of scope (Console v1):**
- Cross-site coordination view (deferred to commander-view scoping)
- Cross-shift handover artefact (deferred — research synthesis flagged this as an open question)
- Mobile / remote operator access
- Classifier retraining or sensor-fusion algorithm changes (the algorithm side is treated as a black-box input)
- Kinetic-escalation team interface (handled by a separate downstream system)

## 5. User stories / jobs-to-be-done

- *As a* console operator, *when* a multi-sensor alert fires, *I want* to see all three sensor feeds plus the fused-confidence assessment in one screen, *so that* I don't context-switch between vendor systems while the engagement window closes.
- *As a* console operator, *when* sensors disagree above the reconciliation threshold, *I want* a dedicated reconciliation view that shows each sensor's basis, *so that* I can decide which sensor to trust without leaving the alert workflow.
- *As a* console operator, *when* I commit to an engagement decision, *I want* the console state at that moment captured as the decision log, *so that* I'm not reconstructing rationale from memory after the threat is resolved.
- *As a* console operator, *when* I start a shift at a site, *I want* the console to surface previously-noted false-positive sources for that site, *so that* I don't re-discover them mid-alert.
- *As a* console operator, *when* I'm awaiting commander acknowledgement, *I want* the acknowledgement state visible on my screen, *so that* I'm not blocked on voice-channel confirmation.

## 6. Constraints and dependencies

- **Sensor data:** depends on existing radar, RF, and EO/IR feeds being available via the unified fusion service. The fusion service itself is built by a separate team on the SKYPROTECT engineering side.
- **Classification confidence + sensor basis** must be exposed by the fusion service in a way the console can render. API contract to be agreed.
- **Commander acknowledgement workflow** depends on the commander view spec (not part of v1). Console v1 will render the acknowledgement *state* but the commander-side acknowledgement *action* must work via existing voice protocols until commander view ships.
- **Deployment site classification levels** vary across protected sites — the console must handle the lowest-common-denominator classification cleanly. Site-specific overrides handled via configuration, not code.

## 7. Open questions

- How should the reconciliation view be triggered — automatically when sensors disagree above threshold, or operator-triggered on demand? Both modes tested in walk-through WT03; no decisive preference.
- Should site-specific false-positive context appear as a *prompt* at start-of-shift or *passively available* via a side panel? Operators split in WT03.
- Does the in-flight logging UI need to support free-text addition, or is structured-only (capturing console state + a few one-tap rationale chips) sufficient? Risk of free-text addition is that it slows logging back down.
- What is the right reconciliation-threshold default? Field observation suggests sensors disagree on roughly 30% of alerts; setting threshold too low will fatigue operators with the reconciliation view; too high and it never triggers.
```

---

### Page 16 — `Journeys (Programme-wide)` (folder placeholder under Programme-wide)

- **Path:** `Programme-wide > Journeys (Programme-wide)`
- **Title:** `Journeys (Programme-wide)`
- **Labels:** none
- **Body:** `Placeholder — created to support filing structure.`

---

### Page 17 — `PRDs (Programme-wide)` (folder placeholder under Programme-wide)

- **Path:** `Programme-wide > PRDs (Programme-wide)`
- **Title:** `PRDs (Programme-wide)`
- **Labels:** none
- **Body:** `Placeholder — created to support filing structure.`

---

### Page 18 — `Interview-guides (Programme-wide)` (folder placeholder under Programme-wide)

- **Path:** `Programme-wide > Interview-guides (Programme-wide)`
- **Title:** `Interview-guides (Programme-wide)`
- **Labels:** none
- **Body:** `Placeholder — created to support filing structure.`

---

### Page 19 — `Prior-knowledge (Operator-console)` (folder placeholder under Operator-console)

- **Path:** `Operator-console > Prior-knowledge (Operator-console)`
- **Title:** `Prior-knowledge (Operator-console)`
- **Labels:** none
- **Body:** `Placeholder — created to support filing structure.`

---

### Page 20 — `Interview-guides (Operator-console)` (folder placeholder under Operator-console)

- **Path:** `Operator-console > Interview-guides (Operator-console)`
- **Title:** `Interview-guides (Operator-console)`
- **Labels:** none
- **Body:** `Placeholder — created to support filing structure.`

---

### Page 21 — `Field-notes (Programme-wide)` (folder placeholder under Programme-wide)

- **Path:** `Programme-wide > Field-notes (Programme-wide)`
- **Title:** `Field-notes (Programme-wide)`
- **Labels:** none
- **Body:** `Placeholder — created to support filing structure.`

---

### Page 22 — `_Template — Field note (Programme-wide)` (template under Programme-wide field notes)

- **Path:** `Programme-wide > Field-notes (Programme-wide) > _Template — Field note (Programme-wide)`
- **Title:** `_Template — Field note (Programme-wide)`
- **Labels:** none
- **Body:**

```
## How to use this template

1. **Duplicate this page** into the `Field-notes (Programme-wide)` folder (Confluence: page `⋯` menu → *Copy*).
2. **Rename your copy** to something memorable — e.g. `Commander-session-2026-05-22`, `Cross-site-handover-observation-2026-05-30`. Use whatever scheme suits you; CLARA reads the body, not the title.
    - Drop the `_Template — ` prefix.
    - Drop the `(Programme-wide)` suffix too — leaf field-note pages don't carry the track suffix (only the *folder* does).
3. **Leave Session ID blank.** CLARA stamps it the first time she processes the note; do not edit this field yourself.
4. **Fill in the rest.** Participants and User group are optional but useful; Raw notes and Verbatim quotes are the substance.
5. Delete this *How to use* block before saving — it's guidance for you, not part of the note.

---

- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** e.g. Console operator (x2), Air-defence commander (x1)
- **User group:** 

---

## Raw notes

_Drop your notes here. No structure required._

---

## Verbatim quotes

_Exact words from participants only. Attribute to role where possible — e.g. Console operator: "..."_
```

---

### Page 23 — `Field-notes (Operator-console)` (folder placeholder under Operator-console)

- **Path:** `Operator-console > Field-notes (Operator-console)`
- **Title:** `Field-notes (Operator-console)`
- **Labels:** none
- **Body:** `Placeholder — created to support filing structure.`

---

### Page 24 — `_Template — Field note (Operator-console)` (template under Operator-console field notes)

- **Path:** `Operator-console > Field-notes (Operator-console) > _Template — Field note (Operator-console)`
- **Title:** `_Template — Field note (Operator-console)`
- **Labels:** none
- **Body:**

```
## How to use this template

1. **Duplicate this page** into the `Field-notes (Operator-console)` folder (Confluence: page `⋯` menu → *Copy*).
2. **Rename your copy** to something memorable — e.g. `Operator-session-2026-05-22`, `Site-Alpha-night-shift-observation-2026-05-30`. Use whatever scheme suits you; CLARA reads the body, not the title.
    - Drop the `_Template — ` prefix.
    - Drop the `(Operator-console)` suffix too — leaf field-note pages don't carry the track suffix (only the *folder* does).
3. **Leave Session ID blank.** CLARA stamps it the first time she processes the note; do not edit this field yourself.
4. **Fill in the rest.** Participants and User group are optional but useful; Raw notes and Verbatim quotes are the substance.
5. Delete this *How to use* block before saving — it's guidance for you, not part of the note.

---

- **Session ID:** (assigned by CLARA — do not edit)
- **Participants:** e.g. Console operator (x2), Air-defence commander (x1)
- **User group:** 

---

## Raw notes

_Drop your notes here. No structure required._

---

## Verbatim quotes

_Exact words from participants only. Attribute to role where possible — e.g. Console operator: "..."_
```

---

### Page 25 — `S13 — Air-defence commander interview`

- **Path:** `Programme-wide > Field-notes (Programme-wide) > S13 — Air-defence commander interview`
- **Title:** `S13 — Air-defence commander interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S13
- **Participants:** Air-defence commander (x1) — Lt Col, 18 yrs exp
- **User group:** Commanders (central ops room)

---

## Raw notes

Conducted in the central ops room mid-shift, 45 min. Subject oversees three sites concurrently. Main thread of the conversation was around the difficulty of holding a coherent picture across sites when each site dashboard is in a separate browser tab. Subject described "tab-thrashing" during the morning bird-strike window when several sites get returns within minutes of each other.

On engagement authorisation: subject wants to authorise quickly enough that soft-kill remains viable but emphasised that quickness is constrained by *not knowing what the operator is seeing*. Currently he asks the operator over voice to describe sensor state — adds 20-40s per call. He explicitly does *not* want a system-summarised version; he wants the operator's own framing.

On operator disruption: subject said he tries to "stay out of the operator's screen" during active alerts because he's noticed operators slow down visibly when they think he's watching. He sees this as a design problem of the current setup, not an operator problem.

---

## Verbatim quotes

Commander: "I'm holding three sites in my head and switching between three dashboards to do it. That's not a picture, that's a slideshow."

Commander: "I want to know quickly enough to keep soft-kill on the table. Right now I'm getting there via voice, which costs me thirty, forty seconds a call."

Commander: "If I'm visibly watching their screen they slow down. I've stopped doing it during live alerts."
```

---

### Page 26 — `S14 — Air-defence commander interview`

- **Path:** `Programme-wide > Field-notes (Programme-wide) > S14 — Air-defence commander interview`
- **Title:** `S14 — Air-defence commander interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S14
- **Participants:** Air-defence commander (x1) — Maj, 12 yrs exp
- **User group:** Commanders (central ops room)

---

## Raw notes

Newer commander, came up through the operator role two years ago. 60 min, ops room.

Spent most of the session on the acknowledgement workflow. Subject's core complaint: acknowledgement is one button regardless of stakes. A routine bird-strike re-classification needs the same physical action as authorising a soft-kill on a confirmed hostile UAS. Subject described having developed a personal habit of "double-pausing" before high-stakes acknowledgements just to slow himself down, because the workflow doesn't differentiate.

Asked about quick-vs-considered tension: he said for routine cases he wants the acknowledgement to be near-instant; for high-stakes ones he wants the system to *make him* pause — show him the operator's reasoning, the sensor confidence breakdown, the engagement option being requested. Not to gate him, but to force a conscious read.

---

## Verbatim quotes

Commander: "The button is the same whether I'm acknowledging a heron at 0600 or authorising soft-kill on a real one. That's a workflow problem."

Commander: "I want the routine ones out of my face. I want the serious ones to slow me down on purpose."

Commander: "I've literally trained myself to count to two before the high-stakes presses. The system should be doing that, not me."
```

---

### Page 27 — `S15 — Air-defence commander interview`

- **Path:** `Programme-wide > Field-notes (Programme-wide) > S15 — Air-defence commander interview`
- **Title:** `S15 — Air-defence commander interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S15
- **Participants:** Air-defence commander (x1) — Lt Col, 22 yrs exp
- **User group:** Commanders (central ops room)

---

## Raw notes

Most senior of the commander interviews. 75 min, his office. Subject is the unofficial reference point for the other commanders — they bring him hard calls. Heavy thread about classifier confidence: he doesn't trust a confidence score he can't trace to specific sensor evidence. He'd rather have *no* score than a score he can't reason about. Quote below captures this.

On multi-site oversight: he runs five sites and switches between them constantly. The act of switching loses him picture continuity — when he flips back to Site 3 after dealing with Site 1, he has to re-orient.

On commander-induced operator hesitation: confirmed S13's finding. Subject said he can *see* operators slow down when he opens their session view. He's stopped doing live views during alerts and now does post-engagement reviews instead, which he likes worse.

On confidence afterwards: emphasised that he carries the decisions home with him. He wants the rationale auditable not for compliance but for his own conscience. The current system makes him reconstruct rationale from his memory of the voice call.

---

## Verbatim quotes

Commander: "My job in those 30 seconds isn't to second-guess them — it's to confirm I'd make the same call if I were sitting there. But to do that, I need to see what they're seeing, and right now I don't."

Commander: "A confidence number I can't trace is noise. Show me which sensor saw what, or don't show me anything."

Commander: "Five sites, five tabs. I lose the picture every time I switch."

Commander: "I want to be able to sleep on the call. Right now the only record is what I remember from a voice exchange."
```

---

### Page 28 — `S16 — Air-defence commander interview`

- **Path:** `Programme-wide > Field-notes (Programme-wide) > S16 — Air-defence commander interview`
- **Title:** `S16 — Air-defence commander interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S16
- **Participants:** Air-defence commander (x1) — Lt Col, 16 yrs exp
- **User group:** Commanders (central ops room)

---

## Raw notes

60 min, ops room. Conversation centred on what the system should *not* do for commanders. Subject is sceptical of automated summaries — he'd rather hear the operator speak than read a system-generated digest. His view: when the system pre-digests for him he loses the read on what the operator is actually thinking, including their level of certainty. Confirmed his preference for operator-authored framing over system-authored framing.

Reiterated S14's concern about acknowledgement granularity. Said the current workflow flattens the cognitive register — routine and high-stakes get the same physical interaction, which is unfit for what the role actually requires.

Stayed-confident-afterwards: subject keeps a personal logbook outside the system because he doesn't trust the system's log to capture what he was actually weighing. He'd stop keeping it if the in-system log captured his rationale in his own words at the moment of decision.

---

## Verbatim quotes

Commander: "If the system pre-digests it for me, I lose the read on what the operator is actually thinking."

Commander: "I want to hear them — their hedge, their certainty. A summary loses that."

Commander: "I keep my own log on paper because I don't trust the system to record what I was weighing."
```

---

### Page 29 — `S01 — Console operator interview`

- **Path:** `Operator-console > Field-notes (Operator-console) > S01 — Console operator interview`
- **Title:** `S01 — Console operator interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S01
- **Participants:** Console operator (x1) — 8 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

45 min, end of day shift. Subject described a standard alert response as "open radar, then open RF, then open camera, then make a call" — three windows, three context switches before the decision. Said the slowest part is the second open, because by then he's holding the bearing in his head and worrying about losing it.

On classifier confidence: subject does not act on the radar classifier confidence alone. He always confirms on EO. Said the camera feed is "the only thing that doesn't lie to you" because everything else is downstream of an algorithm he doesn't trust. Asked what would change his mind: showing him the sensor-level evidence behind a classification, not just the number.

On contradictory sensors: the worst case is when radar says "yes, UAS" and RF says "no signature." He has no in-tool way to reconcile — he builds a mental model and acts on the EO.

---

## Verbatim quotes

Operator: "It's open radar, open RF, open camera, then make a call. Three opens before I've decided anything."

Operator: "The camera is the only thing that doesn't lie to you. The rest is an algorithm I don't know."

Operator: "If radar and RF disagree, I'm just guessing. There's no tool for that disagreement."
```

---

### Page 30 — `S02 — Console operator interview`

- **Path:** `Operator-console > Field-notes (Operator-console) > S02 — Console operator interview`
- **Title:** `S02 — Console operator interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S02
- **Participants:** Console operator (x1) — 6 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

50 min, beginning of shift. Subject's main thread was about classifier *basis* — she wants to know *why* a classifier landed on 87% confidence, not just the number. Said the number on its own is meaningless because she can't reason about it.

On cross-shift handover: she described inheriting a "blank picture" from the previous shift. She knows the previous operator noted things — false-positive sources, recurring artefacts — but those notes don't make it into the system, they live in the operator's head. Subject has personally re-discovered the Site Alpha heli-pad 0600 return three times in two months.

Said the worst part of the handover gap is that it makes new operators slower. Site-specific gotchas are learned by suffering through them, not transmitted.

---

## Verbatim quotes

Operator: "87% of what? Show me which sensor saw what. Then the number means something."

Operator: "Every shift I start blind. Whatever the previous shift learned, it stayed with them."

Operator: "The heli-pad gives a return every morning at 0600. I've figured that out three times now because nobody can write it down where the system shows it."
```

---

### Page 31 — `S03 — Console operator interview`

- **Path:** `Operator-console > Field-notes (Operator-console) > S03 — Console operator interview`
- **Title:** `S03 — Console operator interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S03
- **Participants:** Console operator (x1) — 10 yrs exp, Site Bravo
- **User group:** Operators

---

## Raw notes

60 min, day shift midpoint. Subject spent most of the session on the engagement-decision logging form. Said he stopped trying to log mid-engagement after about a year on the job because the form is too heavy — multi-field, multi-screen. He now logs post-hoc, reconstructing what he was thinking from memory and from his radio transcripts.

On commander acknowledgement: subject said the worst thing about the current workflow is not knowing whether the commander has heard him. He radios, waits, sometimes re-radios. Acknowledgement state isn't on his screen. He estimated this costs him 20-40s on roughly half his engagements.

On commander-induced hesitation: when subject knows the commander is on the radio listening, he speaks more carefully and decides slower. Estimated ~20s slower per decision when commander is actively watching/listening. Confirmed S07's finding.

---

## Verbatim quotes

Operator: "The logging form is heavy enough that I just don't fill it in-flight. I reconstruct after."

Operator: "I'm radioing the commander and I don't know if she's heard me. Is she there? Has she ack'd? My screen doesn't tell me."

Operator: "When I know command is on the line I'm slower. I'm choosing my words. That's twenty seconds I don't have."
```

---

### Page 32 — `S04 — Console operator interview`

- **Path:** `Operator-console > Field-notes (Operator-console) > S04 — Console operator interview`
- **Title:** `S04 — Console operator interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S04
- **Participants:** Console operator (x1) — 5 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

45 min, ops cell. Subject is comfortable with the "fused sensors disagree" case being a normal state, not an exception. She explicitly asked for a dedicated reconciliation view — said the current implementation buries disagreement under a banner that's easy to miss. She wants to see each sensor's contribution side-by-side with its basis.

On classifier confidence: similar to S02, wants the basis, not the number. Said she'd accept a *lower* nominal confidence if she could see *why* it's low.

Non-obvious thread: she said she trusts "three weak agreements" more than "one strong agreement." Counterintuitive but consistent — if radar weakly says yes, RF weakly says yes, and EO weakly says yes, that's three independent failure modes that all have to be wrong simultaneously. A single strong radar return could be a single sensor glitch.

---

## Verbatim quotes

Operator: "Disagreement isn't an exception. It's half my alerts. Make it a real view, not a banner."

Operator: "Tell me a lower confidence number if you can tell me why. That I can work with."

Operator: "Three sensors weakly agreeing is harder to fake than one sensor strongly insisting. Give me the three."
```

---

### Page 33 — `S05 — Console operator interview`

- **Path:** `Operator-console > Field-notes (Operator-console) > S05 — Console operator interview`
- **Title:** `S05 — Console operator interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S05
- **Participants:** Console operator (x1) — 12 yrs exp, Site Bravo
- **User group:** Operators

---

## Raw notes

55 min, post-shift. Subject is one of the longer-tenured operators. Spoke at length about alert fatigue on night shifts — said the night bird-strike window (roughly 0500-0700 at Site Bravo) generates 4-6× the alert volume of an off-season day shift, and that fatigue is the single biggest threat to decision quality.

On EO reliance: same pattern as S01/S03 — always confirms on camera before believing radar. Said this isn't paranoia, it's experience: radar has been wrong often enough that he won't act without the EO.

On handover: said he's developed a small notebook of site-specific false-positive sources he's learned over the years. The notebook stays with him. Subject said he'd happily put it into the system if it'd carry across shifts and across sites, but currently there's nowhere for it to go.

---

## Verbatim quotes

Operator: "The 0500-to-0700 window I get five times the alerts of a day shift. By 0700 my hit rate is rubbish."

Operator: "Twelve years and I still always go to the camera. The radar is wrong often enough that I won't act without the feed."

Operator: "I have a notebook. Heli-pad 0600 return. Tree line at the southeast corner gives an RF artefact in wet weather. None of that is in the system because there's nowhere for it to go."
```

---

### Page 34 — `S06 — Console operator interview`

- **Path:** `Operator-console > Field-notes (Operator-console) > S06 — Console operator interview`
- **Title:** `S06 — Console operator interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S06
- **Participants:** Console operator (x1) — 7 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

40 min, ops cell. Tight interview. Subject's strongest theme was context-switching: he counted the cursor moves between vendor systems on a typical alert and got to seven. He said the cursor distance is the friction he most viscerally feels — physically moving the mouse between three monitors during the engagement window.

On sensor disagreement: said the harder problem is not single-sensor detection (which he thinks is largely solved) but reconciliation when sensors contradict. Wants the console to present disagreement as a primary state, with the basis for each sensor's reading laid out for comparison.

Agreed with S04 about preferring weak fused agreement over strong single-sensor agreement.

---

## Verbatim quotes

Operator: "Seven cursor moves on a normal alert. That's where my time goes."

Operator: "Single-sensor is fine. The hard part is when they fight. There's no tool for that fight."

Operator: "I'd trust three of them weakly agreeing more than one of them shouting. Three weak agreements is hard to fake."
```

---

### Page 35 — `S07 — Console operator interview`

- **Path:** `Operator-console > Field-notes (Operator-console) > S07 — Console operator interview`
- **Title:** `S07 — Console operator interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S07
- **Participants:** Console operator (x1) — 9 yrs exp, Site Bravo
- **User group:** Operators

---

## Raw notes

50 min. Subject focused on the commander-acknowledgement gap. Confirmed S03's finding: when the commander is on the radio actively listening, he's measurably slower. Self-reported about 20-25 seconds slower per decision. He said it's not because the commander is critical — it's because he's narrating, and narration is a different cognitive task from deciding.

On cross-shift handover: subject is one of the operators who's been at Site Bravo long enough to know the site-specific false-positive sources. He said the night-shift handover is the worst — the day-shift operator clocks out at 1900 and he comes on at 1900, and there's a 5-minute verbal pass-down that loses 80% of the day's context.

On EO reliance: same pattern. Always confirms on EO before acting.

---

## Verbatim quotes

Operator: "When command's on the line I'm narrating, not deciding. That's twenty-five seconds I don't get back."

Operator: "Five minutes of handover. Eight hours of someone else's context. The maths doesn't work."

Operator: "I go to the camera every time. Every. Time."
```

---

### Page 36 — `S08 — Console operator interview`

- **Path:** `Operator-console > Field-notes (Operator-console) > S08 — Console operator interview`
- **Title:** `S08 — Console operator interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S08
- **Participants:** Console operator (x1) — 11 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

60 min, longer interview. Subject is a vocal critic of the current toolchain. Strongest quote of the round (captured below). Themes hit: classifier-confidence opacity, sensor disagreement, context-switching, fused-sensor preference, commander acknowledgement invisibility.

On classifier confidence specifically: subject said a number without basis is "an opinion the system has, not evidence." He needs the sensor-level breakdown. The 87% example below is verbatim from his standard response when asked about the classifier display.

On sensor disagreement: matches S04 and S06. Wants a dedicated reconciliation view as a first-class state.

On commander acknowledgement: matches S03 and S07.

---

## Verbatim quotes

Operator: "The classifier says 87%. Fine. But 87% of what? Until I see the EO feed I'm not moving. And by then the soft-kill window is half gone."

Operator: "A confidence number with no basis is the system's opinion. I want evidence."

Operator: "When radar and RF disagree I want a screen for that disagreement, not a banner I have to notice."

Operator: "Is the commander listening or not? My screen doesn't know."
```

---

### Page 37 — `S09 — Console operator interview`

- **Path:** `Operator-console > Field-notes (Operator-console) > S09 — Console operator interview`
- **Title:** `S09 — Console operator interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S09
- **Participants:** Console operator (x1) — 4 yrs exp, Site Bravo
- **User group:** Operators

---

## Raw notes

45 min, ops cell. Newer operator. Focused on engagement-decision logging and commander acknowledgement.

On logging: said he tries to log in-flight but typically can't finish the form before the next thing demands attention. He estimates he completes maybe 30% of his logs during the engagement; the rest he reconstructs at the end of shift from memory and radio transcripts. Knows this is bad for audit quality. Doesn't see a way around it without a lighter logging mechanism.

On commander acknowledgement latency: said he's hesitant to act on soft-kill until he's heard the acknowledgement. He's been on engagements where the acknowledgement landed 90-120s after his radio call, during which the soft-kill window closed and the engagement went kinetic.

On auditability: said he wants his decisions defensible. He worries that post-hoc reconstruction loses the *uncertainty* he felt at decision time — that the log makes him look more confident than he was.

---

## Verbatim quotes

Operator: "I get maybe a third of the log done in-flight. The rest is me at the end of the shift trying to remember what I was thinking at 0612."

Operator: "I've had ninety seconds go by waiting for ack. That's a soft-kill window gone."

Operator: "When I reconstruct, I sound more certain than I was. The log is wrong about my confidence."
```

---

### Page 38 — `S10 — Console operator interview`

- **Path:** `Operator-console > Field-notes (Operator-console) > S10 — Console operator interview`
- **Title:** `S10 — Console operator interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S10
- **Participants:** Console operator (x1) — 6 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

40 min. Subject's emphasis was on classifier *basis* and sensor disagreement. Echoed S02 and S08 on opacity of the confidence score. Echoed S04 and S06 on disagreement being a first-class state. Also confirmed the non-obvious "prefer three weak agreements over one strong" pattern.

Less developed thread on personal heuristics: said she keeps mental notes on which alert times tend to be false-positive heavy (early morning at Site Alpha, mid-afternoon in summer when bird activity spikes near the south boundary). None of these are captured in the system.

---

## Verbatim quotes

Operator: "Show me which sensor said what. The number alone is meaningless."

Operator: "Disagreement is half the alerts. Don't make me click through a banner to deal with the most common case."

Operator: "I trust three sensors weakly agreeing more than one shouting. The shouting one might be having a bad day."
```

---

### Page 39 — `S11 — Console operator interview`

- **Path:** `Operator-console > Field-notes (Operator-console) > S11 — Console operator interview`
- **Title:** `S11 — Console operator interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S11
- **Participants:** Console operator (x1) — 9 yrs exp, Site Bravo
- **User group:** Operators

---

## Raw notes

50 min, post-shift. Subject's focus was on auditable rationale and handover. He keeps a personal end-of-shift note where he summarises the shift for himself; he then uses that note to brief the next operator verbally. The note stays with him; it doesn't go into the system.

On engagement logging: subject completes most of his logs post-hoc and acknowledges the quality is lower than it should be. He pointed out that the form requires re-entering information that the system already had on screen at decision time — bearing, classification, sensors triggered — which he finds particularly frustrating.

On EO reliance: same as the other long-tenured operators. Always confirms on EO.

On handover: same as S07. The 5-minute verbal pass-down doesn't carry the day's actual context.

---

## Verbatim quotes

Operator: "I write a shift summary for myself. I read it to the next operator. None of that is in the system."

Operator: "The form asks me for things that were on my screen sixty seconds ago. Just capture the screen."

Operator: "I want to defend the decision later. Right now what I have is what I remember."
```

---

### Page 40 — `S12 — Console operator interview`

- **Path:** `Operator-console > Field-notes (Operator-console) > S12 — Console operator interview`
- **Title:** `S12 — Console operator interview`
- **Labels:** `research`, `field-note`, `interview`
- **Body:**

```
- **Session ID:** S12
- **Participants:** Console operator (x1) — 5 yrs exp, Site Alpha
- **User group:** Operators

---

## Raw notes

35 min. Shortest of the operator interviews. Subject is mid-career, less talkative. Confirmed multi-sensor disagreement as the dominant friction. Said his typical alert response is bottlenecked at the "wait for the camera to slew, then decide" moment, which itself is bottlenecked at having opened the radar and RF views first.

Echoed the disagreement-as-first-class-state preference from S04, S06, S08, S10. Did not have strong views on logging or handover — said those weren't his pain points.

---

## Verbatim quotes

Operator: "The hard part is when they don't agree. There's no tool. I'm guessing."

Operator: "By the time the camera has slewed I've already opened two other things to get to it."
```

---

### Page 41 — `WT01 — Console paper-prototype walk-through`

- **Path:** `Operator-console > Field-notes (Operator-console) > WT01 — Console paper-prototype walk-through`
- **Title:** `WT01 — Console paper-prototype walk-through`
- **Labels:** `research`, `field-note`, `walkthrough`

- **Body:**

```
- **Session ID:** WT01
- **Participants:** Console operators (x3)
- **User group:** Operators

---

## Raw notes

Walk-through of the v0 paper prototype of the unified console with three operators (mixed experience: 4, 8, 12 yrs). 90 min in a conference room with printed screens taped to a wall. Focus of this session: the engagement-decision logging interaction.

All three operators reacted positively to capturing the console state automatically at decision-time. Strong preference for 1-2 click logging over the current multi-screen form. The 12-yr operator pushed back on free-text rationale — "if you make me type, I won't log" — and proposed structured one-tap rationale chips ("EO confirmed", "fused-low-conf majority agree", "site-specific FP pattern"). Other two operators agreed.

Open question: whether operators want any free-text addition at all. Two said no; one said yes but only as a post-engagement augmentation, not a blocker on the decision log.

---

## Verbatim quotes

Operator (12 yrs): "If you make me type, I won't log. Give me chips."

Operator (8 yrs): "One tap, two taps, that's it. Anything heavier and you've lost me."

Operator (4 yrs): "Maybe a free-text field, but after the decision, not before."
```

---

### Page 42 — `WT02 — Reconciliation view walk-through`

- **Path:** `Operator-console > Field-notes (Operator-console) > WT02 — Reconciliation view walk-through`
- **Title:** `WT02 — Reconciliation view walk-through`
- **Labels:** `research`, `field-note`, `walkthrough`
- **Body:**

```
- **Session ID:** WT02
- **Participants:** Console operators (x4)
- **User group:** Operators

---

## Raw notes

Walk-through of three candidate reconciliation views with four operators. 90 min. Variants tested:

1. **Banner on main view** — current incumbent. Operators rejected this as "the thing we already have that doesn't work."
2. **Inline reconciliation panel** — sensor breakdown appears in the right rail when disagreement above threshold. All four preferred this to the banner.
3. **Dedicated reconciliation modal** — full-screen takeover when triggered. Two operators preferred this for high-stakes; two thought it was disruptive for the routine case.

Strong consensus that disagreement is a first-class state — operators want a real view, not a notification on top of the main view. Disagreement on whether the reconciliation surface should be inline (always available) or modal (only when triggered).

---

## Verbatim quotes

Operator: "Banner is the thing we have now. Don't show me a banner."

Operator: "I want a real screen for it. Not a tag, not a popup, a real screen."

Operator: "Full takeover is fine for the big calls. Don't take over my screen for a heron."
```

---

### Page 43 — `WT03 — Site-context surfacing walk-through`

- **Path:** `Operator-console > Field-notes (Operator-console) > WT03 — Site-context surfacing walk-through`
- **Title:** `WT03 — Site-context surfacing walk-through`
- **Labels:** `research`, `field-note`, `walkthrough`
- **Body:**

```
- **Session ID:** WT03
- **Participants:** Console operators (x4)
- **User group:** Operators

---

## Raw notes

Walk-through of two candidate patterns for surfacing site-specific false-positive context. 75 min. Variants tested:

1. **Active prompt at start-of-shift** — operator sees a list of "known false-positive sources at this site" on session start. Has to dismiss to proceed.
2. **Passive side panel** — same list lives in a collapsible right-rail panel; operator opens when they want.

Two operators preferred active prompt: "I want it pushed into my face on day one at a new site." Two preferred passive: "After a year I know my site; the prompt becomes noise." Both groups agreed the *content* of the list (site-specific FP patterns with timestamps and previous-operator notes) is valuable.

Also tested whether operators would log new false-positive sources during their shift if doing so was a single-tap action from the alert. All four said yes. The friction is the current multi-screen form, not the willingness.

---

## Verbatim quotes

Operator: "Day one at a new site, push it into my face. Day three hundred, get out of my way."

Operator: "If logging a new false-positive is one tap I'll do it ten times a shift. If it's a form, never."

Operator: "Show me what the operator before me figured out. Don't make me re-figure it."
```

---

### Page 44 — `WT04 — Commander acknowledgement walk-through`

- **Path:** `Operator-console > Field-notes (Operator-console) > WT04 — Commander acknowledgement walk-through`
- **Title:** `WT04 — Commander acknowledgement walk-through`
- **Labels:** `research`, `field-note`, `walkthrough`
- **Body:**

```
- **Session ID:** WT04
- **Participants:** Console operators (x4)
- **User group:** Operators

---

## Raw notes

Walk-through of two patterns for surfacing commander acknowledgement state on the operator screen. 60 min. Variants tested:

1. **Inline indicator** — acknowledgement state lives in the primary view next to the engagement option being requested. Status updates in real time.
2. **Peripheral indicator** — top-of-screen status bar with acknowledgement state alongside other system state (sensor health, classifier version, etc.).

Operators split exactly evenly: two preferred inline (more attention to the state they're actively waiting on), two preferred peripheral (less distraction from the alert response itself). Both groups agreed the *absence* of acknowledgement-state visibility on the current setup is the worst case.

No decisive preference emerged — recorded as open question for Console v1 spec.

---

## Verbatim quotes

Operator: "Put it where I'm looking. I'm staring at the engagement option, that's where the state should be."

Operator: "Inline pulls my eye when I want to focus on the alert. Top bar is fine."

Operator: "Either is better than what we have. Right now I just don't know."
```

---

### Page 45 — `Field Alpha 1 — Site Alpha day shift`

- **Path:** `Operator-console > Field-notes (Operator-console) > Field Alpha 1 — Site Alpha day shift`
- **Title:** `Field Alpha 1 — Site Alpha day shift`
- **Labels:** `research`, `field-note`, `field-observation`
- **Body:**

```
- **Session ID:** Field Alpha 1
- **Participants:** Researcher (x1, observing); Console operator (x1, observed)
- **User group:** Operators

---

## Raw notes

Full day shift, Site Alpha, 0700-1900. Observed three alert responses end-to-end, plus eleven sub-threshold detections that the operator triaged without escalating.

Every alert response involved at least three context switches between vendor systems. Counted cursor moves on the second observed alert: nine moves, two of which were across monitors. Operator was visibly task-switching — paused mid-action twice to remind herself which window had which sensor view.

Two of the three alerts involved sensor disagreement. In both cases the operator opened the EO feed before deciding. In both cases the operator's final decision aligned with the EO read, not the radar classification.

Engagement-decision logging: operator attempted in-flight logging on the first alert, gave up after the next alert came in. The other two were logged post-hoc at end of shift.

No false-positive context-sharing observed. Operator referenced her own mental knowledge of the site's recurring false-positive sources (heli-pad 0600, tree line at SE corner during wet weather) — none of these were in the system.

---

## Verbatim quotes

Operator (mid-alert, to herself): "Was that RF window the left or the right monitor."

Operator (post-alert): "I tried to log it. I got two fields in. Then the next one came in and I lost it."

Operator (end of shift): "I'll do the logs now. From memory."
```

---

### Page 46 — `Field Alpha 2 — Site Alpha night shift`

- **Path:** `Operator-console > Field-notes (Operator-console) > Field Alpha 2 — Site Alpha night shift`
- **Title:** `Field Alpha 2 — Site Alpha night shift`
- **Labels:** `research`, `field-note`, `field-observation`
- **Body:**

```
- **Session ID:** Field Alpha 2
- **Participants:** Researcher (x1, observing); Console operator (x1, observed)
- **User group:** Operators

---

## Raw notes

Full night shift, Site Alpha, 1900-0700. Bird activity peaks fell in the 0500-0700 window, matching prior reports. Observed alert volume tripled during that window relative to the rest of the shift.

By 0600, operator was showing visible fatigue signs — slower head turns to confirm EO, longer pauses before classifying. Self-reported at end of shift that his decision confidence in the last two hours of the shift is "noticeably worse" than the first two.

Counted context switches: every single observed alert involved at least three vendor-system context switches. No alerts were resolved on a single screen.

Engagement-decision logging: zero in-flight logs completed during the high-volume window. Operator logged all post-shift, took 45 minutes, openly described the rationale he was reconstructing as "best guess at what I thought."

---

## Verbatim quotes

Operator (mid-shift): "Three windows, every time. I've done this thirty times tonight."

Operator (0540): "Bird, bird, bird. They're going to keep coming for the next two hours."

Operator (end of shift, doing logs): "I'm guessing at what I was thinking three hours ago. This isn't a log, this is fiction."
```

---

### Page 47 — `Field Bravo 1 — Site Bravo day shift`

- **Path:** `Operator-console > Field-notes (Operator-console) > Field Bravo 1 — Site Bravo day shift`
- **Title:** `Field Bravo 1 — Site Bravo day shift`
- **Labels:** `research`, `field-note`, `field-observation`
- **Body:**

```
- **Session ID:** Field Bravo 1
- **Participants:** Researcher (x1, observing); Console operator (x1, observed)
- **User group:** Operators

---

## Raw notes

Full day shift, Site Bravo, 0700-1900. Five alert responses observed.

Shift began with a 4-minute verbal handover from the night-shift operator. Researcher noted that the handover covered the past hour's activity but did not transmit the site-specific false-positive context the night-shift operator had learned (Site Bravo has a recurring RF artefact near the southeast tree line that activates in wet weather — discussed in prior interviews with this operator but not mentioned during the handover).

All five alerts involved vendor-system context switching. The third alert involved an operator-internal reconciliation when radar and RF disagreed — operator opened the EO feed, watched for ~40s, classified as bird.

Commander acknowledgement latency observed on one alert: operator radioed at 1043, acknowledgement landed at 1044:51, a 71-second gap during which the operator was unable to act on soft-kill. By the time acknowledgement landed the kinetic option was the only remaining viable response.

---

## Verbatim quotes

Operator (during handover): "Anything I should know?"

Off-going operator: "Quiet shift. Nothing weird."

Operator (mid-alert, post-radio): "Did she hear me. I'm going to call again."
```

---

### Page 48 — `Field Bravo 2 — Site Bravo night shift`

- **Path:** `Operator-console > Field-notes (Operator-console) > Field Bravo 2 — Site Bravo night shift`
- **Title:** `Field Bravo 2 — Site Bravo night shift`
- **Labels:** `research`, `field-note`, `field-observation`
- **Body:**

```
- **Session ID:** Field Bravo 2
- **Participants:** Researcher (x1, observing); Console operator (x1, observed)
- **User group:** Operators

---

## Raw notes

Full night shift, Site Bravo, 1900-0700. Same bird-activity pattern as Site Alpha night shift: alert volume tripled in the 0500-0700 window.

Two engagement-class alerts observed during the high-volume window. Both involved sensor disagreement; both were resolved by the operator opening the EO feed and overriding the radar classification.

Engagement-decision logging: operator attempted in-flight logs on both engagement-class alerts, completed neither. Reconstructed both at end of shift.

Cross-shift handover: pre-shift handover from day-shift operator was 6 minutes and reasonably thorough on the day's activity, but did not include any site-specific FP context. The operator on this shift was a 4-year operator new to Site Bravo (rotated from Site Alpha three weeks prior) — researcher noted he was visibly re-discovering several site-specific patterns the day-shift operator clearly already knew.

---

## Verbatim quotes

Operator (during handover): "I keep getting an RF signal near the SE corner. Is that a thing?"

Off-going operator: "Yeah, that's a thing. Wet weather."

Operator (later, mid-alert): "Wait, is this the SE corner thing? I think this is the SE corner thing."

Operator (end of shift): "Three weeks here and I'm still figuring out what's a real alert at this site."
```

---

## After all pages are created

Report back to the user with:

1. The total number of pages created
2. Any pages that already existed and were updated vs newly created
3. The full URL of the top-level `Knowledge Base` page in the SKYPROTECT space so the user can verify
4. Any issues encountered (e.g. permissions, name conflicts) — verbatim, no paraphrasing

If anything was not created, do **not** retry or improvise. Stop and report.
