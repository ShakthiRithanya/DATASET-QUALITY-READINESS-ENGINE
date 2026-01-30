import { motion } from 'framer-motion';
import { Database, ShieldCheck, Activity } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="header glass-panel"
    >
      <div className="logo-wrap">
        <div className="logo-icon">
          <Database size={24} />
        </div>
        <div className="logo-text">
          <h1>DQRE</h1>
          <span>Dataset Quality & Readiness Engine</span>
        </div>
      </div>

      <nav className="nav-links">
        <div className="nav-item">
          <ShieldCheck size={18} />
          <span>Reliability First</span>
        </div>
        <div className="nav-item">
          <Activity size={18} />
          <span>Live Analysis</span>
        </div>
      </nav>

      
    </motion.header>
  );
}
