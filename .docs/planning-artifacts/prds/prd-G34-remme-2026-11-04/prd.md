---
title: "PRD: CV & Jobb applikasjonsassistent"
status: final
created: 2026-11-04
updated: 2026-11-04
---

# PRD: CV & Jobb applikasjonsassistent

## 0. Om dokumentet

Denne PRD-en er grunnlaget for UX, arkitektur, epics og stories for v1, og for testene. Den bygger på den endelige produktbriefen i `.docs/planning-artifacts/briefs/brief-G34-remme-2026-09-17/`, og gjentar ikke bakgrunn og konkurrentanalyse derfra. Ordene i §3 Ordliste brukes nøyaktig slik i resten av dokumentet. Funksjonene i §4 har globalt nummererte krav (FR-1 til FR-17), og suksessmålene i §8 viser til dem. Teknologivalg som ikke er avgjort her, hører hjemme i arkitekturen.

## 1. Visjon

Brukeren limer inn CV-en sin og en stillingsannonse, og får en score for hvor godt CV-en treffer annonsen, og konkrete innspill på hva som bør endres. Hvert treff er begrunnet med et sitat fra CV-en, og appen finner aldri på erfaring som ikke står der.

Appen hjelper nyutdannede studenter med lite arbeidserfaring med å søke trainee-stillinger. De har ofte relevant innhold i CV-en, men det er ikke formulert opp mot det annonsen ber om, og derfor blir de ikke kalt inn til intervju.

## 2. Målbruker

### 2.1 Jobber som skal gjøres

- Se raskt hvor godt CV-en treffer akkurat denne annonsen, uten å gjette.
- Forstå hvilke må-krav og bør-krav som mangler eller bare er delvis truffet, og hvorfor.
- Vite hva i egen CV som bør fremheves tydeligere, uten å måtte finne på noe.
- Tilpasse én CV til flere annonser uten å skrive en ny søknad hver gang.
- Kjenne seg trygg nok på CV-en til å sende søknaden.

### 2.2 Ikke målgruppe i v1

- Jobbsøkere med lang erfaring og bred bakgrunn.
- Personer som bytter jobb eller karriere.
- Personer som verken leser norsk eller engelsk.

Appen er for dem som søker sin første jobb.

### 2.3 Sentrale brukerreiser

- **UJ-1. Yvonne finner ut hvorfor CV-en ikke gir intervju.**
  Yvonne går 5. semester av 6 og har sendt søknad på tre trainee-stillinger uten å bli kalt inn til intervju. Hun klarer ikke å se hvordan CV-en hennes henger sammen med det annonsene ber om.
  - **Start:** Hun åpner nettsiden, uten innlogging. Inputsiden har feltene «Lim inn CV her:» og «Lim inn annonse her:», med hjelpeteksten «Bare en CV og en annonse per analyse». Knappen «Analyser» virker ikke før begge feltene er fylt ut.
  - **Gang:** Hun limer inn CV-en og den første annonsen og trykker «Analyser». Resultatsiden viser match-scoren øverst. Under den står kravene, først de som er **truffet** (med sitat fra CV-en), så de som er **delvis truffet**, og til slutt de som **mangler**. Hvert krav er merket som må-krav eller bør-krav, og hvert gap har et forbedringshint.
  - **Høydepunkt:** Hun ser at omtrent halvparten av kravene mangler eller bare er delvis truffet, og skjønner hva problemet er: erfaringen finnes, men den er ikke formulert opp mot annonsen.
  - **Avslutning:** Hun redigerer CV-en i sitt eget verktøy og limer den inn på nytt sammen med den samme annonsen. Begge feltene er fortsatt utfylt så lenge fanen er åpen. Når scoren er 90 % eller høyere, spør appen: «Godt treff, klar til å søke?»
    - Svarer hun **ja**, er hun ferdig med denne annonsen, og appen tilbyr «Analyser ny annonse» med CV-en fortsatt utfylt.
    - Svarer hun **nei**, fortsetter hun å forbedre CV-en til hun selv stopper.
  - **Unntak:** Hun prøver å lime inn alle tre annonsene samtidig. Siden har bare ett annonsefelt, og hjelpeteksten sier tydelig at det gjelder én annonse om gangen, så hun kjører dem én etter én. Limer hun inn noe som ikke er en annonse (for eksempel en e-post), svarer appen «Ingen krav funnet, har du husket annonsen?».

