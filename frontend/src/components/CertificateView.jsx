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

            
        </div>
    );
}
