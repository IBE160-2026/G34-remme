# Konsept 11 – Tro hybrid

## Idé

Spørsmålet konseptet svarer på: «Hvordan ser 09 ut hvis det var designet av 01?» Flyten, stegene, komponentene, rekkefølgen og poengstripen er tatt fra 09 uten endringer. Alt du ser, er hentet fra 01: papirpaletten, serif-overskrifter som hele setninger («Du er på 59 %.», «Dette er bra.»), redaksjonelle marger med sidenoter, markørstrek bak sitater og meldinger som en rolig setning mellom to linjer. Resultatet er en veiviser som føles som en fagbok du blar i, ett oppslag om gangen.

## Hva som er tatt fra hvor

| Fra 09 (flyt og interaksjon, uendret) | Fra 01 (visuelt språk) |
|---|---|
| Tre steg: 1 CV, 2 Annonse, 3 Analyser, med stegindikator | Palett, papirbakgrunn, blekkfarget primærknapp |
| Ferdige steg slås sammen til en rad med tegnteller og «Endre» | Serif (Georgia-stakk) for overskrifter, score, sitater; grotesk for UI |
| Hjelpetekst, personvern og «Analyser» i den rekkefølgen | «Du er på X %.» som overskrift, FR-8-setningen som ingress |
| Trinnvis debrief: Oversikt, Dette er bra, Dette kan bli tydeligere, Dette mangler | Tredelt margsystem: venstre marg 120–360, lesekolonne 400–1040, høyre marg 1080–1320 |
| Innholdsfortegnelse til venstre med antall per trinn | Sitatkontroll og «Slik er scoren regnet» som sidenoter i høyre marg |
| «Vis alt på én side» / «Vis ett trinn om gangen» | Sitat i kursiv serif med markørstrek (`#EEDFBF`) |
| Poengstripen: én bit per krav, må-krav dobbelt så brede | Statustegn fylt / halvfylt / tom sirkel, også brukt i stripen |
| Prikker + «Neste: …» nederst i hvert trinn | Må-krav = fylt merke, bør-krav = omriss (01s merker) |
| «Godt treff, klar til å søke?» etter fordelingen, med Ja/Nei | Spørsmålet satt i serif mellom to blekklinjer |
| Demomodus: «Bruk eksempel» øverst i panelet, «Eksempeldata»-merker på feltene | Demobånd i `#EFE4CC`, loddrett marglinje «EKSEMPELDATA · IKKE DIN EGEN TEKST» |

## Visuelle kollisjoner, der 01 vinner

1. **Aksentfarge:** 09s fjordgrønne `#2E5A60` (knapper, steg, TOC) er fjernet. Primærknapper, stegsirkler og aktive prikker er blekk `#2A2420`, som i 01.
2. **Statusfarger:** 09s mose/oker/tegl med lyse tinter er byttet mot 01s `#4A6536` / `#7A5710` / `#8A3B2B`. Ingen tintede flater bak sitater per status. Alle sitater har samme markørstrek, så fargen ligger bare i statusordet og tegnet.
3. **Poengstripen:** formen er 09s, men tegnet med 01s statusspråk. Truffet er fylt mose, delvis er en oker omrissbit som er halvfylt, og mangler er en stiplet teglramme uten fyll. Høyden er 12 px i stedet for 18 px.
4. **Paneler og kort:** 09s hvite panel rundt veiviseren og de innrammede radene er fjernet. Sammenslåtte steg og «Slik fordeler kravene seg» er rader mellom hårfine linjer, som hos 01.
5. **Meldinger:** 09s tintede bokser (oker/tegl/blå) er erstattet med 01s rolige serif-setning mellom to linjer. Personvernvarselet er en linje med låsikon, ikke en blå boks.
6. **Knapper:** 01s knapper har innholdsbredde og 4 px radius. 09s knapper gikk over hele bredden, med 12 px radius og skygge. Deaktivert knapp er 01s flate `#E4DACB` uten stiplet kant.
7. **Score-blokken:** 09s «59 %» + «Match-score»-etikett er byttet mot 01s setning «Du er på 59 %.». Begrepet står i linjen under: «Match-score mot …».
8. **Stegindikator:** venstrejustert og inline (sirkel + etikett + hårfin linje), slik at den sitter i 01s redaksjonelle kolonne i stedet for midt på siden.
9. **Nedgraderingsmerknaden (FR-11):** 09 hadde den inline med varseltrekant. Her står den som sidenote i høyre marg, som hos 01.
10. **Må-/bør-merker:** 01 hengte dem i venstre marg, men der står innholdsfortegnelsen nå. Merkene står derfor inline foran statusordet (01s egen kompakte variant).

