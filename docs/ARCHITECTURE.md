# DQRE Architecture

## System Design
The Dataset Quality & Readiness Engine (DQRE) follows a decoupled architecture with a FastAPI backend and a React-based frontend.

### Backend Components
1. **Profiler**: Uses Pandas and NumPy for rapid feature inference.
2. **Quality Engine**: Implements DQI calculation using entropy, mutual information, and correlation theory.
3. **Advanced ML**: Utilizes Random Forest for stability analysis and confident learning proxies.
4. **Cleaning Engine**: Adaptive strategy selection for missing values (distribution-based) and outliers (spatial/Isolation Forest).
5. **Evaluator**: Proxy model evaluation for performance delta tracking.

### Frontend Components
1. **3D Scene**: Three.js/R3F for ambient data particles and cubes.
2. **Dashboard**: High-level DQI and quality breakdowns.
3. **Audit Log**: Chronological record of autonomous cleaning decisions.
4. **Issue Map**: Spatial visualization of feature mapping and anomalies.
5. **Certification**: Verified data quality certificate generation.

## ML Methodology
- **DQI Formula**: Weighted harmonic/geometric mean of noise, redundancy, reliability, and stability.
- **Confident Learning**: Identifying misfit samples where $P(y|X)$ is consistently low relative to label.
- **Stability**: Bootstrap importance variance calculation.
