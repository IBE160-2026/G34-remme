# Epic 1 Context: The whole flow works with example data (Hele flyten fungerer med eksempeldata)

<!-- Compiled from planning artifacts. Edit freely. Regenerate with compile-epic-context if planning docs change. -->

## Goal

Anyone, including the examiner (sensor) with no API key, can start the app with `docker compose up` or with uv + npm and walk through the entire flow in demo mode at no cost: step-by-step pasting, analysis, an overview with the score, three review steps with quotes and hints, quote verification (including one downgraded requirement), "Godt treff" and every outcome message. The epic also delivers the finished, tested domain core, analysis pipeline, LLM port and API contract. Epic 2 later plugs the real Claude adapter into this port without changing the domain, contract or frontend flow. Demo mode must therefore run exactly the same pipeline as a real analysis.

## Stories

- Story 1.1: Skeleton that starts in demo mode
- Story 1.2: Domain core: quote check, score, potential score, sorting and counts
- Story 1.3: Analysis pipeline with fixture adapter and API contract
- Story 1.4: Input wizard: paste CV and job ad
- Story 1.5: Analyze and show the outcome
- Story 1.6: Result overview
- Story 1.7: Step-by-step review
- Story 1.8: Good match and new job ad
- Story 1.9: Full flow tested end to end in demo mode, with accessibility

## Requirements & Constraints

- **Input:** one CV field («Lim inn CV her:») and one job-ad field («Lim inn annonse her:»), with the help text «Bare en CV og en annonse per analyse». The limit is 15 000 characters per field, where one character is one Unicode code point. Above the limit, show «Teksten er for lang». «Analyser» is disabled while a field is empty, whitespace-only or over the limit. Pasted text is never truncated.
- **Privacy:** before «Analyser», show «CV-en din sendes til Claude for analyse. Appen lagrer den ikke.». CV and ad text are never stored on the server, in files or in logs, and the frontend never logs them to the console. The fields persist only while the tab is open (sessionStorage). After an analysis, both fields are still filled.
- **Score:** must-requirements score 2/1/0 and should-requirements 1/0.5/0 (met/partial/missing). The score is achieved ÷ max × 100, rounded half up to a whole percent, and is computed after the quote check. It is deterministic, and 0 requirements gives no score. The potential score treats partial as met. It is shown only when partial requirements exist and it differs from the score.
- **Quote check:** every quote for met or partial must appear verbatim in the CV (whitespace differences are ignored; case and punctuation must match). A failed quote downgrades the requirement to missing and shows the hint «Fant ikke belegg i CV-en for dette kravet». The check runs on every analysis and has automated tests.
- **Result order:** met → partial → missing, with must before should within each status.
- **Good match:** if the rounded score is ≥ 90, ask «Godt treff, klar til å søke?». «Ja» shows «Analyser ny annonse», which clears the ad and keeps the CV. «Nei» closes the question.
- **Messages:** use these strings verbatim, with no exclamation marks or emoji: «Analyserer …», «Ingen krav funnet, har du husket annonsen?», «Klarte ikke å analysere, prøv igjen», «Ekte analyse krever API-nøkkel – se README», «Teksten er for lang». No partial result is ever shown.
- **Demo mode:** with no key, show the banner «Demomodus – ingen API-nøkkel funnet». «Bruk eksempel» fills both fields with example data, and the result looks exactly like a real result, marked «Eksempeldata». Any text that is not identical to the example data gives «Ekte analyse krever API-nøkkel – se README».
- **Runnability:** the app runs locally on a PC browser with no paid accounts. Mobile is out of scope. All automated tests run without an API key or network access.
- **Accessibility:** WCAG 2.2 AA, verified with axe and showing no violations.

## Technical Decisions