- **UJ-2. Sensor prøver appen uten API-nøkkel.**
  Sensor skal vurdere om appen gjør det briefen lover, og har ikke en egen Anthropic-nøkkel.
  - **Start:** Sensor kloner repoet, følger README og starter appen lokalt uten nøkkel i `.env`.
  - **Gang:** Inputsiden viser et banner, «Demomodus – ingen API-nøkkel funnet». Sensor trykker «Bruk eksempel», og feltene fylles med en fiktiv CV og en annonse. Sensor trykker «Analyser».
  - **Høydepunkt:** Resultatsiden viser et ferdig resultat med nøyaktig samme oppbygning som en ekte analyse: score, truffet / delvis / mangler, sitater og hint. Sensor ser hele kjerneflyten uten nøkkel og uten kostnad.
  - **Avslutning:** README forklarer hvordan man legger inn en egen nøkkel i `.env` for å kjøre en ekte analyse.
  - **Unntak:** Sensor limer inn egen tekst i demomodus. Appen analyserer ikke teksten, men viser «Ekte analyse krever API-nøkkel – se README».

## 3. Ordliste

*Resten av dokumentet, og alt som bygges på det, bruker disse ordene nøyaktig slik.*

- **CV** — brukerens CV som ren tekst, limt inn i CV-feltet. Én CV per analyse.
- **Annonse** — én stillingsannonse som ren tekst, limt inn i annonsefeltet. Én annonse per analyse.
- **Analyse** — én kjøring av én CV mot én annonse. Gir enten et resultat, meldingen «Ingen krav funnet …» eller en feilmelding.
- **Krav** — én kvalifikasjon annonsen ber om. Hvert krav har én type (må-krav eller bør-krav) og én status. Et enten-eller-krav («bachelorgrad eller relevant erfaring») er ett krav som kan oppfylles på flere måter.
- **Må-krav** — krav annonsen omtaler med ord som «krav», «må», «nødvendig» eller «vi forventer».
- **Bør-krav** — krav annonsen omtaler med ord som «ønskelig», «en fordel», «gjerne» eller «et pluss». Krav som ikke er merket på noen måte, regnes også som bør-krav.
- **Status** — ett av tre: **truffet** (CV-en dekker kravet tydelig, for eksempel «Excel (avansert), pivottabeller» for «erfaring med Excel»), **delvis truffet** (CV-en nevner noe som hører til kravet, men dekker det ikke fullt, for eksempel «brukte regneark i et kursprosjekt») eller **mangler** (CV-en nevner ingenting som hører til kravet).
- **Sitat** — et tekstutdrag fra CV-en som begrunner at et krav er truffet eller delvis truffet. Må finnes ordrett i CV-en.
- **Forbedringshint** — en kort peker for et krav som er delvis truffet eller mangler, om hva i CV-en som bør formuleres tydeligere eller flyttes høyere opp. Aldri ferdig omskrevet tekst, aldri ny erfaring.
- **Match-score** — tall fra 0 til 100 % beregnet i kode fra kravene (se FR-7).
- **Potensiell score** — match-scoren slik den ville vært hvis alle delvis truffede krav ble truffet (se FR-8).
- **Resultatside** — siden som viser resultatet av én analyse.
- **Demomodus** — tilstanden appen starter i når det ikke finnes noen API-nøkkel i `.env`. Viser ferdige resultater for eksempeldata.
- **Eksempeldata** — fiktiv CV og annonse med ferdig resultat, brukt i demomodus og i testsettet.

## 4. Funksjoner

### 4.1 Innliming

**Beskrivelse:** Inputsiden er der brukeren gir appen én CV og én annonse. Siden gjør det tydelig at det gjelder én av hver, og at begge må være med. Realiserer UJ-1 og UJ-2.

#### FR-1: Lime inn CV og annonse

Brukeren kan lime inn en CV i feltet «Lim inn CV her:» og en annonse i feltet «Lim inn annonse her:», og starte analysen med knappen «Analyser». Realiserer UJ-1.

