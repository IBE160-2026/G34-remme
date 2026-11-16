---
title: "EXPERIENCE: CV & Jobb applikasjonsassistent"
status: final
created: 2026-11-15
updated: 2026-11-16
sources:
  - ../../prds/prd-G34-remme-2026-11-04/prd.md
  - .working/concept-14-valgt-kombinasjon/concept.md
---

# CV & Jobb applikasjonsassistent – Opplevelse

Hvordan appen virker. Visuell identitet og tokens står i [DESIGN.md](DESIGN.md). Kravene (FR-1 til FR-17), ordlisten og brukerreisene står i [PRD-en](../../prds/prd-G34-remme-2026-11-04/prd.md) og gjentas ikke her. Dette dokumentet beskriver bare hvordan de oppleves. Mockups står i [`mockups/`](mockups/). **Ved konflikt mellom en mockup og dette dokumentet gjelder dokumentet.**

## Foundation

- **Form:** én nettside som kjøres lokalt og brukes i nettleser på PC (PRD §5). Det er ingen mobilvisning i v1, og ingen innlogging.
- **UI-system:** ikke valgt ennå. Det avgjøres i arkitekturen. DESIGN.md beskriver det visuelle uavhengig av komponentbibliotek. [ASSUMPTION: et bibliotek tilpasses DESIGN.md, ikke omvendt]
- **Grunnprinsipp:** én ting om gangen. Inputen tas i tre steg, og resultatet gås gjennom i fire trinn, med det positive først.
- **Grunnlag:** godkjent konsept 14. Det består av inputsiden, analyserer, resultatsiden og demomodus fra konsept 11, avslutningen av «Dette mangler» og tilstandene fra konsept 13, og utseendet fra konsept 01.

## Information Architecture

Appen har én side som skifter mellom to visninger: input og resultat. Det finnes ingen ruter du kan navigere mellom.

| Visning | Nås fra | Formål | Mockup |
|---|---|---|---|
| Input, steg 1 «CV» | Appstart / «Endre» på CV-raden | Lime inn CV-en | [01](mockups/01-landingsside.svg) |
| Input, steg 2 «Annonse» | «Neste: Annonse» / «Endre» på annonseraden / «Analyser ny annonse» | Lime inn én annonse | [01](mockups/01-landingsside.svg) |
| Input, steg 3 «Analyser» | Begge steg utfylt | Personvernvarsel og «Analyser» | [01](mockups/01-landingsside.svg) |
| Analyserer | «Analyser» | Vente på svar (FR-13) | [02](mockups/02-analyserer.svg) |
| Resultat, trinn 1 «Oversikt» | Ferdig analyse | Score, potensiell score, poengstripe, fordeling og eventuelt «Godt treff» | [03](mockups/03-resultat-debrief.svg) |
| Resultat, trinn 2 «Dette er bra» | «Neste» / innholdsfortegnelsen | Krav som er truffet, med sitat | [03](mockups/03-resultat-debrief.svg) |
| Resultat, trinn 3 «Dette kan bli tydeligere» | «Neste» / innholdsfortegnelsen | Krav som er delvis truffet, med sitat og hint | [03](mockups/03-resultat-debrief.svg) |
| Resultat, trinn 4 «Dette mangler» | «Neste» / innholdsfortegnelsen | Krav som mangler, med hint, og «Ferdig med gjennomgangen.» | [03](mockups/03-resultat-debrief.svg) |
| Resultat, «Vis alt på én side» | Lenke i venstre marg | Alle fire trinnene stablet i samme rekkefølge | [03](mockups/03-resultat-debrief.svg) |
| Meldinger | Analysen gir ikke et resultat | Ingen krav, feil, for lang tekst, egen tekst i demomodus | [04](mockups/04-tilstander.svg) |
| Demomodus | Appstart uten API-nøkkel | Hele flyten med eksempeldata | [05](mockups/05-demomodus.svg) |

Hvert behov i PRD-en har en visning. «Analyser ny annonse» (FR-10) leder tilbake til steg 2, med CV-en beholdt. Den eneste veien fra resultatet tilbake til input er **«Endre CV eller annonse»**.

## Voice and Tone

