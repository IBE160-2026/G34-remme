---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - .docs/planning-artifacts/prds/prd-G34-remme-2026-11-04/prd.md
  - .docs/planning-artifacts/architecture/architecture-G34-remme-2026-11-16/ARCHITECTURE-SPINE.md
  - .docs/planning-artifacts/ux-designs/ux-G34-remme-2026-11-15/DESIGN.md
  - .docs/planning-artifacts/ux-designs/ux-G34-remme-2026-11-15/EXPERIENCE.md
---

# CV & Jobb applikasjonsassistent (G34-remme) – Epics og stories

## Overview

Dokumentet deler kravene i PRD-en, UX-designet (DESIGN.md + EXPERIENCE.md) og arkitekturen (ARCHITECTURE-SPINE.md) inn i epics og stories som kan implementeres.

## Requirements Inventory

### Functional Requirements

FR1: Brukeren kan lime inn én CV i «Lim inn CV her:» og én annonse i «Lim inn annonse her:», og starte med «Analyser». Hjelpeteksten «Bare en CV og en annonse per analyse» vises. «Analyser» er deaktivert når et felt er tomt eller bare har mellomrom. Hvert felt godtar maks 15 000 tegn. Over det vises «Teksten er for lang», og «Analyser» er deaktivert.
FR2: Feltene beholder innholdet så lenge fanen er åpen. Etter en analyse er begge fortsatt utfylt. Annonsefeltet tømmes først ved «Analyser ny annonse». Lukkes fanen, er feltene tomme. Ingen CV- eller annonsetekst lagres på server eller i filer.
FR3: Inputsiden viser «CV-en din sendes til Claude for analyse. Appen lagrer den ikke.» før brukeren trykker «Analyser».
FR4: Appen trekker ut alle krav fra annonsen og merker hvert som må-krav eller bør-krav ut fra ordene i annonsen. Krav uten slike ord er bør-krav. Et enten-eller-krav er ett krav. Dekningen måles med SM-2.
FR5: Hvert krav får status truffet, delvis truffet eller mangler. Truffet og delvis truffet har et sitat fra CV-en. Et krav uten sitat kan ikke være truffet eller delvis truffet. Et må-krav som mangler, blir aldri truffet.
FR6: Hvert krav som er delvis truffet eller mangler, har et forbedringshint som viser til innhold i CV-en (formulere tydeligere eller flytte høyere opp), uten ferdig omskrevne setninger og uten forslag om ny erfaring. Finnes det ikke noe relevant, sier hintet det rett ut. Hintet er aldri tomt.
FR7: Koden beregner match-scoren (må 2/1/0, bør 1/0,5/0) som oppnådde ÷ maks × 100, avrundet til nærmeste hele prosent, etter sitatkontrollen. Alle krav truffet gir 100 %. Samme kravliste gir alltid samme score. Ved 0 krav beregnes ingen score.
FR8 (bør): Potensiell score beregnes som om alle delvis truffede krav var truffet (krav som mangler, telles ikke). Den vises bare når det finnes delvis truffede krav.
FR9: Resultatsiden viser scoren øverst, deretter truffet → delvis → mangler, og må-krav før bør-krav innen hver status. Hvert krav er merket med type og viser sitat (truffet/delvis) og hint (delvis/mangler). Potensiell score vises under scoren.
FR10: Ved en avrundet score på 90 % eller mer spør appen «Godt treff, klar til å søke?». «Ja» viser «Analyser ny annonse», som tømmer annonsefeltet og beholder CV-en. «Nei» lar brukeren bli og forbedre CV-en. Under 90 % vises ikke spørsmålet.
FR11: Koden sjekker at hvert sitat finnes ordrett i CV-en (mellomrom og linjeskift regnes ikke som avvik), før scoren beregnes. Et krav med sitat som ikke finnes, blir mangler med hintet «Fant ikke belegg i CV-en for dette kravet». Kontrollen kjøres på alle analyser og testes automatisk.
FR12: Finner appen ingen krav, vises «Ingen krav funnet, har du husket annonsen?» i stedet for resultat. Ingen score vises, og feltene er fortsatt utfylt.
FR13: Mens analysen pågår, vises «Analyserer …», og «Analyser» er deaktivert.
FR14: Feiler analysen (API svarer ikke, ugyldig nøkkel, tidsgrensen på 60 s nås, eller modellsvaret kan ikke tolkes som en kravliste), vises «Klarte ikke å analysere, prøv igjen». Ingen delvise resultater vises, feltene er utfylt, og «Analyser» er tilgjengelig igjen.
FR15: Uten API-nøkkel i `.env` viser inputsiden banneret «Demomodus – ingen API-nøkkel funnet».
FR16: I demomodus fyller «Bruk eksempel» feltene med eksempeldata, og «Analyser» viser det ferdige resultatet med samme oppbygning som en ekte analyse, tydelig merket som eksempeldata.
FR17: I demomodus gir egen tekst (alt som ikke er helt identisk med eksempeldataene) meldingen «Ekte analyse krever API-nøkkel – se README» i stedet for et resultat.

### NonFunctional Requirements

NFR1 (Språk): Grensesnitt og meldinger er alltid på norsk. CV og annonse kan være på norsk eller engelsk. Er begge på engelsk, skrives krav og hint på engelsk, ellers på norsk.
NFR2 (Plattform): Nettside som kjøres lokalt og brukes i nettleser på PC. Mobil er ikke et krav i v1.
NFR3 (Kjørbarhet): Appen startes lokalt etter README, uten betalte kontoer og uten gruppens nøkler. Nøkkelen settes i `.env` etter `.env.example`. Uten nøkkel starter appen i demomodus.
NFR4 (Kostnad): Claude via Anthropics API, maks 2 kr per analyse. Modellen er et arkitekturvalg (standard Opus 5.5).
NFR5 (Testing): Automatiske tester av FR-5, FR-7, FR-10, FR-11 og FR-14 kjøres mot lagrede modellsvar (også ugyldige) uten API-nøkkel. Testsettet kjøres manuelt mot ekte modell.
NFR6 (Ytelse): En analyse tar vanligvis 15–30 s, med tidsgrense på 60 s.
NFR7 (Inputlengde): Maks 15 000 tegn per felt.
NFR8 (Personvern): CV- og annonsetekst lagres ikke. Brukeren får vite at CV-en sendes til Claude. `.env` er utenfor Git. Repoet har bare fiktive CV-er.
NFR9 (SM-1): 100 % av sitatene for truffet/delvis finnes ordrett i CV-en, kontrollert automatisk.
NFR10 (SM-2): For 5 ekte trainee-annonser finner appen alle må-krav i minst 4 av 5, og bommer på maks 1 må-krav i én annonse.
NFR11 (SM-3): For 3 fiktive CV-er får minst 70 % av kravene riktig status, og et må-krav som mangler, blir aldri truffet.
NFR12 (SM-4): Automatiske tester av scoreformelen og grensetilfellene består.
NFR13 (SM-5): En medstudent kan ut fra resultatsiden alene peke på minst 1 konkret endring innen 5 minutter.
NFR14 (SM-C1): Antall krav markert som truffet avviker maks 20 % fra fasiten, summert over de 3 CV-ene.
NFR15 (Tilgjengelighet): WCAG 2.2 AA (EXPERIENCE.md).

### Additional Requirements

Fra ARCHITECTURE-SPINE.md (final). Det er ingen starter-mal. Prosjektet settes opp som monorepo fra bunnen. Epic 1, story 1 setter opp skjelettet.

- AR1 (AD-11, Structural Seed): Monorepo med `backend/` (FastAPI, uv, Python 3.14, `.python-version`, `requires-python >=3.14,<3.15`) og `frontend/` (Next.js 16, Node 26 LTS, `engines`), `docker-compose.yml`, `.env.example`, `.gitattributes` og README. Låsefiler committes (`uv sync --frozen`, `npm ci`).
- AR2 (AD-11): `docker compose up` starter backend (`fastapi run --host 0.0.0.0 --port 8000`, `env_file: .env`) og frontend (`next dev -p 3000`, `BACKEND_URL=http://backend:8000`, uten `env_file`). Porter på 127.0.0.1, healthcheck mot `/api/status`. Uten Docker: `uv run fastapi dev` og `npm run dev`.
- AR3 (AD-2, Design Paradigm): Hexagonal backend med `domain/`, `analysis/`, `llm/` (port, `anthropic_adapter`, `fixture_adapter`), `api/`, `config.py` og `main.py`. Avhengighetsretningen håndheves med import-linter.
- AR4 (AD-2): Portkontrakt: `extract(cv, annonse) -> Extraction` (`{result: ExtractionResult, model: str, usage: {input_tokens, output_tokens} | null}`) eller `ExtractionFailed(reason, usage)`. Felles `parse_extraction(text)`. Fixture-konvolutten er `{stop_reason, text}`, og fixture-adapteren får sti i konstruktøren.
- AR5 (AD-3): Demomodus når `ANTHROPIC_API_KEY.strip()` er tom. `demo` og `extractor` injiseres separat fra app-fabrikken. Eksempeldata i `backend/app/fixtures/example/` (cv.txt, annonse.txt, response.json) med `eol=lf`. Demosammenligningen normaliserer `\r\n`.
- AR6 (AD-4): Analysepipelinen i fast rekkefølge: tom/lengde → demosjekk → extract → 0 krav → sitatkontroll med eksakt `normalize()` → heltallsscore → potensiell score (null også når den er lik scoren) → stabil sortering → `show_good_match` → `counts`. Invarianttabellen for quote, hint, downgraded og rejected_quote gjelder.
- AR7 (AD-5): Pydantic i `api/schemas.py` er kontrakten. `scripts/export_openapi.py` skriver `frontend/lib/api/openapi.json`, og `npm run gen:api` genererer `types.gen.ts` med openapi-typescript. En test sjekker at `openapi.json` er oppdatert.
- AR8 (AD-6): `GET /api/status` → `{demo, max_chars}`. `GET /api/example` (bare demo). `POST /api/analyze` → alltid 200 med en diskriminert union på `outcome` (`result` | `empty_input` | `text_too_long` | `demo_requires_key` | `no_requirements` | `analysis_failed`). `422` bare for feil form, uten `input`. Backenden sender ingen egne brukertekster.
- AR9 (AD-7): Ingen database. `frontend/lib/storage.ts` eier `cvjobb:fields` `{v:1, cv, annonse}`. Backendlogg som JSON til stdout uten innhold. `anthropic`/`httpx` på WARNING. Unntak logges med typenavn. Frontenden logger ikke kropper.
- AR10 (AD-8): `Anthropic(timeout=60, max_retries=0)`, `client.beta.messages.parse(... output_format=ExtractionResult, output_config={"effort":"medium"}, max_tokens=6000, betas=["server-side-fallback-2026-07-01"], fallbacks="default")`. Modellen kommer fra `ANTHROPIC_MODEL` (standard `claude-opus-5-5`). `stop_reason`/`refusal` gir feil. Systemprompten følger reglene i AD-8.
- AR11 (AD-9): pytest med `ANTHROPIC_API_KEY=""` og en autouse-sperre mot ekte klient. Testfixtures i `backend/tests/fixtures/` (gyldige og ugyldige). Mocket SDK-klient for adapteren. Eksempelsvaret har alle statuser og ett oppdiktet sitat. Scoretest mot `Fraction`. Grensetester for `MAX_CHARS` i pytest og Vitest. Playwright i demomodus med axe. `scripts/run_testset.py` og `backend/testset/` skriver resultater til `.docs/testset-results/`.
- AR12 (AD-10): `.env` i roten leses bare av backenden, med absolutt sti. `.env.example` dokumenterer `ANTHROPIC_API_KEY` og `ANTHROPIC_MODEL`. `BACKEND_URL` for Next-rewrite.
- AR13 (AD-12): DESIGN.md-tokens i `frontend/app/globals.css` (Tailwind v4 `@theme`). shadcn-variablene peker på dem.
- AR14 (AD-13): Ett tegn er ett kodepunkt (`len` / `Array.from().length`). `MAX_CHARS` bare i backenden, og frontenden får den fra `/api/status`. Ingen `maxLength` på textarea.
- AR15 (AD-14): Tidsbudsjett: SDK 60 s, Next `experimental.proxyTimeout: 75000` (må verifiseres for 16.4), og `fetch` med `AbortSignal.timeout(90_000)`. Brudd gir meldingen for `analysis_failed`.
- AR16 (AD-15): Én rute `/` med tilstandene `input → analyzing → outcome`. Aktivt trinn i URL-hash (`#oversikt`, `#bra`, `#tydeligere`, `#mangler`, `#alt`). Ved omlasting tilbake til input med feltene fra `sessionStorage`.
- AR17 (Konvensjoner): Kode og API på engelsk, brukertekst på norsk. `snake_case` i JSON. `AnalysisResult` med `counts {met|partial|missing: {must, should, total}, downgraded}`, og poeng per krav. Kodestil: ruff, ESLint og Prettier.

