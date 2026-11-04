# Product brief update

## 2026-11-04 kl. 19:46 — Yvonne

### Oppgave
Pull the latest from GitHub. Then update the product brief to address the teacher's feedback (`tilbakemelding-product-brief.md`, 2026-10-06), and push.

### Plan
- `git pull origin main` (already up to date).
- `bmad-product-brief` in Update mode, coaching path: went through the six feedback points one at a time, and the user made each decision.
- Rewrote `brief.md` and updated `addendum.md`. Logged all decisions in `.memlog.md`.

### Resultat
- Decisions (all in [.memlog.md](../../.docs/planning-artifacts/briefs/brief-G34-remme-2026-09-17/.memlog.md)):
  - **Scope:** v1 takes the CV and the ad as pasted text only. PDF, links and images move to v2.
  - **Primary user:** final-year students applying for several trainee positions. "All job seekers" moves to the Vision section.
  - **Match score:** calculated in code. Must-requirement met = 2, partly met = 1. Should-requirement met = 1, partly met = 0.5. 100% requires every requirement to be fully met.
  - **Success criteria:** five measurable criteria:
    1. Every quote appears word for word in the CV (100%).
    2. All must-requirements found in at least 4 of 5 test ads.
    3. At least 70% correct status, and a missing must-requirement is never marked as met.
    4. Automated tests of the score formula pass.
    5. A classmate can name at least 1 concrete change within 5 minutes.
  - **Language model:** Claude Opus 5.5. About 0.50–2.00 NOK per analysis, 10–40 NOK for a test round, and about 60–300 NOK for prompt development.
  - **Demo mode** when no API key is set.
  - **Privacy:** a notice on the input page, and only fictional CVs in the repo.
  - **After reading the hints,** the student edits the CV elsewhere and pastes it in again.
- [brief.md](../../.docs/planning-artifacts/briefs/brief-G34-remme-2026-09-17/brief.md) rewritten (status `draft`, updated 2026-11-04). [addendum.md](../../.docs/planning-artifacts/briefs/brief-G34-remme-2026-09-17/addendum.md): input-handling notes marked as v2, and a new test-set section.
- Commit `071262c` "Oppdater product brief etter tilbakemelding fra faglærer".
- The finalize step (memlog audit and the proofreading pass) was not run, because the user asked to push first.

### Åpne punkter
- ~~Finalize the brief~~ Resolved: memlog audit done with the user, `bmad-review` structure + prose pass run (user accepted everything except B7, and A2 uses a comma), brief and addendum set to `final`. Commit `328f8fe`. UX sketches are deferred to `bmad-ux` after the PRD.
- Create the test set: 5 real trainee ads with must- and should-requirements noted beforehand, and 3 fictional CVs with answer keys.
- ~~The final deadline for the application is still unknown.~~ Resolved: 15.12.2026 kl. 15:00. The brief's "Åpne spørsmål" section was replaced with a "Tidsramme" (timeline) section (about 6 weeks, solo, core flow first).
- Next step in BMAD: the PRD.
