# LINEAGE

A tattoo apprenticeship and professional tattoo education platform. It covers the artistic and the technical sides of becoming a professional tattoo artist: machines, needles, skin, procedure, safety, and the supervised move from synthetic practice surfaces to consenting adult clients.

> **LINEAGE never authorizes anyone to tattoo a person.** Finishing lessons or getting AI feedback is not permission to tattoo. In Vermont, tattooing requires licensure through the Office of Professional Regulation (OPR). Apprentices work under an active apprentice license, supervised by a licensed tattooist, in a registered shop.

## Run it

```bash
npm install
ANTHROPIC_API_KEY=sk-ant-... npm start     # http://localhost:3000
npm test
```

Without `ANTHROPIC_API_KEY`, everything works except AI feedback in The Mentor. Data is kept in the browser: localStorage for records, IndexedDB for photos and video. The server stores nothing. It serves the app and forwards AI Mentor requests so the API key stays off the browser.

## Sections

| Section | Purpose |
|---|---|
| **The Path** | Curriculum balance (default 30/25/20/15/10, adjustable, and marked when the mentor set it), weekly hour plan, next steps, the 10 success criteria |
| **The Workshop** | 9 drawing and design units (line, silhouette, form and value, traditional motifs, color, lettering, designing to be tattooed, flash sheets, stencils), each with lessons, tracked exercises and critique criteria |
| **The Station** | The practical tattooing education center (below) |
| **The Archive** | 6 history and composition chapters (ancient and world traditions, Japanese, Western and the electric machine, American traditional, modern regulation, composition on the body), the research library, and where educators disagree |
| **The Mentor** | AI technical mentor: feedback on visible results, never certification |
| **The Ledger** | Mentor Mode, legal status, apprenticeship hours, milestones, knowledge checks, backup |
| **The Portfolio** | Designs, practice pieces, fresh and healed supervised work |

### The Station

* **Machine Laboratory**: coil, rotary, direct-drive/cam, pen. Stroke, give, voltage, depth and protrusion, angle, the hand-speed and machine-speed relationship, power and batteries, maintenance. Includes a *stroke/give/protrusion simulator* and a *hand-speed × machine-speed* visualizer. No universal settings anywhere.
* **Needle Library**: RL, RS, F, M1 and CM configurations, gauges, tapers, cartridges vs bars, selection, and an interactive to-scale comparison.
* **Skin Anatomy**: layers (interactive diagram), elasticity, healing phases, blowouts, overworking, scarring, retention, and stop/refer criteria.
* **Equipment**, **Safety Training** (BBP, cross-contamination, ink safety, exposure incidents, emergencies) and **Troubleshooting** (symptom → causes → checks, with stop items).
* **Technique Tracks**: Lining, Black and Gray, Color, Traditional Application. 28 full units, each with theory, demonstration study, a session-by-session drill progression with check-offs, "good enough to move on" criteria for synthetic skin, a defect guide (what it looks like, cause, fix), an observation assignment and a mentor-signed assessment.
* **Chapter-depth lessons**: every machine, needle and skin lesson has extended sections, worked examples, a common-mistakes table and drills. Eight labelled diagrams: coil anatomy, rotary mechanism, needle geometry, skin thickness by body site, three-point stretch, machine angle, clean vs contaminated field, and healing phases.
* **Question Bank**: 166 questions across 10 domains (machines, needles, skin, safety, procedure, Vermont law, technique, design, history, scenarios). Sets of 10 draw missed questions more often, and mastery is tracked per domain.
* **Synthetic-Skin Assignments**: 15 progressive exercises in 4 levels. Each needs photo or video evidence and states visible criteria. Assignments unlock as you submit work, which tracks progress only and says nothing about competency.
* **Procedure Checklists**: all 18 steps of an appointment, with safety-critical steps marked and referenced, practice runs, and case studies.
* **Supervised Client Work**: 12 modules covering readiness, Vermont law, eligibility and consent, mentor supervision, beginner projects, facility standards, comfort, complications, documentation, healing, feedback and assessment. Also the **supervised session log**, which stays locked until the gate below is met.
* **Healed Reviews**: checkpoints at day 3, week 2, weeks 4–6 and month 3, with photos, notes and mentor feedback.
* **Practical Milestones**: 18 milestones that only the mentor can sign.

## Safety design

* **Only a human mentor signs.** Milestones, legal-status confirmation, hour countersignatures and feedback on sessions and healing can only be recorded in *Mentor Mode*. The mentor registers with their own passphrase (PBKDF2-hashed), name, credential and shop, and attests that they meet Vermont's supervisor requirements. Each sign-off also requires the mentor to confirm they observed the work in person.
* **The AI cannot unlock anything.** AI output is stored with `source: 'ai'`, and `isValidSignoff` rejects it. The server only returns text. Tests cover this.
* **Client-work gate** (`clientWorkGate` in `public/lib/logic.js`). Requires a registered mentor, an apprentice license confirmed by that mentor and not expired, current BBP training, and mentor approval of six ★ milestones. The last of those is the mentor's own readiness decision. Replacing the mentor voids the previous mentor's sign-offs.
* **AI Mentor guardrails** (`server/mentor.js`). A structured output schema splits *visible observations* from *cannot determine* (conclusions that need in-person supervision), *recommended training* (exercise ids only) and *flags for professional evaluation*. The system prompt forbids inferring depth, trauma or competency from photos, diagnosing, certifying, and giving universal settings. The server appends a limitation notice for synthetic-skin, video, supervised and healed uploads whatever the model returns.
* **Evidence tags.** Every lesson section is tagged *Established science*, *Legal requirement*, *Industry convention* or *Anecdotal/contested*.
* **Minimal client data.** The session log asks for initials or a shop record number only, and says it does not replace the shop's legal records.

**Limits:** LINEAGE runs in the browser, so a determined user can edit their own stored data. Mentor Mode stops casual self-signing on a shared device. It is not tamper-proof and is not legal identity verification. OPR's forms and the shop's records remain the authoritative documents.

## What it does not do yet

* No hosted video library. Demonstration study points to professional sources through observation prompts. There are no photos of real defects: the defect guides describe them in words.
* No multi-device sync or remote mentor login. The mentor signs on the apprentice's device.
* Exported backups do not include photos or videos.
* The AI Mentor was tested against a mocked API, not a live key.

See [`docs/CURRICULUM.md`](docs/CURRICULUM.md) for the curriculum design, research findings and sources.
