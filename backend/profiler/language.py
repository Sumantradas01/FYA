import os
from pathlib import Path

EXT_MAP = {
    ".py": "Python", ".js": "JavaScript", ".jsx": "JavaScript", ".ts": "TypeScript",
    ".tsx": "TypeScript", ".java": "Java", ".go": "Go", ".rb": "Ruby", ".php": "PHP",
    ".c": "C", ".h": "C", ".cpp": "C++", ".cc": "C++", ".hpp": "C++",
    ".cs": "C#", ".rs": "Rust", ".kt": "Kotlin", ".swift": "Swift",
}

IGNORE_DIRS = {
    ".git", "node_modules", "venv", ".venv", "__pycache__", "dist", "build",
    "target", ".idea", ".vscode", "vendor", ".tox", ".mypy_cache",
}


def iter_files(root: Path):
    """Yield every file path under root, skipping junk folders."""
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in IGNORE_DIRS]
        for name in filenames:
            yield Path(dirpath) / name


def detect_languages(root: Path) -> dict:
    stats: dict[str, dict] = {}
    for f in iter_files(root):
        lang = EXT_MAP.get(f.suffix.lower())
        if not lang:
            continue
        try:
            size = f.stat().st_size
        except OSError:
            continue
        entry = stats.setdefault(lang, {"files": 0, "bytes": 0})
        entry["files"] += 1
        entry["bytes"] += size

    total = sum(e["bytes"] for e in stats.values()) or 1
    for e in stats.values():
        e["percent"] = round(e["bytes"] * 100 / total, 1)

    primary = max(stats, key=lambda k: stats[k]["bytes"]) if stats else None
    return {"languages": stats, "primary": primary}