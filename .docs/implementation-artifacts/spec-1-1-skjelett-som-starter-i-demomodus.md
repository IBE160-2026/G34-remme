---
title: 'Story 1.1: Skeleton that starts in demo mode'
type: 'feature'
created: '2026-11-17'
status: 'ready-for-dev'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '{project-root}/.docs/implementation-artifacts/epic-1-context.md'
  - '{project-root}/.docs/planning-artifacts/ux-designs/ux-G34-remme-2026-11-15/DESIGN.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The repo has only planning docs. There is no app the examiner can clone and start, and no skeleton that later stories (domain, pipeline, UI) can build on.

**Approach:** Create the monorepo skeleton from scratch: a FastAPI backend with the hexagonal package layout, config and `GET /api/status`, and a Next.js 16 frontend with the DESIGN.md theme and the demo banner. Add Docker Compose, `.env.example`, lint and test tooling, and a README for starting the app. With no key, the app starts in demo mode.

## Boundaries & Constraints

**Always:**
- Pin versions from the architecture Stack table. Commit `uv.lock` and `package-lock.json`. `requires-python = ">=3.14,<3.15"`, `.python-version` = `3.14`, `engines.node = ">=26"`.
- Demo mode = `ANTHROPIC_API_KEY.strip()` is empty. `.env` is read only by the backend, from `Path(__file__).resolve().parents[2] / ".env"`. `MAX_CHARS = 15000` exists only in the backend.
- Log the startup mode as one JSON line on stdout, never the key.
- The frontend fetches `/api/status` in the browser on every page load (never at build time), via the Next rewrite of `/api/*` to `BACKEND_URL`.
- All Norwegian UI text lives in `frontend/lib/messages.ts`, including the README link target as one constant.
- DESIGN.md tokens are defined once in the `globals.css` `@theme`. shadcn variables only reference them. No web fonts, shadows or gradients.
- pytest runs with `ANTHROPIC_API_KEY=""`. Import-linter contracts run as a pytest test.

**Never:**
- No `experimental.proxyTimeout` (story 2.3 owns it). No `anthropic` import or adapters, domain logic, `/api/analyze` or `/api/example` (stories 1.2–1.3, 2.1).
- No UI beyond the page shell and the banner (input wizard is story 1.4). Install no shadcn components yet.
- Never put the key or `.env` in the frontend container, in git or in logs.

**Decisions (user, 2026-11-17):**
- The banner's README link goes to a local page in the app, `/readme`, not GitHub. A server component reads the repo README at request time (path from `README_PATH`, default `../README.md`; in Compose `./README.md` is bind-mounted read-only and `README_PATH` points to it) and shows it as pre-wrapped plain text in the page theme. Adds no markdown dependency. If the file is missing, the page shows a short Norwegian sentence instead of crashing.
- The spec is kept whole (about 1,900 tokens): backend, frontend and Docker only make sense together.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| No key | `.env` missing, or key empty/whitespace | `GET /api/status` → `200 {"demo": true, "max_chars": 15000}`; banner shown | Compose starts even without `.env` |
| Key set | `ANTHROPIC_API_KEY=sk-x` | `{"demo": false, "max_chars": 15000}`; no banner | — |
| Status fetch fails | backend down | no banner, page still renders | no crash; no retries loop |

</frozen-after-approval>

## Code Map

- `README.md` -- existing group README (title «G34 — Lone Ranger», members). Keep that header; add start, demo-mode and key sections in Norwegian.
- `.gitignore` -- already ignores `.env`, `.env.*` (keeps `.env.example`), `node_modules/`, `.venv/`, `.next/`, caches. Reuse; add nothing unless needed.
- `.docs/planning-artifacts/architecture/architecture-G34-remme-2026-11-16/ARCHITECTURE-SPINE.md` -- Stack table (versions), Structural Seed (source tree), AD-3, AD-10, AD-11, AD-12, AD-13.
- `.docs/planning-artifacts/ux-designs/ux-G34-remme-2026-11-15/DESIGN.md` -- frontmatter tokens: 18 colours, 9 type levels, rounded, spacing, page-margin 120. The `demo-band` colour and the 1.5 px icon stroke apply to the banner.
- No backend or frontend code exists yet; everything below is new.

