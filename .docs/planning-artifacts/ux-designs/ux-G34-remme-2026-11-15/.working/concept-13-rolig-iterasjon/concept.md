# Konsept 13 – Rolig iterasjon

## Idé

Dette er en rolig veileder som går gjennom CV-en sammen med studenten én ting om gangen, og som gjør det enkelt å prøve igjen. Utseendet er hentet fra 01 «Rolig rådgiver»: papir og blekk, serif-overskrifter, hårfine linjer og sitatmarkering. Flyten er hentet fra 09 «Ett steg om gangen»: tre inputsteg som slås sammen med «Endre», og en trinnvis debrief med innholdsfortegnelse, «Vis alt på én side» og poengstripe. Konseptet løser de tre svakhetene som 09 selv peker på:

1. **Alle gapene på ett blikk.** Oversiktstrinnet lister alle sju kravene i FR-9-rekkefølge (truffet → delvis → mangler, må før bør), én kort linje per krav. Gapene ses uten et eneste klikk, og hver gruppe har en lenke til sitt fokuserte trinn.
2. **CV-en ved siden av.** I de fokuserte trinnene står en sammenleggbar «Din CV»-visning til høyre. Sitatene i trinnet er markert i CV-teksten i 01s sitatfarge, og hvert sitat har et nummer (1, 2) som også står i margen ved kravet. Studenten ser derfor både hva hun skrev og *hvor* det står. Det siste er viktig, for hintet sier at presentasjonen «står nederst».
3. **Prøv igjen på ett klikk.** «Lim inn oppdatert CV og analyser på nytt» ligger fast i venstrespalten på alle trinn og nederst i siste trinn. Knappen åpner steg 1 med den gamle teksten markert, slik at det hun limer inn, erstatter den, og annonsen beholdes. Etter ny analyse står «Forrige analyse: 59 %» diskret under den nye scoren, sammen med listen «Endret siden forrige analyse». Forrige score ligger bare i minnet i fanen (FR-2).

Grunnprinsippet er fortsatt én ting om gangen: ett åpent inputsteg, ett debrief-trinn og ett krav i fokus. CV-visningen er støtte, ikke et eget fokus, og kan skjules.

## Tatt fra 01 og fra 09

| Fra 01 «Rolig rådgiver» (utseende) | Fra 09 «Ett steg om gangen» (funksjon) |
|---|---|
| Papir/blekk-palett, mose/oker/tegl, leire for lenker | Stegindikator 1 CV · 2 Annonse · 3 Analyser |
| Georgia-serif for overskrifter, score og sitater; Segoe UI for grensesnittet | Ferdige steg slås sammen til en rad med «Endre» og tegnteller |
| Overskriften er selve svaret: «Du er på 59 %.» | Trinnvis debrief: Oversikt → Dette er bra → Dette kan bli tydeligere → Dette mangler |
| Sitat i kursiv serif på markeringsfarge `#EEDFBF` | Innholdsfortegnelse til venstre med antall per trinn, «Vis alt på én side» |
| Meldinger som rolig serif-setning mellom to linjer, ikke røde bokser | Poengstripe: én bit per krav, må-krav dobbelt så brede |
| Må-krav som fylt merke, bør-krav som omrisset merke | Eksempelinnholdet: Yvonne Berg, Nordvik Kraft AS, 7 krav |
| Marger som arbeidsflate (tallmarkører i margen, loddrett EKSEMPELDATA-tekst) | «Godt treff, klar til å søke?» med Ja/Nei, «Analyser ny annonse» |

## Palett

| Rolle | Hex | Kontrast |
|---|---|---|
| Papir (bakgrunn) | `#F6F1E9` | – |
| Felt / CV-visning | `#FFFDF9` | – |
| Blekk (tekst, primærknapp) | `#2A2420` | 14:1 på papir; papirtekst på blekk 13,6:1 |
| Dempet tekst | `#5E544B` | 6,6:1 på papir, 5,6:1 på markering |
| Linjer | `#D4C9BA` / `#E6DDD0` | dekor |
| Sitatmarkering | `#EEDFBF` | blekk-tekst 11:1 |
| Aktivt trinn i innholdsfortegnelsen | `#ECE3D4` | dempet tekst 5,8:1 |
| Truffet (mose) | `#4A6536` | 5,8:1 |
| Delvis truffet (oker) | `#7A5710` | 5,8:1 |
| Mangler (tegl) | `#8A3B2B` | 6,8:1 |
| Leire (lenker, «Skjul»/«Vis») | `#9A4A2E` | 5,5:1 |
| Deaktivert knapp | `#E4DACB` med `#62584F` | 5,0:1 |
| Demobånd / Eksempeldata-merke | `#EFE4CC` | blekk 12:1 |
| Markert (valgt) tekst i feltet | `#D9E2EA` | blekk 11,7:1 |
| Annotasjoner (ikke UI) | `#3E5468` på `#E9EEF2` | 6,7:1 |

