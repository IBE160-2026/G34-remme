---
title: "Produktbrief: CV & Jobb applikasjonsassistent"
status: draft
created: 2026-09-17
updated: 2026-11-04
---

# Produktbrief: CV & Jobb applikasjonsassistent

## Sammendrag

CV & Jobb applikasjonsassistent er en nettside som hjelper studenter i siste studieår med å tilpasse én CV til flere ulike trainee-annonser, uten å måtte skrive en helt ny søknad hver gang. Brukeren limer inn CV-en sin og en konkret stillingsannonse som tekst. Til gjengjeld får de en match-score, en liste over hvilke må- og bør-krav i annonsen CV-en treffer, treffer delvis eller mangler, og konkrete hint om hva som bør fremheves tydeligere. Hvert treff er koblet til et ordrett sitat fra CV-en.

Målet er ikke å skrive søknaden for brukeren, men å gjøre det tydelig *hva* som må justeres og *hvorfor*, slik at brukeren selv kan rette teksten opp mot en høy match uten å gjette seg frem. Dette skiller løsningen fra rene poengsum-verktøy (som viser en score, men ikke hvorfor) og fra fulltekst-generatorer (som skriver om alt for brukeren, med risiko for generisk eller oppdiktet innhold). All analyse er strengt begrenset til informasjon som allerede finnes i brukerens egen CV — verktøyet finner aldri på ny erfaring eller nye tall.

Prosjektet bygges som en enkel, norskspråklig prototype i regi av IBE160 Programmering med KI ved Høgskolen i Molde — uten innlogging eller lagring i denne omgangen.

## Problemet

Jobbsøkere som søker på flere stillinger samtidig havner typisk i én av to feller:

1. **Generisk spredning** — samme CV/søknad sendes til alle stillinger uten reell tilpasning. Søknaden blir for uspesifikk til å skille seg ut, og fører sjelden til intervju.
2. **Manuell, ineffektiv tilpasning** — brukeren prøver å skrive om deler av søknaden (særlig "om meg selv"-delen) for hver stilling, men rekker ikke gjøre en god jobb innen søknadsfristen, eller klarer ikke identifisere *hvilke* punkter i egen CV som faktisk er relevante opp mot akkurat denne annonsens kvalifikasjonskrav.

Begge feller koster brukeren reelle muligheter: enten fordi søknaden ikke treffer godt nok, eller fordi tiden det tar å tilpasse manuelt gjør at brukeren søker på færre stillinger enn de burde.

## Hvem dette tjener

Primærbruker i v1 er **studenter i siste studieår som søker på flere trainee-stillinger**. De har kort CV med lite arbeidserfaring, men ofte relevant innhold — deltidsjobb, frivillighet, bacheloroppgave, studentorganisasjoner — som ikke er formulert opp mot annonsens krav. Trainee-annonser på tvers av bransjer deler en gjenkjennelig kjerne, for eksempel «bachelorgrad eller relevant erfaring» og «snakker norsk og/eller engelsk». Slike enten-eller-krav må behandles som ett krav som kan oppfylles på flere måter.

På sikt kan løsningen tjene jobbsøkere generelt (se Visjon).

## Løsningen

Brukeren limer inn CV-en og én stillingsannonse som tekst. Løsningen analyserer annonsen og CV-en, og viser en resultatside med:

- **Krav-liste delt i må-krav og bør-krav** — hvert krav markert som truffet, delvis truffet eller manglende.
- **Kildehenvisning** — hvert truffet eller delvis truffet krav har et ordrett sitat fra CV-en, slik at brukeren ser *hvorfor* kravet regnes som dekket. Et treff uten et sitat som finnes i CV-en, regnes ikke som treff.
- **Samlet match-score** — beregnet i kode fra kravlisten (se under), ikke anslått av språkmodellen.
- **Forbedringshint per gap** — korte pekere om hva som bør fremheves tydeligere eller flyttes høyere opp, basert utelukkende på informasjon som allerede finnes i brukerens egen tekst. Ingen ferdig omskrevne setninger i denne versjonen.

Etter å ha lest hintene redigerer brukeren CV-en i sitt eget verktøy og limer den inn på nytt for en ny analyse.

**Match-score.** Språkmodellen trekker kun ut kravene og klassifiserer hvert krav; tallet beregnes i kode:

| Status | Må-krav | Bør-krav |
|---|---|---|
| Truffet | 2 poeng | 1 poeng |
| Delvis truffet | 1 poeng | 0,5 poeng |
| Mangler | 0 poeng | 0 poeng |

Match-score = oppnådde poeng ÷ maks mulige poeng × 100. 100 % krever at alle må- og bør-krav er fullt truffet.