- **Monorepo, no starter template:** `backend/` (FastAPI, uv, Python 3.14, `requires-python >=3.14,<3.15`) and `frontend/` (Next.js 16.4, React 19, TypeScript 5.9 (not 7), Tailwind v4, shadcn/ui, Node 26). Commit lock files and install with `uv sync --frozen` / `npm ci`. Docker uses `python:3.14-slim` / `node:26-slim`, ports are bound to 127.0.0.1 (backend 8000, frontend 3000), and the frontend waits on a healthcheck against `/api/status`. Lint with ruff + import-linter and ESLint + Prettier.
- **Hexagonal backend:** `domain/` (pure, no I/O, imports nothing) ← `analysis/` ← `api/`; `llm/` holds the port and the adapters. Only `llm/` may import `anthropic`. Import-linter contracts are enforced as a pytest test.
- **Backend decides everything:** the frontend never computes, counts, sums, sorts or applies thresholds. It may filter `requirements` by `status` while keeping their order. It shows «Godt treff» only when `show_good_match` is true. The one exception is that it mirrors the input-limit and empty checks for UI feedback, and the backend remains authoritative.
- **Port:** `extract(cv, annonse) -> Extraction {result, model, usage|null}` or it raises `ExtractionFailed(reason)` (`timeout|api_error|stop_reason|refusal|invalid`). Both adapters share `parse_extraction(text)`. `FixtureExtractor(path)` reads a `{stop_reason, text}` envelope and returns `model: "fixture"`, `usage: null`. Fixtures contain only model requirements, never scores.
- **Pipeline order (fixed, stops at the first outcome):** empty → too long → demo check → extract → 0 requirements → quote check with `normalize(s) = re.sub(r"\s+", " ", unicodedata.normalize("NFC", s)).strip()` → integer score `(200·a2 + m2) // (2·m2)` on half-points (must 4/2/0, should 2/1/0; no floats, no `round()`) → potential score → stable sort → `show_good_match` → `counts`.
- **Invariants** (enforced by a `model_validator`):

  | Status | `quote` | `hint` | `downgraded` | `rejected_quote` |
  | --- | --- | --- | --- | --- |
  | met | text | null | false | null |
  | partial | text | text | false | null |
  | missing (from the model) | null | text | false | null |
  | missing (downgraded) | null | null | true | the rejected quote |

- **API:** `GET /api/status` → `{demo, max_chars}`. `GET /api/example` → `{cv, annonse}` in demo mode, otherwise 404. `POST /api/analyze` always returns 200 with a union discriminated on `outcome` (`result`, `empty_input`, `text_too_long`, `demo_requires_key`, `no_requirements`, `analysis_failed`), and nulls are sent explicitly. 422 is returned only for a malformed request, never echoes `input`, and the backend sends no Norwegian user text.
- **Result shape:** `AnalysisResult` has `match_score`, `potential_score|null`, `show_good_match`, `points_achieved`, `points_max`, `requirements[]` (each with `text, type, status, quote, hint, downgraded, rejected_quote, points, points_max`) and `counts {met|partial|missing: {must, should, total}, downgraded}`. JSON uses snake_case.
- **Contract source of truth:** Pydantic in `api/schemas.py`. `scripts/export_openapi.py` writes `frontend/lib/api/openapi.json`, and `npm run gen:api` generates `types.gen.ts`. Neither file is hand-edited, and a test fails if they are stale.
- **Demo mode:** demo mode is on when `ANTHROPIC_API_KEY.strip()` is empty. The app factory injects `demo` and `extractor` as two separate dependencies. Example data lives in `backend/app/fixtures/example/` (LF line endings, UTF-8 without BOM). The demo comparison normalises only `\r\n` and is otherwise exact. The example response contains every status plus exactly one fabricated quote.
- **Config:** `.env` sits at the repo root and is read only by the backend, via an absolute path from `config.py`. `MAX_CHARS = 15000` is defined only in the backend, and the frontend gets it from `/api/status`. Next rewrites `/api/*` to `BACKEND_URL`. `proxyTimeout` is deferred to story 2.3. The frontend `fetch` uses `AbortSignal.timeout(90_000)`.
- **Logging:** one JSON line per analysis on stdout (`outcome, duration_ms, model, tokens`), never any content. Exceptions are logged by type name only, and the `anthropic` and `httpx` loggers are set to WARNING.
- **Frontend state:** a single route `/` with the state machine `input → analyzing → outcome`. The active step lives in the URL hash (`#oversikt`, `#bra`, `#tydeligere`, `#mangler`, `#alt`). The result is held only in React state. Only `lib/storage.ts` touches `sessionStorage` (`cvjobb:fields` = `{v:1, cv, annonse}`), and a reload returns to input. All Norwegian strings live only in `frontend/lib/messages.ts`. There is no global store.
- **Tests:** pytest runs with `ANTHROPIC_API_KEY=""` and an autouse guard against creating a real client. Valid and invalid envelopes live in `backend/tests/fixtures/`. The score is checked against `Fraction` for every combination up to 20 requirements. Boundary tests at 14 999 / 15 000 / 15 001 characters plus emoji run in both pytest and Vitest. Playwright with axe runs in demo mode.

