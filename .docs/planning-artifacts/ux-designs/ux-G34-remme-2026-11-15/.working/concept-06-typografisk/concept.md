# Konsept 06: Typografisk / sveitsisk brutal

## Idé

Resultatet skal leses som en eksamenskarakter: ett enormt tall (360 px) øverst og en nummerert kravtabell under, uten pynt. Siden er bygd av svart tekst, hvite flater og streker. Rødt brukes bare der noe krever handling eller stopper deg: «Analyser», «Mangler», sitatkontrollen og 90 %-grensen. Ærligheten ligger i strukturen: hvert treff har sitatet sitt i monospace i samme rad, så beviset står rett ved påstanden.

## Palett

| Rolle | Hex | Kontrast mot #FFFFFF |
|---|---|---|
| Blekk (tekst, streker, truffet) | `#0A0A0A` | 19,8:1 |
| Papir | `#FFFFFF` | – |
| Signal (handling, mangler, kontroll) | `#D6001C` | 5,6:1 (hvit tekst på rød: 5,6:1) |
| Sekundærtekst | `#595959` | 7,0:1 |
| Deaktivert flate | `#EDEDED` (tekst `#595959`, 5,9:1) | – |

## Typografi

- **Sans** (alt UI og scoren): `'Helvetica Neue', Helvetica, Arial, 'Liberation Sans', sans-serif`. Scoren er 360 px bold med -18 tracking (cirka -0,05 em). Overskrifter er 40–76 px bold med negativ tracking, brødtekst 15–17 px.
- **Mono** (bare data: CV-tekst i feltene, sitater, tegnteller, regnestykket, radnumre): `'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace`. Monospace betyr at teksten er «ordrett fra CV-en», ikke at noe er «teknisk».
- Minste tekst er 13 px.

## Layoutprinsipp

- Artboard 1440 px, marger på 80 px, 1280 px innhold i 12 kolonner (88 px kolonne, 20 px gutter). Feltene ligger på 6+6 kolonner. Scoren tar kolonne 1–6, og forklaringen tar kolonne 7–12.
- Kravtabellen har kolonnene Nr | Status | Type | Krav | Sitat | Forbedringshint. Statusgruppene skilles med fulle svarte bånd (rødt bånd for Mangler), radene med 1 px streker og tabellen med 3 px topp- og bunnstrek.
- Ingen skygger, ingen avrundede hjørner, ingen kort. Status vises med en tegnet firkant (fylt / halvfylt / rød kontur) og ord, så fargen aldri er eneste bærer. MÅ er et fylt merke og BØR et merke med kontur.
- Scoreskalaen 0–100 har svart fyll opp til match-scoren, skravering opp til potensiell score og en rød strek ved 90 %. Den viser hvor langt det er til «Godt treff», uten en dekorativ måler.
- Meldinger (FR-12, FR-14, FR-1, FR-17) står alltid på samme sted, over «Analyser», med en rød strek foran.

## Hvordan konseptet løser funksjonaliteten

- **FR-1/FR-3:** Feltetikettene, hjelpeteksten og personvernvarselet står ordrett. Tegntelleren «x / 15 000 tegn» i hvert felt gjør grensen synlig før den brytes. Deaktivert «Analyser» er grå med en diagonal strek, og aktiv er rød. På 01 er CV-en limt inn og annonsefeltet tomt, så knappen er deaktivert.
- **FR-7/FR-8/FR-9:** Scoren står øverst, med regnestykket (`7,5 av 13 poeng × 100 = 58 %`) rett ved siden av. Potensiell score står med PRD-ens setningsmønster. Tabellen er sortert truffet → delvis → mangler, med må før bør. Alle delvis- og mangler-rader har hint.
- **FR-11:** Rad 07 viser det avviste sitatet gjennomstreket, med merket «Nedgradert av sitatkontrollen» og hintet «Fant ikke belegg i CV-en for dette kravet». Kontrollen blir dermed synlig og troverdig.
- **FR-10:** Spørsmålet vises ikke under 90 % (det står en merknad om det). Varianten på 92 % viser «Godt treff, klar til å søke?» med Ja/Nei. 04 viser Ja → «Analyser ny annonse» → annonsefeltet tømt og CV-en beholdt.
- **FR-2:** Resultatsiden viser at feltene fortsatt er utfylt, og har «Analyser» klar for neste runde.
- **FR-13:** Et svart statusfelt med «Analyserer …» og «Vanligvis 15–30 sekunder» (§5). Feltene er dempet og knappen låst.
- **FR-15/16/17:** Et svart demobanner i full bredde, «Bruk eksempel» som knapp med kontur, og et rødt merke «Eksempeldata – fiktiv CV og annonse, ikke din egen tekst» øverst og nederst på resultatsiden. Resultatet har samme oppbygning som en ekte analyse.

