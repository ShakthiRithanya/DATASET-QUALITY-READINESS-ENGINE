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

      <style jsx>{`
        .header {
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          border-radius: 100px;
        }
        .logo-wrap { display: flex; align-items: center; gap: 1rem; }
        .logo-icon { 
          background: #3b82f6; 
          color: white; 
          padding: 0.5rem; 
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .logo-text h1 { font-size: 1.25rem; font-weight: 800; line-height: 1; margin: 0; }
        .logo-text span { font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
        
        .nav-links { display: flex; gap: 2rem; }
        .nav-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); }
        .nav-item span { margin-top: 1px; }

        @media (max-width: 768px) {
          .nav-links { display: none; }
        }
      `}</style>
    </motion.header>
  );
}
