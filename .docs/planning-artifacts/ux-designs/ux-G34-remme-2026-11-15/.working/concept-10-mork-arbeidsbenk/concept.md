# Konsept 10: Mørk arbeidsbenk

## Idé

Appen er en arbeidsbenk for iterasjon, ikke et skjema med en resultatside etterpå. CV og annonse står alltid til venstre som to editorpaneler med linjenumre, og resultatet står til høyre og byttes ut ved hver analyse. Hvert sitat i resultatet viser linjenummeret i CV-en («CV l.11»), og den samme linjen er uthevet i CV-panelet, så brukeren ser beviset på stedet. En liten historikk i toppfeltet viser hvordan scoren endrer seg i fanen (58 % → 71 % → 92 %). Den finnes bare i minnet i fanen.

## Palett

| Rolle | Hex | Bruk |
|---|---|---|
| Bakgrunn (grafitt) | `#17191C` | Flaten |
| Toppfelt | `#121417` | Toppfelt, historikkfelt |
| Panel | `#1E2125` | Editorpaneler, kort |
| Panel 2 | `#262A31` | Deaktivert knapp, MÅ-merke `#363C45` |
| Sitatflate | `#1A1D21` | Sitatblokker, gutter |
| Linje / linje 2 | `#31363E` / `#454B55` | Skillelinjer, kontur |
| Tekst | `#E8E5DE` | Varm off-white, 14:1 |
| Dempet | `#AAAEB5` | Sekundærtekst, 7,3:1 |
| Svak | `#9095A0` | Metadata, linjenumre, minst 4,8:1 |
| Kjølig aksent | `#86B9CB` (flate `#1E2D34`) | Truffet, sitatbelegg, «Godt treff» |
| Varm aksent | `#E4A85F` (flate `#33291D`) | Delvis truffet, hint, primærknapp, demo og feil |
| Tekst på varm | `#1A1408` | «Analyser», «Ja», 8,8:1 |

Mangler har ingen egen farge: det er et hult merke i dempet grå. Da holder paletten seg til én kjølig og én varm aksent, og «mangler» blir ikke rødt og alarmerende for en student som allerede er usikker. All tekst er kontrollert mot WCAG AA (laveste par er 4,8:1).

## Typografi

- Sans (grensesnitt): `'Segoe UI Variable Text','Segoe UI',system-ui,-apple-system,'Helvetica Neue',Arial,sans-serif`. Overskrift 38/650 med -0,5 i tracking, seksjoner 20/600, kravtitler 16/600, brødtekst 14–16.
- Mono (bare for data): `'Cascadia Mono','JetBrains Mono',Consolas,'SF Mono',Menlo,monospace`. Brukes på innlimt tekst, linjenumre, sitater, tegntellere, poeng og score. Mono betyr «ordrett tekst eller tall», ikke at det skal se teknisk ut: sitatet i resultatet har samme skrift som linjen i CV-panelet, så det er lett å se at de er like.
- Minste tekst er 13 px.

## Layoutprinsipp

- To kolonner på 1440: input 24–668 px, skillelinje på 684, resultat 700–1416 px. Rutenettet er 4/8 px, og editorlinjene har 22 px høyde.
- Ingen kortrutenett: kravene er rader skilt med 1 px-linjer, gruppert under Truffet / Delvis truffet / Mangler med statusmerke (fylt, halvfylt eller hult kvadrat). Teksten står alltid sammen med merket, så status leses ikke bare av fargen.
- Kravstripen under scoren: én celle per krav i samme rekkefølge som listen, og må-krav er dobbelt så brede. Den viser vektingen i FR-7 uten forklaringstekst, og de stiplede halvdelene viser den potensielle scoren.
- Statusmerket står også i gutteren i annonsepanelet (status per kravlinje), og sitatlinjene er uthevet i CV-panelet. Resultatet og kildeteksten henger sammen begge veier.

## Hvordan konseptet løser funksjonaliteten

- **FR-1/3:** eksakte etiketter, hjelpetekst med info-ikon, tegnteller «596 / 15 000 tegn» i hvert felt, personvernvarselet rett over «Analyser». Deaktivert knapp er stiplet med en grunn ved siden av («Lim inn annonsen for å analysere»).
- **FR-2:** feltene står alltid fremme. Iterasjonen (redigere, lime inn, analysere) skjer i samme vindu, og historikken i fanen gjør fremgangen synlig uten lagring («Lagres ikke, bare i denne fanen»).
- **FR-5/6/9/11:** sitat med CV-linje, hint for hvert delvis truffet og manglende krav, «Nedgradert av sitatkontrollen» med det avviste sitatet overstreket og hintet «Fant ikke belegg i CV-en for dette kravet». Hver rad viser også linjen i annonsen kravet kom fra, så brukeren ser hvorfor det er et må-krav eller et bør-krav.
- **FR-7/8:** score, poeng («8,5 av 12 poeng») og vekter står i klartekst. Potensiell score bruker formuleringen fra PRD-en.
- **FR-10:** «Godt treff, klar til å søke?» med Ja/Nei i den kjølige aksentfargen. Det vises bare i varianten med 92 %. Ja byttes ut med «Analyser ny annonse» (04 e).
- **FR-12/13/14/15/16/17:** se 02, 04 og 05. Demoresultatet er merket både i panelene («Eksempeldata») og øverst i resultatet («Eksempeldata – ikke din egen tekst»), og eksempel-CV-en heter «MIA SOLBERG (FIKTIV PERSON)».

