"""Tests never use a real key: ANTHROPIC_API_KEY is forced to "" before the app is imported."""

import os

os.environ["ANTHROPIC_API_KEY"] = ""
