# Konsept 05: Debrief-samtale

## Idé

Resultatet leses som en rolig debrief fra en veileder. Korte meldingsbobler går gjennom analysen i en fast rekkefølge: først scoren, så det som er bra, så det som kan bli bedre, og til slutt det som mangler. Hvert krav er et kompakt kort inni samtalen, med status, må/bør-merke, ordrett sitat og forbedringshint. Det er ingen chat og ikke noe innskrivingsfelt. Brukeren svarer bare med handlingsknapper («Ja», «Nei», «Endre tekstene og analyser på nytt», «Analyser ny annonse»).

## Filer

- `01-landingsside.svg`: landingssiden er inputsiden. Overskrift til venstre, veilederens intro i tre bobler til høyre («aldri finn på erfaring», sitater som bevis), deretter de to feltene, hjelpeteksten, personvernvarselet og «Analyser» i aktiv tilstand, med en liten forklaring av deaktivert tilstand. Avsenderblokken ligger i bunnteksten.
- `02-analyserer.svg`: en ny boble med «Analyserer …» og tre prikker. Feltene er fortsatt utfylt, men dempet, og «Analyser» er deaktivert.
- `03-resultat-debrief.svg` (1440 × 4089): hele debriefen med kapittelskinne til venstre og varianten med score på minst 90 % nederst («Godt treff, klar til å søke?» med Ja/Nei).
- `04-tilstander.svg`: Ingen krav funnet, Feil, Teksten er for lang, Egen tekst i demomodus, «Analyser ny annonse» etter Ja, og tomt felt der «Analyser» er deaktivert.
- `05-demomodus.svg`: inputsiden med demobanner og «Bruk eksempel», og resultatsiden merket med «Eksempeldata».

## Palett

| Rolle | Hex |
|---|---|
| Bakgrunn (varmt papir) | `#F4EFE6` |
| Flate, bobler og felt | `#FFFDF9` / `#FFFFFF` |
| Tekst (blekk) | `#1E2629` |
| Sekundærtekst | `#535C5B` (6,1:1 mot bakgrunnen) |
| Linjer | `#D8CFBF` |
| Veileder og primærknapp (dyp teal) | `#1D5C57` (hvit tekst 7,6:1) |
| Truffet | `#2D6A38` på tint `#E2EDDD` |
| Delvis truffet | `#7A5200` på tint `#F5E8C8` |
| Mangler og feil | `#9A3426` på tint `#F4E0DA` |
| Deaktivert | `#6A6358` på `#E2DCD1` |
| Skissenotater (ikke UI) | `#4B4790` |

Status skilles aldri bare med farge. Hver status har sitt eget ikon (fylt hake, halvfylt sirkel, stiplet sirkel med strek) og sitt eget ord. Må-krav vises som fylt mørk merkelapp og bør-krav som omrisset merkelapp.

## Typografi

- **Veilederens stemme:** serif (`Charter, 'Sitka Text', Cambria, Georgia, serif`), 18–19 px i bobler, 20 px på kravtitler, 72 px på scoren. Serif gir den rolige, menneskelige tonen.
- **Grensesnitt:** systemsans (`'Segoe UI Variable Text', 'Segoe UI', system-ui, …`), 13–18 px til etiketter, felt, hint og knapper.
- **Sitater:** serif kursiv 17 px i tonet blokk, med norske anførselstegn « ».
- Minste tekst er 13 px.

## Layoutprinsipp

En smal samtalekolonne på 720 px (x 408–1128), med veilederens avatar til venstre og brukerens valg høyrejustert, slik et svar i en samtale ville stått. Til venstre går en tynn kapittelskinne (Resultat → Bra · 4 krav → Kan bli bedre · 2 → Mangler · 2 → Videre), som viser hvor langt i gjennomgangen man er. Høyre marg brukes bare til skissenotater. Det er ikke noe rutenett av kort og ingen KPI-rad: alt leses ovenfra og ned som en fortelling.

## Hvordan konseptet løser funksjonaliteten

- **FR-9 rekkefølge:** samtaleformen gjør rekkefølgen truffet → delvis → mangler naturlig, fordi en veileder starter med det positive (PRD-antakelsen i FR-9). Innen hvert kapittel kommer må-krav før bør-krav.
- **FR-7/FR-8:** scoren står i første melding både som tall og som setning med eksakt formulering («Du er på 71 %. Fikser du de 2 delvis truffede kravene, kan du nå 83 %.»). En skala viser 90 %-grensen. Når det ikke finnes delvis truffede krav, vises ingen potensiell score.
- **FR-5/FR-6/FR-11:** sitatet står i en egen tonet blokk med etiketten «Sitat fra CV-en din», og hintet har en egen etikett. Kravet som sitatkontrollen har nedgradert, har en stiplet boks («Nedgradert av sitatkontrollen») og hintet «Fant ikke belegg i CV-en for dette kravet». Veilederen sier rett ut: «Jeg foreslår aldri at du legger til erfaring du ikke har.»
- **FR-10:** spørsmålet er en egen, fremhevet boble med Ja/Nei. Etter Ja kommer «Analyser ny annonse», og annonsefeltet tømmes mens CV-en beholdes (04).
- **FR-12/14/17:** feil- og tomtilstandene vises i samme boble-språk, så brukeren aldri møter en annen «stemme» enn veilederen. Feil får ikon og rød tint.
- **FR-15/16:** demobanneret er mørkt og står over alt annet, og resultatet har en fast oker-stripe med «Eksempeldata», som også gjentas i første melding.

