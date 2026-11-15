# Konsept 08: Markert annonse

## Idé

Resultatsiden viser selve annonseteksten, og kravene er markert direkte i den med tusj i tre statusfarger. Må-krav har i tillegg en tykk blekkstrek under. I margen ved siden av hver markering står status, må/bør-merke, sitatet fra CV-en og forbedringshintet, som merknader i et gjennomlest manus. Brukeren leser annonsen «med røntgenblikk». En klebrig sidekolonne har scoren og sammendraget sortert truffet → delvis → mangler, og må før bør. Nummeret på hvert krav viser plassen det har i den sorteringen.

## Palett

| Rolle | Hex |
|---|---|
| Papir (bakgrunn) | `#FBF8F1` |
| Ark / felt | `#FFFFFF` |
| Blekk (tekst, må-strek, primærknapp) | `#1F1B16` |
| Dempet tekst | `#5E574D` |
| Hårstrek | `#D9D1C3` |
| Feltkant | `#8A8172` |
| Truffet: tusj / blekk | `#BFE3B4` / `#1E5B33` |
| Delvis: tusj / skravur / blekk | `#FFE08A` / `#D9A520` / `#7A4E00` |
| Mangler: tusj / blekk | `#F9DCDC` / `#9E2A2B` |
| Deaktivert knapp | `#E7E1D6` med tekst `#5E574D` |

Status vises aldri med farge alene. **Truffet** = hel tusjflate, et fylt sirkelikon med hake og ordet «Truffet». **Delvis** = skrå skravur, et halvfylt sirkelikon og ordet «Delvis truffet». **Mangler** = stiplet ramme uten tusj, et stiplet sirkelikon med strek og ordet «Mangler». Må-krav har en tykk strek under og det fylte merket «MÅ-KRAV». Bør-krav har merket «BØR-KRAV» med bare kontur. All tekst står i blekk på lys tusj. Statusblekket har kontrast på 6,5–7:1 mot papiret.

## Typografi

- Annonsen, overskriftene og sitatene er satt i en redaksjonell serif: `Charter, 'Iowan Old Style', 'Sitka Text', Georgia, serif`. Sitatene står i kursiv mellom «».
- Grensesnittet, merknadene og hintene bruker systemets sans-serif: `'Segoe UI', system-ui, …`.
- Skala: 46–52 for scoreoverskriften, 30 for annonsetittelen, 18 for annonseteksten, 15–16 for merknadene og 13 som minimum.

## Layoutprinsipp

Artboardet er 1440 px bredt med 64 px marg. Resultatsiden har tre spalter: **annonseark** (620 px), **margmerknader** (340 px) og en **klebrig sidekolonne** (272 px). Hvert krav i annonsen ligger på en egen rad, og raden går på tvers av arket og margen med en hårstrek. En prikket lederlinje går fra markeringen til merknaden. Scoren står øverst som en setning: «CV-en din treffer 65 % av annonsen.» Rett under står den potensielle scoren, med setningen fra FR-8. Inputsiden har presentasjonen til venstre og to felt side om side til høyre.

## Hvorfor dette løser funksjonaliteten

- **Sporbarhet (FR-5, FR-11, SM-1):** Brukeren ser hvilken setning i annonsen som ble tolket som krav, og hvilket ordrett CV-sitat som svarer på den. Sitatkontrollen vises åpent: krav 8 hadde et sitat som ikke fantes i CV-en («Ledet et utviklingsteam på 4 personer»). Kravet står derfor som mangler, med hintet «Fant ikke belegg i CV-en for dette kravet».
- **Må/bør (FR-4):** Signalordene («krav», «må», «vi forventer», «et pluss», «gjerne») står synlige rett ved markeringen. Dermed kan brukeren selv kontrollere typen. Det umerkede kravet (førerkort) er forklart som bør-krav.
- **Rekkefølge (FR-9):** Sidekolonnen viser hele kravlisten i riktig rekkefølge og følger med når brukeren ruller. Kravnumrene 1–9 følger den sorterte rekkefølgen, så tusjmerkene i annonsen viser også rangen.
- **Godt treff (FR-10):** Varianten på 92 % viser «Godt treff, klar til å søke?» med Ja og Nei, og «Analyser ny annonse» etter Ja. I 04-tilstander er annonsefeltet tømt etterpå, mens CV-en står igjen.
- **Tilstander:** Inputsiden viser alle feltregler: tegnteller mot 15 000, «Teksten er for lang», og «Analyser» deaktivert når et felt er tomt eller teksten er for lang, med en forklaring ved siden av.

