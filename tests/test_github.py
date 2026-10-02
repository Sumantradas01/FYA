import asyncio
from backend.github.validator import parse_repo_url
from backend.github.metadata import fetch_metadata
from backend.github.fetcher import clone_repo, cleanup


def test_parse():
    ref = parse_repo_url("https://github.com/Kanchan200410/aspogit.git")
    assert ref.full_name == "Kanchan200410/aspogit"


def test_clone_and_metadata():
    ref = parse_repo_url("https://github.com/pallets/flask")
    meta = asyncio.run(fetch_metadata(ref))
    assert "Python" in meta["languages"]
    path = clone_repo(ref)
    assert (path / "README.md").exists()
    cleanup(path)