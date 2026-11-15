# Konsept 12 – Kapitler

## Idé

Konseptet er en hybrid av 01 og 09: utseendet til «Rolig rådgiver» og flyten til «Ett steg om gangen». Debriefen er bygd som en kort fagbok om CV-en din. Innholdsfortegnelsen står til venstre (Oversikt, Kapittel 1 · Dette er bra, Kapittel 2 · Dette kan bli tydeligere, Kapittel 3 · Dette mangler), med prikkede ledelinjer og antall krav der en bok har sidetall. Ett kapittel vises om gangen. I lesekolonnen står det annonsen ber om, og i margen står det CV-en din sier: sitatet med 01s markeringsfarge og forbedringshintet. «Forrige kapittel» og «Neste kapittel» står nederst, med en kolumnetittel i kursiv i midten («Kapittel 2 av 3 · side 3 av 4»). Inputen har tre deler (Del 1 CV, Del 2 Annonse, Del 3 Analyser) og står loddrett som en innholdsfortegnelse, med et «Forord» som presenterer appen.

## Hva er tatt fra hvilket konsept

| Fra 01 «Rolig rådgiver» (utseende) | Fra 09 «Ett steg om gangen» (funksjon) |
|---|---|
| Palett (papir, blekk, mose, oker, tegl), Georgia + Segoe UI | Trinnvis input, der ferdige deler slås sammen til én linje med «Endre» |
| Overskriften er svaret: «Du er på 59 %.», med potensiell score som ingress | Trinnvis debrief: Oversikt → Dette er bra → Dette kan bli tydeligere → Dette mangler |
| Tredelt margsystem og sidenoter i høyre marg | Innholdsfortegnelse til venstre, «Vis alt på én side» og «Endre CV eller annonse» |
| Sitatmarkering `#EEDFBF` bak kursiv serif | Poengstripen (må-krav er dobbelt så brede), nå i 01-palett |
| Må-krav/Bør-krav-merker (fylt kontra omrisset blekk) | Tegnteller «x / 15 000 tegn», eksempeldata, 7 krav, 59 % → 73 %, variant 91 % |
| Meldinger som rolig serif-setning mellom to hårfine linjer | Store fullbredde-knapper nederst i hvert panel |
| Loddrett marglinje «EKSEMPELDATA · IKKE DIN EGEN TEKST» | Eksempeldata-merker på feltene i demomodus |

Nytt i 12: kapittelmetaforen med kolumnetittel og sidetall, delene som innholdsfortegnelse i stedet for en stegindikator, todelingen «Annonsen: …» (kolonne) mot «Fra CV-en din» (marg), en innholdsfortegnelse som venter på sidetall mens appen analyserer, og knappen «Lim inn redigert CV» på slutten av siste kapittel.

## Palett

| Rolle | Hex | Kontrast mot papir |
|---|---|---|
| Papir (bakgrunn) | `#F6F1E9` | – |
| Felt | `#FFFDF9` | – |
| Blekk (tekst, primærknapp) | `#2A2420` | ca. 14:1 |
| Dempet tekst, plassholder | `#5E544B` | 6,6:1 |
| Linjer | `#D4C9BA` / `#E6DDD0` | dekor |
| Sitatmarkering | `#EEDFBF` | blekk-tekst over |
| Truffet (mose) | `#4A6536` | 5,8:1 |
| Delvis truffet (oker) | `#7A5710` | 5,8:1 |
| Mangler (tegl) | `#8A3B2B` | 6,9:1 |
| Deaktivert knapp | `#E4DACB` med `#62584F` | 5,0:1 |
| Demobånd og eksempeldata-merke | `#EFE4CC` | blekk-tekst |
| Annotasjoner (ikke UI) | `#3E5468` på `#E9EEF2` | ca. 7:1 |

Sekundærknapper har kant i blekk, og «Forrige kapittel» har kant i `#5E544B`, så kontrollkantene er over 3:1. Status vises aldri bare med farge: hver status har eget ord, eget tegn (fylt, halvfylt eller tom sirkel) og eget kapittel.

## Typografi

