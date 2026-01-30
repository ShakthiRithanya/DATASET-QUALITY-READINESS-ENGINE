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

            
        </motion.div>
    );
}
