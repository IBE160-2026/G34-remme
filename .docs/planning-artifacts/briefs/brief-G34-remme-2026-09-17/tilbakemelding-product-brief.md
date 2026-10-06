# Tilbakemelding på product brief

| | |
|---|---|
| **Gruppe** | G34 – G34-remme |
| **Product brief** | `.docs/planning-artifacts/briefs/brief-G34-remme-2026-09-17/brief.md` (commit `bcb6dba`) |
| **Tilbakemelding fra** | Faglærer i IBE160 (utarbeidet med KI-støtte) |
| **Dato** | 2026-10-06 |

Jeg har også lest `addendum.md` i samme mappe.

## Samlet vurdering

- **Godt utgangspunkt med justeringer.** Gruppen kan gå videre og innarbeide punktene under.

**Det som er bra:**

1. Posisjoneringen er tydelig og ærlig: mellom rene poengsum-verktøy (Jobscan) og fulltekst-generatorer (Teal, Rezi, ChatGPT). Ideen om at hvert treff skal ha en kildehenvisning til hvor i CV-en informasjonen står, gir appen en konkret egenart.
2. Prinsippet om at verktøyet aldri dikter opp ny erfaring eller nye tall, og at det gir hint i stedet for ferdig tekst, er en klok avgrensning som reduserer risikoen i KI-delen.
3. Ingen innlogging og ingen lagring i v1 er et godt valg for et soloprosjekt. Det forenkler både arkitekturen og personvernet.

**De viktigste endringene:**

1. Tre inntaksformer for stillingsannonsen (lenke, tekst og bilde) og PDF-opplasting av CV er for mye for én person. Lenke krever skraping og bilde krever OCR eller bildemodell, slik addendumet selv påpeker. Start med innlimt tekst for begge.
2. Match-scoren er ikke definert. Beskriv hvordan den beregnes (f.eks. andel må-krav og bør-krav som er truffet, med vekting), slik at den kan forklares og testes og ikke bare er et tall språkmodellen finner på.
3. Briefen sier ikke hvilken språkmodell som skal brukes, hva det koster, eller hvordan sensor kan kjøre appen uten nøkkelen deres.

## Vanskelighetsgrad og gjennomførbarhet

### Vurdert vanskelighetsgrad

- **Middels**

**Sammenlignbart med:** 2) AI CV- og søknadsassistent (middels). Ideen tilsvarer gap-analysedelen av dette forslaget, uten søknadsbrev, men med flere inntaksformer.

**Begrunnelse:**

| Faktor | Nivå (lav / middels / høy) | Kommentar |
|---|---|---|
| Domenelogikk – hvor mange og hvor kompliserte regler og beregninger må stemme? | Middels | Uttrekk av må- og bør-krav fra annonsen, matching mot CV, match-score og kildehenvisning. Mye av logikken ligger i prompts, men scoren bør beregnes i kode. |
| Datamodell – antall entiteter og relasjoner mellom dem | Lav | Ingen lagring: CV, annonse, kravliste og resultat lever bare i økten. |
| Brukere, roller og innlogging | Lav | Én anonym bruker, ingen innlogging. |
| KI-funksjonalitet i appen, f.eks. kall til språkmodell, prompts i koden og håndtering av usikre svar | Høy | Hele analysen bygger på språkmodellen: kravuttrekk, matching, kildehenvisning og hint. Kravet om ingen oppdiktet informasjon må kontrolleres. |
| Integrasjoner og eksterne tjenester, f.eks. API-er, betaling og e-post | Middels | Språkmodell-API, og i tillegg skraping av eksterne nettsider hvis lenke-input beholdes. |
| Sanntid, samtidighet eller flere brukere som påvirker hverandre | Lav | Ikke relevant. |
| Filhåndtering, f.eks. opplasting, PDF-lesing og eksport | Høy | PDF-uttrekk av CV (ofte i kolonner) og bilde/skjermutklipp av annonser. Dette er blant de mest upålitelige delene å lage, også med Claude Code. |
| Sikkerhet og personvern | Middels | CV-er inneholder personopplysninger som sendes til en ekstern språkmodell. Uten lagring er risikoen mindre, men den bør nevnes. |

**Hva vanskelighetsgraden betyr for dere:**

- _Middels:_ Et godt balansert valg. Pass på at kjerneflyten (lim inn CV og annonse → kravliste med treff og mangler → kildehenvisning og hint) blir ferdig og stabil før dere legger til PDF, lenke eller bilde. Som soloprosjekt er det ekstra viktig å holde v1 stramt.