**Konsekvenser (testbare):**
- Siden viser hjelpeteksten «Bare en CV og en annonse per analyse».
- «Analyser» er deaktivert så lenge ett av feltene er tomt eller bare inneholder mellomrom.

#### FR-2: Teksten beholdes i fanen

Feltene beholder innholdet så lenge nettleserfanen er åpen, slik at brukeren kan analysere på nytt uten å lime inn teksten igjen. Realiserer UJ-1.

**Konsekvenser (testbare):**
- Etter en analyse er CV-feltet fortsatt utfylt.
- Annonsefeltet er også fortsatt utfylt, og tømmes først når brukeren trykker «Analyser ny annonse».
- Lukkes fanen, er begge feltene tomme neste gang.
- Ingen CV- eller annonsetekst lagres på serveren eller i filer.

#### FR-3: Personvernvarsel

Inputsiden opplyser at CV-en sendes til en ekstern språkmodell for analyse og ikke lagres.

**Konsekvenser (testbare):**
- Inputsiden viser «CV-en din sendes til Claude for analyse og lagres ikke.» før brukeren trykker «Analyser».

### 4.2 Analyse

**Beskrivelse:** Språkmodellen trekker ut kravene fra annonsen, gir hvert krav en status med sitat, og skriver forbedringshint. Koden regner ut match-scoren. Språkmodellen finner aldri på et tall. Realiserer UJ-1.

#### FR-4: Kravuttrekk

Appen trekker ut alle krav fra annonsen og merker hvert som må-krav eller bør-krav.

**Konsekvenser (testbare):**
- Et enten-eller-krav blir ett krav, ikke to.
- Typen avgjøres av ordene i annonsen (se §3 Må-krav og Bør-krav). Krav uten slike ord blir bør-krav.
- Målet er å ikke gå glipp av krav. Et ekstra krav er en mindre feil enn et manglende (se SM-2).

#### FR-5: Status med sitat

Appen gir hvert krav status truffet, delvis truffet eller mangler. Et krav som er truffet eller delvis truffet, har et sitat fra CV-en.

**Konsekvenser (testbare):**
- Et krav uten sitat kan ikke ha status truffet eller delvis truffet.
- Et må-krav som mangler, får aldri status truffet (se SM-3).

#### FR-6: Forbedringshint

Appen gir et forbedringshint for hvert krav som er delvis truffet eller mangler.

**Konsekvenser (testbare):**
- Hintet viser til innhold som allerede finnes i CV-en, og sier om det bør formuleres tydeligere eller flyttes høyere opp.
- Hintet inneholder ikke ferdig omskrevne setninger.
- Finnes det ikke noe relevant i CV-en for et krav som mangler, sier hintet det rett ut, uten å foreslå å legge til erfaring.

#### FR-7: Match-score

Koden beregner match-scoren fra kravene:

| Status | Må-krav | Bør-krav |
|---|---|---|
| Truffet | 2 poeng | 1 poeng |
| Delvis truffet | 1 poeng | 0,5 poeng |
| Mangler | 0 poeng | 0 poeng |

Match-score = oppnådde poeng ÷ maks mulige poeng × 100.

**Konsekvenser (testbare):**
- Alle krav truffet gir 100 %.
- Ett må-krav delvis truffet gir under 100 %.
- Ett bør-krav som mangler, gir under 100 %.
- Samme kravliste gir alltid samme score.

#### FR-8: Potensiell score *(bør — hvis tiden tillater)*

Koden beregner den potensielle scoren som om alle delvis truffede krav var truffet. Krav som mangler, telles ikke med, fordi appen aldri skal oppfordre til å legge til erfaring som ikke finnes.

**Konsekvenser (testbare):**
- Eksempel: «Du er på 62 %. Fikser du de 3 delvis truffede kravene, kan du nå 81 %.»
- Uten delvis truffede krav vises ingen potensiell score.

### 4.3 Resultatside

**Beskrivelse:** Resultatsiden viser hvor godt CV-en treffer annonsen, og hvorfor. Realiserer UJ-1 og UJ-2.

#### FR-9: Rekkefølge og innhold

Resultatsiden viser match-scoren øverst, deretter kravene som er truffet, så de som er delvis truffet, og til slutt de som mangler.

