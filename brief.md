---
title: "Produktbrief: CV & Jobb applikasjonsassistent"
status: final
created: 2026-09-17
updated: 2026-09-17
---

# Produktbrief: CV & Jobb applikasjonsassistent

## Sammendrag

CV & Jobb applikasjonsassistent er en nettside som hjelper jobbsøkere å tilpasse én CV/søknad til flere ulike stillingsannonser, uten å måtte skrive en helt ny søknad hver gang. Brukeren limer inn eller laster opp CV-en sin sammen med en konkret stillingsannonse (som lenke, tekst eller bilde). Til gjengjeld får de en match-score, en prioritert liste over hvilke må- og bør-krav i annonsen CV-en treffer eller mangler, og konkrete hint om hva som bør fremheves tydeligere — alt koblet til hvor i CV-en informasjonen allerede finnes.

Målet er ikke å skrive søknaden for brukeren, men å gjøre det tydelig *hva* som må justeres og *hvorfor*, slik at brukeren selv kan rette teksten opp mot en høy match uten å gjette seg frem. Dette skiller løsningen fra rene poengsum-verktøy (som viser en score, men ikke hvorfor) og fra fulltekst-generatorer (som skriver om alt for brukeren, med risiko for generisk eller oppdiktet innhold). All analyse er strengt begrenset til informasjon som allerede finnes i brukerens egen CV — verktøyet finner aldri på ny erfaring eller nye tall.

Prosjektet bygges som en enklere, norskspråklig prototype/demo i regi av IBE160 Programmering med KI ved Høgskolen i Molde — uten innlogging eller lagring i denne omgangen.

## Problemet

Jobbsøkere som søker på flere stillinger samtidig havner typisk i én av to feller:

1. **Generisk spredning** — samme CV/søknad sendes til alle stillinger uten reell tilpasning. Søknaden blir for uspesifikk til å skille seg ut, og fører sjelden til intervju.
2. **Manuell, ineffektiv tilpasning** — brukeren prøver å skrive om deler av søknaden (særlig "om meg selv"-delen) for hver stilling, men rekker ikke gjøre en god jobb innen søknadsfristen, eller klarer rett og slett ikke identifisere *hvilke* punkter i egen CV som faktisk er relevante opp mot akkurat denne annonsens kvalifikasjonskrav.

Begge feller koster brukeren reelle muligheter: enten fordi søknaden ikke treffer godt nok, eller fordi tiden det tar å tilpasse manuelt gjør at brukeren søker på færre stillinger enn de burde.

## Løsningen

Brukeren limer inn eller laster opp CV-en (tekst eller PDF) og gir én stillingsannonse (lenke, limt inn tekst, eller bilde/skjermutklipp). Løsningen analyserer annonsen og CV-en, og viser en resultatside med:

- **Samlet match-score** — én tallfestet indikasjon på hvor godt CV-en treffer annonsen i dag.
- **Krav-liste delt i må-krav og bør-krav** — hvert krav i annonsen markert som truffet eller manglende.
- **Kildehenvisning** — for hvert treff, en peker til hvor i CV-en informasjonen kommer fra, slik at brukeren forstår *hvorfor* et krav regnes som dekket.
- **Forbedringshint per gap** — korte pekere om hva som bør fremheves tydeligere eller flyttes høyere opp i CV-en/søknaden, basert utelukkende på informasjon som allerede finnes i brukerens egen tekst. Ingen ferdig omskrevne setninger i denne versjonen (se Omfang).

## Hva gjør dette annerledes

Feltet er ikke tomt — Jobscan tilbyr nøkkelord-matching og score, Teal og Rezi tilbyr full CV-omskriving og lagring av flere søknader, og mange bruker rett og slett ChatGPT direkte. Ingen av disse lukker loopen helt: score-verktøy sier *at* noe mangler, men ikke *hvor* i CV-en brukeren allerede har relevant erfaring som ikke er godt nok synlig. Fulltekst-generatorer løser dette, men på bekostning av kontroll — risikoen er generisk, robotisk tekst eller oppdiktede prestasjoner, noe som i økende grad blir flagget av arbeidsgivere.

CV & Jobb applikasjonsassistent legger seg bevisst mellom disse: må/bør-prioritert gap-analyse koblet direkte til kildeteksten i brukerens egen CV, med et strengt prinsipp om at verktøyet aldri dikter opp ny erfaring eller nye tall — det peker kun på hva som allerede finnes, og hvor det bør fremheves tydeligere.

## Hvem dette tjener

Primærbruker er jobbsøkere generelt — alle som søker på flere stillinger og ønsker å gjenbruke én CV/søknad fremfor å skrive nytt for hver søknad. Løsningen er ikke avgrenset til én bransje eller ett erfaringsnivå i denne omgangen.

## Suksesskriterier

- Gap-analysen trekker korrekt ut de viktigste kravene fra en reell stillingsannonse og formulerer dem slik at brukeren forstår hva som kreves for en god søknad.
- Brukeren får nok informasjon fra resultatsiden til selv å kunne justere CV/søknad opp mot en 90–100 % match.
- En fungerende demo er klar til kursets innleveringsfrist (konkret dato ikke avklart ennå — se Åpne spørsmål).

## Omfang

**Med i denne versjonen (MVP/prototype):**
- Én stillingsannonse om gangen.
- CV som tekst eller PDF-opplasting.
- Stillingsannonse som lenke, limt inn tekst, eller bilde/skjermutklipp.
- Match-score, må/bør-gap-liste, kildehenvisning i CV-teksten, og forbedringshint (ikke ferdig tekst).
- Norsk språk, både grensesnitt og analyse.
- Ingen innlogging, ingen lagring mellom økter.

**Eksplisitt utenfor denne versjonen:**
- Ferdig omskrevne setninger/avsnitt brukeren kan lime rett inn (vurdert og bevisst utsatt — se Visjon).
- Flere stillingsannonser sammenlignet samtidig.
- Brukerkontoer og lagring av CV-historikk over tid.

## Visjon

Videreført utover kurset kan løsningen utvides med innlogging og lagring: tidligere CV-er, søknader og analyser huskes over tid, slik at verktøyet kan gi bedre og raskere forbedringshint jo mer det vet om brukeren. Det åpner også naturlig for å vurdere ferdig omskrevne tekstforslag (fortsatt strengt begrenset til brukerens egen, verifiserte informasjon) som neste steg utover dagens hint-baserte tilnærming.

## Åpne spørsmål

- Gruppestørrelse er avklart: dette er et soloprosjekt (én person). Product brief skal leveres innen 20.09.2026. Endelig innleveringsfrist for selve applikasjonen/kursprosjektet er fortsatt uklar — påvirker hvor realistisk det fulle MVP-omfanget er innen fristen.
