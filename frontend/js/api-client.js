/**
 * KARUNX LABS — HELIX API Client
 * Connects the Mission-Control UI to the FastAPI Scientific Engine.
 * Strictly preserves provenance tags (real_osdr | mechanistic_ode | hybrid_ml | synthetic_demo).
 */

const DEFAULT_API_BASE = window.HELIX_API_BASE || "http://127.0.0.1:8000/api/v1";

export class HelixApiClient {
  constructor(baseUrl = DEFAULT_API_BASE) {
    this.baseUrl = baseUrl;
    this.online = false;
  }

  async checkHealth() {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 1800);
      const res = await fetch(`${this.baseUrl}/health`, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      this.online = true;
      return { online: true, data };
    } catch (err) {
      this.online = false;
      return { online: false, error: err.message };
    }
  }

  async fetchJson(endpoint, options = {}) {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) {
      const detail = await res.text();
      throw new Error(`API ${endpoint} failed (${res.status}): ${detail}`);
    }
    return res.json();
  }
}

export const apiClient = new HelixApiClient();
