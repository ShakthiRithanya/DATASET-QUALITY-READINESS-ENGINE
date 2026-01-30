import { motion } from 'framer-motion';
import { LogIn, Info, CheckCircle, Trash2 } from 'lucide-react';

export default function AuditTimeline({ logs }) {
    if (!logs || logs.length === 0) return null;

    const getIcon = (action) => {
        if (action.includes('impute')) return <Info size={16} />;
        if (action === 'prune') return <Trash2 size={16} />;
        return <CheckCircle size={16} />;
    };

    return (
        <div className="audit-timeline glass-panel">
            <div className="timeline-header">
                <LogIn size={20} />
                <h2>Intelligence Audit Log</h2>
            </div>
            <div className="log-list">
                {logs.map((log, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="log-item"
                    >
                        <div className={`log-icon-wrap ${log.action}`}>
                            {getIcon(log.action)}
                        </div>
                        <div className="log-content">
                            <div className="log-meta">
                                <span className="col-name">{log.column}</span>
                                <span className="confidence">Confidence: {(log.confidence * 100).toFixed(0)}%</span>
                            </div>
                            <p className="log-action-text"><span className="action-type">{log.action}:</span> {log.reason}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            
        </div>
    );
}
