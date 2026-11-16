---
title: 'Fiendtlig gjennomgang av ARCHITECTURE-SPINE.md'
reviewed: ARCHITECTURE-SPINE.md (status draft, 2026-11-16)
context: prd-G34-remme-2026-11-04/prd.md, ux-G34-remme-2026-11-15/EXPERIENCE.md
date: 2026-11-16
method: 'Konstruere par av enheter ett nivå ned som følger alle AD-ene bokstavelig, men bygger ting som ikke passer sammen'
---

# Fiendtlig gjennomgang av arkitekturspinen

## Dom

**Ikke klar til å bygges på uten strammere AD-er.** Lagdelingen (AD-2), utfall som data (AD-6) og «backenden bestemmer» (AD-1) er gode valg. Men spinen fastsetter *hvem* som eier ting tydeligere enn *hvordan* grensene ser ut. Fire hull er kritiske: to enheter kan følge spinen ordrett og likevel gi en app der sensor trykker «Bruk eksempel» og får «Ekte analyse krever API-nøkkel», der testene ikke når fram til pipelinen, der `text_too_long` aldri kan oppstå, eller der hver analyse over 30 sekunder ender som en ukjent feil i frontenden.

Funnene er sortert etter alvorlighet. Hvert funn har formen **par → kollisjon → forslag**. Forslagene er skrevet som nye eller strammere AD-er. Spinen er ikke endret.

| Alvorlighet | Antall |
| --- | --- |
| Kritisk | 4 |
| Høy | 6 |
| Middels | 7 |
| Lav | 5 |

---

## Kritisk

### K1 — Demosjekken stenger testene ute fra pipelinen, og testene kan treffe ekte Claude

**Par:** «Testoppsett (pytest)» og «Demomodus/konfig».

- *Demomodus* følger AD-3 bokstavelig: demomodus ⇔ tom nøkkel ⇔ fixture-adapteren. I demomodus returnerer `analyze` `demo_requires_key` når teksten ikke er eksempeldataene.
- *Testoppsett* følger AD-9 bokstavelig: pytest bruker fixture-adapteren med ugyldige svar (manglende felt, ukjent status, tomt sitat, oppdiktet sitat). Disse har nødvendigvis andre CV-er og annonser enn eksempeldataene.
- **Kollisjon:** Med fixture-adapteren er appen per definisjon i demomodus, så steg 2 i AD-4 stopper alle testinndata som ikke er eksempeldataene, før porten kalles. Testene av FR-5, FR-11 og FR-14 når aldri sitatkontroll eller validering. Teamet må enten legge inn et testflagg («ingen feature flags» i konvensjonene), flytte demosjekken inn i adapteren (bryter AD-3/AD-4), eller bare teste domenet (bryter AD-2: «går gjennom hele pipelinen»).
- **Forverring:** Hvis utvikleren har en ekte nøkkel i `.env`, leser `Settings()` den også under pytest og Playwright. `TestClient(app)` velger da Anthropic-adapteren, og testene går mot nettet og koster penger. AD-9 sier at de aldri gjør det, men ingen AD sier hvordan det hindres.

**Forslag — ny AD-13 «Modus og adapter injiseres, ikke utledes i use caset»:**
- `analyze(cv, annonse, *, extractor: RequirementExtractor, demo: bool, example: Example | None)`. `demo` og `extractor` er to separate avhengigheter. Bare `config.py`/app-fabrikken kobler dem sammen (tom nøkkel → `demo=True` + fixture-adapter med eksempelsvaret).
- Tester bygger `analyze` med `demo=False` og `FixtureExtractor(path)`, og API-tester bruker `app.dependency_overrides`.
- Settings i tester og Playwright lastes med `ANTHROPIC_API_KEY=""` satt eksplisitt i miljøet (miljøvariabel slår `.env`). En pytest-fixture med `autouse=True` feiler testen hvis Anthropic-adapteren instansieres.

### K2 — `422` mot `text_too_long`: to eiere av samme valideringsregel

**Par:** «HTTP-lag (`api/schemas.py`)» og «Applikasjon (`analysis/`)».

