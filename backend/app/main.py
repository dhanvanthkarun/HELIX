"""
KARUNX LABS — HELIX Space Biology Intelligence
FastAPI Scientific Backend Entry Point
"""
import platform
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.hybrid_ml import hybrid_engine
from app.core.ingestion import fetch_osdr_datasets, get_curated_immune_genes
from app.schemas import (
    DatasetsResponse,
    GenesResponse,
    HealthResponse,
    ModelEvaluationResponse,
    SimulationRequest,
    SimulationResponse,
)
from app.utils.logger import get_logger

logger = get_logger("helix.api")

app = FastAPI(
    title="KARUNX LABS — HELIX Space Biology Intelligence API",
    description="Mechanistic ODE + Group-Validated ML engine for spaceflight immune dysregulation.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/v1/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    return HealthResponse(
        architecture=platform.machine(),
        python_version=sys.version.split()[0],
        scientific_stack=["fastapi", "numpy", "pandas", "scipy", "scikit-learn", "xgboost"],
    )


@app.get("/api/v1/datasets", response_model=DatasetsResponse)
async def list_datasets() -> DatasetsResponse:
    datasets, note = await fetch_osdr_datasets()
    return DatasetsResponse(datasets=datasets, retrieval_note=note)


@app.get("/api/v1/molecular/genes", response_model=GenesResponse)
async def list_immune_genes() -> GenesResponse:
    return GenesResponse(
        genes=get_curated_immune_genes(),
        normalization_method="Pathway-level ssGSEA / log2 fold-change vs. pre-flight ground baseline",
    )


@app.get("/api/v1/models/evaluation", response_model=ModelEvaluationResponse)
async def evaluate_models() -> ModelEvaluationResponse:
    benchmarks = hybrid_engine.evaluate_ablation_benchmarks()
    return ModelEvaluationResponse(
        benchmarks=benchmarks,
        validation_protocol="Subject-Blocked GroupKFold (k=6) preventing longitudinal within-crew leakage",
        limitation_notice="Evaluated on an OSD-570/OSD-575-calibrated synthetic benchmark cohort (N=36 longitudinal points) due to small human spaceflight sample sizes.",
    )


@app.post("/api/v1/simulate", response_model=SimulationResponse)
async def run_simulation(req: SimulationRequest) -> SimulationResponse:
    logger.info(
        f"Running hybrid simulation | biomarker={req.biomarker} days={req.duration_days} "
        f"stress={req.stress_factor} rad={req.radiation_msv_day}"
    )
    traj = hybrid_engine.predict_trajectory(
        biomarker=req.biomarker,
        duration_days=req.duration_days,
        stress_factor=req.stress_factor,
        radiation_msv_day=req.radiation_msv_day,
    )
    return SimulationResponse(
        biomarker=req.biomarker,
        units="Normalized Activity Index (1.0 = Pre-flight Ground Baseline)",
        provenance="HYBRID_ODE_ML_ESTIMATE",
        time_days=traj["time_days"],
        mechanistic_trajectory=traj["mechanistic_trajectory"],
        hybrid_trajectory=traj["hybrid_trajectory"],
        ci_95_lower=traj["ci_95_lower"],
        ci_95_upper=traj["ci_95_upper"],
        model_assumptions=[
            "First-order homeostatic recovery kinetics toward pre-flight baseline (1.0).",
            "Coupled microgravity and ionizing radiation stress forcing across T-cell, NK, and IL-6 compartments.",
            "Residual correction f_theta(X, t) trained with ElasticNet L1/L2 regularization.",
        ],
        limitations="Investigative research simulation only; extrapolations beyond 90 days carry elevated GCR uncertainty and are not clinical diagnostics.",
    )
