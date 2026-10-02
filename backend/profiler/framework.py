from backend.profiler.language import iter_files
from pathlib import Path

RULES = {
    "pypi": {"django": "Django", "flask": "Flask", "fastapi": "FastAPI", "tornado": "Tornado"},
    "npm": {"express": "Express", "react": "React", "next": "Next.js", "vue": "Vue",
            "@angular/core": "Angular", "koa": "Koa", "@nestjs/core": "NestJS"},
    "go": {"github.com/gin-gonic/gin": "Gin", "github.com/labstack/echo": "Echo"},
}


def detect_frameworks(root: Path, dependencies: list[dict]) -> dict:
    found = set()
    for dep in dependencies:
        eco, name = dep["ecosystem"], dep["name"]
        if eco == "maven" and "spring-boot" in name:
            found.add("Spring Boot")
        elif name in RULES.get(eco, {}):
            found.add(RULES[eco][name])

    filenames = {f.name for f in iter_files(root)}
    if "manage.py" in filenames:
        found.add("Django")

    return {
        "frameworks": sorted(found),
        "is_web_app": bool(found),
        "has_dockerfile": "Dockerfile" in filenames,
        "has_ci": (root / ".github" / "workflows").exists(),
    }