Merkevarestemmen står i DESIGN.md (Brand & Style). Her gjelder mikrotekst. Alle tekster er på norsk (PRD §5), og tekstene fra PRD-en brukes ordrett.

| Gjør | Ikke gjør |
|---|---|
| «Du er på 59 %.» | «Din match-score er 59 %!» |
| «Dette er bra.» / «Dette kan bli tydeligere.» / «Dette mangler.» | «Styrker», «Svakheter», «Feil» |
| «Fikser du de 2 delvis truffede kravene, kan du nå 73 %.» | «Bare litt til, så er du i mål! 🚀» |
| Hint som peker på noe som allerede står i CV-en: «Flytt presentasjonen høyere opp …» | Ferdig omskrevne setninger eller forslag om å legge til erfaring |
| «Ferdig med gjennomgangen.» | «Gratulerer, du har fullført analysen!» |
| Rolige setninger med punktum, også i feilmeldinger | Utropstegn, emoji, skyld på brukeren |

## Component Patterns

Atferd. Det visuelle står i DESIGN.md (Components).

| Komponent | Bruk | Atferd |
|---|---|---|
| Stegindikator | Input | Viser CV → Annonse → Analyser. Ferdige steg er klikkbare og åpner steget igjen. Kommende steg er ikke klikkbare. |
| Tekstfelt | Steg 1 og 2 | Tegntelleren oppdateres mens du skriver. Over 15 000 tegn vises «Teksten er for lang» under feltet, og «Analyser» er deaktivert. Teksten blir stående så lenge fanen er åpen (FR-2). |
| «Neste: Annonse» | Steg 1 | Aktiv når CV-feltet har tekst som ikke bare er mellomrom. Slår sammen steg 1 til en rad. |
| Sammenslått steg | Input | Viser første linje og tegntelleren. «Endre» åpner steget igjen med teksten intakt. |
| «Analyser» | Steg 3 | Deaktivert når et felt er tomt, bare har mellomrom eller er over grensen. Under analysen er den deaktivert og viser «Analyserer …» (FR-13). |
| Innholdsfortegnelse | Resultat | Viser alltid alle fire trinnene med antall. Klikk går rett til trinnet. Det aktive trinnet er markert. |
| «Neste: …» / «Forrige: …» | Resultat | Går ett trinn frem eller tilbake. Trinn 1 har bare «Neste: Dette er bra». Trinn 4 har ingen «Neste», men en avslutning (se under). |
| Avslutning av «Dette mangler» | Trinn 4 | «Ferdig med gjennomgangen.» + «Rediger CV-en i ditt eget verktøy, og lim den inn på nytt med «Endre CV eller annonse». Annonsen står der fortsatt så lenge fanen er åpen.» + knappene «Endre CV eller annonse», «Forrige: Dette kan bli tydeligere» og «Tilbake til oversikten». |
| «Endre CV eller annonse» | Venstre marg på alle trinn, og i avslutningen | Går til input med begge feltene utfylt og steg 1 åpent. Den gamle analysen forkastes ved neste «Analyser». |
| «Vis alt på én side» / «Vis ett trinn om gangen» | Venstre marg | Bytter mellom å vise ett trinn og alle trinnene stablet. Innholdsfortegnelsen følger med når du ruller. |
| Fordelingsrad | Trinn 1 | «Dette er bra – 3 krav truffet · 2 må-krav, 1 bør-krav». Klikk går til trinnet. |
| Krav | Trinn 2–4 | Leses, og har ingen egen handling. Truffet og delvis truffet viser sitat. Delvis truffet og mangler viser forbedringshint (FR-6, FR-9). |
| Godt treff | Trinn 1, bare når den avrundede scoren er 90 % eller høyere | «Ja» viser «Analyser ny annonse». «Nei» lukker spørsmålet, og brukeren blir på resultatet (FR-10). |
| Sidenote | Høyre marg | Forklarer og har ingen handling: «Slik er scoren regnet», «Sitatkontrollen» (nedgradert krav med det oppgitte sitatet). |

## State Patterns

