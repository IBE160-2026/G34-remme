---
title: 'Rubrikkvurdering av ARCHITECTURE-SPINE.md'
reviewed: ../ARCHITECTURE-SPINE.md
against:
  - ../../../prds/prd-G34-remme-2026-11-04/prd.md
  - ../../../ux-designs/ux-G34-remme-2026-11-15/EXPERIENCE.md
altitude: feature
date: '2026-11-16'
reviewer: uavhengig arkitekturkontrollør (Claude)
---

# Rubrikkvurdering: Architecture Spine for CV & Jobb applikasjonsassistent

## Dom

Spinen er solid og nesten klar som grunnlag for epics. Paradigmet, pipelinen (AD-4), API-flaten (AD-6) og personvernregelen (AD-7) fjerner de viktigste divergenspunktene, og alle FR-1–FR-17 har en plass. Før epics bør likevel ett kritisk og fem høye funn rettes. De gjelder porttypen `ExtractionResult`, som ikke er definert (tomme sitater slipper gjennom sitatkontrollen), tidsgrenser i proxyen og SDK-en, sammenligning av eksempeldata med ulike linjeskift, og at AD-1 motsier FR-1 og datamodellen.

## Sjekkliste

| Spørsmål | Vurdering |
| --- | --- |
| Fikser den de reelle divergenspunktene? | Stort sett. Porttypen `ExtractionResult` (K1), feltene frontenden trenger (H5), transportfeil (M1) og hvordan fixture-adapteren velger fixture (M8) er ikke låst. |
| Er hver Rule håndhevbar, og hindrer den divergensen? | De fleste. AD-1 kan ikke følges sammen med FR-1 (H4). Avhengighetsretningen i paradigmet har ingen håndheving (L2). AD-3 sin «tegn-for-tegn»-regel hindrer ikke linjeskiftavvik (H3). |
| Kan noe under Deferred gi divergens? | Ja: «Verktøy for typegenerering» (M6). Modellvalget er trygt bare hvis `effort` og `fallbacks` virker likt for begge modellene (M4). |
| Er teknologien verifisert? | Versjonene er sjekket mot npm og PyPI. API-funksjoner i AD-8 (`fallbacks`, `output_config.effort` sammen med `messages.parse`) og TypeScript 7 sammen med verktøykjeden er ikke verifisert (M4, M5). |
| Dekker den alle kapabilitetene? | FR-1–FR-17 er dekket. SM-2, SM-3, SM-5 og SM-C1 mangler plass i kartet (M7). §5 Språk er bare delvis dekket (M3). |
| Er hver dimensjon bestemt, utsatt eller åpen? | Drift og miljø er delvis dekket. Kjøremodus i Docker, låsefiler og versjonsfesting, `.env`-sti og logging-destinasjon mangler (H2, M9, L4). Kodekvalitetsverktøy (lint/format) og tilgjengelighetstesting er ikke nevnt (L2, L5). |
| Motsetninger mot PRD eller EXPERIENCE? | AD-1 mot FR-1 (H4). AD-1 mot EXPERIENCE sin fordelingsrad og «6,5 av 11 poeng» (H5). AD-6 sitt tekstansvar mot det faste hintet og PRD §5 Språk (M3). AD-11 «samme variabler» mot Docker-nettverk (H2). |

---

## Kritisk

### K1 — `ExtractionResult` er ikke definert, og et tomt sitat består sitatkontrollen

**Funn.** Porten er det viktigste divergenspunktet mellom adapterne, fixturene, testene og pipelinen, men spinen definerer bare `AnalysisResult`. Hvilke felt modellen leverer, hvilke verdier som er lovlige og hvilke valideringer som gjelder, står ingen steder. Det gir to konkrete feil:

1. AD-4 steg 5 godtar et sitat når det er en delstreng av CV-en. Den tomme strengen er delstreng av alle strenger, og det samme gjelder et sitat som bare består av mellomrom etter sammenslåing. Et krav med `met` og `quote: ""` blir derfor godkjent. FR-14 krever at et tomt sitat for `met`/`partial` gir `analysis_failed`, men det skjer bare hvis Pydantic-modellen avviser det i steg 3, og det står ikke i spinen.
2. FR-6 sier at et manglende hint for `partial`/`missing` gjør resultatet feil, og at dette skal testes automatisk. Spinen sier ikke om det skal gi `analysis_failed` eller noe annet.

