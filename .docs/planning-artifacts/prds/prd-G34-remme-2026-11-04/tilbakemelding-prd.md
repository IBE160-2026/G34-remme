# Tilbakemelding på PRD

| | |
|---|---|
| **Gruppe** | G34 – G34-remme |
| **PRD vurdert** | `.docs/planning-artifacts/prds/prd-G34-remme-2026-11-04/prd.md` (status `final`, sist endret 2026-11-04, commit d965afb) |
| **Dato** | 2026-11-12 |
| **Type** | Formativ tilbakemelding, ikke karakter |

## 1. Samlet inntrykk

Dette er en sterk PRD. Den har en tydelig tese («aldri finn på erfaring», hvert treff begrunnet med et sitat), FR-er med konkrete testbare konsekvenser, og en scoremodell som er flyttet fra språkmodellen til kode. Hovedrisikoen ligger i KI-delen: PRD-en sier lite om hva som skjer når språkmodellen svarer uventet, og hvordan de automatiske testene skal kjøres uten ekte API-kall. Åpne spørsmål og antakelser er erklært tomme, selv om flere valg (vekting, 90 %-grensen, rekkefølge på resultatsiden) er avveininger gruppen bør begrunne.

## 2. Dette fungerer godt

- **Scoren er forklarbar og testbar.** §4.2 FR-7 har en poengtabell («Truffet 2 poeng / 1 poeng …») og formelen «oppnådde poeng ÷ maks mulige poeng × 100», med grensetilfeller som kan bli enhetstester direkte. Det fulgte opp rådet fra briefen om at KI bare skal trekke ut krav og treff.
- **Kontrollen av KI-ens arbeid er bygd inn i kravene.** FR-11 «Et krav med et sitat som ikke finnes i CV-en, får status mangler», og SM-1 gjør det til et automatisk målbart suksesskriterium. Mot-målene SM-C1 og SM-C2 hindrer at man «jukser» seg til SM-1 ved å sitere lite.
- **Ordlisten og brukerreisene gjør PRD-en lett å bygge videre på.** §3 definerer status med eksempler («Excel (avansert), pivottabeller» mot «brukte regneark i et kursprosjekt»), og UJ-1 og UJ-2 har navngitte hovedpersoner, konkrete tekster på knapper og meldinger, og unntakstilfeller. UJ-2 (sensor uten nøkkel) er et ærlig og nyttig grep som gir demomodus en plass i kravene.

## 3. Oversikt per dimensjon

| Dimensjon | Vurdering | Kort begrunnelse |
|---|---|---|
| Beslutningsklarhet – er valg og avveininger synlige? | god | Ikke-mål og «Utenfor v1» er tydelige, men §9 hevder at ingen spørsmål eller antakelser gjenstår, selv om vekting, 90 %-grense og rekkefølge er uten begrunnelse. |
| Substans – er innholdet fortjent, eller «pynt»? | sterk | Spesifikke meldinger, tall og kostnadsanslag. Ingen pynte-personas eller boilerplate-NFR-er. |
| Strategisk sammenheng – har PRD-en en tese som funksjonene tjener? | sterk | Alle FR-er tjener «treff med sitat, uten oppdiktet innhold». SM-ene validerer tesen og har mot-mål. |
| Testbarhet – vet man når hvert FR er ferdig? | god | De fleste FR-er har målbare konsekvenser. Mangler: ugyldig modellsvar, avrunding, grenser for inputlengde, og FR-4 («ikke gå glipp av krav»). |
| Scope og avgrensning – er utelatelser eksplisitte? | sterk | §6 og §7.2 skiller tydelig, med begrunnelse for hver utsettelse. FR-8 er merket som valgfri. Omfanget (17 FR) er realistisk. |
| Brukbarhet for neste fase – kan UX, arkitektur og stories hente fra den? | god | IDer er kontinuerlige og krysshenvisninger stemmer. Rekkefølgen på kontrollene (FR-11 før FR-7) er ikke sagt eksplisitt. |
| Formtilpasning – passer PRD-formen produktet? | sterk | Lett forbrukerprodukt med to UJ-er, kort ordliste og tverrgående krav. Ikke overformalisert. |

## 4. Viktigste forbedringer

