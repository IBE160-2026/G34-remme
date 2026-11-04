# PRD Quality Review — CV & Jobb applikasjonsassistent

## Overall verdict
The PRD is solid for a solo school project. Every FR has testable consequences, the score is calculated in code, the "no invented content" principle is enforced by FR-11, and both journeys have named protagonists that drive real requirements. The main risk is two missing definitions the AI and the answer key both depend on: how a requirement is classified as a must or a should, and what counts as "delvis truffet" (partly met). Without them, SM-3 can't be tested consistently and the score can't be explained.

## Decision-readiness — strong
Decisions are stated as decisions (one ad at a time, design over detection, hosting deferred with a reason in §7.2, potential score as a "should"). Trade-offs are named (recall over precision in FR-4, missing requirements excluded from the potential score).

## Substance over theater — strong
The vision is specific to this product. The NFRs in §5 have concrete values (60 s, cost in NOK, `.env.example`). No persona theater: two journeys, both of which drive FRs.

## Strategic coherence — strong
Thesis: the experience is already in the CV, just not worded towards the ad. FR-5/6/11 and SM-1/3/C1/C2 all serve that thesis.

## Done-ness clarity — adequate
### Findings
- **high** No rule for must vs. should (§4.2 FR-4, §3 Må-krav/Bør-krav) — the glossary says "krav annonsen sier er nødvendig / ønsket", but many ads list qualifications without labelling them. This affects the score (2 vs. 1 point) and the answer key for SM-3. *Fix:* add a classification rule to FR-4.
- **high** "Delvis truffet" (partly met) is undefined (§3 Status, FR-5) — the person writing the SM-3 answer key and the prompt need the same rule. *Fix:* define it in the glossary.
- **medium** Order within each status is unspecified (FR-9) — must-requirements before should-requirements? *Fix:* add to FR-9.
- **low** FR-10: is "Godt treff, klar til å søke?" shown again on every new analysis ≥ 90 %? *Fix:* yes, once per analysis — implied, can stay.

## Scope honesty — strong
§6 and §7.2 are explicit, with a reason for each deferral. No open assumptions left.

## Downstream usability — strong
Glossary present, FR-1..17, UJ-1..2, SM-1..5 + SM-C1/C2 contiguous, and cross-references resolve.

## Shape fit — strong
Journey-led, consumer-like product with meaningful UX. A light PRD of ~2,700 words fits the stakes.

## Mechanical notes
- Glossary drift: «Forbedringshint» in §3 says "fremheves tydeligere" but FR-6 now also says "flyttes høyere opp". Align the glossary.
- No length limit for CV/ad input (cost and the 60 s timeout). Low risk for v1. Can be decided in architecture.