### UX Design Requirements

- UX-DR1 (Tokens): Implementer DESIGN.md-tokens i `globals.css`: 18 farger (paper, field, ink, on-ink, ink-muted, rule, rule-soft, field-border, highlight, toc-active, status-met/partial/missing, clay, disabled, on-disabled, demo-band, selection), typografi (score 64, display 48, headline 30, lede 25, title 22, quote 17 kursiv serif, body 16, label 15/600, meta 13), Georgia-serif og Segoe UI-grotesk som systemfont-stakker, rounded (sm 3, DEFAULT 4), spacing 4–64 og page-margin 120.
- UX-DR2 (Knapper): Primær (blekk/papir, 48 px, innholdsbredde), sekundær (blekkramme), deaktivert (flat), og tilbakelenke i leire med pil og understrek.
- UX-DR3 (Tekstfelt og tegnteller): Felt med `field-border`, fokus i blekk, og feiltilstand med teglkant og tegl teller «357 / 15 000 tegn». «Teksten er for lang» er koblet med `aria-describedby`.
- UX-DR4 (Stegindikator og sammenslått steg): CV – Annonse – Analyser, venstrejustert. Ferdig steg er fylt med hake, aktivt steg har dobbel ring. Et ferdig steg blir en rad med hake, første linje, teller og «Endre». «Neste: Annonse» slår sammen steg 1.
- UX-DR5 (Inputsiden): To spalter. Til venstre presentasjonen med fire prinsipper («Ett steg om gangen», «Sitater som bevis», «Aldri finn på erfaring», «Det positive først»). Til høyre veiviseren. Bunntekst «Laget av gruppe G34, IBE160 · Ingen innlogging. CV og annonse lagres ikke.»
- UX-DR6 (Analyserer): «Analyserer …» i knappen. «Analyser» og «Endre» er deaktivert, og feltene er synlige.
- UX-DR7 (Resultatlayout): Tre marger: venstre (innholdsfortegnelse og «← Endre CV eller annonse»), lesekolonne 640 px og høyre (sidenoter).
- UX-DR8 (Innholdsfortegnelse): «Gjennomgang» med Oversikt (score), Dette er bra, Dette kan bli tydeligere og Dette mangler, med statustegn og antall. Aktivt trinn har `toc-active` og `aria-current="step"`. Lenke til «Vis alt på én side» / «Vis ett trinn om gangen».
- UX-DR9 (Oversikt, trinn 1): «Du er på X %.» i score-typografi, FR-8-ingress, «Match-score mot …», poengstripe (én bit per krav, må dobbel bredde, fylt/halvfylt/stiplet) med «X av Y poeng», fordelingsrader (klikkbare til trinn), «Neste: Dette er bra» og prikker «Trinn 1 av 4».
- UX-DR10 (Kravkomponent): Typemerke (må fylt, bør omriss), statustegn (fylt/halvfylt/tom sirkel) og statusord, kravtittel i serif, sitat i kursiv serif med markørstrek, og «Forbedringshint» i statusfarge. Krav skilles med hårfine linjer.
- UX-DR11 (Trinn 2–4): «Dette er bra.», «Dette kan bli tydeligere.» og «Dette mangler.» med ingress, krav, og «Forrige/Neste»-navigasjon. Fokus flyttes til trinnoverskriften.
- UX-DR12 (Avslutning av «Dette mangler»): «Ferdig med gjennomgangen.», teksten om å redigere og lime inn på nytt med «Endre CV eller annonse», en primærknapp «Endre CV eller annonse», og sekundærknappene «Forrige: Dette kan bli tydeligere» og «Tilbake til oversikten».
- UX-DR13 (Sidenoter): «Slik er scoren regnet» og «Sitatkontrollen» (nedgradert krav med det avviste sitatet) i høyre marg.
- UX-DR14 (Godt treff): Spørsmålet i serif mellom to blekklinjer, med Ja (primær) og Nei (sekundær). Etter Ja: «Analyser ny annonse».
- UX-DR15 (Meldinger): En rolig serif-setning mellom to hårfine linjer der resultatet ellers ville stått (FR-12, FR-14, FR-17), ikke en farget boks.
- UX-DR16 (Demomodus): Demobanner (`demo-band`, infoikon, README-lenke), «Bruk eksempel» øverst i veiviseren, «Eksempeldata»-merker på feltene og over scoren, og en loddrett marglinje «EKSEMPELDATA · IKKE DIN EGEN TEKST».
- UX-DR17 (Tilgjengelighet): WCAG 2.2 AA. Tab-rekkefølge som leserekkefølge, `aria-live="polite"` for «Analyserer …», meldinger og ny score, poengstripen som pynt med tekstekvivalent, og den loddrette demolinjen som pynt.
- UX-DR18 (Tone): Mikrotekst etter Voice and Tone-tabellen i EXPERIENCE.md: hele setninger, ingen utropstegn eller emoji, og PRD-tekstene ordrett.
- UX-DR19 (Do's and Don'ts): Ingen skygger, gradienter, kort i kort eller fargede statusbakgrunner. Status vises alltid med både tegn og ord. Ikoner tegnes med én strektykkelse.

### FR Coverage Map

FR1: Epic 1 – Innliming, maks 15 000 tegn, deaktivert «Analyser»
FR2: Epic 1 – Feltene beholdes i fanen (sessionStorage)
FR3: Epic 1 – Personvernvarsel
FR4: Epic 2 – Kravuttrekk med må/bør (prompt og skjema)
FR5: Epic 2 – Status med sitat fra Claude (visning og kontroll i Epic 1)
FR6: Epic 2 – Forbedringshint fra Claude (visning og validering i Epic 1)
FR7: Epic 1 – Match-score i kode
FR8: Epic 1 – Potensiell score
FR9: Epic 1 – Rekkefølge og innhold på resultatsiden
FR10: Epic 1 – Godt treff og «Analyser ny annonse»
FR11: Epic 1 – Sitatkontroll og nedgradering
FR12: Epic 1 – Ingen krav funnet
FR13: Epic 1 – Venting («Analyserer …»)
FR14: Epic 2 – Feil i analysen (API, tid, ugyldig svar). Meldingen og den generelle feilveien finnes fra Epic 1.
FR15: Epic 1 – Demobanner
FR16: Epic 1 – Bruk eksempel og eksempelresultat
FR17: Epic 1 – Egen tekst i demomodus
NFR1, NFR4, NFR6: Epic 2 · NFR2, NFR3, NFR7, NFR8: Epic 1 · NFR5, NFR12: Epic 1 (grunnlag) og Epic 2 · NFR9–NFR11, NFR13–NFR15: Epic 3

## Epic List

### Epic 1: Hele flyten fungerer med eksempeldata
Sensor og Yvonne kan starte appen (Docker Compose eller uv og npm) og gå gjennom hele flyten i demomodus uten nøkkel og uten kostnad: innliming i steg, analyse, oversikt med score, tre trinn med sitater og hint, sitatkontroll, Godt treff og alle meldinger.
**FRs covered:** FR1, FR2, FR3, FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR15, FR16, FR17 (+ visning og kontroll av FR5 og FR6)

### Epic 2: Ekte analyse av egen CV med Claude
Yvonne legger inn API-nøkkelen og får en ekte analyse av sin egen CV fra Claude, med krav, status, ordrette sitater og hint, innenfor 60 s og 2 kr, og en tydelig melding når noe går galt.
**FRs covered:** FR4, FR5, FR6, FR14 (+ NFR1, NFR4, NFR6)

### Epic 3: Kvalitetssikret og klar til innlevering
Gruppen kan dokumentere at appen gjør det PRD-en lover (testsett, modellvalg, tilgjengelighet og brukertest), og sensor kan starte og vurdere appen ut fra README.
**FRs covered:** Ingen nye FR. Dekker NFR9–NFR15 (SM-1 til SM-5, SM-C1, WCAG 2.2 AA)

## Epic 1: Hele flyten fungerer med eksempeldata

Sensor og Yvonne kan starte appen med Docker Compose eller med uv og npm, og gå gjennom hele flyten i demomodus uten nøkkel og uten kostnad: innliming i steg, analyse, oversikt med score, tre trinn med sitater og hint, sitatkontroll, Godt treff og alle meldinger. Domenekjernen, pipelinen og API-kontrakten som Epic 2 kobler Claude til, er ferdige og testet.

### Story 1.1: Skjelett som starter i demomodus

As a sensor uten API-nøkkel,
I want å klone repoet og starte appen med én kommando,
So that jeg ser at appen kjører i demomodus uten nøkkel og uten kostnad.

**Acceptance Criteria:**

**Given** et nyklonet repo uten `.env`
**When** utvikleren ser på rotkatalogen
**Then** den har `backend/` (FastAPI, `pyproject.toml` med `requires-python = ">=3.14,<3.15"`, `.python-version` = 3.14, `uv.lock`), `frontend/` (Next.js 16, `package.json#engines.node` = `>=26`, `package-lock.json`), `docker-compose.yml`, `.env.example`, `.gitattributes`, `.gitignore` og `README.md` (AR1, AD-11)
**And** `backend/app/` har pakkene `domain/`, `analysis/`, `llm/` og `api/` samt `config.py` og `main.py`, selv om de fleste er tomme ennå (AR3)
**And** `.gitignore` inneholder `.env`, og `.gitattributes` setter `backend/app/fixtures/** text eol=lf` (AR5, AD-10)

**Given** `.env.example` i prosjektroten
**When** utvikleren åpner fila
**Then** den dokumenterer `ANTHROPIC_API_KEY` (tom) og `ANTHROPIC_MODEL` (standard `claude-opus-5-5`) med en kort norsk kommentar per variabel (AR12, NFR3)
**And** `backend/app/config.py` leser `.env` med pydantic-settings fra den absolutte stien `Path(__file__).resolve().parents[2] / ".env"`, og `MAX_CHARS = 15000` er definert bare i backenden (AD-10, AD-13)