- *HTTP-laget* følger AD-5/AD-6: Pydantic-modellen er eneste definisjon av kontrakten, og «bare valideringsfeil i selve forespørselen gir `422`». Det naturlige er `cv: str = Field(min_length=1, max_length=15000)`. Da gir både tom og for lang tekst `422` fra FastAPI, før use caset kjøres. `text_too_long` kan aldri returneres.
- *Applikasjonen* følger AD-4 steg 1: «Et felt er tomt … → `422`. Over 15 000 tegn → `text_too_long`.» Men et use case i en hexagonal kjerne kjenner ikke HTTP og kan ikke returnere `422`. Det må kaste et unntak som HTTP-laget oversetter, eller returnere et utfall som ikke finnes i AD-6.
- **Uavklart rekkefølge:** CV er tom og annonsen er for lang. Gir det `422` eller `text_too_long`? Teller man lengden før eller etter `strip()`? Er «bare mellomrom» definert som Pythons `str.isspace()` (som inkluderer `\x1c`–`\x1f`) eller JavaScripts `trim()` (som ikke gjør det)?
- **Frontenden har ingen melding for `422`:** AD-6 sier at frontenden velger tekst ut fra `outcome`, men et `422`-svar har ikke noe `outcome`. Frontend-storyen må finne på noe.

**Forslag — stram AD-4 steg 1 og AD-6:**
- Pydantic-skjemaet for forespørselen har bare `cv: str`, `annonse: str` (påkrevd, ingen `min_length`/`max_length`). `422` betyr bare «feil form» (manglende felt, ikke streng).
- Use caset sjekker i denne rekkefølgen: (a) begge felt for tomhet med `s.strip() == ""` → utfall `empty_input`, (b) begge felt for lengde på rå tekst → `text_too_long`. Eller: behold `422` for tomt felt, men legg det i en Pydantic-`field_validator`, slik at det har én eier og ligger før use caset.
- Frontenden mapper alt som ikke er `200` med gyldig `outcome` (inkludert `422`, `5xx`, nettverksfeil og tidsavbrudd) til meldingen for `analysis_failed`. Det skal stå i AD-6.

### K3 — Frontenden skal vise «Teksten er for lang» før innsending, men AD-1 forbyr å vurdere terskler, og ingen har sagt hva et «tegn» er

**Par:** «Frontend-inputside» og «Backend-analyse».

- *Frontend-inputsiden* følger AD-1 bokstavelig: den «vurderer aldri terskler». Da kan den ikke deaktivere «Analyser» ved over 15 000 tegn, og FR-1/EXPERIENCE (tegnteller, teglkant, `aria-describedby`) brytes. En annen utvikler leser FR-1 og bygger sjekken likevel, med `value.length`, og kanskje `maxLength={15000}` på `<textarea>`, som stille kutter innlimt tekst slik at meldingen aldri vises.
- *Backend* teller med `len(s)`, som teller Unicode-kodepunkter. JavaScripts `.length` teller UTF-16-enheter. En CV med emoji eller enkelte symboler gir ulike tall: frontenden viser «for lang» mens backend godtar, eller omvendt.
- **Linjeskift:** `<textarea>.value` normaliserer alltid til `\n`. En fil eller et testinndata med `\r\n` gir ulikt antall tegn i backend og frontend.
- **Hvor bor tallet 15 000?** Det står i AD-4 og i FR-1, men ikke som en delt verdi. Frontend og backend hardkoder hver sin konstant.

**Forslag — ny AD-14 «Inputgrensen»:**
- Unntak fra AD-1: frontenden *speiler* grensen for tom tekst og lengde for å gi tilbakemelding før innsending. Backenden er fasit.
- Ett tegn = ett Unicode-kodepunkt i strengen slik den sendes i JSON. Frontenden teller med `Array.from(s).length` (eller `[...s].length`), backend med `len(s)`. Ingen normalisering før telling.
- Grensen eksponeres fra backenden, for eksempel `GET /api/status` → `{ "demo": bool, "max_chars": 15000 }`, eller som en konstant i den genererte kontrakten. Ingen hardkodet 15 000 i frontenden.
- `<textarea>` skal ikke ha `maxLength`. Grensetester (14 999 / 15 000 / 15 001, og en tekst med emoji) skrives både i Vitest og pytest.

### K4 — Tidsgrensekjeden bryter: Next-proxyen og SDK-ens gjentatte forsøk

**Par:** «Frontend / Next.js-rewrite (AD-10)» og «Anthropic-adapter (AD-8)».

