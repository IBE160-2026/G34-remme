"""Import-linter contracts (hexagonal layers, anthropic only in app.llm) run as a test."""

import shutil
import subprocess
from pathlib import Path

BACKEND = Path(__file__).resolve().parents[1]


def test_import_contracts() -> None:
    lint_imports = shutil.which("lint-imports")
    assert lint_imports, "lint-imports not found; run `uv sync`"
    result = subprocess.run(
        [lint_imports], cwd=BACKEND, capture_output=True, text=True, check=False
    )
    assert result.returncode == 0, result.stdout + result.stderr