**Given** at `ANTHROPIC_API_KEY` mangler, er tom eller bare har mellomrom
**When** backenden starter
**Then** `GET /api/status` svarer `200` med `{"demo": true, "max_chars": 15000}` (FR15, AD-3, AD-6)
**And** oppstartsloggen skriver modusen som JSON til stdout uten å ta med nøkkelen (AD-3, AD-7)
**And** med en ikke-tom nøkkel svarer `/api/status` `{"demo": false, "max_chars": 15000}`

**Given** Docker og en `.env` uten nøkkel (eller ingen `.env` i det hele tatt)
**When** utvikleren kjører `docker compose up`
**Then** `backend` kjører `fastapi run --host 0.0.0.0 --port 8000` med `env_file: .env`, og `frontend` kjører `next dev -p 3000` med `BACKEND_URL=http://backend:8000` og uten `env_file` (AR2, AD-11)
**And** begge portene er bundet til `127.0.0.1`, `frontend` venter på en healthcheck mot `/api/status`, og Dockerfilene bruker `python:3.14-slim` og `node:26-slim`
**And** uten Docker starter `uv run fastapi dev` i `backend/` og `npm run dev` i `frontend/` den samme appen på de samme portene, med `uv sync --frozen` og `npm ci` som installasjon

**Given** at frontenden kjører
**When** nettleseren laster `/`
**Then** frontenden henter `/api/status` i nettleseren ved hver sidelasting (aldri ved bygg) gjennom Next-rewriten av `/api/*` til `BACKEND_URL` i `next.config.ts` (AD-3, AD-10)
**And** `next.config.ts` har bare rewriten, og `experimental.proxyTimeout` verifiseres og settes i story 2.3 (AD-14)
**And** når `demo` er `true`, vises banneret «Demomodus – ingen API-nøkkel funnet» som et helt bånd i `demo-band` med infoikon (1,5 px strek) og en lenke til README, der lenkemålet er én konstant i `frontend/lib/messages.ts` (FR15, UX-DR16)
**And** når `demo` er `false`, vises ikke banneret

**Given** `frontend/app/globals.css`
**When** utvikleren ser på temaet
**Then** alle 18 fargene, typografinivåene (score 64 … meta 13), Georgia- og Segoe UI-stakkene, `rounded` (sm 3, DEFAULT 4), spacing 4–64 og `page-margin` 120 fra DESIGN.md er definert én gang i Tailwind v4 `@theme` (UX-DR1, AR13, AD-12)
**And** shadcn-variablene (`--background`, `--primary` …) peker bare på disse tokenene og har ingen egne verdier
**And** siden bruker `paper` som bakgrunn, uten skygger eller gradienter, og ingen fonter lastes ned (UX-DR19)

**Given** skjelettet
**When** utvikleren kjører `uv run ruff check`, `uv run ruff format --check`, `uv run pytest`, `npm run lint` og `npx prettier --check .`
**Then** alle består uten feil (AR17)
**And** pytest kjører med `ANTHROPIC_API_KEY=""` satt i miljøet, og en test for `/api/status` består (AD-9)
**And** import-linter-kontraktene i `pyproject.toml` (domain importerer ingen andre lag, bare `llm/` kan importere `anthropic`, avhengigheter følger api → analysis → domain/llm.port) kjøres som en pytest-test og består (AR3)

**Given** README-en
**When** sensor følger den fra start
**Then** den forklarer start med `docker compose up` og uten Docker (`uv sync --frozen` + `uv run fastapi dev`, `npm ci` + `npm run dev`), at appen åpnes på `http://127.0.0.1:3000`, at den starter i demomodus uten nøkkel, og hvordan nøkkelen legges i `.env` etter `.env.example` (NFR3, UJ-2)

### Story 1.2: Domenekjernen: sitatkontroll, score, potensiell score, sortering og counts

As a utvikler i gruppen,
I want en ren og testet domenekjerne som avgjør sitatkontroll, poeng, score, rekkefølge og telling,
So that alle tall og all rekkefølge i appen bestemmes ett sted og alltid gir samme svar.

**Acceptance Criteria:**

**Given** modulen `backend/app/domain/`
**When** import-linter kjøres
**Then** domenet importerer ingenting fra `analysis`, `llm`, `api`, `config`, `main`, `fastapi` eller `anthropic`, og gjør ingen I/O (AD-2, AR3)
**And** domenet har en kravmodell med `text`, `type` (`must`|`should`), `status` (`met`|`partial`|`missing`), `quote`, `hint`, `downgraded` og `rejected_quote`

**Given** `normalize(s)`
**When** den kalles
**Then** den er nøyaktig `re.sub(r"\s+", " ", unicodedata.normalize("NFC", s)).strip()` (AD-4 steg 5)
**And** tester viser at ulike mellomrom, tabulatorer, `\n`, `\r\n` og NFD-tegn (for eksempel «å» som `a` + kombinerende ring) gir samme resultat som NFC-teksten med enkle mellomrom

**Given** et krav med `met` eller `partial` og en CV
**When** sitatkontrollen kjøres
**Then** sitatet godtas når `normalize(quote)` er en delstreng av `normalize(cv)`, også når sitatet har andre linjeskift og mellomrom enn CV-en (FR11)
**And** sitatet avvises når store og små bokstaver eller tegnsetting avviker, og det finnes ingen minstelengde
**And** et avvist krav blir `status = missing`, `quote = null`, `hint = null`, `downgraded = true` og `rejected_quote` = det avviste sitatet, mens godkjente krav og krav som mangler fra modellen, beholder `downgraded = false` og `rejected_quote = null` (FR11, AD-4-invarianttabellen)
**And** en test går gjennom alle fire radene i invarianttabellen (met, partial, missing fra modellen, missing nedgradert)

**Given** en kravliste etter sitatkontrollen
**When** poeng og score regnes
**Then** halvpoengene er heltall (må 4/2/0, bør 2/1/0), og `match_score = (200·a2 + m2) // (2·m2)` uten flyttall og uten `round()` (FR7, AD-4 steg 6)
**And** alle krav truffet gir 100, ett må-krav delvis truffet gir under 100, og ett bør-krav som mangler, gir under 100
**And** en avrunding på nøyaktig ,5 går opp (for eksempel 89,5 % → 90), og 89,6 % gir 90
**And** samme liste gir samme score ved gjentatte kall, og en tom liste gir ingen score (funksjonen kalles ikke eller avviser 0 krav eksplisitt) (FR7, FR12)
**And** en test sammenligner `match_score` med `Fraction`-basert avrunding (halv opp) for alle kombinasjoner av type og status opp til 20 krav (NFR12, AD-9)

**Given** en kravliste etter sitatkontrollen
**When** den potensielle scoren regnes
**Then** den regnes med samme formel der `partial` teller som `met`, og `missing` (også nedgradert) fortsatt gir 0 (FR8, AD-4 steg 7)
**And** den er `null` når det ikke finnes `partial`-krav, og `null` når den blir lik `match_score`

**Given** en kravliste i modellens rekkefølge
**When** den sorteres
**Then** `sorted` med nøkkelen `(status_rang, type_rang)` gir `met` → `partial` → `missing` og `must` før `should` innen hver status, og ellers modellens rekkefølge (stabil sortering) (FR9, AD-4 steg 8)
**And** en test med to krav av samme status og type viser at den opprinnelige rekkefølgen beholdes

**Given** den sorterte listen og scoren
**When** `show_good_match` og `counts` regnes
**Then** `show_good_match` er `match_score >= 90` (89 gir `false`, 90 gir `true`) (FR10, AD-4 steg 9)
**And** `counts` er `{met: {must, should, total}, partial: {…}, missing: {…}, downgraded}`, regnet etter sitatkontrollen, slik at et nedgradert krav telles under `missing` og i `downgraded` (AR17)
**And** hvert krav får `points` og `points_max`, og resultatet har `points_achieved` og `points_max` som tall med bare ,0 eller ,5

### Story 1.3: Analysepipeline med fixture-tilkobling og API-kontrakt

As a utvikler i gruppen,
I want en pipeline som går fra CV og annonse til et ferdig utfall gjennom én port, med en fixture-adapter og en fast API-kontrakt,
So that demomodus og alle tester kjører nøyaktig samme vei som en ekte analyse, uten nett og uten nøkkel.

**Acceptance Criteria:**

**Given** `backend/app/llm/port.py`
**When** en adapter implementerer porten
**Then** porten er `extract(cv, annonse) -> Extraction`, der `Extraction` er `{result: ExtractionResult, model: str, usage: {input_tokens, output_tokens} | null}`, og kaster `ExtractionFailed(reason, usage=None)` med `reason` i `timeout`, `api_error`, `stop_reason`, `refusal` eller `invalid` (AR4, AD-2)
**And** `FixtureExtractor` returnerer `model: "fixture"` og `usage: null`
**And** `ExtractionResult` er `{requirements: [{text, type, status, quote, hint}]}` i annonsens rekkefølge
**And** `parse_extraction(text)` kaster `ExtractionFailed("invalid")` for ugyldig JSON, manglende felt, ukjent `type` eller `status`, `met`/`partial` med `quote` som er `null` eller bare mellomrom, og `partial`/`missing` med `hint` som er `null` eller bare mellomrom (FR5, FR6, AD-4 steg 3)

**Given** `FixtureExtractor(path)` i `backend/app/llm/fixture_adapter.py`
**When** den kalles
**Then** den leser bare fila den fikk i konstruktøren, som en konvolutt `{"stop_reason", "text"}` i UTF-8 uten BOM, og sender `text` til `parse_extraction` (AR4)
**And** `stop_reason` ≠ `end_turn` gir `ExtractionFailed("stop_reason")`, og en fil som mangler eller ikke er en gyldig konvolutt, gir `ExtractionFailed("invalid")`

**Given** `analyze(cv, annonse, demo, extractor)` i `backend/app/analysis/`
**When** den kjøres
**Then** den følger AD-4 i rekkefølge og stopper ved første utfall: `empty_input` (et felt med `strip() == ""`) → `text_too_long` (mer enn `MAX_CHARS` kodepunkter talt med `len()` på rå tekst) → `demo_requires_key` → `analysis_failed` (`ExtractionFailed` eller uventet unntak) → `no_requirements` (0 krav) → `result` (FR12, FR17, AR6)
**And** tester viser rekkefølgen: tom CV og for lang annonse gir `empty_input`, og for lang tekst i demomodus gir `text_too_long`, ikke `demo_requires_key`
**And** grensetester gir 14 999 og 15 000 kodepunkter → videre, 15 001 → `text_too_long`, og 15 000 emoji (1 kodepunkt hver) → videre (AD-13, AR11)
**And** `result` er bygget med domenekjernen fra story 1.2 (sitatkontroll, score, potensiell score, sortering, `show_good_match`, `counts`), og det finnes aldri et delvis resultat

**Given** demomodus og eksempeldataene i `backend/app/fixtures/example/`
**When** `analyze` får `cv.txt` og `annonse.txt` nøyaktig, eller med `\r\n` i stedet for `\n`
**Then** utfallet er `result` (AD-3)
**And** endres ett tegn i en av tekstene (også et mellomrom), blir utfallet `demo_requires_key`, og extractoren kalles ikke (FR17)

