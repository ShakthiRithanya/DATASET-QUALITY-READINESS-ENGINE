import { motion } from 'framer-motion';
import { BarChart3, ArrowRight } from 'lucide-react';

export default function CleaningStats({ stats }) {
    if (!stats) return null;

    const cols = Object.keys(stats).slice(0, 4); // Limit to first 4 for UI cleanliness

    return (
        <div className="cleaning-stats glass-panel">
            <div className="stats-header">
                <BarChart3 size={20} />
                <h2>Cleaning Simulation: Before vs After</h2>
            </div>

            <div className="stats-grid">
                {cols.map((col, i) => (
                    <div key={i} className="stat-row">
                        <div className="col-info">
                            <h4>{col}</h4>
                            <span className="sub">Mean & Nulls</span>
                        </div>

                        <div className="comparison">
                            <div className="side before">
                                <div className="val">{stats[col].before.mean.toFixed(2)}</div>
                                <div className="null-tag">Nulls: {stats[col].before.nulls}</div>
                            </div>
                            <ArrowRight size={16} className="arrow" />
                            <div className="side after">
                                <div className="val">{stats[col].after.mean.toFixed(2)}</div>
                                <div className="null-tag">Nulls: {stats[col].after.nulls}</div>
                            </div>
                        </div>

                        <div className="diff-viz">
                            <motion.div
                                className="bar before-bar"
                                initial={{ width: 0 }}
                                animate={{ width: '100px' }}
                                style={{ opacity: 0.3 }}
                            />
                            <motion.div
                                className="bar after-bar"
                                initial={{ width: 0 }}
                                animate={{ width: `${(stats[col].after.mean / stats[col].before.mean) * 100}px` }}
                                style={{ background: '#10b981' }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .cleaning-stats { padding: 2.5rem; }
        .stats-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; }
        .stats-grid { display: flex; flex-direction: column; gap: 2rem; }
        
        .stat-row { display: grid; grid-template-columns: 150px 1fr 120px; align-items: center; gap: 2rem; }
        .col-info h4 { font-size: 0.95rem; margin-bottom: 0.25rem; word-break: break-all; }
        .col-info .sub { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; }
        
        .comparison { display: flex; align-items: center; gap: 1rem; background: rgba(0,0,0,0.02); padding: 0.75rem 1.25rem; border-radius: 12px; }
        .side { text-align: center; }
        .side .val { font-weight: 700; font-size: 1.1rem; }
        .side .null-tag { font-size: 0.65rem; color: var(--text-secondary); margin-top: 0.2rem; }
        .arrow { color: var(--text-secondary); opacity: 0.5; }
        
        .diff-viz { position: relative; height: 8px; background: rgba(0,0,0,0.05); border-radius: 4px; overflow: hidden; }
        .bar { position: absolute; height: 100%; top: 0; left: 0; }
        .before-bar { background: #3b82f6; }
      `}</style>
        </div>
    );
}
