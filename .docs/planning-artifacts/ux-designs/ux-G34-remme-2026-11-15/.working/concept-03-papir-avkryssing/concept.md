# Konsept 03 – Papir og avkryssing

## Idé
CV-en limes inn på linjert notatpapir, og annonsen på en kvitteringsrull. Resultatsiden er annonsen «rettet mot CV-en»: et papirark med en avkrysningsliste der hvert krav får en håndtegnet boks (hel hake = truffet, halv hake = delvis truffet, tom rød boks = mangler). Scoren står som en lærerkarakter i rødpenn med en ring rundt, sitatene er markert med gul tusj, og forbedringshintene står som vennlige kantnotater i margen. Tonen er en lærer som retter med blyant og gode notater, ikke et dashbord.

## Filer
- `01-landingsside.svg` – inputsiden med kort presentasjon («Slik retter vi»-kortet), felt, hjelpetekst, personvernvarsel, «Analyser» deaktivert (annonsen mangler) og aktiv versjon innfelt, avsenderblokk i bunnteksten.
- `02-analyserer.svg` – «Analyserer …», knappen deaktivert, begge felt utfylt.
- `03-resultat-debrief.svg` – resultatside med 62 %, potensiell score 77 %, ni krav og en innfelt variant med 92 % og «Godt treff, klar til å søke?» (Ja/Nei).
- `04-tilstander.svg` – Ingen krav funnet, Feil, Teksten er for lang, Egen tekst i demomodus, og «Analyser ny annonse» etter Ja.
- `05-demomodus.svg` – demobanner, «Bruk eksempel», og resultatsiden merket med stempelet EKSEMPELDATA og stripen «Eksempeldata – ikke din egen tekst».

## Palett
| Rolle | Hex |
|---|---|
| Skrivebord (bakgrunn) | `#ECE6D9` |
| Papir | `#FBF8F1` |
| Blekk (tekst, overskrifter) | `#26231F` |
| Brødtekst | `#3A362F` |
| Dempet tekst (blyant) | `#5F5A51` |
| Blekkblå (haker, primærknapp, potensiell score) | `#1F3F8F` |
| Rødpenn (score, hint, feil, «mangler») | `#A8261B` |
| Tusj (sitatmarkering) | `#F5E6A0` |
| Linjer på papir / margstrek | `#D3DCE9` / `#DFA096` |
| Demobanner | `#F6E7B0` med kant `#B89B45` |

Kontrast (omtrent): blekk på papir 15:1, rødpenn på papir 6,8:1, blekkblå på papir 9:1, dempet tekst på papir 6,3:1 og på skrivebord 5,4:1. Alt er over AA for brødtekst.

## Typografi
- **Serif** (Charter → Iowan Old Style → Georgia): overskrifter, kravtekst, brødtekst. Gir følelsen av en trykt side.
- **Skrivemaskin** (Courier New → ui-monospace): feltetiketter, hjelpetekst, sitater og tellere. Monospace brukes bare til det som er ordrett tekst eller måling (sitat, tegnteller, metadata), ikke som pynt.
- **Håndskrift** (Segoe Print → Bradley Hand → Noteworthy → Comic Sans MS): bare lærerens stemme, det vil si scoren, kantnotatene og korte markeringer. Aldri i felt eller knapper.
- Minste tekst er 13 px (tellere og metadata). Kravtekst 20 px, seksjonstitler 30 px, H1 46 px.

## Layoutprinsipp
Ett papirark per skjermbilde på et varmt skrivebord, med et fast rutenett: margstrek til venstre, innholdskolonne (ca. 620 px for sitater) og en egen margkolonne til høyre (ca. 330 px) som bare inneholder notater. Status leses tre ganger: seksjonstittel, boksen og hakens form. Fargen er aldri alene om å bære status. Truffet → delvis → mangler går ovenfra og ned, og må-krav (fylt merke) står før bør-krav (åpent merke) innen hver status.

## Hvordan konseptet løser funksjonaliteten
- **FR-1/FR-3:** de eksakte etikettene, hjelpeteksten «Bare en CV og en annonse per analyse» og personvernvarselet med lås står rett over og under arkene. Tegnteller «x / 15 000 tegn» under hvert felt gjør grensen synlig før den nås.
- **FR-5/FR-11 (ingen oppdiktning):** sitatet står ordrett, i skrivemaskin og med tusj, rett under kravet. Kravet som sitatkontrollen nedgraderer, viser modellens sitat gjennomstreket, et rødt stempel «nedgradert av sitatkontrollen» og hintet «Fant ikke belegg i CV-en for dette kravet». Kontrollen synes, i stedet for å skje i det skjulte.
- **FR-6:** hintene står i margen med en pil til kravet, slik en lærer skriver. De peker på det som allerede står i CV-en og inneholder ingen ferdige setninger. For «Interesse for energibransjen» sier hintet rett ut at ingenting finnes.
- **FR-7/FR-8/FR-9:** scoren er det første og største på arket. Den potensielle scoren står som en hel setning ved siden av, med margnotatet «8 av 13 poeng» for å vise at koden regner.
- **FR-10:** spørsmålet vises bare i varianten med 92 %. Ja fører til «Analyser ny annonse», og da er annonsefeltet tømt og CV-en beholdt (vist i 04).
- **FR-12–FR-17:** alle meldinger er rødpenn-notater på samme ark, så feltene står fortsatt synlige og utfylte under meldingen.