**Given** eksempelfixturen `backend/app/fixtures/example/` (`cv.txt`, `annonse.txt`, `response.json`, alle fiktive)
**When** testen for eksempelsvaret kjøres gjennom hele pipelinen
**Then** resultatet har minst ett krav med `met`, ett med `partial`, ett med `missing` fra modellen, og nøyaktig ett krav med et oppdiktet sitat som blir nedgradert (`counts.downgraded == 1`) (AD-9, FR11)
**And** `response.json` inneholder bare modellens krav, aldri score, poeng eller sortering (AD-2)
**And** en test sjekker at fixturefilene har LF-linjeskift og ingen BOM

**Given** `create_app()` i `backend/app/main.py` og rutene i `backend/app/api/`
**When** backenden kjører i demomodus
**Then** app-fabrikken injiserer `demo=True` og `FixtureExtractor("app/fixtures/example/response.json")` som to separate avhengigheter (AD-3)
**And** `GET /api/example` svarer `{"cv": str, "annonse": str}` i demomodus og `404` ellers (FR16, AD-6)
**And** `POST /api/analyze` med `{"cv", "annonse"}` svarer alltid `200` med en diskriminert union på `outcome` (`result` med `result: AnalysisResult`, eller `empty_input` | `text_too_long` | `demo_requires_key` | `no_requirements` | `analysis_failed`), med alle felt påkrevd og `null` sendt eksplisitt (AR8)
**And** manglende felt eller felt som ikke er strenger, gir `422`, og svaret tar aldri med `input` (egen `RequestValidationError`-handler) (AD-7)
**And** en `model_validator` på `Requirement` i `api/schemas.py` håndhever invarianttabellen i AD-4, og ingen respons inneholder norske brukertekster fra backenden (AD-6)

**Given** en hvilken som helst analyse
**When** backenden logger
**Then** loggen er én JSON-linje til stdout med `outcome`, `duration_ms`, `model` (`"fixture"` i demo) og `tokens {input, output}`, og aldri `cv`, `annonse`, sitater, hint eller modellsvar (AR9, AD-7)
**And** et unntak logges med `type(e).__name__`, aldri `str(e)`, og `anthropic`/`httpx` står på WARNING
**And** en test sender kjent CV-tekst og sjekker at den ikke finnes i loggutskriften (FR2, NFR8)

**Given** kontrakten i `backend/app/api/schemas.py`
**When** utvikleren kjører `uv run python scripts/export_openapi.py` og deretter `npm run gen:api` i `frontend/`
**Then** `frontend/lib/api/openapi.json` skrives fra `app.openapi()` uten at serveren kjører, og `frontend/lib/api/types.gen.ts` genereres med openapi-typescript med `snake_case`-felt (AR7, AD-5)
**And** en pytest-test feiler hvis den committede `openapi.json` ikke stemmer med `app.openapi()`

**Given** testoppsettet i `backend/tests/`
**When** pytest kjører
**Then** `backend/tests/fixtures/` har konvolutter for gyldig svar, manglende felt, ukjent status, tomt sitat, tomt hint, oppdiktet sitat, 0 krav og `stop_reason: max_tokens`, og hver gir forventet utfall gjennom `analyze` med `demo=False` (AR11, NFR5)
**And** en `autouse`-fixture i `conftest.py` feiler testen hvis en ekte `anthropic.Anthropic`-klient opprettes, og ingen test går mot nettet (AD-9)

### Story 1.4: Inputveiviser: lime inn CV og annonse

As a Yvonne, nyutdannet student,
I want å lime inn CV-en og én annonse ett steg om gangen, eller bruke eksempelet i demomodus,
So that jeg vet nøyaktig hva appen trenger før jeg trykker «Analyser».

**Acceptance Criteria:**

**Given** at inputsiden åpnes med tomme felt
**When** siden vises
**Then** venstre spalte presenterer appen med de fire prinsippene «Ett steg om gangen», «Sitater som bevis», «Aldri finn på erfaring» og «Det positive først», og høyre spalte viser veiviseren med stegindikatoren CV – Annonse – Analyser, venstrejustert (UX-DR4, UX-DR5)
**And** steg 1 er åpent med feltet «Lim inn CV her:», «Neste: Annonse» er deaktivert, og bunnteksten «Laget av gruppe G34, IBE160 · Ingen innlogging. CV og annonse lagres ikke.» vises
**And** hjelpeteksten «Bare en CV og en annonse per analyse» vises på inputsiden (FR1)

**Given** at brukeren skriver eller limer inn tekst i et felt
**When** teksten endres
**Then** telleren viser antall kodepunkter talt med `Array.from(s).length` og grensen fra `max_chars` i `/api/status`, i formen «357 / 15 000 tegn» (AR14, AD-13)
**And** `<textarea>` har ingen `maxLength`, så innlimt tekst kuttes aldri
**And** over grensen får feltet teglkant, telleren blir tegl, «Teksten er for lang» vises under feltet og er koblet til feltet med `aria-describedby` (FR1, UX-DR3)
**And** Vitest-tester viser at 14 999 og 15 000 tegn er innenfor, 15 001 er over, og at en emoji teller som ett tegn (AR11)

**Given** steg 1 med tekst i CV-feltet
**When** feltet bare har mellomrom
**Then** er «Neste: Annonse» deaktivert
**When** feltet har annen tekst og brukeren trykker «Neste: Annonse»
**Then** steg 1 slås sammen til en rad mellom hårfine linjer med hake, etikett, første linje av teksten, telleren og «Endre», og steg 2 åpnes med feltet «Lim inn annonse her:» (UX-DR4)
**And** «Endre» på en sammenslått rad, eller et klikk på et ferdig steg i stegindikatoren, åpner steget igjen med teksten intakt, mens kommende steg ikke er klikkbare

**Given** begge feltene er utfylt
**When** steg 3 «Analyser» vises
**Then** vises «CV-en din sendes til Claude for analyse. Appen lagrer den ikke.» før «Analyser» (FR3)
**And** «Analyser» er en primærknapp som er aktiv bare når ingen av feltene er tomme eller bare mellomrom, og ingen er over grensen. Ellers er den deaktivert i `disabled`/`on-disabled` (FR1, UX-DR2)
**And** «Analyser» er deaktivert så lenge `max_chars` ikke er hentet fra `/api/status`

**Given** at brukeren har skrevet i feltene
**When** fanen lastes på nytt
**Then** feltene fylles fra `sessionStorage`-nøkkelen `cvjobb:fields` med formen `{"v": 1, "cv", "annonse"}`, lest og skrevet bare av `frontend/lib/storage.ts` (FR2, AR9)
**And** en verdi med annen `v` eller ugyldig JSON ignoreres, og feltene starter tomme
**And** ingen tekst skrives til `localStorage`, cookies eller konsollen, og ingen nettverkskall sendes mens brukeren skriver (NFR8)

**Given** demomodus (`demo: true`)
**When** inputsiden vises
**Then** «Bruk eksempel» står øverst i veiviseren som sekundærknapp (FR16, UX-DR16)
**When** brukeren trykker «Bruk eksempel»
**Then** henter frontenden `GET /api/example`, fyller begge feltene, slår sammen steg 1 og 2 og åpner steg 3
**And** hvert felt (og hver sammenslått rad) viser merket «Eksempeldata» så lenge teksten er lik eksempelteksten, og merket forsvinner når teksten endres (AD-3)
**And** utenfor demomodus vises verken «Bruk eksempel» eller «Eksempeldata»-merker

**Given** inputsiden
**When** brukeren bruker bare tastaturet
**Then** Tab følger leserekkefølgen gjennom banner, «Bruk eksempel», stegindikator, felt og knapper, og fokus i et felt vises med blekkramme på 1,5 px (UX-DR3, UX-DR17)

### Story 1.5: Analysere og vise utfall

As a Yvonne, nyutdannet student,
I want å trykke «Analyser» og se at appen jobber, og så få enten et resultat eller en rolig melding,
So that jeg alltid vet hva som skjer og aldri mister teksten jeg har limt inn.

**Acceptance Criteria:**

**Given** at appen har én rute `/`
**When** brukeren trykker «Analyser» på steg 3
**Then** går tilstandsmaskinen fra `input` til `analyzing` og sender `POST /api/analyze` med `{cv, annonse}` via klienten i `frontend/lib/api/` med de genererte typene og `AbortSignal.timeout(90_000)` (AR15, AR16, AD-14, AD-15)
**And** knappen viser «Analyserer …» og er deaktivert, «Endre» på de sammenslåtte radene er deaktivert, og feltene er synlige med teksten intakt (FR13, UX-DR6)
**And** et nytt trykk eller Enter mens analysen pågår sender ikke en ny forespørsel
**And** «Analyserer …» annonseres med `aria-live="polite"` (UX-DR17)

**Given** et gyldig `200`-svar med `outcome: "result"`
**When** svaret kommer
**Then** går tilstanden til `outcome`, resultatet holdes bare i React-tilstand og vises i resultatvisningen, og URL-hashen settes til `#oversikt` (AD-15)
**And** en ny analyse erstatter det forrige resultatet helt, og ingen tidligere score vises eller lagres

**Given** et gyldig `200`-svar med et annet `outcome`
**When** svaret kommer
**Then** vises meldingen fra `frontend/lib/messages.ts` som en rolig serif-setning mellom to hårfine linjer der resultatet ellers ville stått, uten farget boks og annonsert med `aria-live="polite"` (UX-DR15, UX-DR17):
- `no_requirements` → «Ingen krav funnet, har du husket annonsen?», uten score (FR12)
- `demo_requires_key` → «Ekte analyse krever API-nøkkel – se README» (FR17)
- `text_too_long` → «Teksten er for lang»
- `analysis_failed` og `empty_input` → «Klarte ikke å analysere, prøv igjen» (FR14)
**And** etter meldingen er begge feltene fortsatt utfylt, og «Analyser» er aktiv igjen (FR2, FR12, FR14)

**Given** at svaret ikke er et gyldig `200`-svar
**When** backenden svarer `422` eller `5xx`, nettverket feiler, `fetch` avbrytes etter 90 s, eller kroppen ikke har et kjent `outcome`
**Then** vises «Klarte ikke å analysere, prøv igjen», og ingen delvise resultater vises (FR14, AD-6, AD-14)
**And** Vitest-tester dekker hvert av disse tilfellene med en mocket `fetch`

**Given** alle norske brukertekster for utfall
**When** utvikleren ser i koden
**Then** finnes de bare i `frontend/lib/messages.ts`, ordrett som i PRD-en, uten utropstegn og emoji (UX-DR18, AD-6)
**And** frontenden logger aldri forespørsels- eller svarkropper (AD-7)

**Given** at brukeren er i `outcome`-tilstand
**When** siden lastes på nytt
**Then** kommer brukeren tilbake til input med feltene fra `sessionStorage`, og resultatet er borte (AD-15)

### Story 1.6: Resultatoversikt

As a Yvonne, nyutdannet student,
I want å se scoren som en setning, hvor mye jeg kan nå, og hvordan kravene fordeler seg,
So that jeg forstår hvor godt CV-en treffer før jeg går inn i detaljene.

**Acceptance Criteria:**

**Given** et resultat og hashen `#oversikt`
**When** resultatsiden vises
**Then** har den tre marger: venstre marg med innholdsfortegnelsen og tilbakelenken «← Endre CV eller annonse» i leire, lesekolonnen på 640 px og høyre marg med sidenoter (UX-DR7)
**And** «← Endre CV eller annonse» går til input med begge feltene utfylt og steg 1 åpent

**Given** et resultat med `match_score`
**When** oversikten vises
**Then** står «Du er på X %.» øverst i score-typografi med hardt mellomrom før %, med verdien rett fra `match_score` (FR7, FR9, UX-DR9, AD-1)
**And** den nye scoren annonseres med `aria-live="polite"` (UX-DR17)
**And** under scoren står «Match-score mot …» i meta-typografi

