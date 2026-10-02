import re
from dataclasses import dataclass

_URL_RE = re.compile(
    r"^(?:https?://)?(?:www\.)?github\.com/"
    r"(?P<owner>[A-Za-z0-9_.-]+)/(?P<repo>[A-Za-z0-9_.-]+?)(?:\.git)?/?$"
)


class InvalidRepoURL(ValueError):
    pass


@dataclass(frozen=True)
class RepoRef:
    owner: str
    name: str

    @property
    def full_name(self) -> str:
        return f"{self.owner}/{self.name}"

    @property
    def clone_url(self) -> str:
        return f"https://github.com/{self.owner}/{self.name}.git"


def parse_repo_url(url: str) -> RepoRef:
    match = _URL_RE.match(url.strip())
    if not match:
        raise InvalidRepoURL(f"Not a valid GitHub repository URL: {url!r}")
    return RepoRef(owner=match["owner"], name=match["repo"])