## Svakheter og risiko
- Håndskriftfonten varierer mye mellom plattformer (Segoe Print finnes på Windows, ellers Bradley Hand eller Comic Sans). Uten en selvhostet håndskriftfont kan uttrykket bli barnslig. Bør erstattes med en lisensfri, selvhostet font ved implementering.
- Courier New er tynn på skjerm. Sitatene er lesbare ved 15 px, men en kraftigere monospace (for eksempel IBM Plex Mono) bør vurderes.
- Rødpenn kan oppleves som «feil» og retting med karakter, det motsatte av FR-9-intensjonen om å ikke føle seg ubrukelig. Vi demper dette med vennlig tone og blå farge for det positive (haker, potensiell score, 92 %), men det må testes (SM-5).
- Den halve haken er en ny konvensjon og må støttes av seksjonstittelen.
- Skeuomorfe detaljer (skygger, takkekant, tape) må holdes nede, ellers blir det kostyme.

## Score-regnestykket (FR-7)
| Krav | Type | Status | Poeng | Maks |
|---|---|---|---|---|
| Bachelorgrad innen IT, økonomi eller tilsvarende | må | truffet | 2 | 2 |
| Gode norsk- og engelskkunnskaper | må | truffet | 2 | 2 |
| Erfaring med dataanalyse og visualisering | må | delvis | 1 | 2 |
| Kunne SQL (nedgradert av sitatkontrollen) | må | mangler | 0 | 2 |
| Programmeringserfaring, gjerne Python | bør | truffet | 1 | 1 |
| Erfaring fra kundeservice | bør | truffet | 1 | 1 |
| Kjennskap til økonomi og budsjett | bør | delvis | 0,5 | 1 |
| Smidig prosjektarbeid i team | bør | delvis | 0,5 | 1 |
| Interesse for energibransjen | bør | mangler | 0 | 1 |
| **Sum** | | | **8** | **13** |

- Match-score = 8 ÷ 13 × 100 = 61,54 % → **62 %**
- Potensiell score (de tre delvis truffede som truffet: +1 +0,5 +0,5) = 10 ÷ 13 × 100 = 76,92 % → **77 %**. Tekst: «Du er på 62 %. Fikser du de 3 delvis truffede kravene, kan du nå 77 %.»
- Variant ≥ 90 %: alle må-krav truffet (8) + fire bør-krav truffet (4) + energibransjen mangler (0) = 12 ÷ 13 × 100 = 92,31 % → **92 %**. Ingen delvis truffede krav, så ingen potensiell score. I varianten er SQL truffet fordi Yvonne har gjort tydelig det som allerede står under «Emner: Databaser», ikke fordi hun har lagt til ny erfaring.

Alle sitater finnes ordrett i CV-utdraget i feltet (01/02/05).

## Impeccable-prinsipper som ble brukt
- **The brief wins:** papir, blekkblå, rødpenn og skrivemaskin var gitt, og ble fulgt helt i stedet for å bli trukket mot et nøytralt app-uttrykk. Systemfonter var et krav i oppdraget. Det går foran regelen i craft-floor om selvhostede fonter, og dette er notert som risiko.
- **Operate-modus for resultatsiden:** en avkrysningsliste er et kjent mønster som er lett å skanne. Uttrykket ligger i detaljene (haker, tusj, margnotater), ikke i strukturen.
- **Refuse-listen:** ingen hero-metric-mal med statistikkort, ingen like kort med ikon + overskrift, ingen eyebrow over overskrifter, ingen seksjonsnumre, ingen tykk farget venstrekant, ingen gradienttekst, ingen glass. Ikonene (boks, hake, sitattegn, penn, lås, ark) er tegnet som SVG med samme strek, ikke Unicode-glyfer.
- **Monospace bare for data:** brukt til ordrette sitater, tellere og metadata, ikke som «teknisk» pynt.
- **Dybde:** skyggene har forskyvning og myk uskarphet. Ingen harde blokkskygger.
- **Tilstander og kopi:** deaktivert, lasting, feil, tom og for lang er tegnet. Meldingene bruker PRD-ens eksakte ordlyd, og der det trengs, står gjenopprettingen ved siden av.
- **Kontrast:** sjekket mot AA. Sekundærtekst er varm blyantgrå, ikke kald grå.
- Skillens init/PRODUCT.md-trinn og spørsmål til brukeren ble hoppet over etter oppdraget. Skillens context-kommando ble kjørt bare for å lese (ingen filer skrevet).