**Given** et resultat der `potential_score` ikke er `null`
**When** oversikten vises
**Then** står ingressen «Fikser du de N delvis truffede kravene, kan du nå Y %.» under scoren, med N fra `counts.partial.total` og Y fra `potential_score` (FR8, FR9)
**And** når `potential_score` er `null`, vises ingen ingress om potensiell score

**Given** `requirements` i den rekkefølgen backenden sendte
**When** poengstripen tegnes
**Then** har den én bit per krav i samme rekkefølge, der må-krav er dobbelt så brede, `met` er fylt, `partial` halvfylt og `missing` en stiplet ramme i statusfargene (UX-DR9)
**And** stripen er `aria-hidden`, og under den står «X av Y poeng» fra `points_achieved` og `points_max` med desimalkomma (for eksempel «6,5 av 11 poeng») (UX-DR17)
**And** frontenden regner, teller eller sorterer ingenting selv, og alle tall kommer fra svaret (AD-1)

**Given** `counts` i svaret
**When** fordelingen vises
**Then** er det tre rader, for eksempel «Dette er bra – 3 krav truffet · 2 må-krav, 1 bør-krav», og tilsvarende for «Dette kan bli tydeligere» og «Dette mangler», hver med statustegn og lenke til trinnets hash (`#bra`, `#tydeligere`, `#mangler`) (UX-DR9)
**And** når `counts.downgraded` er større enn 0, nevner raden for «Dette mangler» at kravet ble nedgradert av sitatkontrollen (FR11)
**And** under fordelingen står «Neste: Dette er bra» som primærknapp, og prikkene «Trinn 1 av 4»

**Given** resultatsiden
**When** høyre marg vises
**Then** forklarer sidenoten «Slik er scoren regnet» vektene (må 2/1/0, bør 1/0,5/0) og at scoren er oppnådde ÷ maks poeng, avrundet til nærmeste hele prosent (UX-DR13)
**And** sidenoten «Sitatkontrollen» viser hvert krav med `downgraded: true` med kravteksten og det avviste sitatet (`rejected_quote`) (FR11, UX-DR13)

**Given** resultatsiden
**When** venstre marg vises
**Then** viser innholdsfortegnelsen «Gjennomgang» med Oversikt (med scoren), «Dette er bra», «Dette kan bli tydeligere» og «Dette mangler», hver med statustegn og antall fra `counts.*.total` (UX-DR8)
**And** det aktive trinnet har bakgrunnen `toc-active` og `aria-current="step"`

**Given** demomodus (`demo: true` fra `/api/status`)
**When** resultatet vises
**Then** står merket «Eksempeldata» over scoren, og en loddrett marglinje «EKSEMPELDATA · IKKE DIN EGEN TEKST» vises og er `aria-hidden` (FR16, UX-DR16, UX-DR17)
**And** utenfor demomodus vises verken merket eller marglinjen

### Story 1.7: Trinnvis gjennomgang

As a Yvonne, nyutdannet student,
I want å gå gjennom kravene i tre trinn, med det som er bra først og sitater og hint ved hvert krav,
So that jeg ser beviset for hvert treff og vet akkurat hva jeg kan gjøre tydeligere.

**Acceptance Criteria:**

**Given** et resultat
**When** hashen er `#bra`, `#tydeligere` eller `#mangler`
**Then** vises trinnet med overskriften «Dette er bra.», «Dette kan bli tydeligere.» eller «Dette mangler.», en kort ingress og kravene med status `met`, `partial` eller `missing` (FR9, UX-DR11)
**And** kravene filtreres på `status` uten å endres i rekkefølge, slik at må-krav kommer før bør-krav som i svaret (AD-1)
**And** et trinn uten krav viser overskriften og en kort setning om at det ikke er krav her, og navigasjonen virker som vanlig

**Given** et krav i et trinn
**When** det vises
**Then** har det typemerket «Må-krav» (fylt) eller «Bør-krav» (omriss), statustegn (fylt, halvfylt eller tom sirkel) med statusordet «Truffet», «Delvis truffet» eller «Mangler», og kravteksten i serif (FR9, UX-DR10)
**And** `met` og `partial` viser sitatet i kursiv serif i «guillemets» med markørstrek, og `partial` og `missing` viser «Forbedringshint» i statusfarge med hintet (FR5, FR6, FR9)
**And** et krav med `downgraded: true` viser hintet «Fant ikke belegg i CV-en for dette kravet» fra `frontend/lib/messages.ts`, uansett analysespråk (FR11, AD-6)
**And** kravene skilles med hårfine linjer, uten kort, skygger eller fargede bakgrunner (UX-DR19)

**Given** et trinn
**When** brukeren trykker «Neste: …» eller «Forrige: …»
**Then** går appen ett trinn frem eller tilbake ved å endre hashen (trinn 2 har «Forrige: Oversikt» og «Neste: Dette kan bli tydeligere», trinn 3 har «Forrige: Dette er bra» og «Neste: Dette mangler»), og prikkene viser «Trinn N av 4» (UX-DR11)
**And** fokus flyttes til overskriften i det nye trinnet (UX-DR11, UX-DR17)

**Given** resultatsiden
**When** brukeren klikker et trinn i innholdsfortegnelsen, en fordelingsrad i oversikten eller bruker nettleserens tilbake og frem
**Then** viser appen trinnet som hashen peker på, og innholdsfortegnelsen markerer det med `toc-active` og `aria-current="step"` (AR16, UX-DR8)
**And** en ukjent eller tom hash viser oversikten

**Given** trinn 4 «Dette mangler»
**When** kravene er vist
**Then** følger avslutningen «Ferdig med gjennomgangen.» og teksten «Rediger CV-en i ditt eget verktøy, og lim den inn på nytt med «Endre CV eller annonse». Annonsen står der fortsatt så lenge fanen er åpen.» (UX-DR12)
**And** primærknappen «Endre CV eller annonse» går til input med begge feltene utfylt og steg 1 åpent, og sekundærknappene «Forrige: Dette kan bli tydeligere» og «Tilbake til oversikten» går til `#tydeligere` og `#oversikt`
**And** trinn 4 har ingen «Neste»-knapp

**Given** lenken «Vis alt på én side» i venstre marg
**When** brukeren trykker den
**Then** settes hashen til `#alt`, alle fire trinnene vises stablet i rekkefølgen oversikt, bra, tydeligere, mangler (med avslutningen sist), og lenken heter «Vis ett trinn om gangen» (UX-DR8)
**And** innholdsfortegnelsen følger med når brukeren ruller, og «Vis ett trinn om gangen» går tilbake til `#oversikt`

### Story 1.8: Godt treff og ny annonse

As a Yvonne, nyutdannet student,
I want at appen sier fra når CV-en treffer godt, og lar meg gå videre til neste annonse med CV-en beholdt,
So that jeg vet når jeg er klar til å søke og slipper å lime inn CV-en på nytt.

**Acceptance Criteria:**

**Given** et resultat med `show_good_match: true`
**When** oversikten vises
**Then** står spørsmålet «Godt treff, klar til å søke?» i serif mellom to blekklinjer, med «Ja» som primærknapp og «Nei» som sekundærknapp (FR10, UX-DR14)
**And** frontenden bruker bare `show_good_match` og sammenligner aldri `match_score` med 90 selv (AD-1)

**Given** et resultat med `show_good_match: false`
**When** oversikten vises
**Then** vises ikke spørsmålet, heller ikke når `match_score` er 89 (FR10)

**Given** spørsmålet «Godt treff, klar til å søke?»
**When** brukeren trykker «Nei»
**Then** lukkes spørsmålet, brukeren blir på resultatet, og feltene er urørt (FR10)
**And** en ny analyse med `show_good_match: true` viser spørsmålet igjen

**Given** spørsmålet «Godt treff, klar til å søke?»
**When** brukeren trykker «Ja»
**Then** vises primærknappen «Analyser ny annonse» i stedet for Ja/Nei, og fokus flyttes til den (FR10, UX-DR14)

**Given** knappen «Analyser ny annonse»
**When** brukeren trykker den
**Then** går appen til input, annonsefeltet tømmes både i skjemaet og i `cvjobb:fields` via `lib/storage.ts`, og CV-en beholdes (FR2, FR10)
**And** steg 2 «Annonse» er åpent med tomt felt, CV-raden er sammenslått og viser «CV-en er beholdt», og det gamle resultatet er forkastet
**And** «Analyser» er deaktivert til annonsefeltet har tekst (FR1)

**Given** komponenttestene i Vitest
**When** de kjøres med resultater der `show_good_match` er `true` og `false`
**Then** dekker de visning og skjuling av spørsmålet, «Nei», «Ja» og «Analyser ny annonse» med tømt annonse og beholdt CV (NFR5)

### Story 1.9: Hele flyten testet ende til ende i demomodus med tilgjengelighet

As a sensor uten API-nøkkel,
I want at hele flyten er testet automatisk i demomodus, også tilgjengeligheten,
So that jeg kan stole på at det jeg ser i demoen, virker for alle brukere og er det samme som en ekte analyse viser.

**Acceptance Criteria:**

**Given** Playwright-oppsettet i `frontend/e2e/`
**When** utvikleren kjører `npx playwright test`
**Then** startes backend med `ANTHROPIC_API_KEY=""` og frontend lokalt, og ingen forespørsel går til andre verter enn appen selv (AR11, AD-9)

**Given** demomodus
**When** testen kjører «Bruk eksempel» → «Analyser»
**Then** vises banneret «Demomodus – ingen API-nøkkel funnet», feltene får «Eksempeldata», knappen viser «Analyserer …» mens analysen pågår, og oversikten viser «Du er på X %.» med «Eksempeldata» over scoren (FR13, FR15, FR16)
**And** testen går gjennom «Dette er bra», «Dette kan bli tydeligere» og «Dette mangler» med «Neste», ser sitater, hint, et nedgradert krav med «Fant ikke belegg i CV-en for dette kravet», og avslutningen «Ferdig med gjennomgangen.» (FR9, FR11)
**And** «Endre CV eller annonse» tar brukeren tilbake til input med begge feltene utfylt (FR2)

**Given** at eksempeldataene er lagt inn
**When** testen endrer ett tegn i annonsen og trykker «Analyser»
**Then** vises «Ekte analyse krever API-nøkkel – se README», ingen score vises, og feltene er fortsatt utfylt (FR17)

**Given** inputsiden
**When** testen limer inn 15 000 og 15 001 tegn, og en tekst med emoji
**Then** gir 15 000 tegn ingen feil, mens 15 001 tegn gir «Teksten er for lang» og deaktivert «Analyser», og telleren teller emoji som ett tegn (FR1, AD-13)

**Given** at backenden svarer `500` eller nettverket feiler (simulert med `page.route`)
**When** brukeren trykker «Analyser»
**Then** vises «Klarte ikke å analysere, prøv igjen», feltene er utfylt, og «Analyser» er aktiv igjen (FR14, AD-6)

**Given** `@axe-core/playwright` med WCAG 2.2 AA-reglene
**When** axe kjøres på inputsiden, «Analyserer …», oversikten, hvert av trinnene 2–4, «Vis alt på én side» og meldingene for FR-12, FR-14 og FR-17
**Then** finnes ingen brudd (UX-DR17, NFR15)