- Serif: `Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Times New Roman', serif`. Brukes til scoren (68 px), kapitteloverskrifter (30 px), kravtitler (22 px), sitater (16 px kursiv), «Del 1»-tall, kapittelnummer og kolumnetittel.
- Grotesk: `'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif`. Brukes til brødtekst (15–17 px), etiketter, knapper og antallet i innholdsfortegnelsen. Antallet står i grotesk fordi Georgias minuskeltall gjør at «0 krav» kan leses som «o krav».
- Ingen tekst er under 13 px.

## Layout

- **Input (01, 02, 05):** 01s tokolonne. Venstre side (120–520) har overskriften, forordet og «Innhold i gjennomgangen», som viser studenten de tre kapitlene før hun starter. Høyre side (640–1320) har delene. Bare én del er åpen om gangen. Når CV-en limes inn, slås del 1 sammen og del 2 åpnes, uten ekstra klikk. Personvernvarselet og «Analyser» står alltid synlig nederst.
- **Resultat (03):** innholdsfortegnelsen (120–370), lesekolonnen (420–880) og margen (930–1320). Kapitteloverskriften går over både kolonnen og margen, som et kapittelstart i en bok. Hvert krav har merke og status → kravtittel → «Annonsen: «…»» i kolonnen, og «Fra CV-en din» + sitat → «Forbedringshint» i margen. Navigasjonen nederst har samme plassering på alle sider.

## Funksjonalitet og klikk sammenlignet med 09

- Til et bestemt kapittel: ett klikk i innholdsfortegnelsen (som i 09).
- Gjennom hele debriefen: «Neste kapittel» × 3 (som i 09).
- Alt på én gang: «Vis alt på én side» ligger fast under innholdsfortegnelsen (som i 09), og markøren følger med når man ruller.
- Ny runde etter redigering (UJ-1): «Lim inn redigert CV» → del 1 åpnes med teksten markert → lim inn → «Analyser». Det er 2 klikk og én innliming. 09 brukte 3 klikk («Endre CV eller annonse» → «Endre» → «Analyser»). Veien via «Endre CV eller annonse» finnes fortsatt.
- Input: ingen «Neste»-knapp mellom delene. Innlimingen åpner neste del.

## Slik løses FR-ene

- **FR-1:** «Lim inn CV her:» og «Lim inn annonse her:», «Bare en CV og en annonse per analyse» under overskriften, tegnteller i hvert felt. «Analyser» er deaktivert med en grunn ved siden av (01, annotert). For lang tekst: rød kant, rød teller «15 482 / 15 000 tegn», «Teksten er for lang» og deaktivert knapp (04).
- **FR-2:** sammenslåtte deler beholder teksten, og «Endre» åpner dem igjen. Etter «Analyser ny annonse» står «CV-en er beholdt» på del 1, og annonsefeltet er tomt (04).
- **FR-3:** låseikon + «CV-en din sendes til Claude for analyse. Appen lagrer den ikke.» rett over «Analyser» i alle input-tilstander.
- **FR-7/8:** «Du er på 59 %.» + «Fikser du de 2 delvis truffede kravene, kan du nå 73 %.». Poengstripen og sidenoten «Slik er scoren regnet» viser regnestykket.
- **FR-9:** kapitlene kommer i rekkefølgen truffet → delvis → mangler, og innenfor hvert kapittel kommer må-krav før bør-krav. Truffet og delvis truffet har sitat, og delvis truffet og mangler har hint. «Vis alt på én side» beholder rekkefølgen.
- **FR-10:** varianten med 91 % har «Godt treff, klar til å søke?» mellom to blekklinjer med Ja/Nei og forklaring. Under 90 % vises spørsmålet ikke. 04 viser «Ja» → «Analyser ny annonse».
- **FR-11:** kundekontakt har hintet «Fant ikke belegg i CV-en for dette kravet» og en margnote med varseltegn, «Nedgradert av sitatkontrollen», med det oppdiktede sitatet. Oversikten viser til kapittel 3.
- **FR-12/14/17:** meldingen står der kapitlene ellers ville kommet, mellom to hårfine linjer, og feltene er fortsatt utfylt (04).
- **FR-13:** delene er låst, og «Endre» er deaktivert. Knappen viser «Analyserer …», og innholdsfortegnelsen står klar med «…» i stedet for sidetall (02).
- **FR-15/16:** demobånd med «Demomodus – ingen API-nøkkel funnet» og README-henvisning, og «Bruk eksempel» i fullbredde. Delene har merket «Eksempeldata». Resultatet er merket tre steder: båndet, merket over scoren og den loddrette margteksten (05).