- *Adapteren* følger AD-8: tidsgrense 60 s. Anthropic-SDK-en har som standard `max_retries=2`, og gjentar ved tidsavbrudd, 429 og 5xx. Én analyse kan ta 3 × 60 s = 180 s og koste opptil tre ganger 2 kr, uten å bryte noen AD.
- *Frontenden* følger AD-10: Next.js sender `/api/*` videre med en rewrite. Next sin proxy for rewrites har en egen tidsgrense (`experimental.proxyTimeout`, standard 30 s i flere versjoner). PRD-en sier at en analyse tar 15–30 s, og opptil 60 s. Analyser på over 30 s blir kuttet av proxyen med `500`, uten `outcome`.
- **Kollisjon:** Backenden svarer korrekt med `result` etter 45 s, men frontenden har allerede fått en feil. Og frontendens `fetch` har ingen tidsgrense i spinen i det hele tatt.

**Forslag — ny AD-15 «Tidsbudsjett»:**
- Hele kjeden har ett budsjett: SDK-kall 60 s med `max_retries=0` (eller en total frist på 60 s inkludert gjentak) < backend-svar < Next-proxy (`proxyTimeout` ≥ 75 s, satt eksplisitt i `next.config`) < frontend-`fetch` med `AbortSignal.timeout(90_000)`.
- Ethvert brudd i kjeden ender som meldingen for `analysis_failed` (se K2).
- Kostnadstaket i AD-8 gjelder per analyse, med gjentak medregnet.

---

## Høy

### H1 — Tomt sitat og manglende hint: valideringsfeil eller nedgradering?

**Par:** «LLM-skjema (`ExtractionResult`)» og «Domene (sitatkontroll)».

- *Skjema-storyen* følger FR-14/AD-9: «tomt sitat for et krav som er truffet» er et ugyldig svar → `analysis_failed`. Den legger inn en validator.
- *Domene-storyen* følger AD-4 steg 5: «Et krav med `met` eller `partial` uten godkjent sitat settes til `missing`». Et tomt sitat er «uten godkjent sitat», så domenet nedgraderer det. Skjemaet har ingen validator, fordi AD-8 bruker strukturert output og «modellen gir gyldig JSON».
- **Kollisjon:** Samme fixture («tomt sitat») gir `analysis_failed` i én tolkning og et resultat med et nedgradert krav i den andre. Testen i AD-9 kan ikke skrives entydig.
- **Samme hull for hint:** FR-6 sier at et `partial`/`missing`-krav uten hint gjør resultatet «feil». AD-4 nevner det ikke. Er det `analysis_failed`, eller viser frontenden et krav uten hint?
- **Feltene etter nedgradering er udefinert:** Er `quote` fortsatt det avviste sitatet, eller `null`? Overskrives modellens hint, eller beholdes det? Kan `downgraded` være `true` mens `rejected_quote` er `null`? Har et `met`-krav `hint = null`, eller sender vi modellens hint videre? Frontenden viser sitat for `met`/`partial` ut fra status, men hvis `quote` beholdes på et `missing`-krav og en annen komponent viser `quote` når det ikke er `null`, vises et oppdiktet sitat som om det var belegg (brudd på SM-1 i UI).

**Forslag — stram AD-4 steg 3 og 5 med en tabell over invarianter:**
- `ExtractionResult`-validator: `met`/`partial` krever `quote.strip() != ""`. `partial`/`missing` krever `hint.strip() != ""`. Brudd → `analysis_failed`. Steg 5 håndterer bare *ikke-tomme* sitater som ikke finnes i CV-en.
- Etter steg 5 gjelder, for hvert krav i `AnalysisResult`:
  - `met`/`partial` ⇒ `quote` ikke `null`, `downgraded = false`, `rejected_quote = null`. `met` ⇒ `hint = null`.
  - `missing` ⇒ `quote = null`.
  - `downgraded = true` ⇔ `rejected_quote` ikke `null` ⇔ status er `missing` og kravet var `met`/`partial` fra modellen. Modellens hint forkastes.
- Invariantene sjekkes i Pydantic-modellen for `AnalysisResult` (en `model_validator`), slik at et brudd blir en feil i backend og ikke en feil i UI.

### H2 — Det faste hintet er norsk, mens modellens hint kan være engelske

**Par:** «Domene (sitatkontroll)» og «Prompt/LLM (språkregelen)».

