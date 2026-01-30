import { useState } from 'react';
import { METRIC_EXPLANATIONS } from '../constants/explanations';
import { Info } from 'lucide-react';

export default function MetricCard({ icon, title, value, desc }) {
  const [showInfo, setShowInfo] = useState(false);
  const info = METRIC_EXPLANATIONS[title];

  return (
    <div
      className="metric-card glass-panel"
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <div className="metric-header">
        <div className="metric-icon">{icon}</div>
        <h3>{title}</h3>
      </div>
      <div className="metric-value">{value}</div>
      <p className="metric-desc">{desc}</p>

      {showInfo && info && (
        <div className="info-overlay">
          <div className="info-section">
            <span className="info-label">Concept</span>
            <p>{info.definition}</p>
          </div>
          <div className="info-section">
            <span className="info-label">Rationale</span>
            <p>{info.why}</p>
          </div>
        </div>
      )}

      
    </div>
  );
}