## Palett (01, uendret)

| Rolle | Hex | Kontrast |
|---|---|---|
| Papir (bakgrunn) | `#F6F1E9` | – |
| Felt | `#FFFDF9` | – |
| Blekk (tekst, primærknapp, stegsirkler) | `#2A2420` | ca. 14:1 |
| Dempet tekst | `#5E544B` | 6,6:1 |
| Linjer | `#D4C9BA` / `#E6DDD0` | dekor |
| Feltkant (normal) | `#8E806F` | 3,4:1 mot papir (UI-kant) |
| Sitatmarkering / fokusring | `#EEDFBF` | bak blekk |
| Aktivt TOC-punkt | `#ECE3D5` | blekk på den ca. 12:1 |
| Truffet (mose) | `#4A6536` | 5,8:1 |
| Delvis (oker) | `#7A5710` | 5,8:1 |
| Mangler (tegl) | `#8A3B2B` | 6,9:1 |
| Leire (lenker, tekstmarkør) | `#9A4A2E` | 5,5:1 |
| Deaktivert | `#E4DACB` med `#62584F` | 5,0:1 |
| Demobånd / eksempelmerke | `#EFE4CC` | blekk-tekst |
| Annotasjoner (ikke UI) | `#3E5468` på `#E9EEF2` / papir | ca. 7:1 |

## Typografi

- Serif: `Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Times New Roman', serif`. Scoren er 64 px (40–48 px i miniatyrer), trinnoverskriftene 48 px, inputoverskriften 46 px, ingressen 25 px, gruppetitlene 20–22 px, kravtitlene 22 px og sitatene 17 px kursiv. Georgias gammeldagse tall (59, 73) er beholdt fra 01.
- Grotesk: `'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif`. Brødtekst 15–17 px, etiketter 13–16 px. Ingen tekst under 13 px.

## Layout

- **Input (01, 02, 05):** 01s tospalte. Til venstre (120–520) står presentasjonen med fire prinsipper. Til høyre (640–1320) står 09s veiviser: stegindikator, åpent felt eller sammenslåtte rader, hjelpetekst, personvern og knapp.
- **Debrief (03):** 01s tre marger. Innholdsfortegnelsen fra 09 står i venstre marg, ett trinn står i lesekolonnen (ca. 70 tegn), og sidenotene står i høyre marg. Hvert trinn har en serif-setning som overskrift og en kort ingress i dempet serif. Så kommer status-linjen med blekkstrek, og kravene står som avsnitt.

## Hvordan FR-ene løses

- **FR-1:** «Lim inn CV her:» og «Lim inn annonse her:», tegnteller «x / 15 000 tegn» i hvert felt, hjelpeteksten «Bare en CV og en annonse per analyse». «Analyser» er deaktivert til begge felt har tekst (01 viser begge tilstander i annotasjonen). Ved for lang tekst får feltet teglkant og telleren blir tegl, «Teksten er for lang» vises, og knappen er deaktivert (04).
- **FR-2:** sammenslåtte steg beholder teksten. «Endre» åpner steget igjen. Etter «Ja» → «Analyser ny annonse» står «CV-en er beholdt» på CV-raden, og annonsefeltet er tomt (04). I UJ-1-flyten står «Annonsen er beholdt» når CV-en byttes.
- **FR-3:** «CV-en din sendes til Claude for analyse. Appen lagrer den ikke.» rett over «Analyser» i alle input-tilstander.
- **FR-7/8:** «Du er på 59 %.» er overskriften, og «Fikser du de 2 delvis truffede kravene, kan du nå 73 %.» er ingressen. Poengstripen og «6,5 av 11 poeng» viser regnestykket, og sidenoten «Slik er scoren regnet» forklarer vektene.
- **FR-9:** trinnene kommer i rekkefølgen truffet → delvis → mangler, med må før bør i hvert trinn. Hvert krav har merke, statusord og tegn, sitat og/eller «Forbedringshint».
- **FR-10:** variant 91 % i 03 med «Godt treff, klar til å søke?» og Ja/Nei. Spørsmålet vises ikke under 90 % (annotert i trinn 4). Etter Ja vises «Analyser ny annonse» (04).
- **FR-11:** «Erfaring med kundekontakt» er nedgradert og har hintet «Fant ikke belegg i CV-en for dette kravet». Sidenoten viser det oppdiktede sitatet «Kundebehandling i butikk». Oversikten har en sidenote om nedgraderingen.
- **FR-12/14/17:** setning i serif mellom to linjer der resultatet ellers ville stått. Feltene er fortsatt utfylt, og «Analyser» er tilgjengelig (04).
- **FR-13:** «Analyserer …» i knappen med spinner. «Analyser» og «Endre» er deaktivert mens analysen pågår (02).
- **FR-15/16:** «Demomodus – ingen API-nøkkel funnet» i båndet. «Bruk eksempel» står øverst i veiviseren. Resultatsiden er merket på tre steder: båndet, «Eksempeldata»-merket over scoren og den loddrette marglinjen (05).