Uten en felles definisjon vil fixture-forfatteren, adapterforfatteren og domeneforfatteren tolke formatet ulikt, og SM-1 kan bestå i testene selv om regelen er brutt.

**Fiks.** Legg til en AD (eller en rad i Consistency Conventions) som definerer `ExtractionResult` i `backend/app/llm/schema.py`:
- `requirements: list[ExtractedRequirement]`, der hvert krav har `text: str` (ikke tom), `type: Literal["must","should"]`, `status: Literal["met","partial","missing"]`, `quote: str | None` og `hint: str | None`.
- En modellvalidator: `met`/`partial` krever `quote` som ikke er tom etter `strip()`. `partial`/`missing` krever `hint` som ikke er tom. Brudd gir valideringsfeil og dermed `analysis_failed` i steg 3.
- `missing` med sitat: sitatet ignoreres (settes til `null`).
- Ingen tallfelt (AD-8).

Legg til i AD-4 steg 5: «Et sitat som er tomt etter normalisering, godtas aldri.» Legg til et fixture for hvert brudd i AD-9 (tomt hint i tillegg til de fire som står der).

---

## Høy

### H1 — Proxyen i Next.js har kortere tidsgrense enn analysen

**Funn.** AD-10 sender `/api/*` gjennom en rewrite i Next.js. Rewrites til en ekstern URL går gjennom en innebygd proxy som har hatt en standard tidsgrense på 30 s (`experimental.proxyTimeout`). PRD §5 sier at en analyse vanligvis tar 15–30 s og har en grense på 60 s. Er standarden fortsatt 30 s i Next.js 16, feiler en stor del av de ekte analysene i proxyen med en HTTP-feil før backenden er ferdig, og frontenden får aldri et `outcome`.

**Fiks.** Verifiser standarden i Next.js 16.4. Skriv inn i AD-10 enten at `experimental.proxyTimeout` settes til minst 75 000 ms i `next.config.ts`, eller at `/api/analyze` går via en Route Handler (`app/api/[...path]/route.ts`) med eksplisitt tidsgrense. Legg til en Playwright- eller integrasjonstest der fixture-adapteren venter 40 s.

### H2 — AD-11 «samme variabler» virker ikke i Docker, og driftsoppsettet er uavklart

**Funn.**
- I Docker Compose er `localhost` i frontend-containeren containeren selv. `BACKEND_URL` må være `http://backend:8000` i Compose og `http://localhost:8000` uten Docker. Det motsier «de samme portene og variablene».
- Rewrites i `next.config` blir lest når appen bygges hvis frontenden kjører `next build` + `next start`. Spinen sier ikke om Compose kjører `next dev` eller en produksjonsbygging, eller tilsvarende om backenden kjører `fastapi dev` eller `fastapi run`.
- `.env` ligger i prosjektroten, men `uv run fastapi dev` kjøres fra `backend/`. pydantic-settings leser `env_file` relativt til arbeidskatalogen, så nøkkelen blir ikke funnet, og appen havner i demomodus uten at noen ser hvorfor.

**Fiks.** Skriv om AD-11: Compose setter `BACKEND_URL=http://backend:8000` i `environment` for frontenden og leser `.env` med `env_file` for backenden. Velg én kjøremodus for Compose (forslag: `next dev` og `fastapi dev`, så sensor og utviklere ser det samme). Sett `BACKEND_URL` slik at den leses når appen kjører, ikke når den bygges. I AD-10 bør `config.py` finne `.env` med en sti regnet fra filens egen plassering (`Path(__file__).resolve().parents[2] / ".env"`).

### H3 — Sammenligningen av eksempeldata (FR-17) kan feile på grunn av linjeskift

