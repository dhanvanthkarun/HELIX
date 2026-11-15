"""
KARUNX LABS — HELIX Automated Scientific & API Verification Suite
Verifies ODE boundary conditions, zero-leakage group CV benchmarks, and FastAPI endpoints.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from fastapi.testclient import TestClient
from app.core.hybrid_ml import hybrid_engine
from app.core.mechanistic_ode import simulate_immune_odes
from app.main import app

client = TestClient(app)


def test_ode_initial_and_boundary_conditions():
    res = simulate_immune_odes(duration_days=90, stress_factor=1.0, radiation_msv_day=0.55)
    assert res["time_days"][0] == 0
    assert res["time_days"][-1] == 90
    # Pre-flight baseline must equal 1.0 across all compartments
    assert res["tcell_activation"][0] == 1.0
    assert res["nk_cytotoxicity"][0] == 1.0
    assert res["il6_inflammation"][0] == 1.0
    # Spaceflight stress suppresses T/NK activation and elevates IL-6 tone
    assert res["tcell_activation"][-1] < 1.0
    assert res["nk_cytotoxicity"][-1] < 1.0
    assert res["il6_inflammation"][-1] > 1.0


def test_group_cv_ablation_benchmarks():
    benchmarks = hybrid_engine.evaluate_ablation_benchmarks()
    assert len(benchmarks) == 4
    hybrid_rmse = float(benchmarks[-1].rmse)
    ode_only_rmse = float(benchmarks[0].rmse)
    assert hybrid_rmse < ode_only_rmse


def test_fastapi_endpoints_and_provenance():
    health = client.get("/api/v1/health")
    assert health.status_code == 200
    assert health.json()["organization"] == "KARUNX LABS"
    assert health.json()["product"] == "HELIX"

    sim = client.post(
        "/api/v1/simulate",
        json={
            "biomarker": "tcell_activation",
            "duration_days": 60,
            "stress_factor": 1.2,
            "radiation_msv_day": 0.6,
        },
    )
    assert sim.status_code == 200
    payload = sim.json()
    assert payload["provenance"] == "HYBRID_ODE_ML_ESTIMATE"
    assert len(payload["ci_95_lower"]) == len(payload["hybrid_trajectory"])