### 4.1 Ugyldig eller uventet svar fra språkmodellen, og testing uten ekte API-kall
- **Alvorlighet:** høy
- **Hvor:** §4.4 FR-14 «Feiler analysen (API-et svarer ikke, nøkkelen er ugyldig eller tidsgrensen nås)»; §8 SM-1 «kontrollert automatisk»
- **Problem og hvorfor det betyr noe:** FR-14 dekker at API-kallet feiler, men ikke at kallet lykkes og svaret er ubrukelig: manglende felt, ukjent status, tomt sitat eller tekst som ikke kan leses som kravliste. Dette er den vanligste feilen i apper som bruker språkmodeller, og arkitektur og stories må vite hva som skal skje. PRD-en sier heller ikke hvordan FR-5, FR-7 og FR-11 testes automatisk uten å betale for hvert kall, og slik at testen gir samme svar hver gang.
- **Forslag:** Legg til en konsekvens under FR-14, og en kort tverrgående regel om testing:
  - «Svarer språkmodellen med noe som ikke kan tolkes som en kravliste (ugyldig format, manglende felt eller ukjent status), behandles det som en feil i analysen: appen viser «Klarte ikke å analysere, prøv igjen», og ingen delvis resultat vises.»
  - «Automatiske tester av FR-5, FR-7, FR-10 og FR-11 kjøres mot faste, lagrede modellsvar (også ugyldige) og bruker ikke API-nøkkel. Testsettet i §7.1 kjøres mot ekte modell manuelt, og resultatet noteres.»

### 4.2 Rekkefølge, avrunding og 90 %-grensen er ikke bestemt
- **Alvorlighet:** medium
- **Hvor:** §4.2 FR-7 «Match-score = oppnådde poeng ÷ maks mulige poeng × 100»; §4.3 FR-10 «90 % eller høyere»; §4.4 FR-11
- **Problem og hvorfor det betyr noe:** Det står ikke om scoren avrundes, men FR-8 viser «62 %» og «81 %». Er scoren 89,6 % spør appen da om «Godt treff» eller ikke? I tillegg endrer FR-11 status til mangler *etter* at modellen har svart. Rekkefølgen sitatkontroll, så score, avgjør både scoren og om forbedringshint finnes (FR-6, SM-C2) for et krav som ble nedgradert.
- **Forslag:** Legg til konsekvenser, for eksempel:
  - FR-7: «Scoren avrundes til nærmeste hele prosent. FR-10 bruker den avrundede scoren (89,6 % vises som 90 % og utløser spørsmålet).»
  - FR-11: «Sitatkontrollen kjøres før scoren beregnes. Et krav som nedgraderes til mangler får hintet «Fant ikke belegg i CV-en for dette kravet».»
  - FR-7: «Er antall krav 0, beregnes ingen score (se FR-12).»

### 4.3 Mot-målene kan ikke måles slik de står
- **Alvorlighet:** medium
- **Hvor:** §8 SM-C1 «Antall truffede krav sammenlignes med fasiten i SM-3»; SM-C2 «… er en feil, selv om scoren og statusene er riktige»
- **Problem og hvorfor det betyr noe:** SM-C1 har ingen grense, så den kan aldri bli bestått eller strøket. SM-C2 er egentlig en regel om hint, ikke et mål. Slike punkter blir ofte glemt i testplanen. SM-3 (70 %) er også lav nok til at en app som rett og slett svarer «mangler» på mye kan klare den uten å avsløre problemer.
- **Forslag:** «SM-C1: Antall krav appen markerer som truffet avviker fra fasiten med maks 20 % i begge retninger, summert over de 3 CV-ene.» Flytt SM-C2 til en konsekvens under FR-6 og FR-9: «Hvert krav med status delvis truffet eller mangler har et ikke-tomt forbedringshint. Testes automatisk på lagrede modellsvar.»

### 4.4 «Ingen åpne spørsmål» stemmer ikke med valgene i dokumentet
- **Alvorlighet:** medium
- **Hvor:** §9 «Ingen som blokkerer UX eller arkitektur. Alle antakelser er bekreftet.»; §4.2 FR-7 vektene 2/1; §4.3 FR-9 rekkefølge truffet → delvis → mangler
- **Problem og hvorfor det betyr noe:** PRD-en har ingen `[ASSUMPTION]`-merker og ingen åpne spørsmål, men har flere reelle valg uten begrunnelse. Hvorfor teller et må-krav dobbelt? Hvorfor 90 %? Hvorfor vises det som er truffet først, når brukerens mål (§2.1) er å se hva som mangler? Uten begrunnelse kan UX-arbeidet (og sensor) ikke vite om det er et bevisst valg eller et tilfeldig. §4.2 og §5 sier at modellen er Claude Opus 5.5, mens §0 sier at teknologivalg hører hjemme i arkitekturen. Velg ett.
- **Forslag:** Legg til en kort begrunnelse eller et merke ved hvert valg, og fyll §9: «`[ASSUMPTION: Må-krav teller dobbelt fordi annonser bruker dem som utelukkende kriterier. Vektene kan justeres etter testsettet.]`», «Åpent spørsmål: Skal gap vises først på resultatsiden? Avgjøres ved skissene i bmad-ux». Si også om modellvalget er et krav (kostnad, kvalitet) eller et arkitekturvalg.

