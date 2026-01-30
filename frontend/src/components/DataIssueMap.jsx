import { motion } from 'framer-motion';
import { Box, AlertCircle } from 'lucide-react';

export default function DataIssueMap({ issueMap }) {
    if (!issueMap) return null;

    return (
        <div className="issue-map glass-panel">
            <div className="map-header">
                <Box size={20} />
                <h2>Feature-wise Issue Map</h2>
            </div>

            <div className="map-grid">
                {issueMap.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className={`map-card ${item.severity > 0 ? 'has-issue' : ''}`}
                    >
                        <div className="card-top">
                            <span className="feat-type">{item.type}</span>
                            {item.severity > 0 && <AlertCircle size={14} className="issue-icon" />}
                        </div>
                        <h4>{item.feature}</h4>
                        <div className="issue-list">
                            {item.issues.length > 0 ? (
                                item.issues.map((iss, j) => <span key={j} className="issue-tag">{iss}</span>)
                            ) : (
                                <span className="clean-tag">Optimal</span>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .issue-map { padding: 2.5rem; }
        .map-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; }
        .map-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
        
        .map-card { 
          background: rgba(0,0,0,0.02); border-radius: 12px; padding: 1.25rem; 
          border: 1px solid rgba(0,0,0,0.03); cursor: default;
        }
        .map-card.has-issue { background: #fff1f2; border-color: #fecdd3; }
        
        .card-top { display: flex; justify-content: space-between; margin-bottom: 0.75rem; }
        .feat-type { font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600; }
        .issue-icon { color: #e11d48; }

        h4 { font-size: 0.95rem; margin-bottom: 1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        
        .issue-list { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .issue-tag { font-size: 0.75rem; background: #fb7185; color: white; padding: 0.2rem 0.5rem; border-radius: 4px; font-weight: 600; }
        .clean-tag { font-size: 0.75rem; color: #059669; font-weight: 600; }
      `}</style>
        </div>
    );
}