**Konsekvenser (testbare):**
- Hvert krav er merket som må-krav eller bør-krav. Innenfor hver status kommer må-kravene før bør-kravene.
- Krav som er truffet eller delvis truffet, viser sitatet.
- Krav som er delvis truffet eller mangler, viser forbedringshintet.
- Den potensielle scoren vises under match-scoren hvis FR-8 er med.

#### FR-10: Godt treff

Når match-scoren er 90 % eller høyere, spør appen «Godt treff, klar til å søke?». Realiserer UJ-1.

**Konsekvenser (testbare):**
- **Ja:** appen viser «Analyser ny annonse». Trykker brukeren på den, tømmes annonsefeltet og CV-en beholdes.
- **Nei:** brukeren blir på resultatsiden og kan forbedre CV-en og analysere på nytt.
- Under 90 % vises ikke spørsmålet.

### 4.4 Kontroller

**Beskrivelse:** Kontrollene sikrer prinsippet om at ingenting diktes opp, og at brukeren alltid vet hva som skjer. Realiserer UJ-1.

#### FR-11: Sitatkontroll

Koden kontrollerer at hvert sitat finnes ordrett i CV-en før resultatet vises.

**Konsekvenser (testbare):**
- Et krav med et sitat som ikke finnes i CV-en, får status mangler.
- Forskjeller i mellomrom og linjeskift regnes ikke som avvik.
- Kontrollen kjøres på alle analyser og kan testes automatisk (se SM-1).

#### FR-12: Ingen krav funnet

Finner appen ingen krav i annonsen, viser den «Ingen krav funnet, har du husket annonsen?» i stedet for et resultat.

**Konsekvenser (testbare):**
- Ingen match-score vises.
- Feltene er fortsatt utfylt.

#### FR-13: Venting

Mens analysen pågår, viser appen «Analyserer …».

**Konsekvenser (testbare):**
- «Analyser» er deaktivert mens analysen pågår, slik at samme analyse ikke sendes to ganger.

#### FR-14: Feil i analysen

Feiler analysen (API-et svarer ikke, nøkkelen er ugyldig eller tidsgrensen nås), viser appen «Klarte ikke å analysere, prøv igjen».

**Konsekvenser (testbare):**
- Feltene er fortsatt utfylt.
- «Analyser» er tilgjengelig igjen.
- Tidsgrensen er 60 sekunder.

### 4.5 Demomodus

**Beskrivelse:** Uten API-nøkkel starter appen i demomodus, slik at hvem som helst, også sensor, kan se hele kjerneflyten uten nøkkel og uten kostnad. Realiserer UJ-2.

#### FR-15: Demobanner

Uten API-nøkkel i `.env` viser inputsiden banneret «Demomodus – ingen API-nøkkel funnet».

#### FR-16: Bruk eksempel

I demomodus fyller knappen «Bruk eksempel» feltene med eksempeldata. «Analyser» viser da det ferdige resultatet.

**Konsekvenser (testbare):**
- Resultatsiden har samme oppbygning som ved en ekte analyse.
- Resultatsiden er tydelig merket som eksempeldata, ikke brukerens egen tekst.

#### FR-17: Egen tekst i demomodus

Limer brukeren inn egen tekst i demomodus og trykker «Analyser», viser appen «Ekte analyse krever API-nøkkel – se README» i stedet for et resultat.

## 5. Tverrgående krav

- **Språk:** grensesnittet og meldingene er alltid på norsk. CV og annonse kan være på norsk eller engelsk. Er både CV og annonse på engelsk, skrives kravene og forbedringshintene på engelsk. Ellers skrives de på norsk.
- **Plattform:** en nettside som kjøres lokalt og brukes i en nettleser på PC. Mobilvisning er ikke et krav i v1.
- **Kjørbarhet:** appen kan startes lokalt ved å følge README, uten betalte kontoer og uten gruppens nøkler. Nøkkelen settes i `.env` etter mal i `.env.example`. Uten nøkkel starter appen i demomodus (§4.5).
- **Språkmodell og kostnad:** analysen bruker Claude Opus 5.5 via Anthropics API. Anslått kostnad er 0,50–2,00 kr per analyse, 10–40 kr for en testrunde på 20 analyser, og 60–300 kr for prompt-utvikling (100–200 kjøringer).
- **Ytelse:** en analyse tar vanligvis 15–30 sekunder. Tidsgrensen er 60 sekunder (FR-14).
- **Personvern:** CV- og annonsetekst lagres ikke på serveren eller i filer (FR-2), og brukeren får beskjed om at CV-en sendes til Claude (FR-3). `.env` er utenfor Git. Repoet inneholder bare fiktive CV-er. Testannonsene kan være ekte, offentlige annonser.

