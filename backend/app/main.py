"""App factory: reads the settings, decides the mode and wires the routes."""

import json
import sys

from fastapi import FastAPI

from app.api.status import router as status_router
from app.config import MAX_CHARS, Settings


def log_startup(demo: bool) -> None:
    """Write the startup mode as one JSON line on stdout. Never the key."""
    line = json.dumps(
        {"event": "startup", "mode": "demo" if demo else "live", "max_chars": MAX_CHARS}
    )
    print(line, file=sys.stdout, flush=True)


def create_app(settings: Settings | None = None) -> FastAPI:
    settings = settings if settings is not None else Settings()
    demo = settings.is_demo

    app = FastAPI(title="CV & Jobb applikasjonsassistent")
    app.state.demo = demo
    app.include_router(status_router)

    log_startup(demo)
    return app


app = create_app()