- *Domenet* følger AD-4/AD-6: setter hintet til «Fant ikke belegg i CV-en for dette kravet». Backenden får sende akkurat denne brukerteksten.
- *Prompten* følger AD-8 og PRD §5: er både CV og annonse på engelsk, skrives krav og hint på engelsk.
- **Kollisjon:** En engelsk analyse får engelske hint, bortsett fra de nedgraderte, som er norske. Et tredje team (frontend) leser PRD §5 («meldingene er alltid på norsk») og mener det faste hintet er en melding, ikke et hint, og legger inn sin egen tekst, slik at teksten finnes to steder.
- **Dessuten:** AD-6 sier «backenden sender ingen brukertekster» med ett unntak. Unntaket er akkurat den typen tekst som bør ligge i frontenden.

**Forslag — stram AD-6:** Backenden sender aldri egne brukertekster. Et nedgradert krav har `hint = null` og `downgraded = true`. Frontenden eier teksten «Fant ikke belegg i CV-en for dette kravet» og viser den på norsk uansett analysespråk (den er en UI-melding etter PRD §5). Fjern unntaket i AD-6, og oppdater FR-11-testen så den sjekker `downgraded`, ikke hint-teksten.

### H3 — `counts` er for tynn, så frontenden må regne likevel

**Par:** «Backend-datamodell (`AnalysisResult`)» og «Frontend-resultatside».

- *Backenden* leverer nøyaktig feltene i konvensjonstabellen: `counts {met, partial, missing}`, `points_achieved`, `points_max`.
- *Resultatsiden* følger EXPERIENCE: fordelingsraden viser «3 krav truffet · 2 må-krav, 1 bør-krav», innholdsfortegnelsen viser antall per trinn, oversikten «nevner at kravet ble nedgradert», sidenoten «Slik er scoren regnet» forklarer poengene, og trinn 1 har en poengstripe.
- **Kollisjon:** Fordeling på type, antall nedgraderte og poeng per krav finnes ikke i svaret. Frontenden må telle og regne 2/1/0,5 selv, som AD-1 forbyr, og da kan sidenoten og scoren bli uenige. Eller så må frontenden la være, og bryter UX.
- **Gruppering:** Trinn 2–4 viser bare krav med én status. Er filtrering på `status` «sortering» etter AD-1? Én utvikler filtrerer i frontenden, en annen ber backend om tre lister.
- **Tolkning av `counts`:** Er det før eller etter sitatkontroll? AD-4 sier ikke når `counts` beregnes.
- **Type:** `points_achieved` kan være 7,5. Er det `float`, `Decimal` (serialiseres som streng i Pydantic v2!) eller halvpoeng som heltall?

**Forslag — stram datamodellen i konvensjonene:**
- `counts` beregnes etter steg 5 og har formen `{ met: {must, should, total}, partial: {...}, missing: {...}, downgraded: int }`.
- Hvert krav har `points` og `points_max` (tall).
- `points_achieved`/`points_max` er `float` med kun ,0 eller ,5 (aldri `Decimal`).
- AD-1 får en presisering: frontenden kan *filtrere* lista på `status` og må beholde rekkefølgen, men kan ikke telle, summere eller sortere. Alt som vises som tall, kommer fra svaret.

### H4 — Porten skjuler `stop_reason`, men use caset skal sjekke den, og fixture-formatet er ikke definert

**Par:** «Fixture-adapter (demomodus)» og «Testoppsett (FR-14)».

- AD-2: begge adaptere returnerer `ExtractionResult`. Porten «gir et validert modellsvar eller en feil». AD-4 steg 3: *use caset* sjekker unntak, tidsavbrudd, `stop_reason` og validering.
- *Fixture-adapter-storyen* lagrer fixtures som `ExtractionResult`-JSON (AD-2: «rå modellsvar»), validerer dem og returnerer objektet.
- *Test-storyen* trenger å teste «`stop_reason = max_tokens` → `analysis_failed`», «ukjent status» og «manglende felt». Når fixture-adapteren validerer, kaster den før use caset ser noe, og `stop_reason` finnes ikke i en `ExtractionResult`.
- **Kollisjon:** Valideringen skjer enten i adapteren eller i use caset, avhengig av hvem som leser hvilken AD. «Rå modellsvar» kan bety hele Messages-svaret (med `stop_reason` og innholdsblokker), JSON-teksten fra modellen, eller et ferdig objekt.

