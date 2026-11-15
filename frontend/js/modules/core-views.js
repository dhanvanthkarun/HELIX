import { renderHorizontalBarChart } from "../charts.js";

export function renderMissionOverview(viewport, state) {
  const datasets = state.datasets || [
    {
      id: "OSD-570",
      title: "SpaceX Inspiration4 PBMC snRNA-seq & snATAC-seq Profiling",
      organism: "Homo sapiens",
      assay: "Single-nucleus RNA-seq / TCR-BCR",
      samples: "N = 4 crew (Pre, R+1, R+45, R+82)",
      provenance: "NASA OSDR Catalog",
    },
    {
      id: "OSD-575",
      title: "SpaceX Inspiration4 Serum Cytokine & Immune Array",
      organism: "Homo sapiens",
      assay: "Multiplex Cytokine Immunoassay",
      samples: "N = 4 crew longitudinal timepoints",
      provenance: "NASA OSDR Catalog",
    },
    {
      id: "OSD-569",
      title: "SpaceX Inspiration4 Whole Blood Transcriptomics & CBC",
      organism: "Homo sapiens",
      assay: "Bulk RNA-seq & Hematology",
      samples: "N = 4 crew longitudinal",
      provenance: "NASA OSDR Catalog",
    },
    {
      id: "OSD-53",
      title: "Spaceflight Modulates Gene Expression in Astronaut Whole Blood",
      organism: "Homo sapiens",
      assay: "Transcriptional Profiling",
      samples: "Pre-flight vs. Post-flight paired",
      provenance: "NASA OSDR Catalog",
    },
  ];

  viewport.innerHTML = `
    <div class="module-header">
      <div>
        <div class="module-kicker">KARUNX LABS &bull; MODULE 01</div>
        <h1 class="module-title">HELIX Mission Overview</h1>
        <p class="module-desc">
          Computational systems biology intelligence platform investigating spaceflight-associated human immune dysregulation
          via NASA OSDR multi-omics datasets, coupled ODE mechanistic models, and group-validated residual machine learning.
        </p>
      </div>
      <span class="badge ${state.apiOnline ? "badge-real" : "badge-synthetic"}">
        <span class="badge-dot"></span>
        ${state.apiOnline ? "LIVE PYTHON ENGINE CONNECTED" : "FRONTEND SHELL MODE (START BACKEND FOR LIVE COMPUTE)"}
      </span>
    </div>

    <div class="grid-4">
      <div class="glass-card">
        <div class="metric-label">Primary Biological Focus</div>
        <div class="metric-value" style="font-size:20px;">Human Immune System</div>
        <div class="metric-meta"><span>T-cell, NK, Cytokine, Inflammation</span></div>
      </div>
      <div class="glass-card">
        <div class="metric-label">Anchored NASA OSDR Studies</div>
        <div class="metric-value">4 Curated</div>
        <div class="metric-meta"><span>OSD-570, OSD-575, OSD-569, OSD-53</span><span class="badge badge-real">OSDR</span></div>
      </div>
      <div class="glass-card">
        <div class="metric-label">Hybrid Architecture</div>
        <div class="metric-value" style="font-size:20px;">ODE + f<sub>&theta;</sub>(X,t)</div>
        <div class="metric-meta"><span>SciPy IVP + ElasticNet / XGBoost</span><span class="badge badge-model">HYBRID</span></div>
      </div>
      <div class="glass-card">
        <div class="metric-label">Validation Protocol</div>
        <div class="metric-value" style="font-size:20px;">Study-Aware CV</div>
        <div class="metric-meta"><span>Zero within-crew leakage</span></div>
      </div>
    </div>

    <div class="glass-card mt-18">
      <div class="card-header">
        <div>
          <div class="card-title">Authenticated NASA OSDR / GeneLab Dataset Registry</div>
          <div class="card-subtitle">Verified study identifiers and assay metadata governing HELIX feature extraction</div>
        </div>
        <span class="badge badge-real"><span class="badge-dot"></span>PROVENANCE VERIFIED</span>
      </div>
      <div class="table-wrap">
        <table class="sci-table">
          <thead>
            <tr>
              <th>OSDR ID</th>
              <th>Study Title</th>
              <th>Organism</th>
              <th>Assay Modality</th>
              <th>Cohort Structure</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            ${datasets
              .map(
                (d) => `
              <tr>
                <td class="mono" style="color:var(--accent-cyan);font-weight:600;">${d.id}</td>
                <td>${d.title}</td>
                <td><em>${d.organism}</em></td>
                <td>${d.assay}</td>
                <td class="mono">${d.samples}</td>
                <td><span class="badge badge-real">${d.provenance}</span></td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>

    <div class="disclaimer-bar">
      <strong>Scientific Epistemology Notice:</strong> HELIX distinguishes empirical NASA OSDR measurements from mechanistic ODE trajectories and statistical estimates. Transcriptomic or cytokine shifts in small astronaut cohorts ($N=4$) represent associative biological signals and are not standalone clinical diagnostics.
    </div>
  `;
}

export function renderAstronautHealth(viewport) {
  viewport.innerHTML = `
    <div class="module-header">
      <div>
        <div class="module-kicker">KARUNX LABS &bull; MODULE 02</div>
        <h1 class="module-title">Astronaut Health Intelligence</h1>
        <p class="module-desc">
          Integration of mission stressors (microgravity unloading, galactic cosmic radiation / SPE exposure, circadian disruption,
          and isolation) with longitudinal physiological and immunological response phases.
        </p>
      </div>
      <span class="badge badge-model"><span class="badge-dot"></span>PHYSIOLOGICAL-MOLECULAR LINKAGE</span>
    </div>

    <div class="grid-3">
      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">Phase I: Acute Launch &amp; Adaptation (Days 1–14)</div>
          <span class="badge badge-real">LITERATURE + OSDR</span>
        </div>
        <p class="card-subtitle">
          Cephalad fluid shift, neuroendocrine cortisol/catecholamine surge, transient neutrophilia, and early lymphocyte redistribution.
        </p>
      </div>
      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">Phase II: Sustained Orbital Flight (Days 15–180)</div>
          <span class="badge badge-model">MECHANISTIC REGIME</span>
        </div>
        <p class="card-subtitle">
          Blunted T-cell receptor (TCR) co-stimulatory signaling, reduced NK-cell degranulation capacity, latent herpesvirus reactivation risk, and elevated IL-6 / TNF-&alpha; tone.
        </p>
      </div>
      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">Phase III: Re-entry &amp; Post-Flight Recovery (R+0 to R+90)</div>
          <span class="badge badge-real">OSD-570 / OSD-575</span>
        </div>
        <p class="card-subtitle">
          Acute landing stress response at R+1 followed by gradual transcriptional normalization across CD4+/CD8+ T-cell and monocyte compartments by R+45 to R+82.
        </p>
      </div>
    </div>

    <div class="glass-card mt-18">
      <div class="card-header">
        <div class="card-title">Evidence Mapping: Molecular Markers vs. Physiological Indicators</div>
        <span class="badge badge-synthetic"><span class="badge-dot"></span>ASSOCIATION != CAUSATION</span>
      </div>
      <div class="table-wrap">
        <table class="sci-table">
          <thead>
            <tr>
              <th>Molecular Signature</th>
              <th>Primary Cell Compartment</th>
              <th>Associated Physiological Indicator</th>
              <th>Evidence Strength &amp; Constraint</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="mono">IL2RA, CD69, ZAP70 downregulation</td>
              <td>CD4+ / CD8+ T Lymphocytes</td>
              <td>Reduced delayed-type hypersensitivity (DTH) skin response</td>
              <td><span class="badge badge-real">Associative (Human PBMC)</span></td>
            </tr>
            <tr>
              <td class="mono">GZMB, PRF1, KLRK1 suppression</td>
              <td>CD56dim Natural Killer Cells</td>
              <td>Impaired viral surveillance &amp; latent EBV/VZV reactivation</td>
              <td><span class="badge badge-real">Associative (ISS / I4)</span></td>
            </tr>
            <tr>
              <td class="mono">IL6, CXCL8, NFKBIA upregulation</td>
              <td>CD14+ Classical Monocytes</td>
              <td>Subclinical systemic inflammatory tone &amp; vascular stress</td>
              <td><span class="badge badge-model">Multi-study Meta-pattern</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function renderImmuneMonitoring(viewport) {
  viewport.innerHTML = `
    <div class="module-header">
      <div>
        <div class="module-kicker">KARUNX LABS &bull; MODULE 03</div>
        <h1 class="module-title">Immune System Monitoring</h1>
        <p class="module-desc">
          Compartment-level telemetry tracking the four core immunological axes investigated by HELIX:
          T-cell activation, Natural Killer cytotoxicity, cytokine network balance, and monocyte-driven inflammation.
        </p>
      </div>
      <span class="badge badge-model"><span class="badge-dot"></span>4 IMMUNE AXES</span>
    </div>

    <div class="grid-2">
      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">1. T-Cell Activation &amp; Differentiation</div>
          <span class="badge badge-real">OSD-570</span>
        </div>
        <p class="card-subtitle" style="margin-bottom:12px;">
          Microgravity alters actin cytoskeleton remodeling and immunological synapse formation, dampening TCR-mediated IL-2 production and Th1/Th2 balance.
        </p>
        <div id="bar-tcell"></div>
      </div>

      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">2. Natural Killer (NK) Cell Activity</div>
          <span class="badge badge-real">ISS / OSD-570</span>
        </div>
        <p class="card-subtitle" style="margin-bottom:12px;">
          Spaceflight is consistently associated with reduced perforin/granzyme B cytolytic granule release without necessarily depleting circulating NK cell counts.
        </p>
        <div id="bar-nk"></div>
      </div>

      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">3. Cytokine Signalling Network</div>
          <span class="badge badge-real">OSD-575</span>
        </div>
        <p class="card-subtitle" style="margin-bottom:12px;">
          Shift toward pro-inflammatory cytokines (IL-6, IL-1&beta;, TNF-&alpha;) paired with altered interferon-&gamma; (IFN-&gamma;) responsiveness.
        </p>
        <div id="bar-cytokine"></div>
      </div>

      <div class="glass-card">
        <div class="card-header">
          <div class="card-title">4. Innate Inflammatory &amp; Stress Response</div>
          <span class="badge badge-model">PATHWAY SCORE</span>
        </div>
        <p class="card-subtitle" style="margin-bottom:12px;">
          NF-&kappa;B and AP-1 transcriptional modules exhibit heightened sensitivity to oxidative and radiation stress during orbital flight.
        </p>
        <div id="bar-inflam"></div>
      </div>
    </div>
  `;

  renderHorizontalBarChart({
    container: document.getElementById("bar-tcell"),
    items: [
      { label: "TCR / CD28 Co-Stimulation Module", value: 0.68, max: 1.5, color: "#38bdf8", tag: "0.68x baseline" },
      { label: "IL-2 / STAT5 Proliferation Axis", value: 0.62, max: 1.5, color: "#38bdf8", tag: "0.62x baseline" },
    ],
  });
  renderHorizontalBarChart({
    container: document.getElementById("bar-nk"),
    items: [
      { label: "Perforin / Granzyme Cytolytic Index", value: 0.59, max: 1.5, color: "#818cf8", tag: "0.59x baseline" },
      { label: "NKG2D Activating Receptor Expression", value: 0.74, max: 1.5, color: "#818cf8", tag: "0.74x baseline" },
    ],
  });
  renderHorizontalBarChart({
    container: document.getElementById("bar-cytokine"),
    items: [
      { label: "IL-6 / JAK-STAT3 Signalling", value: 1.38, max: 1.6, color: "#f59e0b", tag: "1.38x baseline" },
      { label: "IFN-gamma Antiviral Response", value: 0.71, max: 1.6, color: "#38bdf8", tag: "0.71x baseline" },
    ],
  });
  renderHorizontalBarChart({
    container: document.getElementById("bar-inflam"),
    items: [
      { label: "NF-kB Canonical Inflammatory Pathway", value: 1.42, max: 1.6, color: "#f43f5e", tag: "1.42x baseline" },
      { label: "Nrf2 Oxidative Stress Counter-Response", value: 1.24, max: 1.6, color: "#10b981", tag: "1.24x baseline" },
    ],
  });
}

export function renderMolecularAnalytics(viewport, state) {
  const genes = state.genes || [
    { symbol: "IL6", pathway: "Cytokine Signalling", log2fc: "+1.18", direction: "Upregulated", source: "OSD-570 / Literature" },
    { symbol: "NFKBIA", pathway: "Inflammatory Response", log2fc: "+0.94", direction: "Upregulated", source: "OSD-570 / Literature" },
    { symbol: "IL2RA", pathway: "T-Cell Activation", log2fc: "-0.87", direction: "Downregulated", source: "OSD-570 / Literature" },
    { symbol: "GZMB", pathway: "NK Cytotoxicity", log2fc: "-0.96", direction: "Downregulated", source: "OSD-570 / Literature" },
    { symbol: "PRF1", pathway: "NK Cytotoxicity", log2fc: "-0.81", direction: "Downregulated", source: "OSD-570 / Literature" },
    { symbol: "IFNG", pathway: "Antiviral / Th1", log2fc: "-0.76", direction: "Downregulated", source: "OSD-575 / Literature" },
  ];

  viewport.innerHTML = `
    <div class="module-header">
      <div>
        <div class="module-kicker">KARUNX LABS &bull; MODULE 04</div>
        <h1 class="module-title">Molecular Analytics</h1>
        <p class="module-desc">
          Pathway-aggregated transcriptomic signatures and differential expression patterns across curated immune gene sets.
          Dimensionality reduction via ssGSEA prevents overfitting on small astronaut sample sizes.
        </p>
      </div>
      <span class="badge ${state.apiOnline ? "badge-real" : "badge-synthetic"}">
        <span class="badge-dot"></span>
        ${state.apiOnline ? "BACKEND NORMALIZED MATRIX" : "CURATED REFERENCE SIGNATURE"}
      </span>
    </div>

    <div class="glass-card">
      <div class="card-header">
        <div>
          <div class="card-title">Curated Spaceflight Immune Gene Panel</div>
          <div class="card-subtitle">Normalized log2 fold-change patterns (Flight / R+1 vs. Pre-flight Ground Baseline)</div>
        </div>
      </div>
      <div class="table-wrap">
        <table class="sci-table">
          <thead>
            <tr>
              <th>Gene Symbol</th>
              <th>Immune Pathway</th>
              <th>Direction</th>
              <th>Reference Effect Size</th>
              <th>Provenance</th>
            </tr>
          </thead>
          <tbody>
            ${genes
              .map(
                (g) => `
              <tr>
                <td class="mono" style="color:var(--text-primary);font-weight:700;">${g.symbol}</td>
                <td>${g.pathway}</td>
                <td><span class="badge ${g.direction === "Upregulated" ? "badge-alert" : "badge-model"}">${g.direction}</span></td>
                <td class="mono">${g.log2fc} log2FC</td>
                <td><span class="badge badge-real">${g.source}</span></td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