**Given** tastaturbruk og skjermleserstøtte
**When** testen bruker bare Tab, Enter og Mellomrom
**Then** kan hele flyten fullføres, fokus står på trinnoverskriften etter hvert «Neste»/«Forrige», og aktivt trinn har `aria-current="step"` (UX-DR17)
**And** «Analyserer …», meldingene og den nye scoren ligger i `aria-live="polite"`-områder, mens poengstripen og den loddrette demolinjen er `aria-hidden`, og stripen har tekstekvivalenten «X av Y poeng»

**Given** tekstene og stilene i frontenden
**When** sjekken for tone og Do's and Don'ts kjøres (Vitest eller Playwright)
**Then** inneholder `frontend/lib/messages.ts` ingen utropstegn eller emoji, og PRD-tekstene står ordrett (UX-DR18)
**And** de synlige elementene på input- og resultatsiden har ingen `box-shadow` eller gradient, og hver status vises med både tegn og ord (UX-DR19)
**And** en omlasting på resultatsiden tar brukeren tilbake til input med feltene fra `sessionStorage` (AD-15)

## Epic 2: Ekte analyse av egen CV med Claude

Yvonne legger API-nøkkelen i `.env` og får en ekte analyse av sin egen CV fra Claude: krav med type, status, ordrette sitater og hint, innenfor 60 s og 2 kr. Går noe galt, får hun den samme tydelige meldingen «Klarte ikke å analysere, prøv igjen» som i Epic 1. Epic 2 kobler den ekte Anthropic-adapteren til porten og pipelinen fra Epic 1 og endrer ikke domenet, kontrakten eller frontendflyten.

### Story 2.1: Claude-tilkoblingen med strukturert output og feilhåndtering

As a Yvonne, nyutdannet student med egen API-nøkkel,
I want at appen bruker Claude når nøkkelen min ligger i `.env`, og at alle feil fra Claude blir den samme rolige feilmeldingen,
So that jeg får en ekte analyse av min egen CV, og aldri ser et halvt eller oppdiktet resultat når API-et svikter.

**Acceptance Criteria:**

**Given** `.env` har en `ANTHROPIC_API_KEY` som ikke er tom etter `.strip()`
**When** app-fabrikken i `main.py` bygger appen
**Then** `analyze()` får `demo=False` og en `AnthropicExtractor`, og `GET /api/status` svarer `{"demo": false, "max_chars": 15000}` (AR5, AD-3)
**And** er nøkkelen tom eller bare mellomrom, får `analyze()` fortsatt `demo=True` og `FixtureExtractor("app/fixtures/example/response.json")`, og demomodus fra Epic 1 er uendret (FR15)
**And** modusen logges ved oppstart uten nøkkelen (AD-3, AD-7)

**Given** en `AnthropicExtractor` bygget med en mocket SDK-klient
**When** `extract(cv, annonse)` kalles
**Then** klienten er laget som `Anthropic(timeout=60.0, max_retries=0)`, og kallet er `client.beta.messages.parse` med `model` fra settings, `max_tokens=6000`, `output_format=ExtractionResult`, `output_config={"effort": "medium"}`, `betas=["server-side-fallback-2026-07-01"]` og `fallbacks="default"` (AR10, AD-8)
**And** `output_config` har ingen `format`-nøkkel, fordi SDK 2.9.0 avviser `output_format` og `output_config.format` i samme kall. `output_format` er merket som deprecated, men ble verifisert 2026-11-17 til å virke i `beta.messages.parse` i 2.9.0, der den slås sammen med `effort` i `output_config`. En test sjekker kallet mot den mockede klienten (AD-8)
**And** modellen er `claude-opus-5-5` når `ANTHROPIC_MODEL` mangler, og verdien i `ANTHROPIC_MODEL` når den er satt, og `.env.example` dokumenterer begge variablene (AR12)
**And** CV og annonse sendes i brukermeldingen, og systemprompten hentes fra `llm/prompt.py`, der denne storyen lager en første versjon med reglene i AD-8 (Story 2.2 finjusterer og røyktester den)

**Given** den mockede klienten returnerer et svar med `stop_reason` `end_turn` og gyldig JSON-tekst
**When** `extract()` kalles
**Then** teksten valideres med den felles `parse_extraction(text)` fra porten, og en `Extraction` med `result` (kravene i modellens rekkefølge), `model` og `usage` fra SDK-svaret (input- og output-tokens, summert over fallback) returneres (AR4, AD-2)
**And** resultatet går gjennom hele pipelinen (AD-4), så et oppdiktet sitat i mock-svaret gir `downgraded: true`, og frontenden viser «Fant ikke belegg i CV-en for dette kravet» (FR11)

**Given** den mockede klienten kaster et tidsavbrudd fra SDK-en (`APITimeoutError`)
**When** `extract()` kalles
**Then** adapteren kaster `ExtractionFailed("timeout")`, og `POST /api/analyze` svarer `200` med `{"outcome": "analysis_failed"}` (FR14, AD-2, AD-6)
**And** kallet prøves ikke på nytt (`max_retries=0`, AD-14)

**Given** den mockede klienten kaster en API-feil: ugyldig nøkkel (`AuthenticationError`, 401), rate limit (429), overbelastning (529), serverfeil (5xx) eller tilkoblingsfeil (`APIConnectionError`)
**When** `extract()` kalles
**Then** adapteren kaster `ExtractionFailed("api_error")` for hver av dem, og utfallet er `analysis_failed` (FR14)
**And** unntaket logges bare med `type(e).__name__`, aldri med `str(e)`, CV, annonse eller modellsvar (AR9, AD-7)

**Given** den mockede klienten returnerer `stop_reason` `max_tokens` (eller en annen verdi enn `end_turn` og `refusal`)
**When** `extract()` kalles
**Then** adapteren kaster `ExtractionFailed("stop_reason")`, og ingen delvis kravliste returneres (FR14, AD-8)
**And** returnerer klienten `stop_reason` `refusal`, også etter server-side-fallback, kaster adapteren `ExtractionFailed("refusal")`, og utfallet er `analysis_failed`

**Given** den mockede klienten returnerer `end_turn` med tekst som ikke kan tolkes som en kravliste: ugyldig JSON, manglende felt, ukjent status, tomt sitat for `met`/`partial` eller tomt hint for `partial`/`missing`
**When** `extract()` kalles
**Then** `parse_extraction` kaster `ExtractionFailed("invalid")`, utfallet er `analysis_failed`, og frontenden viser «Klarte ikke å analysere, prøv igjen» med feltene fortsatt utfylt og «Analyser» tilgjengelig igjen (FR14, AD-4 steg 3)

**Given** pytest kjøres med `ANTHROPIC_API_KEY=""` i miljøet
**When** hele testsuiten kjøres
**Then** ingen test gjør et nettverkskall, og autouse-sperren feiler en test som oppretter `AnthropicExtractor` med ekte klient (AR11, AD-9)
**And** import-linter bekrefter at ingen modul utenfor `backend/app/llm/` importerer `anthropic` (AR3)

**Given** `ANTHROPIC_API_KEY` er en gyldig nøkkel i `.env` (manuelt)
**When** Yvonne kjører appen, limer inn den fiktive eksempel-CV-en og eksempelannonsen og trykker «Analyser»
**Then** resultatsiden viser en ekte analyse uten «Eksempeldata»-merker og uten demobanner (FR15, FR16)
**And** med en ugyldig nøkkel (manuelt) vises «Klarte ikke å analysere, prøv igjen» (FR14)

### Story 2.2: Prompten: kravuttrekk, status, sitater og hint

As a Yvonne, nyutdannet student med egen API-nøkkel,
I want at Claude finner alle kravene i annonsen, merker dem som må- eller bør-krav, og begrunner hver status med et ordrett sitat og et kort hint,
So that jeg kan stole på resultatet og vet hva i min egen CV jeg bør gjøre tydeligere, uten at appen dikter opp noe.

**Acceptance Criteria:**

**Given** `backend/app/llm/prompt.py`
**When** systemprompten leses
**Then** den ber modellen trekke ut alle krav fra annonsen i annonsens rekkefølge, og sier at et ekstra krav er en mindre feil enn et manglende (FR4, AD-8)
**And** den sier at typen avgjøres av ordene i annonsen: «krav», «må», «nødvendig», «vi forventer» (og engelske motsvar) gir `must`, «ønskelig», «en fordel», «gjerne», «et pluss» gir `should`, og krav uten slike ord er `should` (FR4, PRD §3)
**And** den sier at et enten-eller-krav («bachelorgrad eller relevant erfaring») er ett krav, ikke to (FR4)
**And** den ber aldri om tall, score eller poeng (AD-8, PRD §4.2)

**Given** systemprompten
**When** reglene for status og sitat leses
**Then** `met` og `partial` krever et sitat som er kopiert ordrett fra CV-en tegn for tegn, med samme store og små bokstaver og tegnsetting, og `missing` har `quote: null` (FR5, AD-4)
**And** den sier at et krav uten belegg i CV-en er `missing`, og at et må-krav uten belegg aldri skal være `met` (FR5, SM-3)
**And** den bruker statusdefinisjonene i PRD §3: truffet = dekker kravet tydelig, delvis truffet = nevner noe som hører til uten å dekke det fullt, mangler = nevner ingenting som hører til

**Given** systemprompten
**When** reglene for hint leses
**Then** `partial` og `missing` krever et kort hint som ikke er tomt, og `met` har `hint: null` (FR6, AD-4)
**And** hintet viser til innhold som allerede finnes i CV-en og sier om det bør formuleres tydeligere eller flyttes høyere opp, uten ferdig omskrevne setninger og uten forslag om ny erfaring (FR6, PRD §6)
**And** finnes det ikke noe relevant i CV-en, sier hintet det rett ut (FR6)

**Given** systemprompten
**When** språkregelen leses
**Then** krav og hint skrives på engelsk bare når både CV og annonse er på engelsk, og ellers på norsk (NFR1)
**And** prompten ber aldri modellen skrive brukermeldinger, fordi frontenden eier alle norske meldinger (AD-6)

**Given** en ny fixture i `backend/tests/fixtures/` tatt opp fra den manuelle røyktesten, som konvolutt `{stop_reason, text}`
**When** pytest kjører `analyze` med `demo=False` og `FixtureExtractor(<sti>)`
**Then** svaret er `outcome: "result"`, alle sitater for `met`/`partial` består sitatkontrollen mot den lagrede fiktive CV-en, og alle `partial`/`missing` har hint (FR5, FR6, FR11, AD-9)
**And** fixturen, CV-en og annonsen er fiktive eller offentlige, og inneholder ingen ekte personopplysninger (NFR8)

**Given** 2–3 par med fiktiv CV og annonse, der minst én annonse har tydelig merkede må-krav, minst én har et enten-eller-krav, og minst ett par er helt på engelsk (manuelt)
**When** analysen kjøres mot ekte Claude
**Then** for hvert par noteres antall krav, typer, statuser, om alle sitater besto sitatkontrollen, `tokens {input, output}` og tid, uten CV-tekst, i `.docs/testset-results/` eller arkitekturens memlog (AD-9)
**And** enten-eller-kravet er ett krav, umerkede krav er `should`, kravene står i annonsens rekkefølge, og det engelske paret gir krav og hint på engelsk mens de andre gir norsk (FR4, NFR1)
**And** ingen hint i røyktesten inneholder en ferdig omskrevet setning eller foreslår ny erfaring (FR6)