**Forslag — stram AD-2 med en portkontrakt:**
- `extract(cv, annonse) -> ExtractionResult`, eller kaster `ExtractionFailed(reason: Literal["timeout","api_error","stop_reason","refusal","invalid"])`. Adapteren eier oversettelsen. Use caset ser bare `ExtractionFailed` → `analysis_failed`.
- Fixture-formatet er en konvolutt: `{ "stop_reason": "end_turn", "text": "<rå JSON-tekst fra modellen>" }`. Begge adaptere bruker *samme* parse- og valideringsfunksjon (`parse_extraction(text)`), slik at de ugyldige fixturene treffer samme kode som ekte svar.
- Anthropic-adapteren testes med en mocket SDK-klient (ingen nett), for tidsavbrudd og `stop_reason`.

### H5 — `.env`, Docker og `BACKEND_URL` motsier hverandre

**Par:** «Docker» og «Konfig/sikkerhet».

- AD-11: begge tjenestene «leser den samme `.env`». AD-10: `.env` «leses bare av backenden», og frontenden har ingen hemmeligheter. En Docker-story som gir begge tjenestene `env_file: .env`, putter nøkkelen i frontend-containeren. Det følger AD-11 og bryter AD-10.
- `BACKEND_URL` har standard `http://localhost:8000` (AD-10). I Compose må frontenden bruke `http://backend:8000`. Settes det i `.env`, brytes vanlig kjøring. Settes det ikke, virker ikke Docker. «De samme portene og variablene» (AD-11) kan ikke oppfylles.
- Rewrites i `next.config` evalueres når appen bygges for produksjon (`next build`). En Dockerfile som bygger frontenden, bygger inn den `BACKEND_URL` som gjaldt da.
- `uv run fastapi dev` kjøres fra `backend/`. pydantic-settings leter etter `.env` relativt til arbeidskatalogen, så nøkkelen i rot-`.env` blir ikke funnet. Appen starter stille i demomodus selv om nøkkelen finnes.
- Leser frontenden `/api/status` i en server-komponent som prerendres, bakes `demo: true` inn ved bygg.

**Forslag — stram AD-10 og AD-11:**
- `config.py` leser `.env` med absolutt sti fra filens plassering (`Path(__file__).resolve().parents[2] / ".env"`), og logger ved oppstart om modusen er demo eller ekte (uten nøkkelen).
- I Compose får bare `backend` `env_file: .env`. `frontend` får `environment: BACKEND_URL=http://backend:8000`. Frontenden kjøres med samme kommando i begge oppsett (`npm run dev`, eller `next build`+`next start` begge steder), og rewrites leser `BACKEND_URL` ved oppstart.
- `/api/status` hentes i klienten ved hver sidelasting (eller med `dynamic = "force-dynamic"`), aldri ved bygg.

### H6 — Eksempeldataene er ikke tegn-for-tegn identiske etter turen gjennom en `<textarea>`

**Par:** «Demomodus (backend, `fixtures/example/`)» og «Frontend-inputside (Bruk eksempel)».

- *Backenden* følger AD-3: sammenligner `cv`/`annonse` tegn for tegn med filene i `fixtures/example/`, og leverer de samme filene via `GET /api/example`.
- *Frontenden* følger AD-3: legger teksten fra `/api/example` i feltene og lagrer i `sessionStorage`.
- **Kollisjon på Windows:** Gruppen jobber på Windows. Med `core.autocrlf=true` sjekkes eksempelfilene ut med `\r\n`. Backenden sender `\r\n`, `<textarea>.value` gjør det om til `\n`, og sammenligningen feiler. Sensor trykker «Bruk eksempel» → «Analyser» og får «Ekte analyse krever API-nøkkel – se README». Det er hele UJ-2. I Docker (Linux, ny klon) virker det kanskje, så AD-11 brytes også.
- Andre kilder til avvik: BOM i starten av fila, en avsluttende linjeskift som editoren legger til, at filen leses med en annen koding enn UTF-8.

> Dette er satt som høy, men det er et kritisk utfall hvis det slår til, fordi det rammer akkurat sensorens vei. Fiksen er liten.

