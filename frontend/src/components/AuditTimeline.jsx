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

            <style jsx>{`
        .audit-timeline { padding: 2.5rem; }
        .timeline-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; }
        .timeline-header h2 { font-size: 1.25rem; }
        .log-list { display: flex; flex-direction: column; gap: 1rem; }
        .log-item { display: flex; gap: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.03); }
        .log-item:last-child { border-bottom: none; }
        
        .log-icon-wrap { 
          width: 32px; height: 32px; border-radius: 8px; 
          display: flex; align-items: center; justify-content: center; 
          flex-shrink: 0;
        }
        .log-icon-wrap.prune { background: #fee2e2; color: #dc2626; }
        .log-icon-wrap.impute_mean, .log-icon-wrap.impute_median { background: #dcfce7; color: #16a34a; }
        
        .log-content { flex-grow: 1; }
        .log-meta { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
        .col-name { font-weight: 600; font-size: 0.9rem; color: #1e293b; }
        .confidence { font-size: 0.75rem; color: var(--text-secondary); font-weight: 500; }
        .log-action-text { font-size: 0.85rem; color: var(--text-secondary); }
        .action-type { font-weight: 600; color: var(--text-primary); text-transform: capitalize; }
      `}</style>
        </div>
    );
}
