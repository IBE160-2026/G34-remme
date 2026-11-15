# Konsept 04 – Tavle

## Idé

Resultatet legges ut som en tavle med tre kolonner, Truffet | Delvis truffet | Mangler, med ett kort per krav. Må-krav ligger øverst i hver kolonne og har et fylt, svart merke. Bør-krav har et merke med bare omriss. Øverst ligger en scorestripe med match-score, potensiell score og en segmentert bar der hvert segment er ett krav: et må-krav er dobbelt så bredt som et bør-krav, og segmentene står i samme rekkefølge som kortene på tavla. Baren viser altså regnestykket i FR-7 som en figur, ikke bare som et tall.

## Palett

| Rolle | Hex |
|---|---|
| Papir (bakgrunn) | `#F3EFE6` |
| Flate (kort, felt) | `#FFFDF8` |
| Linje / linje sterk | `#D9D1C1` / `#C9BFAC` |
| Blekk (tekst) | `#1C1E1B` |
| Sekundær tekst | `#45483F`, `#5E6058` |
| Aksent – persimon (primærknapp, sitatkontroll) | `#C2410C` (mørk `#9A3412`, tint `#FBE7DC`) |
| Truffet – mose | `#2E6B3F` tekst, `#3E7F4F` bar, `#E2EDE3` tint |
| Delvis – oker | `#8A5500` tekst, `#D4951C` bar, `#F7EACB` tint |
| Mangler – skifer | `#565B65`, tint `#E8E5DF`, stiplet omriss |
| Feil | `#A8231A` på `#FBE8E5` |
| Deaktivert knapp | `#5C584F` på `#E3DED3` |
| Demo (skravert bånd) | `#1C1E1B` / `#34372F`, tekst `#FFF6E8` |

Mangler er bevisst grå og stiplet, ikke rød: et krav som mangler er et faktum om CV-en, ikke en feil brukeren har gjort. Rødt er reservert for systemfeil og «Teksten er for lang». Alle tekstpar er AA (≥ 4,5:1 for brødtekst). Hvit på persimon er ca. 5,2:1.

## Typografi

- Grensesnitt: `'Segoe UI Variable Text','Segoe UI',system-ui,…` (systemfont, ingen eksterne fonter).
- Overskrifter og score: `'Segoe UI Variable Display'`, 700, stram sporing (−1,2 px på 46 px, −3 px på scoren 84 px). Tabelltall på alle poeng og tellere.
- Sitater fra CV-en: serif kursiv (`'Iowan Old Style','Charter','Sitka Text',Georgia`). CV-teksten får sin egen «dokumentstemme», slik at et ordrett sitat aldri kan forveksles med appens egen tekst eller hint.
- Minste tekst: 13 px.

## Layoutprinsipp

Rutenett på 1440 px med 80 px marg og 1280 px innhold. Tavla har tre kolonner på 405 px med 32 px mellomrom. Kolonnene har en 4 px statusstrek øverst, statusnavn med antall og definisjonen fra ordlisten («CV-en dekker kravet tydelig» osv.). Kortene har fast oppbygning: merke og poeng, kravet, sitatfelt (tonet i statusfargen), og forbedringshint. Inputsiden er ett arbeidspanel med to like felt side om side, og hjelpeteksten, personvernvarselet og «Analyser» står i en fast bunnrad. Venstre-til-høyre-lesing på tavla gir rekkefølgen truffet → delvis → mangler (FR-9) uten at brukeren må rulle seg gjennom en lang liste.

## Hvorfor konseptet løser funksjonaliteten godt

- **FR-9 rekkefølge:** kolonnene er rekkefølgen, og innen hver kolonne kommer må før bør. Den positive kolonnen leses først.
- **FR-7/FR-8 score:** baren gjør poengvektingen synlig (må = 2 enheter, bør = 1). Delvis truffet er halvt fylt, og den skraverte resten *er* den potensielle scoren. Krav som mangler er stiplet og telles ikke med i potensialet, som FR-8 krever. Gruppeklammene under baren viser poeng per kolonne.
- **FR-5/FR-11 sitater:** alle truffet- og delviskort har «Sitat fra CV-en» ordrett i serif. Kortet som er nedgradert av sitatkontrollen (Power BI) står i Mangler-kolonnen med merket «Nedgradert av sitatkontrollen» og hintet «Fant ikke belegg i CV-en for dette kravet».
- **FR-6 hint:** alle delvis- og manglerkort har et ikke-tomt hint som peker på eksisterende innhold, eller som sier rett ut at det ikke finnes noe å bygge på.
- **FR-10:** vises i scorestripen bare ved ≥ 90 % (variant med 92 % i 03). Etter «Ja» kommer «Analyser ny annonse», og i 04 vises det tømte annonsefeltet med CV-en beholdt.
- **FR-15/16/17:** et skravert, mørkt bånd skiller demo fra ekte bruk både på inputsiden og på resultatsiden («EKSEMPELDATA»), og feltene har merket «Eksempeldata».
- **Tilstander (04):** FR-12, FR-14, FR-1 (for lang, rød ramme og teller), FR-17 og etter «Ja». Feltene er utfylt i alle feiltilstander.