## Tasks & Acceptance

**Execution:**
- [ ] `backend/pyproject.toml`, `backend/.python-version`, `backend/uv.lock` -- uv project (`fastapi[standard]`, pydantic-settings; dev: pytest, httpx, ruff, import-linter) with ruff config and import-linter contracts (domain imports no other layer; only `app.llm` may import `anthropic`; layers api → analysis → domain/llm) -- AR1, AR3
- [ ] `backend/app/{domain,analysis,llm,api}/__init__.py`, `backend/app/config.py`, `backend/app/main.py`, `backend/app/api/status.py` -- packages, pydantic-settings `Settings` with absolute `.env` path, `MAX_CHARS`, `is_demo`, `create_app()` with the status route and the startup JSON log line -- AD-3, AD-10, AD-13
- [ ] `backend/tests/conftest.py`, `backend/tests/test_status.py`, `backend/tests/test_architecture.py` -- force `ANTHROPIC_API_KEY=""`; test demo true for missing/empty/whitespace key and false for a set key; log contains no key; import-linter contracts pass -- AD-9
- [ ] `backend/Dockerfile`, `frontend/Dockerfile`, `backend/.dockerignore`, `frontend/.dockerignore`, `docker-compose.yml` -- `python:3.14-slim` / `node:26-slim`; backend `fastapi run --host 0.0.0.0 --port 8000` with optional `env_file: .env`; frontend `next dev -p 3000` with `BACKEND_URL=http://backend:8000`, no env_file, README bind-mounted read-only with `README_PATH`; ports on 127.0.0.1; healthcheck on `/api/status` -- AD-11
- [ ] `frontend/` (package.json, package-lock.json, next.config.ts, tsconfig, eslint.config.mjs, .prettierrc, .prettierignore, postcss) -- Next 16.4.6, React 19.3.1, TS 5.9.3, Tailwind 4.3.5; `/api/:path*` rewrite to `BACKEND_URL` (default `http://127.0.0.1:8000`) -- AD-10
- [ ] `frontend/app/globals.css`, `frontend/app/layout.tsx`, `frontend/app/page.tsx`, `frontend/components/demo-banner.tsx`, `frontend/lib/messages.ts`, `frontend/app/readme/page.tsx` -- tokens in `@theme`, shadcn variables mapped to tokens, `lang="nb"`, client-side status fetch and banner, local README page -- UX-DR1, UX-DR16, FR15
- [ ] `.env.example`, `.gitattributes`, `README.md` -- documented variables; `backend/app/fixtures/** text eol=lf`; start with and without Docker, demo mode, how to add the key -- NFR3, AR12

**Acceptance Criteria:**
- Given a fresh clone with no `.env`, when `docker compose up` runs, then both services start and `http://127.0.0.1:3000` shows «Demomodus – ingen API-nøkkel funnet».
- Given no Docker, when `uv sync --frozen` + `uv run fastapi dev` and `npm ci` + `npm run dev` run, then the same app runs on ports 8000 and 3000.
- Given the skeleton, when ruff check/format, pytest, `npm run lint` and `npx prettier --check .` run, then all pass.

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Design Notes

