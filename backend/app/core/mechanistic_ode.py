"""
KARUNX LABS — HELIX Stage 3 & 4: Mechanistic Immune System ODE Engine
Models coupled dynamics of T-cell activation T(t), NK cytotoxicity K(t),
and IL-6/NF-kB inflammatory tone I(t) under spaceflight stressors via SciPy RK45.
"""
from typing import Dict, List
import numpy as np
from scipy.integrate import solve_ivp


def simulate_immune_odes(
    duration_days: int,
    stress_factor: float = 1.0,
    radiation_msv_day: float = 0.55,
    num_points: int = 25,
) -> Dict[str, List[float]]:
    """
    Integrates coupled immune ODEs from t=0 to t=duration_days.

    State variables (dimensionless, normalized to pre-flight baseline = 1.0):
      y[0] = T(t): T-cell TCR/IL-2 activation state
      y[1] = K(t): NK-cell perforin/granzyme cytolytic state
      y[2] = I(t): Systemic IL-6 / NF-kB inflammatory state

    Assumptions:
      - Homeostatic restoration follows first-order kinetics toward baseline (1.0).
      - Microgravity/isolation load (stress_factor) and radiation dose rate jointly drive
        pro-inflammatory activation and blunt TCR/NK effector signaling.
      - Chronic IL-6 elevation exerts secondary SOCS3-mediated inhibition on NK activity.
    """
    # Biologically calibrated rate constants (units: day^-1)
    k_homeo_T = 0.028
    k_homeo_K = 0.025
    k_homeo_I = 0.032

    env_load = stress_factor * (1.0 + 0.38 * radiation_msv_day)
    alpha_T = 0.011 * env_load   # Microgravity TCR suppression rate
    alpha_K = 0.012 * env_load   # NK degranulation suppression rate
    beta_KI = 0.008              # Secondary IL-6 inhibition on NK cells
    gamma_I = 0.014 * env_load   # Stress-driven NF-kB/IL-6 induction rate

    def rhs(_t: float, y: np.ndarray) -> List[float]:
        T, K, I_state = y
        dT_dt = k_homeo_T * (1.0 - T) - alpha_T * T
        dK_dt = k_homeo_K * (1.0 - K) - alpha_K * K - beta_KI * max(0.0, I_state - 1.0) * K
        dI_dt = k_homeo_I * (1.0 - I_state) + gamma_I
        return [dT_dt, dK_dt, dI_dt]

    t_eval = np.linspace(0, duration_days, num_points)
    sol = solve_ivp(
        fun=rhs,
        t_span=(0, duration_days),
        y0=[1.0, 1.0, 1.0],
        t_eval=t_eval,
        method="RK45",
        rtol=1e-6,
        atol=1e-8,
    )

    return {
        "time_days": [int(round(t)) for t in sol.t],
        "tcell_activation": [round(float(v), 4) for v in sol.y[0]],
        "nk_cytotoxicity": [round(float(v), 4) for v in sol.y[1]],
        "il6_inflammation": [round(float(v), 4) for v in sol.y[2]],
    }