Status skilles aldri bare med farge. Hver status har eget ord og eget tegn (fylt, halvfylt og tom sirkel), og i stripen har «mangler» stiplet kant.

## Typografi

- Serif: `Georgia, 'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', 'Times New Roman', serif`. Score 60 px, trinnoverskrift 34 px, seksjoner 26 px, kravtitler 22 px, sitater 17 px kursiv.
- Grotesk: `'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif`. Brødtekst 15–17 px, metadata og merker 13–14 px. Ingen tekst under 13 px.
- Prosenttall har hardt mellomrom («59 %»), så tallet og prosenttegnet aldri deles over to linjer.

## Layout (1440 px)

- **Input (01, 02, 05):** venstre kolonne (x 120–520) har overskrift, ingress og tre prinsipper. Høyre kolonne (x 640–1320) har stegindikator og steg. Bare ett steg er åpent. Ferdige steg er sammenslåtte rader, kommende steg er dempede rader. Personvernvarselet står alltid over «Analyser».
- **Debrief (03):** tre spalter. Venstre (x 120–336) har innholdsfortegnelse, «Vis alt på én side» og snarveien for ny analyse. Lesekolonnen (x 392–900, ca. 65–70 tegn) viser ett trinn. Høyre (x 948–1320) har CV-visningen, som er lagt sammen på oversikten og åpen i trinn 2–4. Mellom venstrespalten og lesekolonnen ligger margen med tallmarkørene.
- Ingen kort i kort og ingen fliser. Grupper skilles med en blekklinje under overskriften og hårfine linjer mellom krav.

## Hvordan FR-ene løses

- **FR-1:** etikettene «Lim inn CV her:» og «Lim inn annonse her:», hjelpeteksten «Bare en CV og en annonse per analyse» og «Analyser». Knappen er deaktivert når et felt er tomt eller over grensen (01-annotasjon, 04). Tegnteller «x / 15 000 tegn» i hvert felt. Over grensen får feltet teglkant og teller, og «Teksten er for lang» vises (04).
- **FR-2:** sammenslåtte steg beholder teksten, og «Endre» åpner feltet igjen. «Lim inn oppdatert CV og analyser på nytt» beholder annonsen. Etter «Analyser ny annonse» står «CV-en er beholdt», og annonsefeltet er tomt (04). Forrige score finnes bare i minnet i fanen og nullstilles når annonsen byttes.
- **FR-3:** «CV-en din sendes til Claude for analyse. Appen lagrer den ikke.» med låsikon rett over «Analyser» i alle input-tilstander.
- **FR-7/FR-8:** «Du er på 59 %.» er overskriften, og FR-8-setningen «Fikser du de 2 delvis truffede kravene, kan du nå 73 %.» står rett under. Poengstripen og teksten «6,5 av 11 poeng» viser regnestykket. I varianten står setningen «Ingen delvis truffede krav, derfor vises ingen potensiell score.»
- **FR-9:** oversikten og trinnene følger truffet → delvis → mangler, med må før bør. Hvert krav har et må- eller bør-merke, truffet og delvis truffet viser sitatet, og delvis truffet og mangler viser forbedringshintet.
- **FR-10:** spørsmålet «Godt treff, klar til å søke?» står mellom to blekklinjer rett under scoren i varianten med 91 %, med Ja/Nei og hva hvert valg betyr. Ja → «Analyser ny annonse» (04). Nei → hun blir på resultatsiden.
- **FR-11:** kundekontakt er nedgradert til mangler med hintet «Fant ikke belegg i CV-en for dette kravet», merket «nedgradert» på oversikten og med en teglmerknad om det oppdiktede sitatet «Kundebehandling i butikk». CV-visningen viser at teksten ikke står der.
- **FR-12/FR-14/FR-17:** «Ingen krav funnet, har du husket annonsen?», «Klarte ikke å analysere, prøv igjen» og «Ekte analyse krever API-nøkkel – se README» står der resultatet ellers ville stått. Feltene er fortsatt utfylt, og «Analyser» er tilgjengelig igjen etter en feil (04).
- **FR-13:** «Analyserer …» i serif med en stille fremdriftslinje. «Analyser» er deaktivert og «Endre» skjult mens analysen pågår (02). Ved ny analyse står «Forrige analyse: 59 %» under (04).
- **FR-15/FR-16:** banneret «Demomodus – ingen API-nøkkel funnet» med «Bruk eksempel». Feltene får merket «Eksempeldata», og resultatsiden er merket tre ganger: banneret, en Eksempeldata-linje over scoren og en loddrett marglinje (05).

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