## Score-regnestykket (FR-7, FR-8)

| # | Krav | Type | Status | Poeng | Maks |
|---|---|---|---|---|---|
| 1 | Bachelorgrad innen økonomi, IT eller tilsvarende | må | truffet | 2 | 2 |
| 2 | Beherske Excel | må | truffet | 2 | 2 |
| 3 | Kjennskap til SQL | bør | truffet | 1 | 1 |
| 4 | God skriftlig og muntlig fremstillingsevne | må | delvis | 1 | 2 |
| 5 | Erfaring med datavisualisering, gjerne Power BI | bør | delvis | 0,5 | 1 |
| 6 | Erfaring med kundekontakt (nedgradert, FR-11) | må | mangler | 0 | 2 |
| 7 | Interesse for energibransjen | bør | mangler | 0 | 1 |
| | **Sum** | | | **6,5** | **11** |

- Match-score: 6,5 ÷ 11 × 100 = 59,09 % → **59 %**
- Potensiell: delvis → truffet gir 6,5 + 1 + 0,5 = 8; 8 ÷ 11 × 100 = 72,73 % → **73 %**
- Variant etter Yvonnes egen redigering (krav 4, 5 og 6 truffet, krav 7 mangler fortsatt): 2+2+2+2+1+1+0 = 10; 10 ÷ 11 × 100 = 90,91 % → **91 %** ≥ 90, så spørsmålet vises. Det er ingen delvis truffede krav, så ingen potensiell score vises.
- Generatorskriptet kontrollerer at alle sitater står ordrett i CV-teksten (variantens sitater i den redigerte CV-en), og at «Kundebehandling i butikk» *ikke* gjør det. Tegntellerne (357, 426 og 433 tegn) er regnet fra eksempeltekstene.

## Svakheter og risiko

- Arver 09s svakhet: det tar flere klikk å se alle gapene, og den som vil skumme, må finne «Vis alt på én side».
- 01s rolige drakt demper veiviserens tydelighet. Uten fjordgrønn aksent er det bare blekk som skiller aktivt steg fra ferdig steg. Den doble ringen rundt aktivt steg må gjøre jobben, så det bør testes.
- Sidenotene i høyre marg forutsetter bred skjerm. Under ca. 1280 px må de flyttes inn under kravet.
- Rader uten ramme gjør at «Endre» og fordelingsradene ser mindre klikkbare ut enn i 09. Chevron og hover-tilstand må bære det.
- Inline må/bør-merker (fordi TOC står i venstre marg) gjør lesekolonnen litt tettere enn i 01.
- Systemfonter: Georgia og Segoe UI ser forskjellige ut på macOS og Linux.
- «Neste: Annonse» på steg 1 er en liten tilføyelse. 09 viste aldri steg 1 åpent, så knappen er utledet av 09s «Neste: …»-mønster.

## Impeccable-prinsipper som ble brukt

- **Operate-modus for input og Read-modus for debriefen:** kjente kontroller (stegindikator, tekstfelt, innholdsfortegnelse), og en lesekolonne på ca. 70 tegn for gjennomgangen.
- **Craft floor, «Refuse»:** ingen kicker eller etikett over overskrifter, ingen kort i kort (09s panel og radbokser er fjernet), ingen fargede venstrekanter på meldinger, ingen hero-metric-mal (scoren er en setning, ikke tall + etikett), ingen gradienter og ingen glass. Ikonene er tegnet i én strektykkelse (1,5).
- **Kontrast:** all tekst ≥ 4,5:1, og UI-kanter ≥ 3:1. Sekundærteksten er tonet varmt fra blekket, ikke grå.
- **Tilstander:** fokus (ring i markørfarge og tekstmarkør i leire), deaktivert, venter, feil, tom, for lang og demo. Rullefelt i paletten på avkuttede felt.
- **Lys modus valgt ut fra bruken:** en student som leser om sin egen CV ved pulten.
- **Avvik:** `impeccable context`-launcheren ble ikke kjørt, og PRODUCT.md og init ble hoppet over (oppdraget forbød det). Selvhostede fonter er erstattet av systemfont-stakker fordi oppdraget krever det.
