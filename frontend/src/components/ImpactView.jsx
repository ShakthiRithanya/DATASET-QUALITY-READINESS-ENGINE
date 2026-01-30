import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

export default function ImpactView({ impact }) {
    if (!impact) return null;

    return (
        <div className="impact-view glass-panel">
            <div className="impact-header">
                <TrendingUp size={20} />
                <h2>Cleaning Impact Estimation</h2>
            </div>

            <div className="impact-stats">
                <div className="stat-box">
                    <label>Original Accuracy</label>
                    <div className="stat-val">{impact.original_score.toFixed(3)}</div>
                </div>
                <div className="stat-box accent">
                    <label>Cleaned Accuracy</label>
                    <div className="stat-val">{impact.cleaned_score.toFixed(3)}</div>
                </div>
                <div className={`delta-box ${impact.delta >= 0 ? 'positive' : 'negative'}`}>
                    <label>Performance Delta</label>
                    <div className="delta-val">
                        {impact.delta >= 0 ? '+' : ''}{impact.delta.toFixed(4)}
                    </div>
                </div>
            </div>

            {impact.risk_of_overcleaning && (
                <div className="alert-box">
                    <AlertTriangle size={18} />
                    <p><strong>Over-cleaning Risk detected:</strong> Significant performance drop. Review transformation audit log.</p>
                </div>
            )}

            <style jsx>{`
        .impact-view { padding: 2.5rem; display: flex; flex-direction: column; gap: 2rem; }
        .impact-header { display: flex; align-items: center; gap: 0.75rem; }
        .impact-stats { display: flex; gap: 1.5rem; }
        .stat-box { 
          flex: 1; padding: 1.5rem; background: rgba(0,0,0,0.02); 
          border-radius: 16px; display: flex; flex-direction: column; gap: 0.5rem;
        }
        .stat-box.accent { background: #eff6ff; border: 1px solid #dbeafe; }
        .stat-box label { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: var(--text-secondary); }
        .stat-val { font-size: 1.5rem; font-weight: 700; color: #1e293b; }
        
        .delta-box { 
          flex: 1; padding: 1.5rem; border-radius: 16px; 
          display: flex; flex-direction: column; gap: 0.5rem;
          color: white;
        }
        .delta-box.positive { background: #10b981; }
        .delta-box.negative { background: #ef4444; }
        .delta-val { font-size: 1.5rem; font-weight: 800; }

        .alert-box {
          background: #fff7ed;
          border: 1px solid #fed7aa;
          padding: 1rem;
          border-radius: 12px;
          display: flex;
          gap: 0.75rem;
          color: #9a3412;
          font-size: 0.9rem;
        }
      `}</style>
        </div>
    );
}