**Funn.** AD-3 krever at teksten er «tegn-for-tegn identisk» med filene i `fixtures/example/`. Gruppen jobber på Windows. Med `core.autocrlf=true` sjekkes filene ut med CRLF. En `<textarea>` gjør om CRLF til LF i `.value`. Leser backenden filene binært eller med `newline=""`, sender `/api/example` CRLF, nettleseren sender LF tilbake, og sensor får «Ekte analyse krever API-nøkkel» når hen bruker selve eksemplet. Det bryter UJ-2, som er sensorens vei gjennom appen. Det samme gjelder et avsluttende linjeskift i filen.

I tillegg skal feltene merkes «Eksempeldata» (EXPERIENCE, Demomodus). Spinen sier ikke hvordan frontenden vet det. Sammenligner frontenden selv, finnes FR-17-regelen to steder.

**Fiks.** Legg til i AD-3: begge sider normaliserer linjeskift til `\n` før sammenligningen (`text.replace("\r\n", "\n")`), og alt annet sammenlignes eksakt. Legg til `.gitattributes` med `backend/app/fixtures/** text eol=lf`. Merket «Eksempeldata» vises fra «Bruk eksempel» er trykket til feltet endres (hendelsesstyrt). Det skal ikke regnes ut ved å sammenligne tekst i frontenden. En Playwright-test kjører «Bruk eksempel» → «Analyser» → resultat.

### H4 — AD-1 motsier FR-1, og tegntellingen kan gi ulike svar

**Funn.** AD-1 sier at frontenden «vurderer aldri terskler». FR-1 og EXPERIENCE krever at frontenden deaktiverer «Analyser» og viser «Teksten er for lang» ved over 15 000 tegn, og deaktiverer knappen når et felt bare har mellomrom. Regelen kan ikke følges som den står. Grensen finnes da to steder, og tellingen er ulik: JavaScript `length` teller UTF-16-enheter, Python `len` teller kodepunkter (emoji og enkelte tegn gir ulike tall). «Bare mellomrom» kan også tolkes ulikt (`trim()` i JS fjerner flere tegn enn `str.strip()` i Python for noen Unicode-tegn).

**Fiks.** Gjør et unntak i AD-1: frontenden gjør inputvalidering for brukeropplevelsen (tom/bare mellomrom og lengde), og backenden er fasit. Lås tellingen: «tegn = Unicode-kodepunkter» (`[...text].length` i JS, `len()` i Python) og «tom = ingen tegn igjen etter at Unicode-mellomrom er fjernet». La `GET /api/status` returnere `max_chars: 15000`, så grensen bare står i backenden. Linjeskift telles etter normaliseringen i H3.

### H5 — Datamodellen mangler feltene EXPERIENCE trenger, så frontenden må regne

**Funn.** AD-1 forbyr frontenden å regne. EXPERIENCE krever likevel:
- fordelingsraden «3 krav truffet · 2 må-krav, 1 bør-krav», altså antall per status og type. `counts` har bare antall per status.
- «Oversikten nevner at kravet ble nedgradert», altså antall nedgraderte krav.
- poengstripen «6,5 av 11 poeng». Spinen sier at score er heltall, men ikke hvilken type `points_achieved` og `points_max` har, og ingenting om desimalkomma.
- fire trinn som hver viser kravene med én status. Det er filtrering, og spinen sier ikke om det er lov.

To utviklere vil løse dette ulikt: den ene teller i frontenden, den andre legger til felt i backenden.

**Fiks.** Utvid `AnalysisResult`: `counts` blir `{met: {must, should}, partial: {must, should}, missing: {must, should}}` (eller legg til `counts_by_type`), og legg til `downgraded_count: int`. Bestem at `points_achieved` og `points_max` er `float` i halve poeng, og at frontenden formaterer med `Intl.NumberFormat("nb-NO")`. Skriv i AD-1 at frontenden kan *filtrere* kravene på `status` for å fordele dem på trinn, men verken telle, sortere eller regne.

### H6 — Tidsgrensen på 60 s gjelder ikke hele kallet

**Funn.** AD-4 og AD-8 setter 60 s som tidsgrense, men `anthropic`-SDK-en prøver på nytt to ganger som standard (`max_retries=2`), og tidsgrensen gjelder hvert forsøk. I verste fall venter brukeren langt over 60 s, noe som bryter FR-14, og hvert nytt forsøk koster mer. Frontenden har heller ingen egen tidsgrense.

