# Konsept 09 – Ett steg om gangen

## Idé
En rolig veiviser for en student som er usikker på CV-en sin. Inputen tas i tre tydelige steg (1 CV, 2 Annonse, 3 Analyser), og ferdige steg slås sammen til en kompakt rad med «Endre», slik at bare ett felt krever oppmerksomhet om gangen. Debriefen er en trinnvis gjennomgang: Oversikt (score) → «Dette er bra» → «Dette kan bli tydeligere» → «Dette mangler», med innholdsfortegnelse til venstre og «Vis alt på én side» for den som vil skumme.

## Palett
| Rolle | Hex |
|---|---|
| Bakgrunn (lys sand) | `#F3F0E8` |
| Flate/panel | `#FCFBF7` |
| Tekst | `#1E2A2F` |
| Sekundærtekst | `#4B575B` |
| Plassholder | `#5F686B` |
| Linjer | `#DCD6CA` |
| Aksent, fjordgrønn (knapper, steg) | `#2E5A60`, tint `#DDE7E6` |
| Truffet, mose | `#3C6547`, tint `#E2EADF` |
| Delvis truffet, oker | `#7F5B1A`, tint `#F3E9D3` |
| Mangler, dempet tegl | `#94473A`, tint `#F2E0DA` |
| Demomodus-tekst | `#5E4312` på `#F3E9D3` |
| Deaktivert knapp | `#E2DED4` bg, `#5C6062` tekst, stiplet kant |

All brødtekst har ≥ 4,5:1 kontrast mot underlaget (sekundærtekst ≈ 7:1, hvit på aksent ≈ 7:1).

## Typografi
- Overskrifter, scoren og CV-sitater: serif-stakk `Charter, 'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif`. Sitater settes i kursiv serif med «guillemets», så CV-ens egne ord skiller seg tydelig fra appens tekst.
- Grensesnitt og brødtekst: `'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif`.
- Skala: 96 / 44 / 34 / 26 / 20 / 17–19 / 15–16 / 13 px. Ingen tekst under 13 px.

## Layoutprinsipp
Sentrert enkeltkolonne på 640 px (x 400–1040) på et 1440-artboard. Innholdsfortegnelsen for debriefen ligger i en smal venstrespalte (x 120–340). Stegindikatoren står sentrert over panelet. Knapper og rader er 52–68 px høye og går over hele kolonnebredden. Kravene skilles med tynne linjer, ikke kort i kort. Signaturgrepet er **poengstripen**: hvert krav er én bit, må-krav dobbelt så brede som bør-krav, fylt etter status. Stripen viser både scoren og hvordan den regnes ut.

## Hvordan konseptet løser funksjonaliteten
- **FR-1 / FR-3:** feltetikettene «Lim inn CV her:» og «Lim inn annonse her:», hjelpeteksten og personvernvarselet står rett over «Analyser». Knappen er deaktivert (stiplet og grå) til begge feltene er fylt ut. Tegnteller «x / 15 000 tegn» står under hvert felt.
- **FR-2:** sammenslåtte steg beholder teksten, og «Endre» åpner feltet igjen. Etter «Ja» → «Analyser ny annonse» står det «CV-en er beholdt» ved CV-raden, og annonsefeltet er tomt (04).
- **FR-7/8/9:** match-scoren står øverst, og den potensielle scoren under, med PRD-formuleringen. Kravene vises i rekkefølgen truffet → delvis → mangler, med må-krav før bør-krav, og MÅ-KRAV/BØR-KRAV-merker (fylt kontra omrisset merke, så typen ikke bare skilles på farge).
- **FR-10:** «Godt treff, klar til å søke?» med Ja/Nei vises bare i varianten med 91 %.
- **FR-11:** kundekontakt er nedgradert til mangler, med hintet «Fant ikke belegg i CV-en for dette kravet» og en merknad som viser det oppdiktede sitatet. Oversikten forteller at ett krav ble nedgradert.
- **FR-12/13/14/17, FR-1 for lang tekst:** meldingene vises der resultatet ellers ville kommet, og feltene er fortsatt utfylt (02, 04).
- **FR-15/16:** banner under toppen, «Bruk eksempel» øverst i panelet, merket «Eksempeldata» på feltene, og en egen stripe pluss et merke ved scoren på resultatsiden (05).
- Positive nyheter først passer godt med en trinnvis gjennomgang. Studenten møter «Dette er bra» før gapene, og må aktivt trykke seg videre, så ingenting drukner i en vegg av rødt.

