# G34 — Lone Ranger

Gruppeprosjekt i **IBE160 Programmering med KI** ved Høgskolen i Molde, høsten 2026 (15 studiepoeng).

Repoet inneholder gruppens applikasjon og dokumentasjon av utvikling, testing og kvalitetssikring med KI.

## Medlemmer

- Yvonne Engeset Remme

## Om appen

CV & Jobb applikasjonsassistent sammenligner én CV med én stillingsannonse. Appen består av en backend (FastAPI, Python 3.14) i `backend/` og en frontend (Next.js 16, Node 26) i `frontend/`. Appen åpnes på <http://127.0.0.1:3000>.

## Start med Docker

Krever Docker med Docker Compose 2.24 eller nyere (`docker compose version`).

```sh
docker compose up
```

Åpne <http://127.0.0.1:3000>. Backenden svarer på <http://127.0.0.1:8000/api/status>. Appen starter også uten `.env`-fil, og da i demomodus.

## Start uten Docker

Krever [uv](https://docs.astral.sh/uv/) 0.12 eller nyere og Node.js 26. uv henter Python 3.14 selv.

I ett terminalvindu:

```sh
cd backend
uv sync --frozen
uv run fastapi dev
```

I et annet terminalvindu:

```sh
cd frontend
npm ci
npm run dev
```

Åpne <http://127.0.0.1:3000>. Backenden kjører på port 8000, og frontenden sender `/api/*` videre til den.

## Demomodus

Uten API-nøkkel starter appen i demomodus. Da vises banneret «Demomodus – ingen API-nøkkel funnet» øverst på siden. I demomodus koster ingenting noe, og appen bruker bare eksempeldata.

## Legg inn API-nøkkel

Kopier `.env.example` til `.env` i prosjektroten, og fyll inn nøkkelen:

```sh
cp .env.example .env
```

```sh
ANTHROPIC_API_KEY=din-nøkkel
ANTHROPIC_MODEL=claude-opus-5-5
```

Start appen på nytt etterpå. `.env` leses bare av backenden og skal aldri committes (den står i `.gitignore`).

## Utvikling

```sh
cd backend
uv run ruff check
uv run ruff format --check
uv run pytest
```

```sh
cd frontend
npm run lint
npm test
npx prettier --check .
npm run build
```
