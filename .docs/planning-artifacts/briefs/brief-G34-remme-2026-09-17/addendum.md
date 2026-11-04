---
title: "Addendum: CV & Jobb applikasjonsassistent"
status: final
created: 2026-09-17
updated: 2026-11-04
---

# Addendum

Utfyllende bakgrunn og tekniske betraktninger som ikke hører hjemme i selve brief-en, men som er nyttige for videre arbeid (PRD, arkitektur).

## Konkurrentlandskap (research, 2026)

- **Jobscan** — ren nøkkelord-matcher: lim inn CV + annonse, få match-score og liste over manglende nøkkelord. Bygger ikke CV-er, kun scoring. Abonnement (~$49,95/mnd).
- **Teal** — full jobbsøk-arbeidsflate: lagrer stillingsannonser, sporer søknader, og tilpasser CV-versjon per stilling. Gratis nivå + betalt ($29/mnd for Teal+).
- **Rezi** — bygger, skriver om, scorer og "target"-tilpasser CV i én plattform. Høy ATS-parse-rate på enkeltkolonne-maler.
- **Enhancv / Kickresume** — designfokuserte CV-byggere med en påklistret ATS-sjekk/match-funksjon; mindre fokus på dyp tilpasning.
- **LinkedIn / ren ChatGPT-bruk** — uformelle, ustrukturerte alternativer uten fast pipeline.
- Fellestrekk: ingen lukker hele loopen fra én master-CV til et ferdig, sendeklart resultat — brukeren må alltid redigere manuelt etterpå.

**Vanlig teknisk mønster:** (1) parse/uttrekk — hent strukturerte krav fra annonsen og strukturerte seksjoner fra CV-en (LLM-prompt eller NLP/nøkkelordsuttrekk); (2) match & omskriving — beregn match/gap-score og bruk en LLM til å skrive om seksjoner for å fremheve overlappende kompetanse, ofte med en ATS-kompatibilitetssjekk på toppen.

**Kjente svakheter i feltet:**
- Generisk/robotisk output ved automatisk omskriving.
- Risiko for at LLM dikter opp tall/prestasjoner ("økte effektivitet med 40 %") som ikke stemmer — direkte relevant for hvorfor dette produktet holder seg strengt til eksisterende CV-innhold.
- Arbeidsgivere flagger i økende grad KI-generert søknadstekst (kildene bak konkrete prosentandeler er lite autoritative — behandle som indikasjon, ikke fakta).
- "Nøkkelord-stapping" regnes i 2026 som mindre viktig enn antatt — ATS-systemer feiler oftere på parsing/formatering enn på manglende nøkkelord.

**Referanser (blandet kvalitet, noen lav-autoritet SEO-kilder iblandet):** rezi.ai/posts/best-ai-resume-builders, jobscan.co/blog/best-ai-resume-builders, tealhq.com/post/best-ai-resume-builders, visualcv.com/blog/best-resume-tailoring-tools, github.com/srbhr/resume-matcher, github.com/vishnu0529/ai-resume-matcher.

## Tekniske betraktninger for input-håndtering

Oppdatert 2026-11-04: v1 bruker kun innlimt tekst for både CV og annonse (etter tilbakemelding fra faglærer). Lenke, bilde og PDF er flyttet til v2. Vurderingene under gjelder derfor v2:
- **Lenke** — krever skraping av ekstern side (varierende HTML-struktur, mulig behov for headless-rendering, robots.txt-hensyn).
- **Bilde/skjermutklipp** — krever OCR eller en bildeforstående modell før annonsen kan analyseres.

I v2 kan CV også lastes opp som PDF, som krever tekstuttrekk (og potensielt layout-håndtering hvis CV-en er visuelt formatert i kolonner e.l.).

Disse er implementasjonsdetaljer som bør vurderes nærmere når v2 planlegges.

## Testsett (grunnlag for PRD og testing)

- 5 ekte, offentlige trainee-annonser med må- og bør-krav notert på forhånd.
- 3 fiktive CV-er for studenter i siste studieår, med fasit (truffet / delvis / mangler) per krav per annonse.
- Én eller to av fasit-casene gjenbrukes som ferdige svar i demomodus.
- Kun fiktive CV-er i repoet; aldri ekte personopplysninger.
