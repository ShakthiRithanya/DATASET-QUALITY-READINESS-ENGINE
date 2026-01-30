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

            
        </div>
    );
}
