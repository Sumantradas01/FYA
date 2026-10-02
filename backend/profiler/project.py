from pathlib import Path
from backend.profiler.language import detect_languages, iter_files
from backend.profiler.dependency import detect_dependencies
from backend.profiler.framework import detect_frameworks


def build_profile(root: Path, metadata: dict | None = None) -> dict:
    """Combine everything the optimizer needs to know about a repo."""
    langs = detect_languages(root)
    deps = detect_dependencies(root)
    fw = detect_frameworks(root, deps)

    return {
        "primary_language": langs["primary"],
        "languages": langs["languages"],
        "frameworks": fw["frameworks"],
        "is_web_app": fw["is_web_app"],
        "has_dockerfile": fw["has_dockerfile"],
        "has_ci": fw["has_ci"],
        "dependencies": deps,
        "dependency_count": len(deps),
        "file_count": sum(1 for _ in iter_files(root)),
        "size_kb": (metadata or {}).get("size_kb"),
    }