**Forslag — stram AD-3:**
- `.gitattributes`: `backend/app/fixtures/** text eol=lf`.
- Backenden leser eksempelfilene som UTF-8 uten BOM, og normaliserer `\r\n` → `\n` både i filene og i innkommende tekst *bare for demosammenligningen*. Alt annet sammenlignes tegn for tegn, slik at FR-17 («endret ett tegn») fortsatt holder.
- En Playwright-test kjører «Bruk eksempel» → «Analyser» → resultat, og en pytest-test sjekker at `/api/example`-teksten, sendt tilbake med `\n`, gir `result`.

---

## Middels

### M1 — Avrunding med flyttall gir ulike svar i to riktige implementasjoner

**Par:** «Domene (score)» og «Testoppsett (grensetilfeller i FR-7)».

- AD-4 steg 6: `round_half_up(oppnådd / maks × 100)`, ikke `round()`. Én utvikler skriver `math.floor(x + 0.5)`, en annen `Decimal(x).quantize(…, ROUND_HALF_UP)`. Med flyttall kan `oppnådd / maks × 100` bli 89,49999… i stedet for 89,5, og rekkefølgen (`a/m*100` mot `a*100/m`) gir forskjellige biter. Det er akkurat 89,5/90-grensen som avgjør «Godt treff».
- **Forslag:** Regn i halvpoeng som heltall: `a2 = 2·oppnådd`, `m2 = 2·maks`, `match_score = (200·a2 + m2) // (2·m2)`. Ingen flyttall i scoren. En test som går gjennom alle kombinasjoner opp til for eksempel 20 krav, og sammenligner med `Fraction`.

### M2 — Utfallssvaret har ikke én form, og de genererte typene blir ulike

**Par:** «HTTP-lag (`schemas.py`)» og «Frontend-klient (`types.gen.ts`)».

- AD-6 skisserer `{ outcome: "result", result }` eller `{ outcome: "…" }`. Én backend-utvikler modellerer det som én modell med `result: AnalysisResult | None = None`, en annen som en diskriminert union med `Literal`. Den første gir TS-typen `{ outcome: string; result?: AnalysisResult | null }`, som ikke kan snevres inn. Den andre gir en union. Frontend-koden skrevet mot den ene kompilerer ikke mot den andre.
- `potential_score: int | None = None` blir valgfri i OpenAPI (`potential_score?: number | null`). Frontenden må skille «mangler» og `null`.
- FastAPI lager separate skjemaer for inn- og utdata (`…-Input`/`…-Output`) i OpenAPI 3.1, slik at typenavn kan endre seg uten at kontrakten er endret.
- `npm run gen:api` mot `/openapi.json` krever at backenden kjører. Ingen AD sier om typene genereres fra en kjørende server eller fra `app.openapi()` i et skript.
- **Forslag:** Svaret er en Pydantic-diskriminert union på `outcome` (`Annotated[Union[...], Field(discriminator="outcome")]`). Alle felt er påkrevd (også de som kan være `null`), og `null` sendes alltid eksplisitt. OpenAPI skrives til `frontend/lib/api/openapi.json` med et Python-skript uten server, og `gen:api` leser fila. En test sjekker at den committede fila er oppdatert.

### M3 — Hvem avgjør om noe er «Eksempeldata»?

**Par:** «Frontend-inputside» og «Frontend-resultatside».

- EXPERIENCE: feltene merkes «Eksempeldata» etter «Bruk eksempel», og resultatet merkes med et merke over scoren. AD-3: `/api/status` er eneste kilde til modus.
- *Inputsiden* lagrer et flagg `isExample` i `cvjobb:fields`, og fjerner det ved første tastetrykk. *Resultatsiden* sammenligner feltene med `/api/example` (en ny demosjekk i frontenden, som AD-3 vil hindre). En tredje viser merket når `demo === true` og `outcome === "result"`. Tre løsninger, og de er uenige hvis brukeren endrer ett tegn og så endrer det tilbake.
- Formen på `cvjobb:fields` er heller ikke definert (`{cv, annonse}`? med versjon? med flagg?). Input-, resultat- og «Analyser ny annonse»-storyene skriver alle til nøkkelen.
- **Forslag:** Resultatet merkes som eksempel når `demo === true` (i demomodus er alle resultater eksempelresultater, fordi alt annet gir `demo_requires_key`). Feltmerket vises når `felt === eksempeltekst` (ren likhet, ingen normalisering). Formen er `{ "v": 1, "cv": string, "annonse": string }`, og bare én modul (`frontend/lib/storage.ts`) leser og skriver den.

