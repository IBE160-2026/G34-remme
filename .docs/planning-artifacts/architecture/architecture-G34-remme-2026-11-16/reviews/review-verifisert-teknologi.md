---
review: verifisert-teknologi
target: ../ARCHITECTURE-SPINE.md
date: 2026-11-16
reviewer: uavhengig arkitekturkontrollør (Claude)
verdict: Godkjent med forbehold – ingen kritiske funn, tre høye som bør rettes før første story
---

# Review: Er teknologibeslutningene verifisert mot virkeligheten?

## Dom

Versjonene i Stack-tabellen stemmer med npm og PyPI per 2026-11-16. Alle pakker finnes, og Python 3.14 støttes av FastAPI, Pydantic og anthropic. Det som svikter, er ikke versjonsnumrene, men noen **API-påstander i AD-8 og AD-10/AD-11 som ikke holder slik de står**:

1. `fallbacks: "default"` finnes ikke på `client.messages.parse()`. Den krever beta-endepunktet og en beta-header.
2. Next.js-rewrites har en proxy-timeout på rundt 30 s. Backendens tidsgrense er 60 s.
3. TypeScript 7.0.2 er nyeste versjon, men økosystemet (blant annet `openapi-typescript`) krever fortsatt TS 5.x.

Ingen funn er kritiske, fordi alle kan rettes i spinen uten å endre oppbyggingen. Men de tre høye bør rettes før byggingen starter. Ellers møter utviklerne dem som feil ved første `npm install` eller første ekte analyse.

## Hva som ble sjekket, og hvordan

| Påstand i spinen/memloggen | Metode | Resultat |
| --- | --- | --- |
| next 16.4.6, react 19.3.1, tailwindcss 4.3.5, shadcn 4.23.0, typescript 7.0.2, vitest 5.1.0, @playwright/test 1.65.1 | `npm view <pakke> version` | Stemmer, alle er nyeste versjon |
| fastapi 0.163.1, pydantic 2.14.3, anthropic 2.9.0, uvicorn 0.54.0, pytest 9.2.0, httpx 0.28.1 | PyPI JSON-API | Stemmer, alle er nyeste versjon |
| Python 3.14 støttes | PyPI `requires_python` + classifiers, cp314-hjul for pydantic-core | Ja. fastapi >=3.11, pydantic >=3.10, anthropic >=3.10. Alle har 3.14-classifier, og pydantic-core 2.50.4 har cp314-hjul for Linux og Windows. |
| Python 3.15.2 nyeste, 3.14.10 forrige | endoflife.date API | Stemmer |
| Node 26.13.1 er LTS (Lithium) | nodejs.org/dist/index.json | Stemmer |
| uv 0.12 | PyPI + lokal `uv --version` | Lokalt 0.12.10, men nyeste er **0.13.8** (se L1) |
| Docker Compose v2 | lokal `docker compose version` | Lokalt **v5.5.0** (se L2) |
| Docker-bilder for 3.14 og Node 26 | Docker Hub API | `python:3.14-slim` og `node:26-alpine` finnes og er oppdatert i november 2026 |
| `client.messages.parse()`, `output_config.effort`, `fallbacks` | Lastet ned anthropic 2.9.0-hjulet og leste kildekoden | Se H1, M3 og M4 |
| `claude-opus-5-5`: pris, effort-standard, fallback-støtte | anthropic.com/platform.claude.com via WebSearch, claude-api-skillen, `types/model_param.py` i SDK-en | $4/$20 per MTok bekreftet på nettet. Effort-standard `medium` og fallback-støtte står i skillen (bufret 2026-10-06), ikke bekreftet direkte i nettdokumentasjonen. |
| `fastapi dev` | fastapi.tiangolo.com (WebSearch), PyPI-avhengigheter | Finnes, men krever `fastapi[standard]` og lytter på 127.0.0.1 (se M1) |
| Next.js rewrites | nextjs.org (WebSearch), GitHub-issues | Rewrites finnes fortsatt i Next 16, men har en proxy-timeout på 30 s (se H2) |
| Tailwind v4 `@theme` + shadcn CLI | ui.shadcn.com/docs/tailwind-v4 (WebSearch) | Bekreftet. shadcn init skriver `@theme inline` i globals.css og trenger ingen tailwind.config. |

## Kritisk

Ingen.

## Høy

### H1 – `fallbacks: "default"` finnes ikke på `client.messages.parse()`

