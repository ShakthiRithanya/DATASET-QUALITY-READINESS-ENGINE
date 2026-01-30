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

      <style jsx>{`
        .metric-card {
          padding: 2rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.1);
        }
        .metric-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .metric-icon {
          color: #3b82f6;
          opacity: 0.8;
        }
        .metric-header h3 {
          font-size: 0.9rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .metric-value {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .metric-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .info-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.98);
          padding: 1.5rem;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          z-index: 20;
          animation: fadeIn 0.3s ease;
        }
        .info-section { display: flex; flex-direction: column; gap: 0.25rem; }
        .info-label { font-size: 0.65rem; font-weight: 800; text-transform: uppercase; color: #3b82f6; }
        .info-section p { font-size: 0.75rem; color: var(--text-primary); line-height: 1.5; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