## Svakheter og risiko

- Siden blir lang (cirka 4 100 px for 8 krav). Kapittelskinnen hjelper, men med mange krav kan det bli mye scrolling. Vurder å la truffede kort være sammenfoldet.
- Samtaleformen kan gi forventning om at man kan skrive spørsmål. Det løses ved å ikke ha noe innskrivingsfelt og bare høyrejusterte valgknapper, men det bør testes i SM-5.
- Det er en risiko for at veilederens fyllsetninger fortrenger innhold. Boblene må holdes på én til tre linjer.
- Bobler med animasjon («skriver …») kan bli treige hvis de spilles av én for én. Hele resultatet bør vises med en gang.

## Score-regnestykket (FR-7, må 2/1/0, bør 1/0,5/0)

**Hovedanalyse: Yvonne mot «Trainee IT og digitalisering», Nordvik Energi**

| Krav | Type | Status | Poeng | Maks |
|---|---|---|---|---|
| Bachelorgrad innen IT, informatikk eller tilsvarende | må | truffet | 2 | 2 |
| Programmering i minst ett språk | må | truffet | 2 | 2 |
| Gode kommunikasjonsevner på norsk og engelsk | må | truffet | 2 | 2 |
| Erfaring med SQL og databaser | må | delvis | 1 | 2 |
| Erfaring med kundekontakt | bør | truffet | 1 | 1 |
| Interesse for energibransjen | bør | delvis | 0,5 | 1 |
| Kjennskap til Power BI eller annen datavisualisering | bør | mangler | 0 | 1 |
| Erfaring med smidig utvikling (Scrum), nedgradert fra delvis av FR-11 | bør | mangler | 0 | 1 |
| **Sum** | | | **8,5** | **12** |

- Match-score: 8,5 ÷ 12 × 100 = 70,83 → **71 %**
- Potensiell score (de 2 delvis truffede regnes som truffet): (8,5 + 1 + 0,5) = 10 ÷ 12 × 100 = 83,33 → **83 %**
- Uten nedgraderingen ville Scrum gitt 0,5 og 9 ÷ 12 = 75 %. Scoren beregnes etter sitatkontrollen.
- Sitatkontroll: alle viste sitater («Bachelor i IT og informasjonssystemer», «utviklet en webapp i Python og Flask», «Norsk (morsmål), engelsk (flytende)», «kundeservice og opplæring av nyansatte», «SQL (grunnleggende)», «Valgfag: Energi og bærekraft») finnes ordrett i CV-utdraget. Det avviste sitatet «jobbet etter Scrum i bachelorprosjektet» finnes ikke.

**Variant med score på minst 90 %: samme CV mot «Trainee digital forvaltning», Fjordby kommune (fiktiv)**

5 må-krav truffet (5 × 2 = 10), 2 bør-krav truffet (2), 1 bør-krav mangler (0) → 12 ÷ 13 × 100 = 92,31 → **92 %**. Det finnes ingen delvis truffede krav, derfor vises ingen potensiell score. 92 ≥ 90, så «Godt treff, klar til å søke?» vises.

**Demomodus: eksempeldata, Mina Haugen mot «Trainee økonomi og analyse», Havbris AS (fiktiv)**

| Krav | Type | Status | Poeng | Maks |
|---|---|---|---|---|
| Bachelorgrad i økonomi | må | truffet | 2 | 2 |
| Beherske Excel | må | truffet | 2 | 2 |
| Erfaring med å presentere | bør | truffet | 1 | 1 |
| Regnskapsforståelse | bør | delvis | 0,5 | 1 |
| Kjennskap til SAP | bør | mangler | 0 | 1 |
| **Sum** | | | **5,5** | **7** |

- Match-score: 5,5 ÷ 7 × 100 = 78,57 → **79 %**. Potensiell score: 6 ÷ 7 × 100 = 85,71 → **86 %**.

## Impeccable-prinsipper som ble brukt

- **Modus:** inputsiden og resultatsiden er Operate/Read, så ambisjonen ligger i presisjon og ro, ikke i effekter. Lys tema er valgt ut fra bruken: en student ved PC-en i dagslys.
- **Avviste standardvalg:** ingen hero-metric-mal med KPI-rad (scoren står i en setning), ingen like kort i rutenett som sidestruktur, ingen eyebrow eller kicker over overskrifter, ingen gradienttekst, ingen glass, ingen farget kantlinje til venstre på kortene (statusen bæres av ikon, ord og tonet sitatblokk), og ingen emoji som ikoner (alle ikonene er tegnet SVG med lik strek).
- **Dybde:** myke skygger med forskyvning og uskarphet (dy 2–6, blur 3–10), aldri harde blokkskygger.
- **Kontrast:** all brødtekst ≥ 4,5:1, og sekundærtekst er tonet fra blekket, ikke nøytral grå.
- **Tilstander:** aktiv, deaktivert, laster, feil, tom og for lang er tegnet eksplisitt.
- **Copy:** knappene sier hva de gjør, og feilmeldingene bruker PRD-ens eksakte tekst.
- **Avvik:** Impeccable-launcheren meldte at PRODUCT.md mangler. Init og spørsmål ble hoppet over etter oppdraget, og retningen er utledet fra PRD-en. Craft-floor anbefaler en egen, selvhostet display-font, men briefen krever systemfonter, så briefen vinner, jf. «The brief wins».