**Funn:** AD-8 sier at adapteren bruker `client.messages.parse()` og at `fallbacks: "default"` er slått på. I anthropic 2.9.0 har `resources/messages/messages.py::parse` **ingen** `fallbacks`-parameter. Den finnes bare på `client.beta.messages.parse()` (typen `BetaFallbacksParam = Iterable[BetaFallbackParam] | Literal["default"]`). Ifølge Anthropics migreringsguide krever `"default"`-formen beta-headeren `server-side-fallback-2026-07-01`. Den eldre listeformen bruker `-2026-06-01`, og blander man header og form, gir det 400. Spinen nevner verken beta-endepunktet eller headeren. En utvikler som følger AD-8 bokstavelig, får `TypeError` (ukjent argument) eller må legge det i `extra_body` uten header, og det gir 400.

Mer å vite:
- Når en fallback slår inn, kommer svaret fra en annen modell, for eksempel Opus 4.8 ved cyber-avslag. Den har andre priser ($5/$25), og det påvirker kostnadstaket (se M2).
- `stop_reason == "refusal"` må fortsatt håndteres. AD-4 steg 3 (`stop_reason` ≠ `end_turn` → `analysis_failed`) dekker dette.

**Fikseforslag:** Skriv om AD-8 til: «Adapteren bruker `client.beta.messages.parse(..., output_format=ExtractionResult, output_config={"effort": "medium"}, fallbacks="default", betas=["server-side-fallback-2026-07-01"])`.» Alternativt kan fallback tas ut av v1, siden avslag gir `analysis_failed` uansett. Legg til en kort test i fixture-adapteren som simulerer `stop_reason="refusal"`.

### H2 – Next.js-rewrite til FastAPI kan kutte forespørselen etter cirka 30 s, mens AD-4 tillater 60 s