| Tilstand | Hvor | Behandling |
|---|---|---|
| Tom start | Input, steg 1 | Steg 1 er åpent med tomt felt. «Neste: Annonse» og «Analyser» er deaktivert. |
| For lang tekst | Feltet som er for langt | Teglkant, tegl teller, «Teksten er for lang» under feltet, «Analyser» deaktivert (FR-1). |
| Analyserer | Input | «Analyserer …» i knappen. «Analyser» og «Endre» er deaktivert. Feltene er synlige og beholder teksten (FR-13). |
| Ingen krav funnet | I stedet for resultatet | Melding: «Ingen krav funnet, har du husket annonsen?». Ingen score. Feltene er fortsatt utfylt (FR-12). |
| Feil i analysen | I stedet for resultatet | Melding: «Klarte ikke å analysere, prøv igjen». Gjelder både når API-et feiler og når modellen svarer med noe som ikke kan leses. Ingen delvise resultater vises. Feltene er utfylt, og «Analyser» er aktiv igjen (FR-14). |
| Resultat under 90 % | Trinn 1 | Score, potensiell score (hvis det finnes delvis truffede krav), stripe og fordeling. Spørsmålet om å søke vises ikke. |
| Resultat på 90 % eller høyere | Trinn 1 | Som over, pluss «Godt treff, klar til å søke?» med Ja/Nei. |
| Ingen delvis truffede krav | Trinn 1 | Ingen potensiell score vises (FR-8). |
| Nedgradert krav | Trinn 4 og trinn 1 | Kravet står under «Dette mangler» med hintet «Fant ikke belegg i CV-en for dette kravet». Sidenoten viser sitatet som ble avvist. Oversikten nevner at kravet ble nedgradert (FR-11). |
| Etter «Ja» → «Analyser ny annonse» | Input, steg 2 | Annonsefeltet er tømt, og CV-raden viser «CV-en er beholdt». |
| Ny analyse etter redigering | Resultat | Den nye scoren erstatter den gamle. **Ingen tidligere score vises eller lagres.** |
| Demomodus | Hele appen | Se egen seksjon under. |

## Demomodus

- Uten API-nøkkel i `.env` vises banneret «Demomodus – ingen API-nøkkel funnet» øverst på alle visninger, med en lenke til README (FR-15).
- «Bruk eksempel» står øverst i veiviseren og fyller begge feltene med eksempeldata. Feltene får merket «Eksempeldata» (FR-16).
- «Analyser» viser det ferdige eksempelresultatet med **nøyaktig samme oppbygning** som en ekte analyse: samme trinn, samme komponenter og samme avslutning. Resultatet er merket tre steder: banneret, et «Eksempeldata»-merke over scoren og en loddrett marglinje.
- Er feltene ikke helt identiske med eksempeldataene, viser «Analyser» meldingen «Ekte analyse krever API-nøkkel – se README» (FR-17).

## Interaction Primitives

- Mus og tastatur. Alle handlinger kan nås med Tab i leserekkefølgen, og Enter/Mellomrom aktiverer knapper og lenker.
- Det er ingen hurtigtaster i v1. [ASSUMPTION]
- «Neste: …» og «Forrige: …» flytter fokus til overskriften i det nye trinnet.
- Ingen dialogvinduer. Meldinger og «Godt treff» står i sidens flyt.
- Ingen automatisk analyse: analysen starter bare når brukeren trykker «Analyser».
- **Ikke tillatt:** animasjoner som feirer scoren, uendelig rulling, hover som eneste måte å finne en handling på.

## Accessibility Floor

Atferd. Kontrast står i DESIGN.md.

- WCAG 2.2 AA.
- Status gis alltid med både ord og tegn, ikke bare farge. Må/bør skilles på form og ord.
- «Analyserer …», meldinger og ny score annonseres med `aria-live="polite"`.
- Når et nytt trinn åpnes, flyttes fokus til overskriften i trinnet («Dette er bra.»). Innholdsfortegnelsen markerer aktivt trinn med `aria-current="step"`.
- Feilteksten «Teksten er for lang» er koblet til feltet med `aria-describedby`.
- Poengstripen har en tekstlig ekvivalent («6,5 av 11 poeng») og er pynt for skjermlesere.
- Den loddrette marglinjen i demomodus er pynt. Demostatusen leses fra banneret.

## Responsive & Platform