**Fiks.** Skriv i AD-8: `max_retries=0` (eller én retry innenfor en samlet frist), og en samlet frist på 60 s for hele port-kallet (`asyncio.timeout(60)` rundt kallet, eller `timeout=60` med `max_retries=0`). Frontenden bruker `AbortSignal.timeout(70_000)` og viser FR-14-meldingen når fristen går ut.

---

## Middels

### M1 — Transportfeil har ingen regel

**Funn.** AD-6 sier at utfall er data, men sier ikke hva frontenden gjør med svar som ikke er `200` med et gyldig `outcome`: `422`, `500` fra proxyen, nettverksfeil, backend som ikke kjører, eller at `GET /api/status` feiler ved oppstart (hvilken modus vises da?).

**Fiks.** Legg til i AD-6: «Ethvert svar som ikke er `200` med et kjent `outcome`, og enhver nettverksfeil, vises som `analysis_failed`. Feiler `/api/status`, viser frontenden FR-14-meldingen og deaktiverer ‹Analyser›.» Vitest tester mappingen.

### M2 — `round_half_up` med flyttall kan runde feil

**Funn.** AD-4 steg 6 forbyr `round()`, men sier ikke hvordan divisjonen gjøres. `oppnådd / maks × 100` med flyttall kan gi for eksempel 89,49999… i stedet for 89,5, og da blir resultatet 89 og ikke 90. Det rammer akkurat 90 %-grensen i FR-10.

**Fiks.** Skriv i AD-4: poeng regnes i halve poeng som heltall (må: 4/2/0, bør: 2/1/0), og scoren regnes med heltallsaritmetikk, `(200 * a + m) // (2 * m)`, eller med `decimal.Decimal` og `ROUND_HALF_UP`. Legg grensetilfeller som gir nøyaktig x,5 inn i testene for SM-4.

### M3 — Det faste hintet bryter tekstansvaret i AD-6 og språkregelen i PRD §5

**Funn.** AD-6 sier at frontenden eier alle meldingstekster, men backenden setter «Fant ikke belegg i CV-en for dette kravet» som hint. PRD §5 krever engelske hint når både CV og annonse er på engelsk, og da blir de nedgraderte kravene på norsk. Spinen tar ikke stilling til dette.

**Fiks.** La backenden sette `downgraded: true` og `hint: null`. Frontenden viser den faste teksten når `downgraded` er sann. Da ligger all fast tekst i frontenden. Skriv i spinen at den faste teksten alltid er norsk, fordi den er grensesnitttekst, og at PRD §5 Språk bare gjelder tekst modellen skriver. Er gruppen uenig, må PRD-en avklare det.

### M4 — API-funksjonene i AD-8 er ikke verifisert

**Funn.** Versjonsnumrene er sjekket, men AD-8 bygger på API-funksjoner som ikke er bekreftet mot dokumentasjonen: `fallbacks: "default"` for refusal, `output_config.effort` sammen med `client.messages.parse()`, og om begge virker likt for Opus 5.5 og Sonnet 5.5 (som Deferred sier at kan byttes). En fallback som bytter modell, endrer også kostnaden, og loggen viser da feil modell hvis den logger `ANTHROPIC_MODEL` og ikke modellen som faktisk svarte.

**Fiks.** Lag en spike-story først i epic 1, som verifiserer kallet med SDK 2.9.0 mot begge modellene og skriver resultatet inn i AD-8. Logg `response.model` og ikke innstillingen. Skriv i AD-4 steg 3 at `stop_reason == "refusal"` gir `analysis_failed`.

### M5 — TypeScript 7.0 og verktøykjeden

**Funn.** TypeScript 7 er den nye kompilatoren skrevet i Go. Verktøy som bruker det programmatiske API-et i `typescript` (typegeneratorer som openapi-typescript, typesjekken i Next.js, typescript-eslint, deler av shadcn-CLI-en) kan mangle støtte. Spinen sier ikke at dette er sjekket.

