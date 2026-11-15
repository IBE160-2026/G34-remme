# Konsept 02 – Side om side / Bevisføring

## Idé

Resultatsiden er en delt visning, som et godt diff-verktøy: CV-teksten med linjenummer til venstre og kravlista til høyre. Hvert sitat er markert direkte i CV-teksten og har samme nummer som kravet det beviser. En tynn linje i midtfeltet kobler dem sammen. Brukeren trenger ikke stole på appen, for beviset står i hennes egen tekst. Krav som ikke har noe sitat, står samlet under CV-en i «Ikke funnet i CV-en», slik at også det som mangler, blir synlig på CV-siden.

## Filer

| Fil | Innhold |
|---|---|
| `01-landingsside.svg` | Inputsiden: kort presentasjon (sitater som bevis, aldri finn på erfaring, må-krav teller dobbelt), to felt side om side med linjenummer, hjelpetekst, personvernvarsel, «Analyser» deaktivert (annonsefeltet er tomt og har fokus), avsenderblokk i bunnteksten |
| `02-analyserer.svg` | FR-13: begge feltene utfylt, knappen viser «Analyserer …» med spinner og er deaktivert |
| `03-resultat-debrief.svg` | Resultatsiden (1440 × 1986): score, potensiell score, poengstripe, delt visning med koblinger, nedgradert krav, variant på 95 % med «Godt treff, klar til å søke?» Ja/Nei |
| `04-tilstander.svg` | FR-12, FR-14, FR-1 (for lang), FR-17 og etter Ja → «Analyser ny annonse» (annonsefeltet tømt, CV-en beholdt) |
| `05-demomodus.svg` | FR-15/16: demobanner med «Bruk eksempel», felt merket «Eksempeldata», og resultatsiden med skravert merke for eksempeldata |

## Palett

| Rolle | Hex | Merknad |
|---|---|---|
| Bakgrunn | `#F2F4F7` | kjølig grå |
| Flate | `#FFFFFF` | ruter og felt |
| Tekst | `#151A22` | ca. 17:1 på hvitt |
| Sekundærtekst | `#434D5E` / `#5C6575` | ca. 8,8:1 / 5,9:1 på hvitt |
| Linjer | `#CDD3DC`, `#E3E7EC` | |
| Linjenummer-renne | `#F6F7F9` | |
| Handling (knapp) | `#1F3B70` | hvit tekst ca. 11:1 |
| Fokus | `#2F5BD3` | |
| Truffet | tekst `#17683F`, markering `#D9EEE1`, strek `#2A7F52` | heltrukken understrek, fylt sirkel med hake |
| Delvis truffet | tekst `#7A4E00`, markering `#FAE9C3`, strek `#A87410` | stiplet understrek, halvfylt sirkel, prikkmønster |
| Mangler | tekst `#A3221B`, markering `#FBE2DE`, strek `#B8362F` | ingen markering i CV-en, sirkel med strek, skravering |
| Demo | `#E7ECF7` + diagonal skravering | |
| Deaktivert | flate `#E4E7EC`, tekst `#525B69` (ca. 5,9:1) | |

Status kan leses uten farge: ikonformen (fylt / halv / tom med strek), strektypen (heltrukken / stiplet / ingen), mønsteret i poengstripa (fylt / prikket / skravert) og tekstetiketten står alltid sammen.

## Typografi

- UI: `'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif`. Skala 13 / 14 / 15 / 16 / 20 / 32 / 60 px, vekt 400 / 600 / 650 / 700.
- Kildetekst: `'Cascadia Mono', Consolas, 'SF Mono', Menlo, monospace`, 13 px. Brukes bare på det som faktisk er rå tekst eller måltall: CV-en, annonsen, sitatene, linjenummer, tegnteller og kravnummer. Det er brukerens egen tekst, ordrett, ikke pynt. Faste tegnbredder (`textLength`) gjør at markeringene ligger nøyaktig over sitatene.
- Minste tekst er 13 px.

## Layoutprinsipp

- Rutenett på 1440 px med 40 px marg. Inputsiden har to like kolonner (660 + 40 + 660), slik at CV og annonse også står side om side før analysen.
- Resultatsiden: CV-rute 660 px, midtfelt 70 px for koblingene, kravrute 630 px. Over dem er et resultatbånd i full bredde.
- Kravlista er gruppert truffet → delvis truffet → mangler, med må-krav før bør-krav i hver gruppe. Kravene nummereres 1–10 i visningsrekkefølgen, og nummeret går igjen i CV-margen, i poengstripa og i «Ikke funnet».
- Må-krav har mørk, fylt merkelapp, og bør-krav har merkelapp med kantlinje. De skilles altså også uten farge.

## Hvordan konseptet løser funksjonaliteten