## Eksempelinnhold
**CV-utdrag (Yvonne Berg):**
Bachelor i IT og informasjonssystemer, Høgskolen i Molde (2024–2027) · Ferdigheter: Excel (avansert), pivottabeller og XOPPSLAG · SQL (grunnleggende), Python · Erfaring: Butikkmedarbeider, Coop Extra Molde, deltid 2022– · Prosjekter: Lagde grafer i Python for et kursprosjekt om kollektivtrafikk · Presenterte gruppeprosjektet for medstudenter og faglærer

**Annonse:** Trainee – økonomi og analyse, Nordvik Kraft AS (fiktiv).

| # | Krav | Type | Status | Sitat (ordrett) | Poeng |
|---|---|---|---|---|---|
| 1 | Bachelorgrad innen økonomi, IT eller tilsvarende (enten-eller, ett krav) | må | truffet | «Bachelor i IT og informasjonssystemer, Høgskolen i Molde» | 2 |
| 2 | Beherske Excel | må | truffet | «Excel (avansert), pivottabeller og XOPPSLAG» | 2 |
| 3 | Kjennskap til SQL | bør | truffet | «SQL (grunnleggende), Python» | 1 |
| 4 | God skriftlig og muntlig fremstillingsevne | må | delvis | «Presenterte gruppeprosjektet for medstudenter og faglærer» | 1 |
| 5 | Erfaring med datavisualisering, gjerne Power BI | bør | delvis | «Lagde grafer i Python for et kursprosjekt» | 0,5 |
| 6 | Erfaring med kundekontakt | må | mangler (nedgradert: «Kundebehandling i butikk» finnes ikke i CV-en) | – | 0 |
| 7 | Interesse for energibransjen | bør | mangler | – | 0 |

## Score-regnestykket (FR-7, FR-8)
- Maks: 4 må × 2 + 3 bør × 1 = **11 poeng**
- Oppnådd: 2 + 2 + 1 + 1 + 0,5 + 0 + 0 = **6,5 poeng**
- Match-score: 6,5 ÷ 11 × 100 = 59,09 % → **59 %**
- Potensiell score: delvis → truffet gir 2 + 2 + 1 + 2 + 1 + 0 + 0 = 8; 8 ÷ 11 × 100 = 72,73 % → **73 %** («Du er på 59 %. Fikser du de 2 delvis truffede kravene, kan du nå 73 %.»)
- Variant ≥ 90 % (etter at Yvonne har redigert CV-en selv: krav 4, 5 og 6 truffet, krav 7 mangler fortsatt): 2+2+2+2+1+1+0 = 10; 10 ÷ 11 × 100 = 90,91 % → **91 %** ≥ 90 → spørsmålet vises. Ingen delvis truffede krav, derfor ingen potensiell score.

Tegntellerne (357 og 426 tegn) er regnet fra eksempeltekstene.

## Svakheter og risiko
- Det tar flere klikk å se alle gapene i fokusvisningen. Den som vil skumme, må finne «Vis alt på én side» (som derfor ligger fast i venstrespalten).
- Veiviseren skjuler CV-teksten når annonsen limes inn, så det er vanskeligere å sammenligne direkte med CV-en.
- Når CV-en limes inn på nytt etter redigering (UJ-1), må brukeren gå via «Endre». Flyten for gjentatte analyser bør testes i SM-5.
- Systemfonter gir ulik serif på ulike maskiner (Charter/Palatino/Georgia), så karakteren varierer noe.

## Impeccable-prinsipper brukt
- Operate-modus: kjente kontroller (stegindikator, tekstfelt, knapper, innholdsfortegnelse). Verdenen bidrar bare med type, palett, tetthet og ett signaturgrep (poengstripen).
- Craft-floor: ingen eyebrow/kicker over overskrifter, ingen kort i kort, ingen gradienttekst, ingen fargede kantstriper på kort, ingen hero-metrikkmal med støttetall (scoren forklares av stripen og en setning). Tegnede ikoner i én strekvekt i stedet for emoji. Alle tilstander er dekket: deaktivert, laster, feil, tom og demo.
- Farge med jobb: tre dempede statusfarger og én aksent. Sekundærtekst er tonet, ikke grå på farget flate. Kontrast er sjekket mot AA.
- Hierarki gjennom størrelse og vekt (serif 96 px score, 26 px gruppetitler), mer luft over overskrifter enn under.
- Avvik: skillen anbefaler selvhostede skrifter fremfor systemfonter. Oppdraget krever systemfont-stakker, og oppdraget går foran. Init/PRODUCT.md ble hoppet over etter oppdraget.
