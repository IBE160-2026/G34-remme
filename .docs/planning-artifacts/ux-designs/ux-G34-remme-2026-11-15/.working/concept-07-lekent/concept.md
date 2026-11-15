# Konsept 07 – Lekent og oppmuntrende («Stien mot flagget»)

## Idé

Match-scoren er en sti opp et fjell. Studenten står der scoren er («Du er her · 65 %»), og flagget «Godt treff» står ved 90 %. Den potensielle scoren er en stiplet etappe fram til «Neste milepæl». Etappen viser bare det studenten kan nå ved å formulere tydeligere det som allerede står i CV-en, så målet føles innen rekkevidde. Kravene under er etapper i samme univers: truffet, delvis truffet og mangler har hver sin form og farge, og hvert krav har sitat og hint ved siden av seg.

## Palett

| Rolle | Hex |
|---|---|
| Bakgrunn (varmt papir) | `#FBF4EA` |
| Seksjonsflate (sand) | `#F4E9DA` |
| Tekst (plommeblekk) | `#2A2140` |
| Sekundærtekst | `#5E5470` |
| Feltkant | `#DCCFBF` |
| Primærhandling (korall) | `#C2412A` / lys `#F6D9CF` |
| Truffet (blågrønn) | `#1E7366` / lys `#DDEFE9` |
| Delvis truffet (rav) | `#F2B33D`, tekst `#8A5A00` / lys `#FCEFD2` |
| Mangler (plomme) | `#5B3F86` / lys `#EFE8F7` |
| Himmel / åser | `#CFE4F3`, `#BFDCC8`, `#8CC4A2`, `#5E9F7E` |
| Deaktivert | `#E6DED3`, tekst `#645A70` |

Kontrasten er kontrollert mot WCAG AA: hvit på korall er ca. 5,3:1, hvit på blågrønn ca. 5,7:1, ravtekst `#8A5A00` på papir ca. 5,4:1, plomme på lys plomme ca. 7:1, og sekundærtekst på papir ca. 6,4:1. Mangler er bevisst plomme, ikke rød, så et gap ikke leses som en feil. Rødt (korall) brukes bare til handlinger og ekte feilmeldinger.

## Typografi

Bare systemfonter (SVG-kravet): `Segoe UI Variable Display` / `Segoe UI` / `system-ui` / `Helvetica Neue` / Arial. Overskrifter er 800 med litt negativ sporing (54 px på inputsiden, 88 px for scoren), krav har 20 px / 700, og brødtekst er 15–17 px / 400. Små merker er 13 px, som også er minste tekst. Tall bruker tabulære sifre.

## Layoutprinsipp

Innholdet ligger i en 1120 px bred kolonne (x 160–1280) på en 1440 px flate, og store, avrundede flater (radius 22–48) bærer illustrasjonen og feltene. Resultatsiden er en reise ovenfra og ned: fjellet med scoren, en linje med opptelling og regneregel, og deretter etappene «Truffet», «Delvis truffet» og «Mangler». Hvert krav er en tokolonners rad med kravet og typen til venstre og bevis (sitat) og hint til høyre, ikke et rutenett av like kort. Ingen sidefelt, KPI-fliser eller diagrammer, så siden ser ikke ut som et dashbord.

## Hvordan konseptet løser funksjonaliteten

- **FR-1/3:** De eksakte etikettene står over feltene, og hver av dem har en tegnteller «x / 15 000 tegn». Hjelpeteksten og personvernvarselet står ved knappen, så de leses rett før «Analyser». Både aktiv og deaktivert knapp er vist og forklart.
- **FR-2:** Feltene er fortsatt utfylt i ventetilstanden og i alle feiltilstandene. Etter «Ja» og «Analyser ny annonse» er bare annonsefeltet tømt (04).
- **FR-7/8:** Scoren er stort tall pluss «8,5 av 13 mulige poeng», og regneregelen står på én linje. Den potensielle scoren er formulert som i PRD-eksempelet og vises på stien som «Neste milepæl». Varianten med 90 % viser at den potensielle scoren skjules når ingen krav er delvis truffet.
- **FR-9:** Kravene er sortert truffet → delvis → mangler, med må-krav før bør-krav innen hver status. Må-krav har et mørkt merke og bør-krav et omrisset merke, så typen ikke bare skilles på farge. Statusikonene har ulik form: hel sirkel med hake, halv sirkel og stiplet sirkel.
- **FR-10:** «Godt treff, klar til å søke?» med Ja/Nei vises bare i 90 %-varianten. Hovedresultatet sier eksplisitt at spørsmålet ikke vises ved 65 %.
- **FR-11:** «Grunnleggende SQL» er merket «Nedgradert av sitatkontrollen». Det foreslåtte sitatet står gjennomstreket, og hintet er «Fant ikke belegg i CV-en for dette kravet».
- **FR-12/13/14/15/16/17:** Tilstandsarket (04) og demofilen (05) dekker disse. Eksempelresultatet er merket med et mørkt bånd øverst og nederst og med «Eksempelannonse» i overskriften.