### 4.5 Presiser noen formuleringer som kan bli testtilfeller
- **Alvorlighet:** lav
- **Hvor:** §4.2 FR-4 «Målet er å ikke gå glipp av krav»; §4.1 FR-3 «lagres ikke»; §4.5 FR-17 «Limer brukeren inn egen tekst»; §5 mangler grense for inputlengde
- **Problem og hvorfor det betyr noe:** FR-4 har ingen egen målbar konsekvens (SM-2 gjør jobben, men FR-en bør peke dit). FR-3 kan leses som at Anthropic ikke lagrer teksten, noe PRD-en ikke vet. FR-17 sier ikke hva «egen tekst» er hvis brukeren endrer eksempelteksten med ett tegn. Og en veldig lang CV eller annonse gir høyere kostnad og tregere svar enn anslagene i §5, uten at noe stopper det.
- **Forslag:** FR-3: «CV-en din sendes til Claude for analyse. Appen lagrer den ikke.» FR-17: «Er feltene ikke identiske med eksempeldata, regnes teksten som egen tekst.» Legg til: «Hvert felt godtar maks 15 000 tegn. Over det vises «Teksten er for lang».» FR-4: «Se SM-2 for målbar dekning» som konsekvens.

## 5. Mekaniske funn

- **IDer:** FR-1 til FR-17, UJ-1 og UJ-2, SM-1 til SM-5, SM-C1 og SM-C2 er sammenhengende og krysshenvisningene løser seg. FR-3, FR-12 og FR-15 til FR-17 viser ikke til en UJ i teksten (FR-15 til FR-17 gjør det via funksjonsbeskrivelsen).
- **SM-4** validerer FR-8, som er et valgfritt krav. Si at det gjelder «hvis FR-8 er med».
- **Ordliste:** Begrepene brukes konsekvent. «Resultatside» (ordliste) og «Resultatsiden» (tekst) er bare bøyning. «Språkmodell», «Claude» og «Claude Opus 5.5» brukes om det samme, noe som er greit så lenge det ikke gir UX-valg ulike navn.
- **Antakelser:** Ingen `[ASSUMPTION]`-merker og ingen indeks. Se 4.4.
- **Personopplysninger:** Ingen sensitive opplysninger funnet i PRD-en.

## 6. Før dere går videre

**Må avklares før UX, arkitektur og epics:**
- Hva skjer ved ugyldig modellsvar, og hvordan testes uten ekte API (4.1).
- Rekkefølge sitatkontroll og score, avrunding og 90 %-regelen (4.2).
- Om modellvalget (Opus 5.5) er et krav eller et arkitekturvalg, og begrunnelse for vekting og rekkefølge (4.4).

**Kan vente:**
- Målbare grenser for SM-C1 og SM-C2 (4.3) før testplanen skrives.
- Grense for inputlengde og presisering av FR-3 og FR-17 (4.5).

**Oppfølging av tilbakemeldingen på product brief: ja.** Tekst-input i v1 (PDF, lenke og bilde er flyttet til v2), én primærbruker (nyutdannede trainee-søkere), poengformel i kode, sitatkontroll (FR-11), målbare suksesskriterier med testsett og fasit, demomodus og modellvalg med kostnadsanslag er alle med.

## 7. Refleksjonsspørsmål

1. Poengtabellen i FR-7 (2/1/0,5) ser ut som et valg dere tok bevisst. Hva testet dere eller diskuterte før dere kom frem til akkurat de tallene, og hvordan vil dere oppdage at de gir en score brukeren ikke kan stole på?
2. Hvilke deler av PRD-en foreslo KI, og hva endret eller fjernet dere? Hvordan sjekket dere at f.eks. «Målbare» suksesskriterier som SM-C1 faktisk lar seg måle?

_Vurdert mot kvalitetsrubrikken i bmad-prd. Dette er veiledning, ikke sensur._