| Bredde | Atferd |
|---|---|
| ≥ 1280 px | Tre marger på resultatsiden og to spalter på inputsiden, som i mockupene. |
| < 1280 px | Sidenotene flyttes inn under kravet de hører til. Innholdsfortegnelsen står over lesekolonnen. [ASSUMPTION: ikke tegnet] |
| Mobil | Ikke støttet i v1 (PRD §5). |

## Inspiration & Anti-patterns

- **Fra konsept 01 «Rolig rådgiver»:** utseendet som en fagbok, scoren som en setning og sitatet med markørstrek.
- **Fra konsept 09 «Ett steg om gangen»:** veiviseren med sammenslåtte steg, gjennomgangen i trinn med innholdsfortegnelse og poengstripen.
- **Fra konsept 13 «Rolig iterasjon»:** avslutningen av «Dette mangler» og tilstandene.
- **Valgt bort:** sammenligning med forrige score (kunne friste til å jakte poeng), CV-visning ved siden av kravene (13), knappen «Lim inn oppdatert CV og analyser på nytt» (13), og tavle-, chat- og dashbord-mønstre fra runde 1.

## Key Flows

### Flyt 1 – Yvonne finner ut hvorfor CV-en ikke gir intervju (UJ-1)

Yvonne Berg går 5. semester av 6 og har søkt tre trainee-stillinger uten å bli kalt inn til intervju. Hun sitter ved pulten en tirsdag kveld med CV-en åpen i Word.

1. Hun åpner appen. Til venstre forklarer fire korte prinsipper hva appen gjør. Til høyre er steg 1 «CV» åpent.
2. Hun limer inn CV-en. Telleren viser 357 / 15 000 tegn. Hun trykker «Neste: Annonse», og CV-en slås sammen til en rad.
3. Hun limer inn annonsen fra Nordvik Kraft AS. Steg 3 viser personvernvarselet og «Analyser», som hun trykker.
4. Knappen viser «Analyserer …» i ca. 20 sekunder, og feltene står der fortsatt.
5. Oversikten: «Du er på 59 %.» og «Fikser du de 2 delvis truffede kravene, kan du nå 73 %.» Under står fordelingen: 3 bra, 2 kan bli tydeligere og 2 mangler.
6. Hun går gjennom «Dette er bra» og ser sine egne ord som bevis, så «Dette kan bli tydeligere» med hint, og til slutt «Dette mangler».
7. **Høydepunkt:** I «Dette kan bli tydeligere» ser hun at presentasjonen av gruppeprosjektet *står* i CV-en, men nederst og uten å si at den var muntlig. Problemet er formuleringen, ikke erfaringen.
8. «Ferdig med gjennomgangen.» Hun trykker «Endre CV eller annonse», redigerer CV-en i Word, limer den inn igjen og trykker «Analyser». Annonsen står der fortsatt.
9. Ny oversikt: «Du er på 91 %.» og «Godt treff, klar til å søke?». Hun trykker «Ja», så «Analyser ny annonse», og CV-en står fortsatt i feltet.

Feil: API-et svarer ikke → «Klarte ikke å analysere, prøv igjen». Feltene er utfylt, og hun trykker «Analyser» igjen.

### Flyt 2 – Sensor prøver appen uten API-nøkkel (UJ-2)

Sensor har klonet repoet, fulgt README og startet appen uten nøkkel.

1. Banneret sier «Demomodus – ingen API-nøkkel funnet».
2. Sensor trykker «Bruk eksempel». Begge feltene fylles og merkes «Eksempeldata».
3. Sensor trykker «Analyser».
4. **Høydepunkt:** Resultatet har nøyaktig samme oppbygning som en ekte analyse: oversikt, tre trinn, sitater, hint, et nedgradert krav og avslutningen. Det er tydelig merket som eksempeldata, så sensor ser hele kjerneflyten uten nøkkel og uten kostnad.
5. Sensor endrer ett tegn i annonsen og trykker «Analyser» igjen → «Ekte analyse krever API-nøkkel – se README».

## Åpne punkter

- UI-system og komponentbibliotek avgjøres i arkitekturen.
- Bruddpunktet under 1280 px er ikke tegnet.
- Teksten i hintene skrives i prompten og testes mot testsettet (SM-5).