### M4 — Sitatkontrollens normalisering er for løst beskrevet

**Par:** «Domene (sitatkontroll)» og «Prompt (ordrette sitater)».

- «Alle mellomrom og linjeskift» kan bety `" "` og `"\n"`, eller `\s` i Python (som inkluderer NBSP, tabulator, `\r`, ` `). CV-er limt fra Word har ofte NBSP, myk bindestrek (`­`) og typografiske tegn. Modellen «retter» gjerne `–` til `-`, `’` til `'`, eller bytter mellom NFC og NFD for «å» og «ø». Ett team får strenge nedgraderinger av ekte sitater (bryter SM-C1), et annet får løse treff.
- Godtas et sitat på ett ord («Excel») eller ett tegn? Da kan modellen alltid finne et «sitat».
- **Forslag:** Definer funksjonen eksakt i AD-4: `normalize(s) = re.sub(r"\s+", " ", unicodedata.normalize("NFC", s)).strip()`, med Pythons Unicode-`\s`. Ingen endring av tegnsetting. Prompten skal be modellen kopiere tegn for tegn, også typografiske tegn. Vurder en minstelengde (for eksempel 3 ord eller 15 tegn), eller noter bevisst at det ikke finnes noen.

### M5 — Fixtures og eksempeldata har ingen tydelig eier

**Par:** «Demomodus» og «Testoppsett» (og «Prompt»).

- `backend/app/fixtures/` inneholder både eksempelsvaret for demo og ugyldige testsvar, inne i app-pakken. Fixture-adapteren i demomodus kan dermed laste et testsvar.
- EXPERIENCE krever at eksempelresultatet viser et nedgradert krav. Eksempelets rå modellsvar må altså inneholde et oppdiktet sitat. Det står ikke i noen AD, og en prompt-story som «rydder» eksempelet, fjerner det.
- Når `ExtractionResult` endres, slutter alle fixtures å validere. Ingen sier hvem som oppdaterer dem, eller om de skrives for hånd eller tas opp fra ekte Claude (som AD-7 i praksis forbyr for ekte CV-er).
- PRD §3 sier at eksempeldata brukes «i testsettet». Er eksempelet en del av §7.1-testsettet med fasit, eller bare demo?
- **Forslag:** Demo-data i `backend/app/fixtures/example/` (`cv.txt`, `annonse.txt`, `response.json`), testsvar i `backend/tests/fixtures/`. Fixture-adapteren tar én eksplisitt fil. AD-9 krever at eksempelsvaret har minst ett krav av hver status og ett nedgradert krav, og en test sjekker det. Fixtures skrives for hånd mot fiktive CV-er, og valideres i CI-lignende test (`pytest`) mot gjeldende skjema.

### M6 — Personvern gjelder bare backend-logger

**Par:** «HTTP-lag» og «Frontend-klient».

- AD-7 dekker backend-logger. Men FastAPIs standard `422`-svar inneholder `"input": <verdien>`, altså hele CV-en tilbake i svaret. En frontend som gjør `console.error(await res.json())`, eller Next dev-serverens feillogging av proxykall, får CV-teksten i nettleserkonsollen og terminalen. Unntaksmeldinger fra Pydantic (`ValidationError`) inneholder også input.
- **Forslag:** Utvid AD-7: en egen `RequestValidationError`-handler returnerer `422` uten `input`. Frontenden logger aldri forespørsels- eller svarkropper. Feil i adapteren logges med `type(e).__name__`, aldri `str(e)`.

### M7 — Resultatet lever bare i React-tilstand, men ingen har bestemt rutene

**Par:** «Frontend-inputside» og «Frontend-resultatside».

- Konvensjonene sier at resultatet bare holdes i React-tilstand, uten global butikk. Bygger én story resultatsiden som egen rute (`/resultat`), forsvinner tilstanden ved navigering og oppdatering. «Endre CV eller annonse» og «Tilbake til oversikten» kan ikke virke uten å løfte tilstanden, og «ingen global state-butikk» stenger for den vanlige løsningen.
- **Forslag:** Én rute (`/`) med en tilstandsmaskin `input → analyzing → outcome`, eller dokumentert regel: oppdatering av siden tar brukeren tilbake til input med feltene fra `sessionStorage`. Aktivt resultattrinn kan ligge i URL-hash, ikke i lagring.

