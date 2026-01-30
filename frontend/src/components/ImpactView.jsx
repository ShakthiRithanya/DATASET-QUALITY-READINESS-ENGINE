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

            
        </div>
    );
}
