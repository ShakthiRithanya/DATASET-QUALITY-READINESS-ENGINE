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

            
        </div>
    );
}