**Given** en annonse uten krav, for eksempel bare en firmapresentasjon (manuelt)
**When** analysen kjøres mot ekte Claude
**Then** modellen returnerer en tom kravliste, og appen viser «Ingen krav funnet, har du husket annonsen?» (FR12)

### Story 2.3: Tidsbudsjettet gjennom kjeden

As a Yvonne, nyutdannet student med egen API-nøkkel,
I want at en analyse som tar lang tid, likevel kommer fram, og at et brudd et sted i kjeden gir den vanlige feilmeldingen,
So that jeg ikke mister en analyse jeg har betalt for, og aldri blir stående med «Analyserer …» uten svar.

**Acceptance Criteria:**

**Given** Next.js 16.4.6 fra låsefila
**When** utvikleren sjekker offisiell dokumentasjon og kildekoden for `experimental.proxyTimeout` i rewrites
**Then** resultatet (støttes / støttes ikke, med kilde og dato) skrives som en `(decision)`-linje i `architecture-G34-remme-2026-11-16/.memlog.md`, og det åpne spørsmålet om proxyTimeout lukkes der (AR15, AD-14)

**Given** at `experimental.proxyTimeout` støttes
**When** `frontend/next.config.ts` leses
**Then** den setter `experimental.proxyTimeout: 75000` eksplisitt, og `/api/*` sendes fortsatt videre til `BACKEND_URL` (AD-10, AD-14)
**And** frontendens `fetch` mot `/api/analyze` har `AbortSignal.timeout(90_000)`, slik at budsjettet er strengt økende: SDK 60 s < proxy 75 s < fetch 90 s (AD-14)

**Given** at `experimental.proxyTimeout` ikke støttes
**When** alternativet tas i bruk
**Then** nettleseren kaller backenden direkte, og FastAPI har CORS som bare tillater opphavet `http://127.0.0.1:3000` (og `http://localhost:3000` bare hvis valget dokumenteres i memloggen) (AR15)
**And** et kall fra et annet opphav avvises av CORS-regelen, og nøkkelen er fortsatt bare i backenden (AD-10)
**And** README og `docker-compose.yml` stemmer med valget, og både `docker compose up` og `uv` + `npm` gir samme app (AD-11)

**Given** en treg testbackend eller mock som svarer gyldig `{"outcome": "result", …}` etter 45 s
**When** frontenden sender en analyse gjennom den valgte veien (proxy eller direkte kall)
**Then** resultatsiden vises med resultatet, og «Analyserer …» vises og «Analyser» er deaktivert mens det pågår (NFR6, FR13)
**And** testen kaller aldri ekte Claude (AD-9)

**Given** et ledd bryter: backenden svarer ikke innen proxy-grensen, svarer `5xx` eller `422`, nettverket faller ut, eller `fetch` når 90 s
**When** frontenden får bruddet
**Then** den viser «Klarte ikke å analysere, prøv igjen», viser ikke noe delvis resultat, beholder begge feltene utfylt og gjør «Analyser» tilgjengelig igjen (FR14, AD-6)
**And** hvert av de fire tilfellene har sin egen test med mock eller treg fixture

**Given** en mocket SDK-klient som simulerer at Claude bruker mer enn 60 s
**When** `extract()` kalles
**Then** backenden svarer `200` med `{"outcome": "analysis_failed"}` før proxy-grensen nås, slik at brukeren får feilmeldingen og ikke et proxybrudd (FR14, AD-14)

### Story 2.4: Kostnad og tokens per analyse

As a utvikler i gruppen,
I want at hver analyse logger modell, tokens og beregnet kostnad, og at verste tilfelle er målt,
So that vi kan dokumentere at en analyse koster under 2 kr og ikke stopper på `max_tokens`, uten at CV-tekst havner i loggen.

**Acceptance Criteria:**

**Given** en analyse med `AnthropicExtractor` og en mocket SDK-klient som returnerer `usage` med input- og output-tokens
**When** `POST /api/analyze` er ferdig
**Then** backendloggen til stdout har én JSON-linje med `outcome`, `duration_ms`, `model`, `tokens {input, output}` og beregnet kostnad (AD-7, NFR4)
**And** linjen inneholder aldri `cv`, `annonse`, sitater, hint, kravtekst eller modellsvar, og en test sjekker dette med kjente tekststrenger fra fixturen (AD-7, NFR8)

**Given** en analyse i demomodus
**When** loggen skrives
**Then** `model` er `"fixture"`, og tokens og kostnad er `null` eller 0, aldri anslått (AD-7)

**Given** at analysen feiler med `ExtractionFailed` (`timeout`, `api_error`, `stop_reason`, `refusal` eller `invalid`)
**When** loggen skrives
**Then** `outcome` er `analysis_failed`, og tokens og kostnad logges når `ExtractionFailed.usage` er satt (for eksempel ved `stop_reason`), ellers `null` (NFR4)

**Given** prisene for modellen som brukes (Opus 5.5: $4 per million input-tokens og $20 per million output-tokens) og valutakursen 1 USD = 9,61 kr
**When** kostnaden beregnes i kode
**Then** priser og kurs er konstanter på ett sted i backenden, testet med faste tokentall mot forventet kroner (for eksempel 12 000 inn og 6 000 ut = $0,168 ≈ 1,61 kr) (NFR4, AD-8)
**And** kostnaden summerer tokens fra fallback-modellen når fallback er brukt, fordi kostnadstaket gjelder per analyse (AD-14)

**Given** en fiktiv CV og en offentlig eller fiktiv annonse på 15 000 tegn hver (verste tilfelle, manuelt)
**When** analysen kjøres mot ekte Claude med `max_tokens=6000` og effort `medium`
**Then** `stop_reason` er `end_turn`, svaret består `parse_extraction`, og kostnaden er under 2 kr (NFR4, AD-8)
**And** model, tokens {input, output}, tid og kostnad, uten tekst, skrives til `.docs/testset-results/<dato>-<modell>.md` eller arkitekturens memlog

**Given** at verste tilfelle ender i `stop_reason` `max_tokens`, går over 2 kr eller over 60 s (manuelt)
**When** gruppen justerer `max_tokens` og/eller effort
**Then** den nye verdien settes på ett sted i adapteren, målingen kjøres på nytt, og både gamle og nye verdier med begrunnelse noteres i memloggen (AD-8)
**And** testene i Story 2.1 oppdateres til de nye verdiene og består fortsatt uten nettverkskall (AD-9)

## Epic 3: Kvalitetssikret og klar til innlevering

Gruppen kan dokumentere med målinger at appen holder det PRD-en lover: testsett med fasit, modellvalg, tilgjengelighet og brukertest (SM-1–SM-5, SM-C1, WCAG 2.2 AA). Sensor kan starte og vurdere appen ut fra README alene.

### Story 3.1: Testsettet med fasit

As a gruppen G34,
I want et fast testsett med 5 ekte trainee-annonser, 3 fiktive CV-er og en fasit som er skrevet før appen kjøres mot dem,
So that kravuttrekk og status kan måles mot noe som ikke er tilpasset modellens svar (SM-2, SM-3, SM-C1).

**Acceptance Criteria:**

**Given** mappen `backend/testset/`
**When** innholdet listes
**Then** den har nøyaktig 5 annonser og 3 CV-er som ren tekst, og én fasitfil (AD-9, PRD §7.1)
**And** hver annonse og hver CV er på maks 15 000 tegn, talt som kodepunkter (NFR7, AD-13)

**Given** hver av de 5 annonsene
**When** kildeoppføringen leses
**Then** den viser hvor annonsen er hentet fra (arbeidsgiver og URL eller portal) og datoen den ble hentet
**And** annonsen er en ekte, offentlig trainee-annonse (PRD §5 Personvern, SM-2)

**Given** fasiten
**When** må-kravene telles per annonse
**Then** hver annonse har en liste over må-krav med en fast ID per krav, og minst 2 av de 5 annonsene har må-krav som er tydelig merket med ord som «krav», «må», «nødvendig» eller «vi forventer» (SM-2, FR-4)
**And** hvert krav i fasiten har type (må/bør) og noen få nøkkelord som brukes til å koble modellens krav til fasitkravet

**Given** fasiten
**When** den leses for hver av de 15 kombinasjonene (5 annonser × 3 CV-er)
**Then** hvert krav i annonsen har forventet status (truffet, delvis truffet eller mangler) for den aktuelle CV-en (SM-3, SM-C1)
**And** CV-ene er laget slik at alle tre statusene og minst ett må-krav som mangler forekommer i settet

**Given** git-historikken for `backend/testset/`
**When** commitene sammenlignes med den første kjøringen av `run_testset.py`
**Then** fasiten er committet før første kjøring mot ekte modell, og senere endringer i fasiten er begrunnet i commit-meldingen (manuelt)

**Given** de 3 CV-ene
**When** de gjennomgås (manuelt)
**Then** de inneholder bare oppdiktede navn, kontaktopplysninger, skoler og arbeidsgivere, og ingen ekte personopplysninger (NFR8, PRD §5 Personvern)
**And** filene har `eol=lf` i `.gitattributes`, slik at sitatkontrollen gir samme svar på alle maskiner

### Story 3.2: Kjøreskript og rapport for testsettet

As a gruppen G34,
I want et skript som kjører hele testsettet mot ekte Claude og skriver en rapport med målene,
So that SM-1, SM-2, SM-3 og SM-C1, tokens og kostnad kan dokumenteres og måles på nytt med et annet effort eller `max_tokens`.

**Acceptance Criteria:**

**Given** en gyldig `ANTHROPIC_API_KEY` i `.env` og testsettet fra story 3.1
**When** `uv run python scripts/run_testset.py` kjøres i `backend/` (manuelt, med nøkkel)
**Then** skriptet kjører `analyze()` med `demo=False` og `AnthropicExtractor` for alle 15 kombinasjoner, gjennom hele pipelinen i AD-4 (AD-2, AD-9)
**And** uten nøkkel stopper skriptet med en tydelig melding før noe kall gjøres, og pytest kjører aldri skriptet (AD-9)

**Given** en fullført kjøring
**When** rapporten åpnes
**Then** den ligger i `.docs/testset-results/<dato>-<modell>.md` og oppgir modell, effort, `max_tokens`, dato og commit-hash
**And** en kjøring med `--effort` (og eventuelt `--max-tokens`) gir en ny rapportfil med oppsettet i filnavnet, uten å overskrive en tidligere rapport for et annet oppsett. Modellen er alltid `claude-opus-5-5`

**Given** rapporten
**When** SM-1-delen leses
**Then** den viser antall sitater fra modellen, antall nedgraderte krav (`counts.downgraded`) og andelen sitater som fantes ordrett i CV-en, med målet 100 % markert som bestått eller ikke bestått (NFR9, FR-11)

**Given** rapporten
**When** SM-2-delen leses
**Then** den viser per annonse hvilke fasit-ID-er for må-krav som ble funnet og hvilke som mangler, og om målet holder: alle må-krav funnet i minst 4 av 5 annonser og maks 1 må-krav bommet i én annonse (NFR10)
**And** koblinger mellom modellens krav og fasiten som skriptet ikke kan avgjøre med nøkkelordene, er listet med fasit-ID for manuell avgjørelse, og avgjørelsen noteres i rapporten (manuelt)

**Given** rapporten
**When** SM-3- og SM-C1-delen leses
**Then** den viser andelen krav med riktig status over de 3 CV-ene (mål ≥ 70 %), antall må-krav som mangler i fasiten men ble truffet (mål 0), og avviket i antall truffet mot fasiten summert over de 3 CV-ene (mål ≤ 20 % i begge retninger), hver med bestått eller ikke bestått (NFR11, NFR14)

