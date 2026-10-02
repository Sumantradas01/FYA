import shutil
import uuid
from pathlib import Path
from git import Repo
from backend.config import GITHUB_TOKEN, WORKSPACE_DIR
from backend.github.validator import RepoRef


def clone_repo(ref: RepoRef, branch: str | None = None) -> Path:
    """Shallow-clone a repo into the workspace and return its path."""
    dest = WORKSPACE_DIR / f"{ref.owner}__{ref.name}__{uuid.uuid4().hex[:8]}"
    url = ref.clone_url
    if GITHUB_TOKEN:
        url = url.replace("https://", f"https://x-access-token:{GITHUB_TOKEN}@")

    kwargs = {"depth": 1}
    if branch:
        kwargs["branch"] = branch
    Repo.clone_from(url, dest, **kwargs)
    return dest


def cleanup(path: Path) -> None:
    shutil.rmtree(path, ignore_errors=True)