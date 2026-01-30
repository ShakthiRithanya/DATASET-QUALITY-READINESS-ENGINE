import { motion } from 'framer-motion';
import { PlayCircle, UploadCloud, Cpu, FileCheck } from 'lucide-react';

export default function UsageGuide() {
    const steps = [
        { icon: <UploadCloud />, title: "Ingest", text: "Upload your CSV or Parquet dataset for deep analysis." },
        { icon: <Cpu />, title: "Analyze", text: "Autonomous engine detects noise, redundancy, and reliability." },
        { icon: <PlayCircle />, title: "Clean", text: "Adaptive strategies handle outliers and missing values." },
        { icon: <FileCheck />, title: "Export", text: "Download model-ready data and the sklearn pipeline." }
    ];

    return (
        <div className="usage-guide glass-panel">
            <h3>Getting Started</h3>
            <div className="steps-container">
                {steps.map((step, i) => (
                    <div key={i} className="step-card">
                        <div className="step-icon">{step.icon}</div>
                        <div className="step-content">
                            <h4>{step.title}</h4>
                            <p>{step.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .usage-guide { padding: 2.5rem; width: 100%; max-width: 800px; margin: 2rem auto; }
        .usage-guide h3 { margin-bottom: 2rem; font-size: 1.1rem; text-transform: uppercase; color: var(--text-secondary); letter-spacing: 0.1em; }
        .steps-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        .step-card { display: flex; gap: 1rem; align-items: flex-start; }
        .step-icon { color: #3b82f6; background: #eff6ff; padding: 0.75rem; border-radius: 12px; }
        .step-content h4 { font-size: 1rem; margin-bottom: 0.4rem; }
        .step-content p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; }
      `}</style>
        </div>
    );
}