**KI og kjøring.** Analysen bruker Claude Opus 5.5 via Anthropics API. Uten API-nøkkel i `.env` starter appen i demomodus med ferdige resultater for fiktive eksempel-CV-er og -annonser, slik at sensor kan prøve hele flyten uten nøkkel. Med nøkkel kjøres ekte analyse. Anslått kostnad er 0,50–2,00 kr per analyse, 10–40 kr for en testrunde på 20 analyser, og i størrelsesorden 60–300 kr for prompt-utvikling (100–200 kjøringer).

**Personvern.** CV-teksten sendes til Anthropic for analyse og lagres ikke av appen. Dette opplyses tydelig på inputsiden. Repoet inneholder kun fiktive CV-er; testannonsene kan være ekte, offentlige annonser.

## Hva gjør dette annerledes

Feltet er ikke tomt — Jobscan tilbyr nøkkelord-matching og score, Teal og Rezi tilbyr full CV-omskriving og lagring av flere søknader, og mange bruker rett og slett ChatGPT direkte. Ingen av disse lukker loopen helt: score-verktøy sier *at* noe mangler, men ikke *hvor* i CV-en brukeren allerede har relevant erfaring som ikke er godt nok synlig. Fulltekst-generatorer løser dette, men på bekostning av kontroll — risikoen er generisk, robotisk tekst eller oppdiktede prestasjoner, noe som i økende grad blir flagget av arbeidsgivere.

CV & Jobb applikasjonsassistent legger seg bevisst mellom disse: må/bør-prioritert gap-analyse med en forklarbar score, der hvert treff er dokumentert med et ordrett sitat fra brukerens egen CV. Verktøyet dikter aldri opp ny erfaring eller nye tall — det peker kun på hva som allerede finnes, og hvor det bør fremheves tydeligere.

## Suksesskriterier

1. **Ingen oppdiktet innhold:** hvert krav markert som truffet eller delvis truffet har et sitat som finnes ordrett i CV-teksten. Mål: 100 %, kontrollert automatisk.
2. **Kravuttrekk:** for 5 ekte trainee-annonser der må-kravene er notert på forhånd, finner appen alle må-krav i minst 4 av 5 annonser, og bommer på maks 1 må-krav i en enkelt annonse. Det er viktigere å ikke gå glipp av krav enn å unngå ekstra krav.
3. **Klassifisering:** for 3 fiktive CV-er testet mot annonsene, med fasit skrevet på forhånd, får minst 70 % av kravene riktig status (truffet / delvis / mangler). Appen markerer aldri et manglende må-krav som truffet.
4. **Scoreberegning:** automatiske tester av formelen med faste kravlister består, inkludert grensetilfellene alt truffet = 100 %, ett må-krav delvis = under 100 %, og ett bør-krav mangler = under 100 %.
5. **Brukeren:** en medstudent som får en fiktiv CV og en annonse, kan ut fra resultatsiden alene og uten hjelp peke på minst 1 konkret endring i CV-en innen 5 minutter, og se hvilke må- og bør-krav som er truffet eller mangler.

## Omfang

**Med i denne versjonen (v1):**
- Én stillingsannonse om gangen.
- CV og stillingsannonse som innlimt tekst.
- Krav-liste (må/bør, truffet/delvis/mangler), kildehenvisning med ordrett sitat, match-score beregnet i kode, og forbedringshint (ikke ferdig tekst).
- Demomodus uten API-nøkkel; ekte analyse med nøkkel.
- Norsk språk, både grensesnitt og analyse.
- Ingen innlogging, ingen lagring mellom økter.

**Eksplisitt utenfor denne versjonen (v2 eller senere):**
- PDF-opplasting av CV.
- Stillingsannonse som lenke eller bilde/skjermutklipp.
- Ferdig omskrevne setninger/avsnitt brukeren kan lime rett inn.
- Flere stillingsannonser sammenlignet samtidig.
- Brukerkontoer og lagring av CV-historikk over tid.

## Visjon

I v2 kan inntaket utvides med PDF-opplasting av CV og stillingsannonser som lenke eller bilde. Videreført utover kurset kan løsningen åpnes for jobbsøkere generelt, og få innlogging og lagring: tidligere CV-er, søknader og analyser huskes over tid, slik at verktøyet kan gi bedre og raskere forbedringshint jo mer det vet om brukeren. Det åpner også for ferdig omskrevne tekstforslag, fortsatt strengt begrenset til brukerens egen, verifiserte informasjon.

## Åpne spørsmål

- Endelig innleveringsfrist for selve applikasjonen/kursprosjektet er fortsatt uklar — påvirker hvor mye tid det er til iterasjoner etter at kjerneflyten er stabil.
