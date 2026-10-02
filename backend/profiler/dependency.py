import json
import re
from pathlib import Path
from backend.profiler.language import iter_files

_REQ_RE = re.compile(r"^([A-Za-z0-9_.\-]+)\s*(?:\[.*?\])?\s*(?:[=<>!~]=?\s*([^\s;#,]+))?")


def _parse_requirements(path: Path) -> list[dict]:
    deps = []
    for line in path.read_text(errors="ignore").splitlines():
        line = line.strip()
        if not line or line.startswith(("#", "-")) or "://" in line:
            continue
        m = _REQ_RE.match(line)
        if m:
            deps.append({"name": m[1].lower(), "version": m[2]})
    return deps


def _parse_package_json(path: Path) -> list[dict]:
    try:
        data = json.loads(path.read_text(errors="ignore"))
    except json.JSONDecodeError:
        return []
    deps = {}
    deps.update(data.get("dependencies", {}))
    deps.update(data.get("devDependencies", {}))
    return [{"name": n.lower(), "version": v} for n, v in deps.items()]


def _parse_pom(path: Path) -> list[dict]:
    text = path.read_text(errors="ignore")
    deps = []
    for block in re.findall(r"<dependency>(.*?)</dependency>", text, re.DOTALL):
        g = re.search(r"<groupId>(.*?)</groupId>", block)
        a = re.search(r"<artifactId>(.*?)</artifactId>", block)
        v = re.search(r"<version>(.*?)</version>", block)
        if g and a:
            deps.append({"name": f"{g[1].strip()}:{a[1].strip()}".lower(),
                         "version": v[1].strip() if v else None})
    return deps


def _parse_go_mod(path: Path) -> list[dict]:
    deps = []
    for line in path.read_text(errors="ignore").splitlines():
        parts = line.strip().removeprefix("require ").split()
        if len(parts) >= 2 and parts[1].startswith("v"):
            deps.append({"name": parts[0].lower(), "version": parts[1]})
    return deps


PARSERS = {
    "requirements.txt": ("pypi", _parse_requirements),
    "package.json": ("npm", _parse_package_json),
    "pom.xml": ("maven", _parse_pom),
    "go.mod": ("go", _parse_go_mod),
}


def detect_dependencies(root: Path) -> list[dict]:
    results = []
    for f in iter_files(root):
        if f.name in PARSERS:
            ecosystem, parser = PARSERS[f.name]
            for dep in parser(f):
                results.append({
                    "ecosystem": ecosystem,
                    "name": dep["name"],
                    "version": dep["version"],
                    "file": str(f.relative_to(root)),
                })
    return results