## Score-regnestykke (FR-7 / FR-8)

**Hovedresultat – Yvonne mot «Trainee IT og digitalisering – Havlys Energi AS»** (8 krav: 5 må, 3 bør)

| Krav | Type | Status | Poeng |
|---|---|---|---|
| Bachelorgrad innen IT, økonomi eller tilsvarende | må | truffet | 2 |
| God muntlig og skriftlig norsk og engelsk | må | truffet | 2 |
| Gode samarbeidsevner | må | truffet | 2 |
| Erfaring med opplæring eller veiledning | bør | truffet | 1 |
| Erfaring med dataanalyse | må | delvis | 1 |
| Forståelse for økonomi og budsjett | bør | delvis | 0,5 |
| Grunnleggende SQL (nedgradert av FR-11) | må | mangler | 0 |
| Interesse for energibransjen | bør | mangler | 0 |

Maks = 5 × 2 + 3 × 1 = 13. Oppnådd = 8,5. Score = 8,5 / 13 × 100 = 65,38 → **65 %**.
Potensiell: de to delvis truffede kravene blir truffet (+1 og +0,5), så 10 / 13 × 100 = 76,92 → **77 %**. Kravene som mangler, telles ikke.

**Variant ≥ 90 % – samme CV mot «Trainee IT-støtte – Kystby kommune»:** 4 må-krav truffet (8) + 1 bør-krav truffet (1) + 1 bør-krav mangler (0) = 9 / 10 = **90 %**. Ingen krav er delvis truffet, så ingen potensiell score vises.

**Demomodus – Sara Lien mot «Trainee økonomi – Brattli Bygg AS»:** må: truffet 2, delvis 1, mangler 0. Bør: truffet 1, delvis 0,5, mangler 0. Til sammen 4,5 / 9 = **50 %**. Potensiell: 6 / 9 = 66,67 → **67 %**.

Alle sitatene finnes ordrett i CV-utdragene som står i feltene.

## Svakheter og risiko

- Fjell og sti kan oppleves som spillifisering. Det dempes ved at tallene alltid står i klartekst og at det ikke finnes poengjakt, merker eller animasjoner som belønner, men grensen bør testes med brukere (SM-5).
- Stien har ikke lineær skala (lengde langs en kurve), så 25/50/75-milepælene er nødvendige for å lese den riktig. Den er en illustrasjon av tallet, ikke en erstatning for det.
- Illustrasjonen krever SVG-arbeid i implementasjonen, og må skaleres til smalere vinduer selv om mobil ikke er et krav.
- Systemfonter gir mindre karakter enn en egen rund display-font. Det er valgt fordi SVG-ene skal være selvstendige.
- Resultatsiden blir lang med mange krav. Opptellingslinjen øverst gir oversikten.

## Impeccable-prinsipper som er brukt

- Skillen er lastet, men oppstartsskriptet (`impeccable context`) ble ikke kjørt, fordi det kan laste ned en binærfil og oppdraget forbyr installasjon. Det finnes ingen PRODUCT.md/DESIGN.md. Craft-floor er lest og fulgt.
- **Modus:** Inputsiden er Persuade light, med tydelig løfte og illustrasjon. Resultatsiden er Operate, der skanbarhet går foran uttrykk.
- **Fravalg:** ingen eyebrow/kicker over overskrifter, ingen hero-metric-mal med KPI-fliser, ingen like kort med ikon + overskrift som sidestruktur, ingen nestede kort, ingen gradienttekst, ingen fargede venstrekanter, ingen glass/blur og ingen emoji-ikoner. Alle ikonene er egentegnet med samme strektykkelse.
- **Farge og kontrast:** AA er kontrollert, og sekundærtekst på farget flate er tonet fra flatens kulør, ikke grå. Status skilles med både form og farge.
- **Dybde:** myke skygger med forskyvning og blur, ingen harde blokkskygger.
- **Tilstander:** aktiv, deaktivert, venting, feil, tom, for lang og demo er alle tegnet, med produktets egne ord.
- **Avvik fra craft-floor:** regelen om å ikke bruke systemfont som display-stemme er bevisst brutt, fordi oppdraget krever systemfonter (briefen vinner).