## UX & Interaction Patterns

- **Look:** calm "paper and ink" editorial style. DESIGN.md tokens (18 colours, type scale from score 64 down to meta 13, Georgia / Segoe UI system font stacks, spacing, rounded corners) are defined once in the `globals.css` `@theme`. shadcn variables only reference these tokens. No web fonts, shadows, gradients, cards inside cards or coloured status backgrounds. Status is always shown with both a symbol and a word, and icons use a single stroke weight.
- **Input page:** two columns. The left column presents the four principles. The right column holds the wizard with the step indicator CV – Annonse – Analyser. A completed step collapses to a row (check mark, first line, counter, «Endre»). The counter reads «357 / 15 000 tegn». An overflowing field gets a brick-red border, and the error is linked with `aria-describedby`. «Bruk eksempel» and the «Eksempeldata» badges appear only in demo mode.
- **While analyzing:** the button reads «Analyserer …» and is disabled, «Endre» is disabled, and the fields stay visible. Non-result outcomes are shown as a calm serif sentence between two hairlines, not as a coloured box.
- **Result page (three margins):** the left margin holds the table of contents «Gjennomgang» (`toc-active` + `aria-current="step"`) and «← Endre CV eller annonse». The reading column is 640 px. The right margin holds the side notes «Slik er scoren regnet» and «Sitatkontrollen». The overview shows «Du er på X %.», the potential-score lede, a points strip (`aria-hidden`, with the text «X av Y poeng» using a decimal comma), distribution rows that link to the steps, and «Neste: Dette er bra». Steps 2–4 are «Dette er bra.» / «Dette kan bli tydeligere.» / «Dette mangler.», with Forrige/Neste navigation, and focus moves to the step heading. Step 4 ends with «Ferdig med gjennomgangen.». «Vis alt på én side» toggles a stacked view.
- **Accessibility:** «Analyserer …», messages and the new score use `aria-live="polite"`. Tab order follows reading order. The vertical demo line is `aria-hidden`. There are no dialogs and no celebratory animation.
- **Below 1280 px:** an untested assumption is that side notes move under their requirement and the table of contents moves above the reading column.

## Cross-Story Dependencies

- 1.1 sets up the skeleton, config, `/api/status`, tokens and the banner that every later story builds on.
- 1.2 (domain) comes before 1.3 (pipeline, port, fixture adapter, API and generated types).
- 1.3's generated `types.gen.ts` and `/api/example` are needed by the frontend stories 1.4–1.8.
- 1.4 → 1.5 → 1.6 → 1.7 → 1.8 build the UI in sequence: input, then outcome handling, then overview, then steps, then good match.
- 1.9 is the end-to-end and axe gate over all of the above.
- Epic 2 adds `anthropic_adapter`, the prompt and the verified `proxyTimeout` (story 2.3) behind the same port and contract. Epic 1 must not hard-code anything that assumes the fixture adapter.