## Svakheter og risiko

- Tre kolonner krever bredde. På smal skjerm må tavla stables, og da forsvinner tavlemetaforen (mobil er ikke krav i v1).
- Ujevn fordeling (for eksempel 8 mangler og 1 truffet) gir én lang kolonne og to nesten tomme. Det kan se skjevt ut, men det er ærlig.
- Kolonnene kan leses som parallelle i stedet for sekvensielle. FR-9 sier «først … så … til slutt». Venstre-til-høyre ivaretar det for norske lesere, men det bør testes i SM-5.
- Den segmenterte baren må forklares (vi har forklaring og tegnforklaring under), ellers kan halvfylte segmenter misforstås.
- Kort med lange sitater gjør kolonnene ujevne i høyde.

## Score-regnestykket

Eksempel (Yvonne mot «Trainee – digitalisering, Nordvik Kraft AS»), 9 krav:

| Krav | Type | Status | Poeng | Maks |
|---|---|---|---|---|
| Bachelorgrad innen IT, økonomi eller tilsvarende | må | truffet | 2 | 2 |
| Gode norsk- og engelskkunnskaper | må | truffet | 2 | 2 |
| Erfaring med Python eller et annet programmeringsspråk | bør | truffet | 1 | 1 |
| Erfaring med dataanalyse og SQL | må | delvis | 1 | 2 |
| Erfaring med kundeservice | bør | delvis | 0,5 | 1 |
| Erfaring med Excel | bør | delvis | 0,5 | 1 |
| Førerkort klasse B | må | mangler | 0 | 2 |
| Kjennskap til Power BI (nedgradert av sitatkontrollen) | bør | mangler | 0 | 1 |
| Interesse for energibransjen (umerket → bør) | bør | mangler | 0 | 1 |
| **Sum** | | | **7** | **13** |

- Match-score = 7 ÷ 13 × 100 = 53,85 → **54 %**
- Potensiell score (delvis → truffet: +1 + 0,5 + 0,5) = 9 ÷ 13 × 100 = 69,23 → **69 %**
- Variant etter redigert CV: alt truffet unntatt Power BI = 12 ÷ 13 × 100 = 92,31 → **92 %** ≥ 90 → «Godt treff, klar til å søke?». Ingen delvis truffede krav, så ingen potensiell score.
- Demo (Sindre Lund mot «Trainee – økonomi, Fjellstad kommune»): må 2 + 2 + 1 (delvis), bør 1 + 0,5 (delvis) + 0 (mangler) = 6,5 ÷ 9 = 72,2 → **72 %**. Potensiell score: 8 ÷ 9 = 88,9 → **89 %**.

Alle sitater finnes ordrett i CV-utdraget i feltet (01/02/05).

## Impeccable-prinsipper brukt

- Modus: **Operate** (resultatsiden er et verktøy). Presisjon og ro framfor effekter. Kjente mønstre (kolonnetavle, tekstfelt) får stå, og identiteten ligger i detaljene: persimon-aksenten, papirtonene, merket med tre søyler og serifsitatene.
- Ingen eyebrows/kickers over overskrifter, ingen seksjonsnumre, ingen gradienttekst, ingen fargede venstrekanter på kort, ingen glass og ingen hard offset-skygge. Bare myk skygge med forskyvning.
- Unngår «hero-metric»-malen: scoren står sammen med regnestykket (baren og poengene), ikke som et dekorativt nøkkeltall.
- Egne tegnede ikoner med lik strek (hake, halvfylt, stiplet sirkel, lås, skjold), ingen emoji.
- Statusfarger er ikke den eneste koden: hver status har også egen ikonform og eget mønster (fylt / halvt / stiplet), og må/bør skilles ved fylt eller omriss.
- Lys tema er valgt ut fra bruken (student ved PC på dagtid, lesing av mye tekst). Tilstandene (deaktivert, venter, tom, feil, for lang) er alle tegnet.
- Avvik fra skillen: `impeccable context`-launcheren ble ikke kjørt (laster ned binær, og init/PRODUCT.md skulle hoppes over). Craft-floor-regelen om selvhostet displayfont er overstyrt av oppdraget, som krever systemfonter.