---

## Lav

### L1 — Nøkkel med mellomrom eller ugyldig nøkkel

`ANTHROPIC_API_KEY=" "` er ikke tom, så appen starter i ekte modus og alle analyser gir `analysis_failed`. **Forslag:** `config.py` kjører `strip()` på nøkkelen før modusvalget. README forklarer at en ugyldig nøkkel gir «Klarte ikke å analysere» og ikke demomodus.

### L2 — shadcn-init skriver egne tokens

`npx shadcn init` legger inn sine egne CSS-variabler (`--background`, `--primary` …) i `globals.css`. Da finnes tokens to steder, mot AD-12. **Forslag:** AD-12 sier at shadcn-variablene *mappes* til DESIGN.md-tokens (`--primary: var(--color-…)`) og aldri har egne verdier.

### L3 — `potential_score` kan bli lik `match_score`

Med mange krav kan ett `partial` bør-krav (0,5 poeng) gi samme avrundede potensielle score som match-scoren. Da viser frontenden «kan nå 87 %» når brukeren er på 87 %. **Forslag:** `potential_score = null` også når den avrundede verdien er lik `match_score`. Og: hvis FR-8 kuttes, er feltet alltid `null`, men beholdes i kontrakten.

### L4 — Loggfeltene er uklare i demomodus

`model` og `tokens` finnes ikke for fixture-adapteren. **Forslag:** `model = "fixture"`, `tokens = {input: 0, output: 0}`. `tokens` er alltid et objekt med `input` og `output`.

### L5 — «Rekkefølgen fra annonsen» forutsetter at modellen bevarer den

Sorteringen i AD-4 steg 8 er stabil på modellens rekkefølge, ikke annonsens. **Forslag:** Prompten krever at kravene listes i den rekkefølgen de står i annonsen, og AD-4 sier «rekkefølgen fra modellsvaret (som skal følge annonsen)». Sorteringen bruker Pythons stabile `sorted` med nøkkelen `(status_rang, type_rang)`.

---

## Oppsummering av forslag

| ID | Forslag | Lukker |
| --- | --- | --- |
| AD-13 (ny) | Modus og adapter injiseres separat. Tester og Playwright tvinger tom nøkkel. | K1 |
| AD-4 steg 1 + AD-6 | Én eier av tom/lengde-sjekk, fast rekkefølge. `422` og transportfeil mappes til `analysis_failed`. | K2 |
| AD-14 (ny) | Inputgrensen: kodepunkter, delt konstant fra backend, frontend speiler, ingen `maxLength`. | K3 |
| AD-15 (ny) | Tidsbudsjett: SDK 60 s uten gjentak < proxy ≥ 75 s < fetch 90 s. | K4 |
| AD-4 steg 3/5 | Validator for tomt sitat og hint, og invarianttabell for `quote`/`hint`/`downgraded`/`rejected_quote`. | H1 |
| AD-6 | Ingen brukertekst fra backend. Nedgradert hint eies av frontenden. | H2 |
| Datamodell + AD-1 | Rikere `counts`, poeng per krav, `float`-poeng, filtrering tillatt. | H3 |
| AD-2 | Portkontrakt med `ExtractionFailed` og fixture-konvolutt med felles parser. | H4 |
| AD-10/AD-11 | Absolutt `.env`-sti, bare backend leser `.env`, `BACKEND_URL` per oppsett, status hentes i klienten. | H5 |
| AD-3 | `.gitattributes eol=lf`, CRLF-normalisering kun i demosjekken, E2E på «Bruk eksempel». | H6 |
| AD-4 steg 6 | Heltallsaritmetikk i halvpoeng. | M1 |
| AD-5/AD-6 | Diskriminert union, eksplisitt `null`, OpenAPI fra skript. | M2 |
| AD-3/AD-7 | Regel for eksempelmerke og form på `cvjobb:fields`. | M3 |
| AD-4 steg 5 | Eksakt `normalize()`. | M4 |
| AD-9 | Eierskap og plassering av fixtures, krav til eksempelsvaret. | M5 |
| AD-7 | `422` uten `input`, ingen kroppslogging i frontend. | M6 |
| Frontendtilstand | Én rute med tilstandsmaskin. | M7 |