## 6. Ikke-mål

- Appen skriver ikke søknaden eller CV-en for brukeren, og lager ikke ferdig omskrevne setninger.
- Appen finner aldri på erfaring, tall eller prestasjoner som ikke står i CV-en.
- Appen er ikke et verktøy for jobbsøk eller oppfølging av søknader.
- Appen sjekker ikke CV-ens formatering eller om den kan leses av rekrutteringssystemer.
- Appen er ikke en offentlig tjeneste på nett i v1.

## 7. MVP-omfang

### 7.1 Med i v1

- FR-1 til FR-17, med unntak av FR-8, som er et bør-krav.
- Én CV og én annonse per analyse, begge som innlimt tekst.
- Demomodus med eksempeldata.
- Testsett med 5 ekte trainee-annonser og 3 fiktive CV-er med fasit (se SM-2 og SM-3).

### 7.2 Utenfor v1

- **FR-8 potensiell score:** med hvis tiden tillater, ellers v2.
- **PDF-opplasting av CV:** v2. PDF-uttrekk er upålitelig, særlig for CV-er med kolonner.
- **Annonse som lenke eller bilde:** v2. Krever skraping eller bildetolkning.
- **Flere annonser samtidig:** v2.
- **Ferdig omskrevne tekstforslag:** senere, fortsatt begrenset til brukerens egen informasjon.
- **Innlogging og lagring av CV-er over tid:** senere.
- **Publisert nettversjon med bruksgrenser:** v2. Krever kostnadstak og vern mot misbruk.

## 8. Suksessmål

**Primære**
- **SM-1: Ikke noe oppdiktet innhold.** Alle sitater for krav som er truffet eller delvis truffet, finnes ordrett i CV-en. Mål: 100 %, kontrollert automatisk. Validerer FR-5 og FR-11.
- **SM-2: Kravuttrekk.** For 5 ekte trainee-annonser der må-kravene er notert på forhånd, finner appen alle må-krav i minst 4 av 5 annonser, og bommer på maks 1 må-krav i en enkelt annonse. Minst 2 av annonsene skal ha tydelig merkede må-krav, fordi umerkede krav regnes som bør-krav. Validerer FR-4.
- **SM-3: Status.** For 3 fiktive CV-er testet mot annonsene, med fasit skrevet på forhånd, får minst 70 % av kravene riktig status. Et må-krav som mangler, får aldri status truffet. Validerer FR-5.

**Sekundære**
- **SM-4: Scoreberegning.** Automatiske tester av formelen med faste kravlister består, inkludert grensetilfellene i FR-7. Validerer FR-7 og FR-8.
- **SM-5: Brukeren.** En medstudent som får en fiktiv CV og en annonse, kan ut fra resultatsiden alene og uten hjelp peke på minst 1 konkret endring i CV-en innen 5 minutter, og se hvilke må-krav og bør-krav som er truffet eller mangler. Validerer FR-6 og FR-9.

**Mot-mål (skal ikke optimaliseres)**
- **SM-C1: Få sitater.** Appen skal ikke nå SM-1 ved å sitere lite eller markere for få krav som truffet. Antall truffede krav sammenlignes med fasiten i SM-3. Motvekt til SM-1.
- **SM-C2: Manglende hint.** Et resultat der krav som er delvis truffet eller mangler, ikke har forbedringshint, er en feil, selv om scoren og statusene er riktige. Motvekt til SM-1 og SM-3.

## 9. Åpne spørsmål og antakelser

Ingen som blokkerer UX eller arkitektur. Alle antakelser er bekreftet. Skisser av inputsiden og resultatsiden lages med `bmad-ux`.