- **FR-5/FR-11 (sitat og sitatkontroll):** Sitatet vises to steder, markert i CV-en og gjentatt i kravet. Det nedgraderte kravet (8, Førerkort klasse B) viser det avviste sitatet med gjennomstreking og teksten «finnes ikke ordrett i CV-en – nedgradert av sitatkontrollen», og hintet «Fant ikke belegg i CV-en for dette kravet».
- **FR-6 (hint):** Hintene viser til linjenummer i CV-en («Excel-oversiktene i linje 18 …»). Delvis truffede krav står like ved sitatet hintet handler om. Krav som mangler, sier rett ut at det ikke finnes noe å formulere om.
- **FR-7/FR-8:** Scoren står øverst til venstre, og den potensielle scoren står rett under, med FR-8-setningen. Poengstripa viser formelen: hvert krav er et felt der må-krav er dobbelt så bredt som bør-krav, og fyllingen viser poengene brukeren har.
- **FR-9:** Rekkefølgen og må-før-bør er gjennomført. Alle delvis truffede krav og krav som mangler har hint.
- **FR-10:** Spørsmålet vises bare i varianten med 95 %. Hvordan Ja og Nei virker, står under knappene. Tilstanden etter Ja vises i 04.
- **FR-1/2/3/13/14/12/15/16/17:** Se 01, 02, 04 og 05. Feltene er fortsatt utfylt i alle tilstandene der PRD-en krever det.

## Score-regnestykket (FR-7)

Hovedeksempel: Yvonne mot «Trainee – digitalisering, Romsdal Energi AS»

| # | Krav | Type | Status | Poeng | Maks |
|---|---|---|---|---|---|
| 1 | Bachelorgrad innen IT, økonomi eller tilsvarende | må | truffet | 2 | 2 |
| 2 | Gode kommunikasjonsevner på norsk og engelsk | må | truffet | 2 | 2 |
| 3 | Erfaring fra prosjektarbeid i team | må | truffet | 2 | 2 |
| 4 | Kjennskap til SQL | bør | truffet | 1 | 1 |
| 5 | Erfaring med kundekontakt | bør | truffet | 1 | 1 |
| 6 | Erfaring med dataanalyse | må | delvis | 1 | 2 |
| 7 | Programmering i Python | bør | delvis | 0,5 | 1 |
| 8 | Førerkort klasse B (nedgradert av sitatkontrollen) | må | mangler | 0 | 2 |
| 9 | Erfaring med Power BI | bør | mangler | 0 | 1 |
| 10 | Interesse for energibransjen | bør | mangler | 0 | 1 |

- Oppnådd: 2+2+2+1+1+1+0,5 = **9,5**. Maks: 5 må × 2 + 5 bør × 1 = **15**.
- Match-score: 9,5 ÷ 15 × 100 = 63,33 → **63 %**.
- Potensiell score (delvis → truffet: krav 6 +1, krav 7 +0,5): 11 ÷ 15 × 100 = 73,33 → **73 %**.
- Siden nedgraderingen skjer før beregningen, teller krav 8 som 0 poeng.

Variant: samme CV mot «Trainee IT-drift, Molde kommune»

- 4 må-krav truffet (8) + 1 bør-krav truffet (1) + 1 bør-krav delvis (0,5) = 9,5 av 10 → **95 %** (≥ 90 %, så spørsmålet vises).
- Potensiell score: 10 ÷ 10 → **100 %**.

Alle sitater finnes ordrett i CV-utdraget. Generatoren sjekker dette med `assert`, og den regner også ut scorene.

## Svakheter og risiko

- **Bredde:** delt visning krever bred skjerm. Det er greit for v1, som bare er for PC, men visningen må stables på smale vinduer.
- **Koblingslinjer:** fordi kravlista er sortert etter status og CV-en etter linje, krysser linjene hverandre. Med 15–20 krav kan midtfeltet bli rotete. Da kan linjene vises bare for kravet man holder musepekeren over eller har valgt, mens nummerene alltid står.
- **Lengde:** lange CV-er gjør at CV-ruten og kravlista kommer ut av takt. I appen bør CV-ruten bli stående (sticky) og rulle til riktig linje når man velger et krav.
- **Monospace:** CV-teksten i monospace leses som «rå tekst». Det er bevisst, men kan føles teknisk for noen studenter.
- **Krav som mangler:** de har ikke noe sted i teksten. Det løses med blokken «Ikke funnet i CV-en», men det er det svakeste punktet i metaforen.
- **Sitater som går over flere linjer:** de må markeres over flere linjer. Det er ikke vist i skissen.

## Impeccable-prinsipper som ble brukt

- **Modus:** inputsiden og resultatsiden er Operate. Ambisjonen ligger i presisjon og tilbakeholdenhet, ikke pynt, og kjente mønstre (diff, linjenummer, renne) får plass fordi brukeren skal gjøre en oppgave.
- **Status uten farge alene:** form, strektype, mønster og etikett står alltid sammen med fargen. Kontrastkravene i WCAG AA er sjekket for tekst og knapper.
- **Avvist fra craft-floor:** ingen småtittel over overskriftene, ingen like kort med ikon + overskrift + tekst (prinsippene er en enkel liste), ingen hero-metric-mal med støttetall i kort, ingen fargekant på venstre side, ingen gradienttekst, glass eller harde skygger, ingen emoji som ikoner. Alle ikonene er egne SVG-strøk med samme tykkelse.
- **Monospace bare der det er data:** CV-tekst, sitater, linjenummer og tegnteller, ikke som «teknisk» kostyme.
- **Hierarki gjennom vekt og størrelse:** scoren er det eneste store tallet. Resten bruker trinnene 13–20 px og vekten.
- **Tekst fra produktet:** alle de eksakte PRD-tekstene er brukt ordrett. Knappene sier hva de gjør, og feilmeldingene sier hva som skjedde.
- **Avvik:** Impeccable sin `context`-launcher ble ikke kjørt (oppdraget forbød installasjon og init). `craft-floor.md` ble lest direkte. Krav om egen, selvhostet skrift ble overstyrt av oppdraget, som krever systemfonter.