- Compose's `env_file: .env` fails when the file is missing. Use the long form `env_file: [{path: .env, required: false}]`, which needs Docker Compose ≥ 2.24 (the Stack table says ≥ 2.20).
- The banner is a client component that fetches `/api/status` in `useEffect`, so the mode is never baked in at build time. Render it in `layout.tsx`, so every view (including `/readme`) has it. The info icon is `aria-hidden`.
- **Backend wiring:** `create_app(settings: Settings | None = None)`, plus a module-level `app = create_app()` and `[tool.fastapi] entrypoint = "app.main:app"`, so that `fastapi dev`/`fastapi run` work without arguments. Settings has `anthropic_api_key: str = ""` and `anthropic_model: str = "claude-opus-5-5"`. Do not set `env_ignore_empty`, so an empty environment variable still overrides `.env`. Tests build `Settings(_env_file=None, …)` and pass it into `create_app`, so a developer's real `.env` is never read. `[tool.pytest.ini_options] pythonpath = ["."]`, because this is a uv project with no package build.
- **Import-linter:** contracts reference only modules that exist in 1.1: `app.domain` is independent of the other app layers, layers are `app.api` > `app.analysis` > `app.domain | app.llm`, and a forbidden contract stops anything outside `app.llm` from importing `anthropic` (with `include_external_packages`). If the forbidden contract fails because `anthropic` is not installed, add `anthropic==2.9.0` to the dependencies now, since Story 2.1 needs it anyway. Run `lint-imports` from `backend/` inside a pytest test.
- **Docker:** add `backend/.dockerignore` (`.venv`, `__pycache__`, caches) and `frontend/.dockerignore` (`node_modules`, `.next`). Backend image: `COPY --from=ghcr.io/astral-sh/uv` and `uv sync --frozen --no-dev`, then run through `uv run` or the venv's `bin` on PATH. The healthcheck uses Python, because the slim image has no curl: `python -c "import urllib.request;urllib.request.urlopen('http://127.0.0.1:8000/api/status')"`, with `start_period`. The frontend has `depends_on: backend: condition: service_healthy`. The frontend image installs with `npm ci` and runs `next dev` on the built-in source, with no source bind mount. That avoids Windows file-watching problems; restarting the container picks up changes.
- **Line endings on Windows:** `.gitattributes` gets `* text=auto eol=lf` in addition to the fixtures rule, so Prettier and the fixture LF tests pass on Windows clones. Add `frontend/.prettierignore` (`.next`, `next-env.d.ts`, `package-lock.json`, `lib/api/` for generated files later).
- **Next 16:** `npm run lint` is `eslint .` with a flat `eslint.config.mjs` (`next lint` is gone in 16). Pick an ESLint version that `eslint-config-next@16.4.6` accepts as a peer, so `npm ci` doesn't fail with ERESOLVE. If ESLint 10 is not accepted, use the highest accepted version and record it in Implementation Notes. The local default for `BACKEND_URL` is `http://127.0.0.1:8000`, so Node doesn't resolve `localhost` to ::1. If Next 16 warns or blocks `127.0.0.1` as a dev origin, add `allowedDevOrigins: ["127.0.0.1"]` and note it.
- **`/readme` page:** `export const dynamic = "force-dynamic"`, with `README_PATH` resolved against `process.cwd()`.
- **Tokens:** in `@theme`, reset Tailwind's defaults with `--color-*: initial` and `--shadow-*: initial`, so only DESIGN.md colours exist and shadows can't be used. Radius tokens are `--radius-sm: 3px` and `--radius: 4px`, and shadcn's `--radius` uses the same value.
- **`.env.example`:** `ANTHROPIC_API_KEY=` (empty) and `ANTHROPIC_MODEL=claude-opus-5-5`, each with a short Norwegian comment.
- **README:** besides start with and without Docker, it says the app opens at `http://127.0.0.1:3000` and that you copy `.env.example` to `.env` to add the key.
- **Compose version:** the README states Docker Compose ≥ 2.24. Record the bump from ≥ 2.20 as a `(decision)` line in `architecture-G34-remme-2026-11-16/.memlog.md`.

## Verification

**Commands:**
- `cd backend && uv run ruff check && uv run ruff format --check && uv run pytest` -- expected: all green
- `cd frontend && npm run lint && npx prettier --check . && npm run build` -- expected: no errors
- `docker compose up -d && curl -s http://127.0.0.1:8000/api/status` -- expected: `{"demo":true,"max_chars":15000}`

**Manual checks (if no CLI):**
- Open `http://127.0.0.1:3000`: paper background, the demo banner with info icon and README link, no shadows or downloaded fonts.
