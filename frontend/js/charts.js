/**
 * KARUNX LABS — HELIX Scientific SVG Visualization Library
 * Renders trajectory plots with uncertainty bands and grouped comparative bars.
 */

export function renderTrajectoryChart({
  container,
  timePoints,
  mechanisticSeries,
  hybridSeries,
  ciLower,
  ciUpper,
  yLabel = "Normalized Activity Index",
  xLabel = "Mission Elapsed Time (Days)",
}) {
  const width = 680;
  const height = 270;
  const pad = { top: 22, right: 24, bottom: 42, left: 54 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const allVals = [...mechanisticSeries, ...hybridSeries, ...ciLower, ...ciUpper];
  const minY = Math.min(0, Math.floor(Math.min(...allVals) * 10) / 10);
  const maxY = Math.max(1.2, Math.ceil(Math.max(...allVals) * 10) / 10);
  const maxT = Math.max(...timePoints, 1);

  const scaleX = (t) => pad.left + (t / maxT) * plotW;
  const scaleY = (v) => pad.top + plotH - ((v - minY) / (maxY - minY || 1)) * plotH;

  const toPath = (arr) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"}${scaleX(timePoints[i]).toFixed(1)},${scaleY(v).toFixed(1)}`).join(" ");

  // Confidence band polygon
  const upperPts = ciUpper.map((v, i) => `${scaleX(timePoints[i]).toFixed(1)},${scaleY(v).toFixed(1)}`);
  const lowerPts = [...ciLower]
    .reverse()
    .map((v, i) => {
      const origIdx = timePoints.length - 1 - i;
      return `${scaleX(timePoints[origIdx]).toFixed(1)},${scaleY(v).toFixed(1)}`;
    });
  const bandPolygon = [...upperPts, ...lowerPts].join(" ");

  const yTicks = 5;
  let gridSvg = "";
  for (let i = 0; i <= yTicks; i++) {
    const val = minY + ((maxY - minY) * i) / yTicks;
    const y = scaleY(val);
    gridSvg += `
      <line x1="${pad.left}" y1="${y}" x2="${width - pad.right}" y2="${y}" stroke="rgba(148,187,233,0.12)" stroke-dasharray="3,3" />
      <text x="${pad.left - 8}" y="${y + 4}" text-anchor="end" fill="#64748b" font-size="10.5" font-family="monospace">${val.toFixed(2)}</text>
    `;
  }

  const xStep = Math.max(1, Math.floor(timePoints.length / 6));
  for (let i = 0; i < timePoints.length; i += xStep) {
    const x = scaleX(timePoints[i]);
    gridSvg += `
      <text x="${x}" y="${height - 16}" text-anchor="middle" fill="#64748b" font-size="10.5" font-family="monospace">D${timePoints[i]}</text>
    `;
  }

  container.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${yLabel} trajectory">
      ${gridSvg}
      <polygon points="${bandPolygon}" fill="rgba(56, 189, 248, 0.16)" />
      <path d="${toPath(mechanisticSeries)}" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6,4" />
      <path d="${toPath(hybridSeries)}" fill="none" stroke="#38bdf8" stroke-width="2.6" />
      <text x="${width / 2}" y="${height - 2}" text-anchor="middle" fill="#94a3b8" font-size="11">${xLabel}</text>
      <text x="14" y="${height / 2}" text-anchor="middle" fill="#94a3b8" font-size="11" transform="rotate(-90 14 ${height / 2})">${yLabel}</text>
    </svg>
    <div style="display:flex;flex-wrap:wrap;gap:16px;margin-top:8px;font-size:12px;color:#94a3b8;">
      <span><strong style="color:#94a3b8;">---</strong> Mechanistic ODE Baseline</span>
      <span><strong style="color:#38bdf8;">&#9473;</strong> Hybrid Residual Estimate ($Y_{mech} + f_\\theta$)</span>
      <span><strong style="color:rgba(56,189,248,0.65);">&#9632;</strong> 95% Bootstrap Uncertainty Band</span>
    </div>
  `;
}

export function renderHorizontalBarChart({ container, items }) {
  // items: [{ label, value, max, color, tag }]
  container.innerHTML = items
    .map((item) => {
      const pct = Math.min(100, Math.max(2, (Math.abs(item.value) / (item.max || 1)) * 100));
      return `
        <div style="margin-bottom:13px;">
          <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:4px;">
            <span style="color:#f1f5f9;font-weight:500;">${item.label}</span>
            <span class="mono" style="color:${item.color || "#38bdf8"};">${item.tag || item.value}</span>
          </div>
          <div style="height:8px;background:rgba(255,255,255,0.06);border-radius:999px;overflow:hidden;">
            <div style="height:100%;width:${pct.toFixed(1)}%;background:${item.color || "#38bdf8"};border-radius:999px;"></div>
          </div>
        </div>
      `;
    })
    .join("");
}
