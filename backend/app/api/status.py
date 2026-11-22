"""GET /api/status: the only source of the app mode for the frontend."""

from fastapi import APIRouter, Request
from pydantic import BaseModel

from app.config import MAX_CHARS

router = APIRouter()


class StatusResponse(BaseModel):
    demo: bool
    max_chars: int


@router.get("/api/status")
def get_status(request: Request) -> StatusResponse:
    return StatusResponse(demo=request.app.state.demo, max_chars=MAX_CHARS)