## Svakheter og risiko

- Mørkt tema, mono og linjenumre kan virke som et utviklerverktøy og skremme studenter som ikke er tekniske. Landingsteksten må gjøre tonen varm.
- Krever bred skjerm. Under ca. 1200 px må kolonnene stables, og da forsvinner noe av poenget med å ha alt i ett vindu (mobil er uansett utenfor v1).
- Lange CV-er: panelene må rulle, og uthevingen av sitatlinjer krever at visningen hopper til riktig linje. Det gjør implementasjonen litt mer krevende. Linjenumre forutsetter at teksten vises med samme linjebryting som den ble limt inn med.
- Det mørke temaet er valgt for konsentrert iterasjon over lengre tid. Noen foretrekker lyst tema på dagtid, og et lyst tema er ikke tegnet.
- Kravstripen og historikken er ekstra elementer som må holdes riktige (FR-8 er et bør-krav, og stripen kan fjernes uten at noe annet brytes).

## Score-regnestykket

Eksempel: Yvonne mot «Trainee – digitalisering og analyse», analyse 2.

| Krav | Type | Status | Poeng | Maks |
|---|---|---|---|---|
| Bachelorgrad innen IT, økonomi eller tilsvarende | må | truffet | 2 | 2 |
| Kommunikasjon på norsk og engelsk | må | truffet | 2 | 2 |
| Erfaring fra arbeid i team | må | truffet | 2 | 2 |
| Erfaring med Excel | bør | truffet | 1 | 1 |
| Erfaring med dataanalyse | må | delvis | 1 | 2 |
| Kjennskap til SQL og databaser | bør | delvis | 0,5 | 1 |
| Erfaring med prosjektledelse (nedgradert av sitatkontrollen) | bør | mangler | 0 | 1 |
| Kjennskap til Power BI eller lignende | bør | mangler | 0 | 1 |
| **Sum** | | | **8,5** | **12** |

- Match-score: 8,5 ÷ 12 × 100 = 70,83 → **71 %**.
- Potensiell score (begge delvis truffet blir truffet, de som mangler telles ikke): (8,5 + 1 + 0,5) ÷ 12 = 10 ÷ 12 = 83,33 → **83 %**.
- Variant, analyse 3 (Yvonne har flyttet og formulert om eksisterende linjer; prosjektleder-linjen 10 siteres nå ordrett): alt truffet unntatt Power BI → 4×2 + 3×1 = 11 ÷ 12 = 91,67 → **92 %** ≥ 90, så «Godt treff, klar til å søke?» vises. Ingen delvis truffet, så ingen potensiell score.
- Historikk: 58 % (analyse 1, 7 ÷ 12 = 58,3) → 71 % → 92 %.

Sitatkontrollen: modellen siterte «prosjektleder i bacheloroppgaven», mens CV-en sier «Prosjektleder for bachelorgruppen, ansvar for fremdriftsplan». Sitatet er ikke ordrett, så kravet nedgraderes til mangler. Eksempelet viser at kontrollen er streng også når erfaringen faktisk finnes.

## Impeccable-prinsipper som er brukt

- **Modus: Operate** for arbeidsbenken: lesbarhet, konsistens og kjente mønstre (editor, gutter, linjenumre) foran uttrykk. Merkevaren ligger i detaljene, som de to overlappende arkene i logoen og koblingen mellom sitat og linje.
- **Lyst eller mørkt valgt ut fra bruken, ikke bransjen:** gjentatt redigering og analyse på kveldstid ved PC. Grafitt, ikke svart, og ingen glød, neon eller gradienttekst.
- **Unngått:** like kort med ikon + overskrift + tekst, eyebrow over overskrifter, farget venstrekant over 1 px (sitatblokkene har bare 1 px kontur), sparklines og ringer, mono som kostyme (mono brukes bare på ordrett tekst og tall) og emoji som ikoner (alle ikoner er tegnet i SVG med 1,5 px strek).
- **Tilstander:** deaktivert, lasting, feil, tom, for lang og demo er tegnet. Feil og meldinger sier hva som er galt og hva brukeren kan gjøre.
- **Kontrast:** målt mot AA, og sekundærtekst er tonet fra paletten i stedet for grå på farget flate (f.eks. `#D9C3A3` på den varme flaten).
- Avvik: Impeccable vil helst ha en egen, selvhostet display-font. Briefen krever systemfonter i selvstendig SVG, så briefen vant. `impeccable context` kjørte, men init/PRODUCT.md ble hoppet over slik briefen sier.
