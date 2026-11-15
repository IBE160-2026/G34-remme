# Konsept 01 – Rolig rådgiver

## Idé

Appen oppfører seg som en rolig studieveileder som har lest CV-en din, ikke som et dashbord. Inputsiden er en kort, redaksjonell presentasjon med to tekstfelt, og resultatsiden leses som en kort rapport: overskriften er selve svaret («Du er på 54 %.»), ingressen er den potensielle scoren, og kravene følger som avsnitt med sitatene markert som understreket tekst fra din egen CV. Margene brukes som i en fagbok: må/bør-merker henger i venstre marg, og sitatkontrollen kommenterer i høyre marg.

## Palett

| Rolle | Hex | Kontrast mot papir |
|---|---|---|
| Papir (bakgrunn) | `#F6F1E9` | – |
| Felt (tekstområder) | `#FFFDF9` | – |
| Blekk (tekst, primærknapp) | `#2A2420` | ca. 14:1 |
| Dempet tekst | `#5E544B` | 6,6:1 |
| Linjer | `#D4C9BA` / `#E6DDD0` | dekor |
| Sitatmarkering | `#EEDFBF` | bak blekk-tekst |
| Truffet (mose) | `#4A6536` | 5,8:1 |
| Delvis truffet (oker) | `#7A5710` | 5,8:1 |
| Mangler (tegl) | `#8A3B2B` | 6,9:1 |
| Leire (lenker, eksempeldata) | `#9A4A2E` | 5,5:1 |
| Deaktivert knapp | `#E4DACB` med `#62584F` | 5,0:1 |
| Demobånd | `#EFE4CC` | blekk-tekst |
| Annotasjoner (ikke UI) | `#3E5468` på `#E9EEF2` | – |

Status skilles aldri bare med farge: hver status har eget ord, egen overskrift og eget tegn (fylt, halvfylt, tom sirkel).

## Typografi

- Overskrifter, score og sitater: serif, `Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Times New Roman', serif`. Scoren 64–72 px, seksjoner 30 px, kravtitler 22 px, sitater 17 px kursiv.
- Brødtekst og kontroller: grotesk, `'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif`. 16–18 px brødtekst, 13–15 px for metadata og hint-etiketter. Ingen tekst under 13 px.

## Layoutprinsipp

- Inputsiden: 1200 px innhold på 1440 px artboard. Venstre kolonne (440 px) forklarer appen og de tre prinsippene, høyre kolonne (680 px) har feltene, personvernvarselet og «Analyser» i den rekkefølgen man bruker dem.
- Resultatsiden: et tre-delt margsystem. Venstre marg (120–360) har metadata og må/bør-merker, lesekolonnen (400–1040, ca. 70 tegn) har teksten, høyre marg (1080–1320) har sidenoter som sitatkontrollen. Én tynn blekklinje under hver statusoverskrift, ellers bare hårfine skillelinjer. Ingen kort, ingen nøkkeltall-fliser.

## Hvordan konseptet løser funksjonaliteten

- **FR-1/FR-3:** eksakte etiketter, hjelpetekst, tegnteller «x / 15 000 tegn» i hvert felt, personvernvarselet rett over knappen, og «Analyser» tydelig deaktivert (annotasjonen i 01 viser begge tilstander).
- **FR-7/FR-8/FR-9:** scoren er overskriften, den potensielle scoren står rett under som FR-8-setningen, og en stille linjefigur viser 54 % mot 67 % mulig. Kravene følger truffet → delvis truffet → mangler, må før bør. Hvert krav viser sitat og/eller forbedringshint. «Slik er scoren regnet» står som en fotnote, slik at tallet aldri virker magisk.
- **FR-11:** det nedgraderte kravet får hintet «Fant ikke belegg i CV-en for dette kravet» og en sidenote i høyre marg som viser at sitatet ikke sto ordrett i CV-en.
- **FR-10:** varianten med 92 % setter «Godt treff, klar til å søke?» mellom to blekklinjer rett under scoren, med Ja/Nei og hva hvert valg betyr. Under 90 % vises spørsmålet ikke (annotert). 04 viser «Analyser ny annonse» etter Ja og inputsiden med tomt annonsefelt og beholdt CV.
- **FR-12/13/14/17:** meldinger står der resultatet ellers ville stått, som en rolig setning i serif mellom to linjer, ikke som røde varselbokser. Feltene er alltid fortsatt utfylt.
- **FR-15/16:** demobånd under toppen, «Bruk eksempel» i båndet, og resultatsiden merket tre ganger: banneret, en «Eksempeldata»-boks over scoren og en loddrett marglinje «EKSEMPELDATA · IKKE DIN EGEN TEKST».

