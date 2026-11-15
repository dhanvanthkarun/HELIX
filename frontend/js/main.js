/**
 * KARUNX LABS — HELIX Main Application Controller
 */
import { apiClient } from "./api-client.js";
import {
  renderMissionOverview,
  renderAstronautHealth,
  renderImmuneMonitoring,
  renderMolecularAnalytics,
} from "./modules/core-views.js";
import {
  renderPathwayExplorer,
  renderPredictiveModels,
  renderHybridSimulation,
  renderResearchEvidence,
} from "./modules/advanced-views.js";

const appState = {
  activeModule: "overview",
  apiOnline: false,
  datasets: null,
  genes: null,
  modelMetrics: null,
};

const viewport = document.getElementById("module-viewport");
const navButtons = document.querySelectorAll(".nav-btn");
const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menu-toggle");

function renderActiveModule() {
  switch (appState.activeModule) {
    case "overview":
      renderMissionOverview(viewport, appState);
      break;
    case "astronaut":
      renderAstronautHealth(viewport, appState);
      break;
    case "immune":
      renderImmuneMonitoring(viewport, appState);
      break;
    case "molecular":
      renderMolecularAnalytics(viewport, appState);
      break;
    case "pathways":
      renderPathwayExplorer(viewport, appState);
      break;
    case "models":
      renderPredictiveModels(viewport, appState);
      break;
    case "simulation":
      renderHybridSimulation(viewport, appState, apiClient);
      break;
    case "evidence":
      renderResearchEvidence(viewport, appState);
      break;
    default:
      renderMissionOverview(viewport, appState);
  }
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    appState.activeModule = btn.dataset.module;
    sidebar.classList.remove("open");
    renderActiveModule();
  });
});

menuToggle?.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

async function initializeApp() {
  renderActiveModule();

  const statusBadge = document.getElementById("api-status-badge");
  const statusText = document.getElementById("api-status-text");

  const health = await apiClient.checkHealth();
  appState.apiOnline = health.online;

  if (health.online) {
    statusBadge.className = "badge badge-real";
    statusText.textContent = "BACKEND: ONLINE (FASTAPI)";
    try {
      const [dsRes, geneRes, modelRes] = await Promise.all([
        apiClient.fetchJson("/datasets"),
        apiClient.fetchJson("/molecular/genes"),
        apiClient.fetchJson("/models/evaluation"),
      ]);
      appState.datasets = dsRes.datasets;
      appState.genes = geneRes.genes;
      appState.modelMetrics = modelRes.benchmarks;
      renderActiveModule();
    } catch (err) {
      console.warn("Partial backend data load:", err);
    }
  } else {
    statusBadge.className = "badge badge-synthetic";
    statusText.textContent = "BACKEND: OFFLINE (SHELL MODE)";
  }
}

initializeApp();