**Fiks.** Verifiser at `next build`, `npm run gen:api` og shadcn virker med TS 7.0.2. Gjør de ikke det, fest `typescript@6.x` og noter det i Stack, eller bruk TS 7 bare for `tsc --noEmit`.

### M6 — Verktøyet for typegenerering er utsatt, men gir divergens

**Funn.** Deferred lar verktøyet være valgfritt, men AD-5 krever en committet, generert fil. Ulike verktøy gir ulike typer (navn, `null` mot `undefined`, enum mot unionstyper), og den første story-en som rører kontrakten avgjør det i praksis.

**Fiks.** Bestem verktøyet nå (forslag: `openapi-typescript`), legg det i Stack med versjon, og definer `npm run gen:api`. Typene bør kunne genereres uten at backenden kjører, for eksempel med et skript som skriver `app.openapi()` til fil.

### M7 — Suksessmål og testsett har ingen plass i arkitekturen

**Funn.** Kartet viser bare SM-1 og SM-4. SM-2, SM-3, SM-C1 (det manuelle testsettet mot ekte Claude) og SM-5 (brukertest) står ikke der. AD-9 sier at «resultatet noteres», men ikke hvor eller hvordan. Testsettet må dessuten kjøres med nøkkel, så det trenger en egen vei forbi pipelinen.

**Fiks.** Legg til rader i kartet: SM-2/SM-3/SM-C1 → `backend/scripts/run_testset.py` (kjører `analyze()` med Anthropic-adapteren mot `backend/testset/` og skriver statuser og antall per annonse til `.docs/testset-results/<dato>.md`, uten å gjenta CV-tekst), og SM-5 → manuell protokoll i `.docs/`. Fasiten lagres ved siden av testdataene.

### M8 — Hvordan fixture-adapteren velger fixture, er ikke bestemt

**Funn.** Fixture-adapteren brukes både i demomodus (alltid eksemplet) og i tester (mange gyldige og ugyldige svar). Spinen sier ikke hvordan den velger fixture eller hvordan testene bytter adapter. EXPERIENCE (Flyt 2) krever at eksempelresultatet viser et nedgradert krav, og det er ikke nevnt.

**Fiks.** Skriv i AD-2: fixture-adapteren tar en fixture-sti i konstruktøren. Demomodus bruker `fixtures/example/response.json`. Testene setter inn adapteren med FastAPI `dependency_overrides` eller direkte i `analyze()`. Skriv i AD-9 at eksempel-fixturet har minst ett krav av hver status og ett oppdiktet sitat, slik at nedgraderingen vises i demoen.

### M9 — Reproduserbar installasjon er ikke bestemt (drift og miljø)

**Funn.** PRD §5 Kjørbarhet krever at sensor kan starte appen ved å følge README. Spinen sier ikke noe om låsefiler (`uv.lock`, `package-lock.json`), festing av Python og Node (`.python-version`, `engines`/`.nvmrc`), eller Docker-baseimages. Uten dem kan sensor få andre versjoner enn dem som står i Stack.

**Fiks.** Legg til en rad i Consistency Conventions: `uv.lock` og `package-lock.json` committes. Installasjon skjer med `uv sync --frozen` og `npm ci`. Python festes i `.python-version`, Node i `package.json#engines`. Dockerfilene bruker `python:3.14-slim` og `node:26-slim` med fast minor-versjon.

### M10 — `max_tokens` 6 000 kan gi feil på lange annonser, og kostnadstaket er ikke målt

**Funn.** En annonse på 15 000 tegn med mange krav, sitater og hint kan nå 6 000 utdata-tokens. Da blir `stop_reason` `max_tokens`, og hele analysen feiler (AD-4 steg 3). At én analyse koster under 2 kr, er antatt, ikke målt.

**Fiks.** Legg til i AD-8 eller AD-9 at testsettet tar med et verste tilfelle (2 × 15 000 tegn) og logger tokens og beregnet kostnad. Juster `max_tokens` og systemprompten (korte hint) ut fra det. Skriv ned regnestykket for kostnaden ved maks input og output i spinen.

---

## Lav

