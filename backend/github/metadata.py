import httpx
from backend.config import GITHUB_TOKEN
from backend.github.validator import RepoRef

API = "https://api.github.com"


class RepoNotFound(Exception):
    pass


def _headers() -> dict:
    h = {"Accept": "application/vnd.github+json"}
    if GITHUB_TOKEN:
        h["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    return h


async def fetch_metadata(ref: RepoRef) -> dict:
    async with httpx.AsyncClient(headers=_headers(), timeout=20) as client:
        repo = await client.get(f"{API}/repos/{ref.full_name}")
        if repo.status_code == 404:
            raise RepoNotFound(f"{ref.full_name} not found or not accessible")
        repo.raise_for_status()
        data = repo.json()

        langs = await client.get(f"{API}/repos/{ref.full_name}/languages")
        languages = langs.json() if langs.status_code == 200 else {}

    return {
        "full_name": data["full_name"],
        "description": data.get("description"),
        "default_branch": data["default_branch"],
        "size_kb": data["size"],
        "stars": data["stargazers_count"],
        "private": data["private"],
        "archived": data["archived"],
        "license": (data.get("license") or {}).get("spdx_id"),
        "languages": languages,  # {"Python": 12345, ...} bytes per language
    }