### Gjennomførbarhet med BMAD og Claude Code

Dere skal planlegge med BMAD (product brief → PRD → arkitektur → epics og stories) og implementere med Claude Code. Vurderingen under tar hensyn til at det må være tid til hele denne flyten, og til testing, retting og README til slutt.

| Spørsmål | Vurdering (OK / risiko / stor risiko) | Kommentar |
|---|---|---|
| **Tid og omfang** – kan v1 realistisk bli ferdig og stabil i løpet av semesteret, med tid til flere iterasjoner? | Risiko | Med tekst-input er kjerneflyten realistisk for én person. Med PDF, lenke og bilde i tillegg blir det trolig for mye. Det finnes ennå ingen PRD. |
| **BMAD-flyten** – er briefen konkret nok til at PRD, arkitektur og stories kan lages uten store hull, og blir det overkommelig mange stories? | Risiko | Resultatsiden er godt beskrevet, men match-scoren, primærbrukeren og KI-oppsettet er uklare. Det må avklares i PRD. |
| **Egnet for Claude Code** – bruker løsningen en vanlig, godt dokumentert teknologistakk som Claude Code håndterer godt, eller krever den nisjeteknologi, spesialmaskinvare eller mye manuell konfigurasjon? | OK | En enkel webapp med ett LLM-kall passer godt. Skraping og OCR er mer krevende. |
| **Kontroll på KI-ens arbeid** – kan gruppen selv avgjøre om koden gjør det riktige? Krever domenet kunnskap gruppen ikke har, f.eks. avanserte beregninger eller fagregler, så er det vanskelig å kvalitetssikre. | Risiko | Det er vanskelig å vite om kravuttrekket er «korrekt». Lag noen faste annonser der du på forhånd har skrevet ned må- og bør-kravene, og sammenlign med det appen finner. |
| **Testbarhet** – finnes det tydelige regler og forventede resultater som tester kan skrives mot? | Risiko | Scoreberegning, kildehenvisninger (finnes den siterte teksten faktisk i CV-en?) og feilhåndtering kan testes automatisk. Selve KI-kvaliteten må testes med faste eksempler. |
| **Kjørbar for sensor** – kan appen kjøres lokalt etter README, uten gruppens nøkler, betalte kontoer eller egen infrastruktur? | Stor risiko | Uten plan krever appen en API-nøkkel sensor ikke har. Planlegg en demomodus med ferdige svar for en eksempel-CV og -annonse. |
| **Avhengigheter og kostnader** – krever løsningen betalte API-er, f.eks. språkmodeller, og finnes det en plan for kostnad, testmodus eller mock-data? | Risiko | Språkmodell-API er ikke nevnt i briefen. Velg modell, anslå kostnad og legg inn testmodus. |

**Konklusjon om gjennomførbarhet:**

- **Gjennomførbart med justert omfang.** Se forslagene under.

**Forslag til justering av omfang eller vanskelighetsgrad:**

1. V1: CV og annonse som innlimt tekst. Legg PDF-opplasting av CV som første utvidelse, og flytt lenke og bilde til «Eksplisitt utenfor».
2. Beregn match-scoren i kode ut fra kravlisten (f.eks. må-krav teller dobbelt), slik at KI bare trekker ut krav og treff, og tallet blir forklarbart.
3. Legg til en automatisk kontroll av at hver kildehenvisning faktisk finnes ordrett i CV-teksten. Det er en enkel og sterk test av prinsippet om at ingenting diktes opp.

## Hvorfor product brief er viktig for mappen

Product brief er utgangspunktet for PRD, arkitektur, stories og til slutt koden. Del 1 av mappen vurderes blant annet på om sensor kan følge en sporbar vei fra plan til ferdig app. Den vurderes også på om appen gjør det dere har beskrevet, om den er testet, om den er godt designet, og om den kan kjøres etter README. Et uklart, for stort eller for lite brief gjør alt dette vanskeligere senere. Det er mye enklere å rette nå enn sent i semesteret.

## 1. Gjennomgang av briefens deler

