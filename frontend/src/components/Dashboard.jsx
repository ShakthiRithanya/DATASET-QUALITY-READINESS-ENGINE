import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Database, Zap, Download } from 'lucide-react';
import MetricCard from './MetricCard';

export default function Dashboard({ data, originalFile, targetCol }) {
    if (!data) return null;

    const handleExport = async () => {
        const formData = new FormData();
        formData.append("file", originalFile);
        if (targetCol) formData.append("target_col", targetCol);

        try {
            const resp = await fetch("http://localhost:8000/export", {
                method: "POST",
                body: formData
            });
            const blob = await resp.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "cleaned_dataset.csv";
            a.click();
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="dashboard"
        >
            <div className="summary-banner glass-panel">
                <div className="dqi-left">
                    <div className="dqi-score">
                        <svg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                            <motion.circle
                                cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="8"
                                strokeDasharray="283"
                                initial={{ strokeDashoffset: 283 }}
                                animate={{ strokeDashoffset: 283 - (283 * data.dqi) }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </svg>
                        <div className="score-text">
                            <h2>{(data.dqi * 100).toFixed(0)}</h2>
                            <span>DQI</span>
                        </div>
                    </div>
                    <div className="status-badge">
                        <ShieldCheck size={20} />
                        <span>{data.status}</span>
                    </div>
                </div>

                <button onClick={handleExport} className="export-action-btn">
                    <Download size={20} /> Export Model-Ready CSV
                </button>
            </div>

            <div className="metrics-grid">
                <MetricCard
                    icon={<Activity />}
                    title="Noise Level"
                    value={`${(data.quality.breakdown.noise.score * 100).toFixed(1)}%`}
                    desc="Variance instability & entropy"
                />
                <MetricCard
                    icon={<Database />}
                    title="Redundancy"
                    value={`${(data.quality.breakdown.redundancy.score * 100).toFixed(1)}%`}
                    desc="Feature correlation overlap"
                />
                <MetricCard
                    icon={<ShieldCheck />}
                    title="Label Trust"
                    value={`${(data.quality.breakdown.reliability.score * 100).toFixed(1)}%`}
                    desc="Statistical label consistency"
                />
                <MetricCard
                    icon={<Zap />}
                    title="Usefulness"
                    value={`${(data.quality.breakdown.usefulness.score * 100).toFixed(1)}%`}
                    desc="Mutual information with target"
                />
            </div>

            <style jsx>{`
        .dashboard {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .summary-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2.5rem;
        }
        .dqi-left { display: flex; align-items: center; gap: 3rem; }
        .export-action-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #334155;
          color: white;
          border: none;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }
        .export-action-btn:hover { background: #1e293b; transform: translateY(-2px); }
        .dqi-score {
          position: relative;
          width: 150px;
          height: 150px;
        }
        .score-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
        .score-text h2 { font-size: 2.5rem; line-height: 1; margin-bottom: 0.2rem; }
        .score-text span { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); }
        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #d1fae5;
          color: #065f46;
          padding: 0.75rem 1.5rem;
          border-radius: 100px;
          font-weight: 600;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
      `}</style>
        </motion.div>
    );
}