## Svakheter og risiko

- **Rekkefølgen i hoveddelen.** Annonsen står i dokumentrekkefølge, ikke sortert truffet → delvis → mangler. Sorteringen etter FR-9 finnes bare i sidekolonnen. Det må avklares om dette oppfyller FR-9, eller om det trengs en «sortert visning»-bryter.
- **Plassering av markeringen.** Modellen må returnere hvor i annonseteksten hvert krav står, eller så må appen finne det i etterkant. Det er ekstra arbeid utover PRD-en. Krav som står spredt i flere setninger, eller enten-eller-krav, er vanskelige å markere som én bit.
- **Lange annonser** gir en lang side, og den klebrige kolonnen må fungere uten mobilvisning (§5 krever ikke mobil).
- **Fonter.** Systemfontene varierer mellom maskiner. Charter finnes ikke på Windows, så Georgia blir reserven der.

## Score-regnestykket (FR-7 og FR-8)

| # | Krav | Type | Status | Poeng | Maks |
|---|---|---|---|---|---|
| 1 | Bachelorgrad innen IT, økonomi eller lignende | må | truffet | 2 | 2 |
| 2 | Kommunikasjon på norsk og engelsk | må | truffet | 2 | 2 |
| 3 | Python eller annet programmeringsspråk | bør | truffet | 1 | 1 |
| 4 | Erfaring med kundekontakt | bør | truffet | 1 | 1 |
| 5 | Førerkort klasse B (umerket) | bør | truffet | 1 | 1 |
| 6 | Databaser og SQL | må | delvis | 1 | 2 |
| 7 | Visualisering i Power BI eller lignende | bør | delvis | 0,5 | 1 |
| 8 | Prosjektarbeid i team (nedgradert av sitatkontrollen) | må | mangler | 0 | 2 |
| 9 | Kjennskap til energibransjen | bør | mangler | 0 | 1 |
| | **Sum** | | | **8,5** | **13** |

- **Match-score:** 8,5 ÷ 13 × 100 = 65,38 → **65 %**
- **Potensiell score:** krav 6 og 7 regnes som truffet (+1 og +0,5), og krav som mangler, telles ikke med. Det gir 10 ÷ 13 × 100 = 76,92 → **77 %**. Teksten blir: «Du er på 65 %. Fikser du de 2 delvis truffede kravene, kan du nå 77 %.»
- **Variant ≥ 90 %** (Yvonne har redigert CV-en): krav 6, 7 og 8 er truffet med nye ordrette sitater, og krav 9 mangler fortsatt. Det gir 12 ÷ 13 × 100 = 92,31 → **92 %**. Ingen krav er delvis truffet, så potensiell score vises ikke, mens «Godt treff, klar til å søke?» vises.

Alle sitatene finnes ordrett i CV-utdraget i feltet (01/02). Sitatet «Ledet et utviklingsteam på 4 personer» finnes ikke der, og det er derfor kravet ble nedgradert.

## Impeccable-prinsipper som er brukt

- **Modus Operate/Read:** presisjon og ro i stedet for effekter. Merkesystemet er den eneste uttrykksfulle detaljen.
- **Ikke farge alene:** status vises med både form (flate, skravur, stiplet ramme), ikon og ord.
- **Avvist mønster:** «hero-metric»-malen og like store kort som sidestruktur. Scoren står som en setning, og kravene er notater i en tekst, ikke kort. Det er ingen etiketter over overskriftene, ingen farget venstrekant, ingen gradienttekst og ingen glass-effekt.
- **Tegnede ikoner** med lik strek, ikke emoji eller Unicode-glyfer.
- **Lys modus valgt ut fra bruken:** studenten leser og redigerer tekst ved PC-en, og det redaksjonelle papiret passer til det.
- **Avvik:** craft-floor ber om en egen hostet skrift som display-stemme. Oppdraget krever systemfonter, så serif-stakken er valgt etter karakter. Init og PRODUCT.md ble hoppet over, slik oppdraget sa.