| Del av brief | Status | Kommentar |
|---|---|---|
| Executive Summary – er det klart hva appen er, og hvilket problem den løser? | OK | Tydelig: én CV mot én annonse, med match-score, må/bør-gap-liste, kildehenvisning og hint. |
| The Problem – er problemet konkret, med reelle situasjoner og brukere? | OK | De to fellene (generisk spredning og ineffektiv manuell tilpasning) er gjenkjennelige. |
| The Solution – beskriver løsningen brukeropplevelsen, ikke bare teknologi? | OK | Resultatsiden er godt beskrevet med fire konkrete elementer. Beskriv gjerne også hva brukeren gjør etter å ha lest hintene. |
| What Makes This Different – er vurderingen ærlig og realistisk? | OK | Ærlig om konkurrentene og konkret om hva som skiller løsningen fra dem. |
| Who This Serves – er primærbrukerne tydelige, og vet vi hva de trenger? | Endre | «Jobbsøkere generelt» uten avgrensning av bransje eller nivå er for bredt til å designe og teste mot. Velg én primærbruker, f.eks. studenter i siste studieår som søker på flere trainee-stillinger. |
| Success Criteria – kan kriteriene faktisk sjekkes eller testes? | Endre | «Trekker korrekt ut de viktigste kravene» og «nok informasjon til å nå 90–100 % match» kan ikke sjekkes slik de står. Skriv konkrete kriterier, f.eks. «for 5 testannonser finner appen minst 4 av 5 må-krav som er notert på forhånd» og «hver kildehenvisning finnes ordrett i CV-en». |
| Scope – er det klart hva som er med i første versjon, og hva som ikke er det? | Juster | Tydelig delt i med og utenfor, men «med» inneholder tre inntaksformer og PDF. Flytt lenke og bilde ut. |
| Vision – henger visjonen sammen med resten uten å blåse opp omfanget? | OK | Innlogging, lagring og omskrevne tekstforslag er tydelig plassert etter kurset. |

## 2. Utgangspunkt for del 1 av mappen

Punktene følger kriteriene i sensorveiledningen for del 1. Vektene i parentes viser hvor mye hvert kriterium teller i del 1.

| Kriterium i del 1 | Hva briefen bør legge til rette for | Status | Kommentar |
|---|---|---|---|
| **1. Prosess og KI-styring** (30 %) | Brief som er presis nok til at PRD og stories kan bygges direkte på den, slik at krav kan spores fra brief til kode. | Juster | Briefen er et greit grunnlag, men repoet har så langt få commits utover briefen. Kom i gang med PRD og lagre prompts og KI-økter fortløpende. |
| **2. Funksjonalitet og omfang** (20 %) | Realistisk omfang for gruppen og semesteret: en tydelig kjerneflyt som kan bli ferdig og stabil, og nok innhold til å vise reell funksjonalitet. | Juster | Kjerneflyten er tydelig. Reduser inntaksformene slik at den kan bli stabil. |
| **3. Kvalitetssikring og testing** (15 %) | Suksesskriterier og funksjoner som er konkrete nok til å bli testtilfeller. | Endre | Lag målbare kriterier og et sett eksempel-CV-er og annonser med forventede krav, treff og mangler. |
| **4. Design og brukeropplevelse** (10 %) | Tydelige brukere og brukssituasjoner som designet kan bygges rundt, gjerne med de viktigste skjermbildene eller flytene skissert. | Juster | Resultatsiden er en god start. Skisser inputsiden og resultatsiden, og hvordan kildehenvisningen vises (f.eks. markert tekst i CV-en). |
| **5. Kodekvalitet og arkitektur** (10 %) | Teknologivalg som er begrunnet og ikke mer komplekse enn appen trenger. | Juster | Teknologi er ikke valgt. Hold det enkelt: én webapp, ett LLM-kall, ingen database. |
| **6. README og kjørbarhet** (10 %) | Løsning som andre kan kjøre lokalt uten betalte kontoer, og uten tilgang til gruppens egne tjenester og nøkler. | Endre | Planlegg demomodus og tydelig nøkkeloppsett med `.env.example`. |
| **7. Ryddighet i repoet** (5 %) | En plan for hvor hemmeligheter, testdata og dokumentasjon skal ligge. | Juster | Nøkler i `.env` utenfor Git, og bruk bare fiktive CV-er som testdata – ikke din egen eller andres ekte CV i et offentlig repo. |

## 3. Neste steg for gruppen

1. Oppdater Scope til tekst-input i v1, definer match-scoren, og velg én konkret primærbruker.
2. Skriv om suksesskriteriene til målbare krav og lag 3–5 fiktive CV-er og annonser med forventet resultat.
3. Velg språkmodell, legg inn demomodus, og gå videre til PRD.

Oppdater product brief i repoet når dere har gjort endringene, slik at historikken viser hvordan planen utviklet seg. Det er en del av prosessen sensor ser etter.
