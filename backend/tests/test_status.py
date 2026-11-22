import json

import pytest
from fastapi.testclient import TestClient

from app.config import MAX_CHARS, Settings
from app.main import create_app


def make_client(key: str) -> TestClient:
    settings = Settings(_env_file=None, anthropic_api_key=key)
    return TestClient(create_app(settings))


def test_env_key_is_forced_empty() -> None:
    assert Settings(_env_file=None).anthropic_api_key == ""


def test_max_chars() -> None:
    assert MAX_CHARS == 15000


@pytest.mark.parametrize("key", ["", "   ", "\t\n"])
def test_status_demo_without_key(key: str) -> None:
    response = make_client(key).get("/api/status")
    assert response.status_code == 200
    assert response.json() == {"demo": True, "max_chars": 15000}


def test_status_demo_when_key_missing_from_env_file() -> None:
    client = TestClient(create_app(Settings(_env_file=None)))
    assert client.get("/api/status").json() == {"demo": True, "max_chars": 15000}


def test_status_demo_when_key_unset(monkeypatch) -> None:
    monkeypatch.delenv("ANTHROPIC_API_KEY", raising=False)
    client = TestClient(create_app(Settings(_env_file=None)))
    assert client.get("/api/status").json() == {"demo": True, "max_chars": 15000}


def test_status_live_with_key() -> None:
    response = make_client("sk-x").get("/api/status")
    assert response.status_code == 200
    assert response.json() == {"demo": False, "max_chars": 15000}


def test_empty_env_var_overrides_env_file(tmp_path, monkeypatch) -> None:
    env_file = tmp_path / ".env"
    env_file.write_text("ANTHROPIC_API_KEY=sk-from-file\n", encoding="utf-8")
    monkeypatch.setenv("ANTHROPIC_API_KEY", "")
    assert Settings(_env_file=env_file).is_demo


def test_env_file_is_absolute_repo_root() -> None:
    from app.config import ENV_FILE

    assert ENV_FILE.is_absolute()
    assert ENV_FILE.name == ".env"
    assert (ENV_FILE.parent / "backend" / "app" / "config.py").exists()


@pytest.mark.parametrize(("key", "mode"), [("", "demo"), ("sk-secret-123", "live")])
def test_startup_log_is_one_json_line_without_key(capsys, key: str, mode: str) -> None:
    create_app(Settings(_env_file=None, anthropic_api_key=key))
    out = capsys.readouterr().out
    lines = out.strip().splitlines()
    assert len(lines) == 1
    assert json.loads(lines[0])["mode"] == mode
    if key:
        assert key not in out
