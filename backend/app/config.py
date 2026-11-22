"""Settings for the backend. `.env` is read from the repo root, by absolute path."""

from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

ENV_FILE = Path(__file__).resolve().parents[2] / ".env"

MAX_CHARS = 15000


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=ENV_FILE, env_file_encoding="utf-8-sig", extra="ignore"
    )

    anthropic_api_key: str = ""
    anthropic_model: str = "claude-opus-5-5"

    @property
    def is_demo(self) -> bool:
        return not self.anthropic_api_key.strip()