### L1 — AD-4 mangler statusmerke

**Funn.** Alle andre AD-er er merket `[ADOPTED]`, men AD-4 er det ikke, og det er ikke sagt om den er foreløpig.
**Fiks.** Merk AD-4 `[ADOPTED]`, eller skriv hvorfor den er åpen.

### L2 — Avhengighetsretningen og kodestilen har ingen håndheving

**Funn.** «`domain` importerer ingenting» og «ingen modul utenfor `llm/` importerer `anthropic`» er gode regler, men ingenting sjekker dem. Lint og formatering (ruff, ESLint, Prettier) er ikke nevnt, så diffene vil variere mellom utviklere.
**Fiks.** Legg til `import-linter`-kontrakter i `pyproject.toml` og en test som kjører dem. Bestem ruff (lint og format) i backenden og ESLint og Prettier i frontenden, og legg dem i Stack.

### L3 — Stack-tabellen er ufullstendig

**Funn.** `pydantic-settings` (AD-10), `fastapi[standard]`/`fastapi-cli` (trengs for `fastapi dev`), typegeneratoren (M6) og Docker-baseimages mangler. «Docker Compose v2» er en uklar betegnelse.
**Fiks.** Legg dem til med versjoner, og skriv «Docker Compose (plugin, `docker compose`)» med minste versjon.

### L4 — Logging: destinasjon, SDK-logging og miljøvariabler

**Funn.** AD-7 er god, men det står ikke hvor loggen havner (stdout?). Det står heller ikke at `anthropic`/`httpx` ikke skal logge forespørsler (`ANTHROPIC_LOG=debug` logger hele kallet), eller at `str(ValidationError)` fra Pydantic tar med inndata (modellsvar). En `ANTHROPIC_API_KEY` som er satt globalt i operativsystemet, overstyrer `.env`, så en utvikler ser aldri demomodus.
**Fiks.** Skriv i AD-7: logg til stdout som JSON, `anthropic` og `httpx` på WARNING, og logg valideringsfeil bare med `type` og `loc`, aldri `input`. Skriv i README at en global `ANTHROPIC_API_KEY` slår av demomodus.

### L5 — WCAG 2.2 AA blir ikke testet

**Funn.** EXPERIENCE krever WCAG 2.2 AA, men AD-9 har ingen tilgjengelighetstest.
**Fiks.** Legg `@axe-core/playwright` til i Playwright-testene for input, resultat og meldinger.

### L6 — sessionStorage kan overleve at fanen lukkes

**Funn.** Når en lukket fane gjenåpnes (Ctrl+Shift+T) eller en fane dupliseres, kan nettleseren gjenopprette sessionStorage. FR-2 sier at feltene er tomme «neste gang» etter at fanen er lukket.
**Fiks.** Godta avviket og skriv det ned i AD-7, siden det bare gjelder gjenoppretting, ikke en ny fane.

### L7 — Små hull i kjøremiljøet

**Funn.** Det står ikke hvor README-lenken i demobanneret peker (fil i repoet eller GitHub-URL). Det står heller ikke om porten til backenden er åpen på alle nettverkskort i Compose, eller om `frontend` venter på `backend` (`depends_on`/healthcheck).
**Fiks.** Bind portene til `127.0.0.1` i Compose, legg til `depends_on` med healthcheck på `/api/status`, og bestem målet for lenken (repo-URL i en konstant).

---

## Det som fungerer godt

- AD-4 låser rekkefølge, avrunding (forbud mot `round()`), sitatnormalisering og sortering konkret nok til å teste.
- AD-2 og AD-9 sørger for at demo og tester går gjennom samme pipeline som ekte analyser. Det oppfyller UJ-2 «nøyaktig samme oppbygning».
- AD-6 med utfall som data og AD-5 med genererte typer fjerner de vanligste divergensene mellom frontend og backend.
- AD-12 løser det åpne punktet i EXPERIENCE om UI-system, og rekkefølgen ved konflikt stemmer med EXPERIENCE.
- Deferred-listen er ellers trygg: v2-funksjoner, bruddpunktet under 1280 px og CI påvirker ikke grensene mellom enhetene.