## Svakheter og risiko

- Det store tallet kan føles som en dom. 58 % i 360 px er brutalt for en student som allerede er usikker. Det dempes av at «Truffet» kommer først og at potensiell score står like ved, men det bør testes (SM-5).
- Med Helvetica/Arial som systemfont blir det sveitsiske preget avhengig av hvilke fonter maskinen har. På Windows blir det Arial, som er mindre presist.
- Tabellen med 6 kolonner er tett. Lange krav og hint gir høye rader, og den fungerer ikke på mobil (ikke et krav i v1).
- Tikkstripen i ventetilstanden kan leses som fremdrift. I implementasjonen bør den være en løpende, ubestemt animasjon, ikke en prosent.
- Eksempeldataene i demomodus er de samme fiktive Yvonne-dataene som i UJ-1. I produktet kan det være andre fiktive data.

## Score-regnestykket (FR-7, FR-8)

| # | Krav | Type | Status | Poeng | Maks |
|---|---|---|---|---|---|
| 01 | Bachelorgrad i økonomi, IT eller tilsvarende | må | truffet | 2 | 2 |
| 02 | Excel eller andre verktøy for dataanalyse | må | truffet | 2 | 2 |
| 03 | Kjennskap til SQL | bør | truffet | 1 | 1 |
| 04 | Kommunikasjon norsk og engelsk, muntlig og skriftlig | må | delvis | 1 | 2 |
| 05 | Prosjektarbeid i smidige team | må | delvis | 1 | 2 |
| 06 | Interesse for energi og bærekraft | bør | delvis | 0,5 | 1 |
| 07 | Budsjett eller økonomistyring (nedgradert av FR-11) | må | mangler | 0 | 2 |
| 08 | SAP eller annet ERP-system | bør | mangler | 0 | 1 |
| | **Sum** | | | **7,5** | **13** |

- Match-score: 7,5 ÷ 13 × 100 = 57,69 → **58 %**
- Potensiell score (04–06 som truffet): (2+2+1+2+2+1+0+0) = 10 ÷ 13 × 100 = 76,92 → **77 %**
- Variant etter revidert CV (Yvonne har formulert om eksisterende innhold, slik at 04, 05, 06 og 07 er truffet med sitater som finnes ordrett, og 08 fortsatt mangler): 12 ÷ 13 × 100 = 92,31 → **92 %**, altså ≥ 90 %, og spørsmålet vises. Ingen delvis truffede krav, så ingen potensiell score.

Alle sitater i 01–06 finnes ordrett i CV-utdraget i feltet. Sitatet i 07 («Ansvarlig for budsjettet i linjeforeningen») finnes ikke, fordi CV-en sier «Kasserer i linjeforeningen, 2025–2026». Derfor blir kravet nedgradert.

## Impeccable-prinsipper brukt

- Skillen ble lastet. Launcheren `impeccable context` ble ikke kjørt (den laster ned en binærfil). Det finnes ingen PRODUCT.md eller DESIGN.md. Craft-floor er lest og brukt.
- **Modus:** Operate (inputsiden har en kort Persuade-innledning). Presisjon og tilbakeholdenhet foran uttrykk.
- **Briefen vinner:** sveitsisk stil med systemfonter er fastsatt i oppdraget. Derfor er Helvetica-stakken brukt bevisst, og det store tallet brukes selv om skillen advarer mot hero-metric-malen. Tallet er her selve produktet.
- **Unngått:** like kort med ikon og overskrift, eyebrow- og kicker-etiketter, gradienttekst, skygger og glass, farget venstrekant over 1 px på kort (sitatstreken er 2 px i en tabellcelle, og meldingsstreken er et eget element), emoji som ikoner (status er tegnede SVG-firkanter), ringer og sparklines.
- **Monospace bare for data** (sitater, telling, regnestykke), ikke som kostyme.
- **Kontrast ≥ 4,5:1** for all tekst, og sekundærtekst er nøytral `#595959` på hvitt.
- **Tilstander:** deaktivert, venting, feil, tom, for lang og demo er tegnet eksplisitt. Kopien bruker produktets egne, ordrette tekster.
