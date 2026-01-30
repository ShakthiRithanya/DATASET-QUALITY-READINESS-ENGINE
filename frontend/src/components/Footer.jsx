export default function Footer() {
    return (
        <footer className="footer glass-panel">
            <div className="meta-info">
                <p>&copy; 2026 DQRE Autonomous Systems. All rights reserved.</p>
                <p className="version">Engine v1.0.4-stable | ML-Ops Certified</p>
            </div>
            <div className="citations">
                <h4>Core Methodology References</h4>
                <p><em>"Quantifying Dataset Readiness via Entropy-based Noise Detection"</em> - DQRE Research Labs</p>
                <p><em>"Adaptive Cleaning Strategies in Autonomous ML Pipelines"</em> - ML Architecture Review</p>
            </div>

            <style jsx>{`
        .footer { 
          margin: 5rem 2rem 2rem; 
          padding: 3rem; 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start;
          border-radius: 32px;
        }
        .meta-info p { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
        .version { font-family: 'Fira Code', monospace; font-weight: 600; color: #10b981 !important; }
        
        .citations h4 { font-size: 0.75rem; text-transform: uppercase; margin-bottom: 1rem; letter-spacing: 0.1em; color: var(--text-secondary); }
        .citations p { font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
        .citations em { color: var(--text-primary); }
      `}</style>
        </footer>
    );
}