- Match-score: 6,5 ÷ 11 × 100 = 59,09 % → **59 %**.
- Potensiell score: krav 4 og 5 regnes som truffet → 2 + 2 + 1 + 2 + 1 = 8; 8 ÷ 11 × 100 = 72,73 % → **73 %**.
- Variant etter Yvonnes egen redigering (krav 4, 5 og 6 truffet, krav 7 mangler fortsatt): 2 + 2 + 1 + 2 + 1 + 2 + 0 = 10; 10 ÷ 11 × 100 = 90,91 % → **91 %** ≥ 90 %, så spørsmålet vises. Det finnes ingen delvis truffede krav, så ingen potensiell score vises.
- Tegntellerne er regnet fra teksten: CV 357 tegn, annonse 426 tegn, oppdatert CV 449 tegn.

## Svakheter og risiko

- Tre spalter krever bred skjerm. Under ca. 1280 px må CV-visningen bli en skuff som legges over lesekolonnen, eller flyttes under kravet.
- Oversikten med alle sju kravene gjør trinn 2 («Dette er bra») nesten overflødig for den som bare skummer. Det er bevisst, men det svekker «én ting om gangen» litt.
- Sammenligningen med forrige score kan friste til å «jakte poeng» ved å omformulere uten å endre innhold. Hintene og sitatkontrollen demper dette, men det bør testes i SM-5.
- «Lim inn oppdatert CV» forutsetter at hun limer inn hele CV-en. Limer hun inn bare en del, faller scoren, og appen kan ikke se forskjell. Teksten under knappen sier derfor «Lim inn den nye versjonen».
- I demomodus fører snarveien for ny analyse til FR-17-meldingen, fordi egen tekst ikke analyseres. Det er riktig etter PRD-en, men kan overraske sensor.
- Systemfonter (Georgia/Segoe UI) ser ulike ut på macOS og Linux. I en ekte app bør skriftene selvhostes.
- Nummereringen i CV-visningen følger kravene, ikke CV-rekkefølgen. Derfor kan 2 stå over 1 i CV-en (som i trinn 3).

## Impeccable-prinsipper som ble brukt

- **Operate-modus:** kjente kontroller (steg, tekstfelt, innholdsfortegnelse, knapper) med presisjon og tilbakeholdenhet. Verdenen fra 01 eier type, palett og marger. Signaturgrepene er poengstripen og de nummererte sitatmarkeringene som binder krav og CV sammen.
- **Craft floor, «Refuse»:** ingen kicker eller etikett over overskrifter, ingen kort i kort, ingen hero-metric-mal med støttetall (forrige score er en setning, ikke en flis), ingen gradienttekst, ingen glass, ingen fargede venstrekanter på meldinger og ingen hard offset-skygge. Ikonene (lås, info, varsel, sirkelpil, piler, chevroner) er tegnet i én strektykkelse, ikke unicode eller emoji.
- **Tilstander:** deaktivert, venter, feil, tom, for lang, demo og ny runde er tegnet. Nettleserflatene er også med: markert tekst (`#D9E2EA`), fokusramme i blekk på aktivt felt og tegnteller i paletten.
- **Kontrast:** all tekst ≥ 4,5:1 (se paletten). Sekundærtekst er tonet varmt fra blekket, ikke grå.
- **Lys modus valgt ut fra bruken:** en student ved pulten på dagtid som leser om sin egen CV.
- **Avvik:** `impeccable context`-launcheren ble ikke kjørt, og init/PRODUCT.md ble hoppet over, slik oppdraget sa. Selvhostede skrifter ble erstattet av systemfont-stakker, fordi oppdraget krever det.
