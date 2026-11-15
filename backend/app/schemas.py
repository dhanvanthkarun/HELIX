"""
KARUNX LABS — HELIX Pydantic Schemas
Enforces strict data provenance, units, and uncertainty reporting across all REST endpoints.
"""
from typing import List, Literal, Optional
from pydantic import BaseModel, Field


ProvenanceType = Literal[
    "NASA_OSDR_API_LIVE",
    "NASA_OSDR_CURATED_CATALOG",
    "MECHANISTIC_ODE_SCIPY",
    "HYBRID_ODE_ML_ESTIMATE",
    "SYNTHETIC_DEMO_FALLBACK",
]


class HealthResponse(BaseModel):
    organization: str = "KARUNX LABS"
    product: str = "HELIX"
    status: str = "online"
    architecture: str
    python_version: str
    scientific_stack: List[str]


class DatasetRecord(BaseModel):
    id: str
    title: str
    organism: str
    assay: str
    samples: str
    source_url: str
    provenance: ProvenanceType
    live_metadata_verified: bool = False
    study_description: Optional[str] = None


class DatasetsResponse(BaseModel):
    datasets: List[DatasetRecord]
    retrieval_note: str


class GeneSignatureRecord(BaseModel):
    symbol: str
    pathway: str
    direction: Literal["Upregulated", "Downregulated"]
    log2fc: str
    source: str
    provenance: ProvenanceType


class GenesResponse(BaseModel):
    genes: List[GeneSignatureRecord]
    normalization_method: str


class ModelBenchmarkRecord(BaseModel):
    model: str
    cv: str
    rmse: str
    r2: str
    notes: str


class ModelEvaluationResponse(BaseModel):
    benchmarks: List[ModelBenchmarkRecord]
    validation_protocol: str
    limitation_notice: str


class SimulationRequest(BaseModel):
    biomarker: Literal["tcell_activation", "nk_cytotoxicity", "il6_inflammation"] = "tcell_activation"
    duration_days: int = Field(default=90, ge=7, le=365)
    stress_factor: float = Field(default=1.0, ge=0.2, le=3.0)
    radiation_msv_day: float = Field(default=0.55, ge=0.0, le=5.0)


class SimulationResponse(BaseModel):
    biomarker: str
    units: str
    provenance: ProvenanceType
    time_days: List[int]
    mechanistic_trajectory: List[float]
    hybrid_trajectory: List[float]
    ci_95_lower: List[float]
    ci_95_upper: List[float]
    model_assumptions: List[str]
    limitations: str
