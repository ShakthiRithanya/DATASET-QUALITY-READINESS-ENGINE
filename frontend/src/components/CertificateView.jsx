import { ShieldCheck, Calendar, Hash, Award } from 'lucide-react';

export default function CertificateView({ cert }) {
    if (!cert) return null;

    return (
        <div className="cert-container glass-panel">
            <div className="cert-header">
                <Award size={40} className="cert-icon" />
                <div className="cert-title">
                    <h2>Data Readiness Certificate</h2>
                    <p>Verified by DQRE Autonomous ML Engine</p>
                </div>
            </div>

            <div className="cert-body">
                <div className="cert-item">
                    <Hash size={16} />
                    <span>Certificate ID: <strong>{cert.cert_id}</strong></span>
                </div>
                <div className="cert-item">
                    <Calendar size={16} />
                    <span>Issue Date: <strong>{new Date(cert.issue_date).toLocaleDateString()}</strong></span>
                </div>
                <div className="cert-item status">
                    <ShieldCheck size={16} />
                    <span>Readiness: <strong>{cert.status}</strong></span>
                </div>
            </div>

            <div className="cert-criteria">
                <h3>Verified Criteria</h3>
                <ul>
                    {cert.verified_criteria.map((c, i) => (
                        <li key={i}>{c}</li>
                    ))}
                </ul>
            </div>

            <div className="cert-footer">
                <div className="signature">
                    <div className="sig-line"></div>
                    <span>Decision Architect</span>
                </div>
                <div className="signature">
                    <div className="sig-line"></div>
                    <span>ML System Hash</span>
                </div>
            </div>

            <style jsx>{`
        .cert-container { 
          padding: 3rem; 
          border: 4px double rgba(0,0,0,0.05); 
          max-width: 1200px; 
          margin: 0 auto;
          width: 100%;
        }
        .cert-header { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 3rem; }
        .cert-icon { color: #f59e0b; }
        .cert-title h2 { font-size: 1.75rem; letter-spacing: 0.1em; text-transform: uppercase; }
        .cert-title p { color: var(--text-secondary); font-size: 0.9rem; }
        
        .cert-body { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3rem; }
        .cert-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.9rem; }
        .cert-item.status { color: #059669; }
        
        .cert-criteria { background: rgba(0,0,0,0.02); padding: 2rem; border-radius: 16px; margin-bottom: 3rem; }
        .cert-criteria h3 { font-size: 0.8rem; text-transform: uppercase; margin-bottom: 1rem; color: var(--text-secondary); }
        .cert-criteria ul { list-style: none; display: flex; gap: 2rem; }
        .cert-criteria li { font-size: 0.9rem; font-weight: 500; display: flex; align-items: center; gap: 0.5rem; }
        .cert-criteria li::before { content: '✓'; color: #10b981; font-weight: bold; }

        .cert-footer { display: flex; justify-content: space-around; margin-top: 2rem; }
        .signature { text-align: center; }
        .sig-line { width: 150px; height: 1px; background: #000; margin-bottom: 0.5rem; opacity: 0.3; }
        .signature span { font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 600; }
      `}</style>
        </div>
    );
}