**Given** rapporten
**When** kostnadsdelen leses
**Then** den viser per analyse utfall, varighet i sekunder, input- og output-tokens og kostnad i USD og kr, med prisene og vekslingskursen som er brukt (NFR4, NFR6)
**And** den viser høyeste og gjennomsnittlige kostnad og varighet, og markerer enhver analyse over 2 kr eller over 60 s

**Given** rapporten og skriptets utskrift til terminalen
**When** de søkes gjennom etter tekst fra CV-ene, sitater, hint eller modellsvar
**Then** ingen slik tekst finnes. Krav vises bare med fasit-ID og status (AD-7)

### Story 3.3: Effort og max_tokens for Opus 5.5 ut fra testsettet

As a gruppen G34,
I want å velge effort og `max_tokens` for `claude-opus-5-5` ut fra målte resultater fra testsettet,
So that appen bruker det billigste oppsettet av Opus 5.5 som holder SM-2, SM-3 og SM-C1 innenfor kostnadstaket på 2 kr (NFR4).

**Acceptance Criteria:**

**Given** skriptet fra story 3.2
**When** testsettet kjøres med `claude-opus-5-5` og startverdiene effort `medium` og `max_tokens=6000` (manuelt, med nøkkel)
**Then** `.docs/testset-results/` har en rapport for startoppsettet
**And** er det kjørt med effort `low` eller en annen `max_tokens` i tillegg, har hvert oppsett sin egen rapport
**And** ingen andre modeller enn `claude-opus-5-5` kjøres eller sammenlignes

**Given** rapportene
**When** sammenligningen skrives
**Then** den viser i én tabell per oppsett (effort og `max_tokens`): SM-1, SM-2, SM-3, SM-C1, antall `analysis_failed`, gjennomsnittlig og høyeste kostnad i kr, og gjennomsnittlig og høyeste varighet i sekunder (NFR4, NFR6)

**Given** sammenligningen
**When** effort og `max_tokens` velges
**Then** det valgte oppsettet består SM-2 (alle må-krav i minst 4 av 5 annonser), SM-3 (≥ 70 % riktig status, 0 må-krav som mangler blir truffet) og SM-C1 (≤ 20 % avvik)
**And** ingen analyse i rapporten for det valgte oppsettet koster over 2 kr, og ingen tar over 60 s (NFR4, NFR6, AD-14)

**Given** valget
**When** begrunnelsen leses
**Then** den forklarer i noen setninger hvorfor oppsettet er valgt framfor de andre, og viser til rapportfilene
**And** består ingen av oppsettene alle målene, står det rett ut hvilke mål som ikke holder, og hva gruppen gjør med det (for eksempel endring i prompten eller et issue)

**Given** at valget er gjort
**When** adapteren, `.env.example` og arkitekturen leses
**Then** effort og `max_tokens` er satt på ett sted i adapteren, og `ANTHROPIC_MODEL` har fortsatt `claude-opus-5-5` som standard i `.env.example` og `config.py` (AR10, AR12)
**And** endringen av effort eller `max_tokens` i AD-8 er ført i arkitekturens memlog med dato og henvisning til begrunnelsen (AD-8, Deferred)

**Given** at standardverdiene er endret
**When** `uv run pytest` kjøres
**Then** alle tester er grønne uten API-nøkkel (AD-9, NFR5)

### Story 3.4: Tilgjengelighetsrevisjon etter WCAG 2.2 AA

As a bruker som navigerer med tastatur eller skjermleser,
I want å kunne gå gjennom hele flyten uten mus og få alle tilstander og meldinger lest opp,
So that appen oppfyller WCAG 2.2 AA (NFR15, EXPERIENCE Accessibility Floor).

**Acceptance Criteria:**

**Given** appen i demomodus
**When** hele flyten gås gjennom med bare tastatur: steg 1–3, «Bruk eksempel», «Analyser», alle fire trinn, «Vis alt på én side», «Godt treff» og «Endre CV eller annonse» (manuelt)
**Then** alle handlinger nås med Tab i leserekkefølgen og aktiveres med Enter eller Mellomrom, fokus er alltid synlig og blir aldri skjult av annet innhold, og ingen fokusfelle finnes (UX-DR17, WCAG 2.1.1, 2.4.7, 2.4.11)
**And** «Neste: …» og «Forrige: …» flytter fokus til overskriften i det nye trinnet (UX-DR11)

**Given** NVDA i Firefox eller Chrome (manuelt)
**When** flyten gås gjennom fra input via «Analyserer …» til resultat
**Then** «Analyserer …», ny score og meldingene «Ingen krav funnet, har du husket annonsen?», «Klarte ikke å analysere, prøv igjen», «Ekte analyse krever API-nøkkel – se README» og «Teksten er for lang» blir lest opp (`aria-live="polite"` og `aria-describedby`) (FR-12, FR-13, FR-14, FR-17)
**And** aktivt trinn leses som gjeldende trinn (`aria-current="step"`), status og type leses som ord, poengstripen leses bare som tekstekvivalenten («X av Y poeng»), og den loddrette demolinjen leses ikke

**Given** fargeparene i DESIGN.md slik de er brukt i `globals.css`
**When** kontrasten måles for tekst, statusord, kanter på felt og knapper, fokusring og deaktivert knapp (manuelt med kontrastverktøy)
**Then** vanlig tekst har minst 4,5:1, stor tekst minst 3:1, og grafiske elementer og fokusindikator minst 3:1 mot bakgrunnen (WCAG 1.4.3, 1.4.11)
**And** status vises aldri bare med farge (UX-DR19, WCAG 1.4.1)

**Given** Playwright-testene med `@axe-core/playwright` (fra Epic 1)
**When** de kjøres på input, analyserer, resultat (alle trinn og «Vis alt») og alle meldinger
**Then** axe gir ingen brudd, som i story 1.9 (AD-9, UX-DR17)

**Given** siden med 200 % zoom og 1280 px vindusbredde
**When** input og resultat gås gjennom (manuelt)
**Then** ingen tekst eller handling forsvinner eller overlapper, og det trengs ikke vannrett rulling for å lese lesekolonnen (WCAG 1.4.4, 1.4.10)

**Given** at revisjonen er ferdig
**When** dokumentasjonen i `.docs/` leses
**Then** den viser dato, nettleser, skjermleser og versjon, hvert funn med WCAG-kriterium, alvorlighet og status (rettet eller åpent med issue), og at testene er grønne etter rettingene
**And** alle funn med alvorlighet «serious» eller «critical» er rettet før storyen er ferdig

### Story 3.5: Brukertest med en medstudent (SM-5)

As a medstudent i brukertest,
I want å forstå ut fra resultatsiden alene hva jeg bør endre i CV-en,
So that gruppen kan dokumentere at resultatsiden og hintene er forståelige uten hjelp (NFR13, FR-6, FR-9).

**Acceptance Criteria:**

**Given** mappen `.docs/`
**When** protokollen for brukertesten leses
**Then** den beskriver den fiktive CV-en og annonsen som brukes, oppgaven som leses høyt for medstudenten, at gruppen ikke hjelper under testen, tidsgrensen på 5 minutter og hva observatøren noterer
**And** CV-en er fiktiv, og annonsen er enten fiktiv eller en offentlig annonse fra testsettet (NFR8)

**Given** protokollen
**When** testen forberedes (manuelt)
**Then** analysen er kjørt på forhånd med standardoppsettet fra story 3.3, slik at medstudenten bare ser resultatsiden, og resultatet har minst ett krav av hver status og minst ett må-krav og ett bør-krav

**Given** at medstudenten får resultatsiden og oppgaven
**When** testen gjennomføres uten hjelp (manuelt)
**Then** observatøren måler tiden fra medstudenten ser resultatsiden til medstudenten peker på en konkret endring i CV-en
**And** SM-5 er bestått når minst 1 konkret endring er pekt på innen 5 minutter (NFR13)

**Given** samme test
**When** medstudenten blir spurt om kravene
**Then** observatøren noterer om medstudenten kan si hvilke må-krav og bør-krav som er truffet, og hvilke som mangler, sammenlignet med resultatet (FR-9)

**Given** at testen er ferdig
**When** resultatet føres i `.docs/`
**Then** det viser dato, tid til første konkrete endring, hvilke endringer som ble pekt på, svaret om må- og bør-krav, om SM-5 er bestått, og observasjoner om hva som var uklart
**And** hver observasjon som krever endring, er ført som et issue med henvisning til protokollen

### Story 3.6: README for sensor og sluttsjekk

As a sensor,
I want å kunne starte og prøve appen ut fra README alene, uten egen nøkkel,
So that jeg kan vurdere om appen gjør det briefen lover (UJ-2, NFR3).

**Acceptance Criteria:**

**Given** README i prosjektroten
**When** startdelen leses
**Then** den beskriver start med `docker compose up` og start uten Docker (`uv sync --frozen` og `uv run fastapi dev` i `backend/`, `npm ci` og `npm run dev` i `frontend/`), med versjonskrav for Python 3.14, Node 26 og Docker Compose ≥ 2.20, og adressen `http://127.0.0.1:3000` (AD-11, AR1, AR2)

**Given** README
**When** delen om demomodus og nøkkel leses
**Then** den forklarer at appen starter i demomodus uten nøkkel, og hvordan «Bruk eksempel» og «Analyser» viser eksempelresultatet (FR-15, FR-16)
**And** den forklarer hvordan man kopierer `.env.example` til `.env`, setter `ANTHROPIC_API_KEY` og eventuelt `ANTHROPIC_MODEL`, og starter appen på nytt (AD-10, NFR3)

**Given** README
**When** delen om feilsøking leses
**Then** den sier at en global miljøvariabel `ANTHROPIC_API_KEY` på maskinen slår av demomodus også når `.env` er tom, og hvordan man fjerner den for økten
**And** den sier at en ugyldig nøkkel gir meldingen «Klarte ikke å analysere, prøv igjen» (FR-14)

**Given** README
**When** testdelen leses
**Then** den viser kommandoene for alle automatiske tester (`uv run pytest`, `npm test`, `npx playwright test`) og at de kjøres uten nøkkel, og hvordan testsettet kjøres manuelt med `run_testset.py` og hvor rapportene ligger (AD-9, NFR5)
**And** den viser til de siste testsettrapportene, revisjonen fra story 3.4 og brukertesten fra story 3.5

**Given** en ny klon av repoet i en tom mappe eller på en ren maskin, uten `.env` og uten global `ANTHROPIC_API_KEY`
**When** `docker compose up` kjøres etter README (manuelt)
**Then** begge tjenestene starter uten feil, og inputsiden viser «Demomodus – ingen API-nøkkel funnet» (FR-15, AD-11)
**And** UJ-2 gjennomføres: «Bruk eksempel» → «Analyser» viser eksempelresultatet med alle fire trinn og et nedgradert krav, og ett endret tegn i annonsen gir «Ekte analyse krever API-nøkkel – se README» (FR-16, FR-17)

**Given** den samme klonen
**When** alle automatiske tester kjøres etter README (manuelt)
**Then** pytest, Vitest og Playwright med axe er grønne uten API-nøkkel (NFR5, NFR12, AD-9)
**And** resultatet av sluttsjekken (dato, maskin eller mappe, og hvert steg bestått eller ikke) er notert i `.docs/`, og `git status` viser ingen sporede filer med CV-tekst utover de fiktive CV-ene (NFR8)