## Svakheter og risiko

- Den lange, luftige resultatsiden krever scrolling. Med 15–20 krav blir den lang, og «mangler» havner langt nede (jf. åpent spørsmål §9.2).
- Serif-scoren er rolig, men mindre «skannbar» enn et dashbord for den som bare vil se tallet.
- Systemfonter: Georgia og Segoe UI ser ulike ut på macOS/Linux. I en ekte app bør serif og grotesk selvhostes (Impeccable fraråder systemfont som visningsstemme, men oppdraget krever systemfonter i SVG-ene).
- Sidenoter i høyre marg forutsetter bred skjerm. Under ca. 1280 px må de flyttes inn under kravet.
- Den beroligende tonen kan dempe alvoret i et manglende må-krav. Teglfarge, «Mangler»-ordet og må-merket må gjøre den jobben.

## Eksempelinnhold

CV-utdrag (Yvonne Lund, fiktiv) og annonse «Trainee – forretningsutvikling og analyse, Nordvik Kraft AS» (fiktiv). Alle sitater er kontrollert som ordrette delstrenger av CV-teksten i generatorskriptet. Det oppdiktede sitatet «Ledet et prosjektteam på fire studenter» finnes ikke i CV-en, og derfor er kravet nedgradert.

## Score-regnestykket (FR-7)

**Første analyse (03, 05)**

| Krav | Type | Status | Poeng | Maks |
|---|---|---|---|---|
| Bachelorgrad innen IT, økonomi eller tilsvarende | må | truffet | 2 | 2 |
| Gode norsk- og engelskkunnskaper | må | truffet | 2 | 2 |
| Erfaring med Excel | bør | truffet | 1 | 1 |
| Erfaring med dataanalyse | må | delvis | 1 | 2 |
| Erfaring med økonomi eller budsjett | bør | delvis | 0,5 | 1 |
| Erfaring med prosjektarbeid i team (nedgradert, FR-11) | må | mangler | 0 | 2 |
| Kjennskap til Power BI | bør | mangler | 0 | 1 |
| Interesse for energibransjen | bør | mangler | 0 | 1 |
| **Sum** | | | **6,5** | **12** |

Match-score = 6,5 ÷ 12 × 100 = 54,17 % → **54 %**.
Potensiell score (FR-8, delvis → truffet, mangler telles ikke): 6,5 + 1 + 0,5 = 8 ÷ 12 × 100 = 66,67 % → **67 %**.

**Variant etter ny runde (03, innfelt; 04)**
Yvonne har selv redigert CV-en (dataanalyse og økonomiverv er beskrevet tydeligere, og bacheloroppgaven er lagt til). Alle må-krav er truffet: 4 × 2 = 8. Bør: Excel 1 + økonomi 1 + energi 1 + Power BI 0 = 3. Sum 11 ÷ 12 × 100 = 91,67 % → **92 %** ≥ 90 %, så «Godt treff, klar til å søke?» vises. Det finnes ingen delvis truffede krav, så ingen potensiell score vises.

## Impeccable-prinsipper som ble brukt

- **Read-modus for resultatsiden:** en dokumentform (rapport/artikkel) med rolig lesekolonne på ca. 70 tegn, der «verdenen» bare eier rammen. Signaturgrepet er margsystemet fra fagbøker.
- **Craft floor, «Refuse»:** ingen hero-metric-mal med fliser, ingen like kort, ingen kicker eller etikett over overskriftene (begrepet «Match-score» står i setningen under scoren i stedet), ingen fargede venstrekanter på meldinger, ingen gradienttekst og ingen glass. Ikoner er tegnet som SVG i én strektykkelse, ikke unicode eller emoji.
- **Kontrast:** all tekst ≥ 4,5:1 (se paletten), og sekundærtekst tones varmt fra blekket i stedet for grått.
- **Tilstander:** deaktivert, venter, feil, tomt og for lang er tegnet. Rullefelt og tegnteller er tilpasset paletten («browser surfaces»).
- **Lys modus valgt ut fra bruken:** en student ved pulten på dagtid som leser et dokument om seg selv. Ikke valgt ut fra kategori.
- **Avvik:** `impeccable context`-launcheren ble ikke kjørt (oppdraget forbød installasjon), og selvhostede fonter ble erstattet av systemfont-stakker fordi oppdraget krever det.
