from backend.profiler.project import build_profile


def test_profile(tmp_path):
    (tmp_path / "app.py").write_text("print('hi')\n" * 50)
    (tmp_path / "util.js").write_text("console.log(1)\n")
    (tmp_path / "requirements.txt").write_text("flask==2.0.1\nrequests>=2.0\n")
    (tmp_path / "Dockerfile").write_text("FROM python:3.12\n")

    p = build_profile(tmp_path)
    assert p["primary_language"] == "Python"
    assert "Flask" in p["frameworks"]
    assert p["is_web_app"] and p["has_dockerfile"]
    assert p["dependency_count"] == 2