## Score-regnestykket (FR-7, FR-8)

| # | Krav | Type | Status | Poeng | Maks |
|---|---|---|---|---|---|
| 1 | Bachelorgrad innen økonomi, IT eller tilsvarende (enten-eller, ett krav) | må | truffet | 2 | 2 |
| 2 | Beherske Excel | må | truffet | 2 | 2 |
| 3 | Kjennskap til SQL | bør | truffet | 1 | 1 |
| 4 | God skriftlig og muntlig fremstillingsevne | må | delvis | 1 | 2 |
| 5 | Erfaring med datavisualisering, gjerne Power BI | bør | delvis | 0,5 | 1 |
| 6 | Erfaring med kundekontakt (nedgradert, FR-11) | må | mangler | 0 | 2 |
| 7 | Interesse for energibransjen | bør | mangler | 0 | 1 |
| | **Sum** | | | **6,5** | **11** |

- Match-score: 6,5 ÷ 11 × 100 = 59,09 % → **59 %**.
- Potensiell score: delvis → truffet gir 6,5 + 1 + 0,5 = 8; 8 ÷ 11 × 100 = 72,73 % → **73 %**. Krav som mangler, telles ikke med.
- Variant: krav 4, 5 og 6 truffet etter Yvonnes egen redigering, krav 7 mangler fortsatt: 2+2+1+2+1+2+0 = 10; 10 ÷ 11 × 100 = 90,91 % → **91 %** ≥ 90 %, så spørsmålet vises. Ingen krav er delvis truffet, så ingen potensiell score vises.
- Sitatene er ordrette delstrenger av eksempel-CV-en fra 09. Tellerne 357 og 426 tegn er gjenbrukt fra 09.

## Svakheter og risiko

- Hintet står i margen. Det er det viktigste studenten skal handle på (SM-5), og noen kan lese margen som noe ekstra. Det demper vi med grotesk i blekk, 15 px og en okerfarget etikett. Under ca. 1280 px må margen flyttes inn under kravet.
- Kapittelmetaforen («side 3 av 4», «Forord») kan virke pyntet for den som bare vil ha tallet. Oversikten svarer likevel på side 1.
- Innholdsfortegnelsen med ledelinjer er smal (250 px). Lengre kapitteltitler eller oversettelser vil ikke få plass på én linje.
- Når en del slås sammen automatisk ved innliming, kan det overraske. Fokus må flyttes tydelig, og «Endre» må nås med tastatur. Dette bør testes i SM-5.
- Systemfonter: Georgia og Segoe UI ser ulike ut på macOS og Linux. Georgias minuskeltall i «Del 1» og kapittelnummer er tilsiktet, men tall i data står i grotesk.

## Impeccable-prinsipper

- **Mode:** inputen er Operate (kjente kontroller, én del om gangen), og debriefen er Read (dokumentform, lesekolonne på ca. 60–70 tegn). Signaturgrepet er margsystemet fra fagbøker brukt som innholdsfortegnelse og marginalia, ikke dekor.
- **Craft floor «Refuse»:** ingen kicker over overskriftene. «Kapittel 2 · Dette kan bli tydeligere» er én overskriftslinje, og nummeret er med fordi rekkefølgen betyr noe for leseren. Ingen kort i kort, ingen hero-metric-fliser, ingen gradienttekst, ingen fargede venstrekanter og ingen glass. Ikonene er tegnet som SVG i én strektykkelse (1,5), ikke emoji eller unicode.
- **Verify:** all tekst ≥ 13 px og ≥ 4,5:1, kontrollkanter ≥ 3:1. Tilstandene som er tegnet: deaktivert, venter, feil, tom, for lang og demo. Plassholder og markør er tegnet i paletten. Alle filene er rendret i headless Chrome og kontrollert visuelt.
- **Farge med jobb:** blekk er den eneste aksentfargen. De tre statusfargene er bare brukt på status.
- **Avvik:** `impeccable context`-launcheren ble ikke kjørt, og PRODUCT.md/init ble hoppet over (etter oppdraget). Det ble brukt systemfont-stakker i stedet for selvhostede fonter, fordi oppdraget krever det.
