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

            
        </div>
    );
}