**Funn:** AD-10 og Structural Seed sender `/api/*` via Next-rewrite til backenden. Rewrites mot ekstern adresse går gjennom Next sin innebygde http-proxy, som har hatt en hardkodet `proxyTimeout` på 30 s (vercel/next.js#36251 og #36586, med «socket hang up» etter cirka 31 s). Innstillingen `experimental.proxyTimeout` finnes i praksis, men er ikke offisielt dokumentert, og jeg kunne ikke bekrefte at den virker i 16.4. En Opus 5.5-analyse med tenkning som ikke kan slås av, `effort: medium` og opptil 6 000 utdata-tokens kan lett ta over 30 s. Da får frontenden en nettverksfeil i stedet for `analysis_failed`, og EXPERIENCE/FR-13 og FR-14 brytes.

**Fikseforslag:** Velg ett av disse og skriv det inn i AD-10:
- (a) Sett `experimental: { proxyTimeout: 70_000 }` i `next.config.ts`, og legg til en e2e- eller manuell test med en kunstig treg backend (for eksempel en fixture med 45 s forsinkelse) som bekrefter at det virker.
- (b) Kall backenden direkte fra en Next Route Handler (`app/api/[...path]/route.ts`) med egen `fetch` og `AbortSignal.timeout(65_000)`.
- (c) Aktiver CORS i FastAPI for `localhost:3000` og la nettleseren kalle `:8000` direkte. Det svekker «én adresse», men fjerner proxyen.

Anbefaling: (a) med test, og (b) som reserve.

### H3 – TypeScript 7.0.2 er nyeste versjon, men verktøyene rundt støtter den ikke ennå

**Funn:** `npm view openapi-typescript@7.13.0 peerDependencies` gir `typescript: ^5.x`. AD-5 og Deferred nevner openapi-typescript som aktuelt verktøy, og med TS 7.0.2 gir `npm install` da ERESOLVE-konflikt. TS 7 er den Go-baserte kompilatoren («Corsa»), og ifølge Nx og flere andre kilder mangler den ennå et stabilt programmatisk API. Det rammer verktøy som bruker kompilator-API-et, som typescript-eslint og deler av vite-økosystemet. Støtte for TS 7 i `next build` kom i Next 16.3 ifølge sekundærkilder. Det er ikke bekreftet i offisielle release notes. «Verifisert mot npm» bekrefter at pakken finnes, ikke at den passer sammen med resten av stacken. PRD-kravet om at sensor skal kunne kjøre `npm install` uten feil gjør dette til et høyt funn.

**Fikseforslag:** Lås `typescript` til `~5.9` (eller nyeste 6.x hvis peer-kravene tillater det) i Stack-tabellen. Begrunn det med «TS 7 utsettes til openapi-typescript, typescript-eslint og vitest/vite støtter den». Alternativt kan TS 7 beholdes, men da må det verifiseres med en scaffold (`create-next-app` + `shadcn init` + `openapi-typescript` + `vitest`) som installerer og bygger uten `--legacy-peer-deps`, før spinen settes til final.

## Middels

### M1 – `fastapi dev` passer ikke i Docker, og `BACKEND_URL` er feil inne i Compose

**Funn:** `fastapi dev` finnes (fastapi-cli 0.0.34). Men:
- den krever `fastapi[standard]` (ellers RuntimeError eller installasjonsmelding), og
- den lytter på `127.0.0.1` med auto-reload.

I en container er 127.0.0.1 ikke nåbar fra frontend-containeren. AD-11 sier at begge måtene gir «samme app», men sier ikke hvilken kommando backend-containeren kjører. I tillegg er standardverdien `BACKEND_URL=http://localhost:8000` (AD-10) feil i Compose, der den må være `http://backend:8000`. Hvis frontenden kjøres med `next build && next start`, leses rewrites-destinasjonen ved **build**-tid og bakes inn, slik at endring i `.env` ved oppstart ikke slår gjennom.

**Fikseforslag:** I AD-11:
- Avhengigheten er `fastapi[standard]`.
- Lokal kjøring bruker `uv run fastapi dev`.
- Docker bruker `fastapi run --host 0.0.0.0 --port 8000`.
- Compose setter `BACKEND_URL=http://backend:8000` for frontend-tjenesten.

Si også om frontend-containeren kjører `next dev` eller `next build/start`. Ved build/start må `BACKEND_URL` gis som build-arg.

### M2 – Kostnadstaket på 2 kr har liten margin, og tenkning teller mot `max_tokens`

**Funn:** Prisen $4/$20 per MTok er bekreftet på anthropic.com. Grovt overslag for verste tilfelle: 2 × 15 000 tegn er cirka 8–10k tokens, pluss systemprompt, til sammen cirka 11–12k input. Det gir cirka $0,046 input og $0,12 output ved fulle 6 000 tokens, til sammen cirka $0,17. Med en dollarkurs på 10–11 kr blir det **1,7–1,9 kr**. Det er under taket, men med liten margin. Valutakursen er ikke verifisert. Utløses fallback (H1), kan avvist første forsøk pluss andre modell (Opus 4.8: $5/$25) gå over 2 kr. Dessuten kan tenkning ikke slås av på Opus 5.5, og tenke-tokens teller mot `max_tokens`. Mange krav med sitater og hint, pluss tenkning på `medium`, kan treffe 6 000 og gi `stop_reason: max_tokens`, som blir `analysis_failed`. Memloggen merker 6 000/medium som [ASSUMPTION], og det er riktig, men spinen omtaler det som fast regel.

**Fikseforslag:** Merk `max_tokens 6000` og `effort medium` i AD-8 som startverdier som justeres etter testsettet, slik memloggen gjør. Logg `usage.output_tokens` (AD-7 tillater det allerede) og regn ut faktisk kost per analyse i testsettrapporten. Vurder `effort: "low"`, som skillen anbefaler for uttrekk og klassifisering. Notér valutakursen som brukes.

### M3 – Tidsgrensen på 60 s og SDK-ens retries

**Funn:** SDK-ens `parse()` regner ut sin egen ikke-strømmende timeout når `timeout` ikke er gitt, og standard `max_retries` er 2. Retries gjelder også timeout. Uten eksplisitt `timeout=60` og `max_retries` kan veggklokketiden bli opptil cirka 3 × timeout, langt over 60 s i AD-4 steg 3.

**Fikseforslag:** I AD-8: `Anthropic(timeout=60.0, max_retries=0)` (eller 1 med samlet frist). Alternativt kan kallet pakkes i `asyncio.wait_for(..., 60)` med `AsyncAnthropic`. Test tidsavbrudd med fixture-adapteren.

## Lav

### L1 – uv 0.12 er ikke lenger nyeste
Nyeste på PyPI er 0.13.8, og lokalt er 0.12.10 installert. **Fiks:** Skriv `uv >=0.12` i Stack-tabellen, eller oppdater til 0.13.

### L2 – «Docker Compose v2» er utdatert betegnelse
Lokalt er Docker Compose v5.5.0 installert. Kommandoen `docker compose up` gjelder fortsatt. **Fiks:** Skriv «Docker Compose (plugin, `docker compose`)» i stedet for «v2».

### L3 – httpx og pydantic-settings i Stack-tabellen
anthropic 2.9.0 avhenger av **`httpx2`**, ikke `httpx`. FastAPI[standard] drar inn begge, og Starlette 1.10 aksepterer begge for TestClient. httpx 0.28.1 er riktig nyeste versjon og fungerer for testene, men tabellen gir inntrykk av at det er SDK-ens HTTP-klient. `pydantic-settings` (AD-10) mangler i tabellen, og nyeste er 2.16.3. **Fiks:** Legg til `pydantic-settings 2.16.3`, og noter at httpx bare brukes i tester.

### L4 – `output_format` kalles «deprecated» i memloggen, men brukes i `parse()`
Memloggen sier at `output_format` er utdatert. Det gjelder `messages.create()`. I `messages.parse()` (SDK 2.9.0) er `output_format=ExtractionResult` fortsatt riktig måte å gi Pydantic-typen på, mens `output_config` brukes til `effort` (og `format` hvis man sender rått skjema). **Fiks:** Gi AD-8 et kodeeksempel med begge parameterne, så ingen prøver å legge Pydantic-klassen i `output_config.format`. SDK-en avviser det med `TypeError`.

### L5 – Prisen var hentet fra en bufret kilde
Memloggen oppgir claude-api-skillen (bufret 2026-10-06) som kilde. Prisen er nå bekreftet på anthropic.com og platform.claude.com ($4/$20, cache-lesing $0,20). Effort-standarden `medium` og fallback-støtten for Opus 5.5 er bare bekreftet via skillen og SDK-typene, ikke på en nettside jeg fikk lest direkte. **Fiks:** Legg inn en oppføring i memloggen med nettkilden, og kjør `client.models.retrieve("claude-opus-5-5")` (feltet `capabilities`) én gang når nøkkel finnes.

### L6 – Python 3.14 er et godt valg, men noter utviklermaskinen
3.15.2 er nyeste, men anthropic 2.9.0 og uvicorn har classifiers bare til og med 3.14, så 3.14 er det trygge valget. Lokalt er Python 3.10.2 installert, og det er for gammelt (fastapi krever >=3.11). **Fiks:** Sett `requires-python = ">=3.14,<3.15"` i `pyproject.toml` og `.python-version` = 3.14, slik at `uv` henter riktig tolk automatisk. Skriv dette i README.

### L7 – Node: dev-maskinen ligger bak LTS
Lokalt er Node 26.7.0 installert, mens nyeste LTS er 26.13.1. Next 16.4.6 krever >=20.9 og Vitest 5.1 >=26.0, så det går. **Fiks:** Legg til `"engines": {"node": ">=26"}` og eventuelt `.nvmrc` med 26.

## Bekreftet uten anmerkning

- Next.js 16 `rewrites` i `next.config` finnes fortsatt. `middleware` er omdøpt til `proxy.ts`, men det angår ikke rewrites. Se H2 for timeouten.
- Tailwind v4 `@theme` og shadcn CLI 4.x med Tailwind v4: shadcn init skriver `@theme inline` i `globals.css`, bruker `tw-animate-css` og trenger ingen `tailwind.config`. Det passer med AD-12.
- Next 16.4.6 aksepterer React 19.x og `@playwright/test ^1.51.1`.
- `claude-opus-5-5` finnes som modell-ID i SDK-en (`types/model_param.py`).
- `output_config.effort` er en del av den vanlige (ikke-beta) `OutputConfigParam` med nivåene low/medium/high/xhigh/max.

## Kilder

- npm-registeret (`npm view`), PyPI JSON-API, nodejs.org/dist/index.json, endoflife.date/api/python.json, Docker Hub API (kjørt 2026-11-16)
- Kildekoden i anthropic 2.9.0-hjulet: `resources/messages/messages.py`, `resources/beta/messages/messages.py`, `types/output_config_param.py`, `types/beta/beta_fallbacks_param.py`, `types/anthropic_beta_param.py`
- [Claude Opus 5.5 – Anthropic](https://www.anthropic.com/claude-opus-5-5), [Pricing – Claude Platform Docs](https://platform.claude.com/docs/en/about-claude/pricing), [Opus 5.5 overview](https://platform.claude.com/docs/en/models/opus-5-5/overview)
- [FastAPI CLI](https://fastapi.tiangolo.com/fastapi-cli/)
- [Next.js rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites), [Next.js proxy](https://nextjs.org/docs/app/getting-started/proxy.md), [vercel/next.js#36251](https://github-redirect.dependabot.com/vercel/next.js/issues/36251), [vercel/next.js#36586](https://github-redirect.dependabot.com/vercel/next.js/issues/36586)
- [shadcn/ui – Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4)
- [Nx – TypeScript 7](https://nx.dev/docs/kb/typescript-7), [Next.js 16.3 og TypeScript 7 (achromatic.dev)](https://www.achromatic.dev/blog/nextjs-16-3-typescript-7-upgrade)
