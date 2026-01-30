import { useState, useEffect } from 'react';
import { Settings, Tooltip } from 'lucide-react';

export default function AdvancedSettings() {
    const [config, setConfig] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8000/config")
            .then(res => res.json())
            .then(data => setConfig(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="advanced-settings-wrap">
            <button className="settings-toggle" onClick={() => setOpen(!open)}>
                <Settings size={18} /> Engine Config
            </button>

            {open && (
                <div className="settings-panel glass-panel">
                    <h4>Autonomous Engine Configuration</h4>
                    <div className="config-list">
                        {config?.map((item, i) => (
                            <div key={i} className="config-item">
                                <div className="item-head">
                                    <span className="name">{item.name}</span>
                                    <span className={`status-pill ${item.status}`}>{item.status}</span>
                                </div>
                                <div className="impact-bar">
                                    <div className="fill" style={{ width: `${item.impact_factor * 100}%` }}></div>
                                </div>
                                <span className="impact-label">Impact Factor: {item.impact_factor}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style jsx>{`
        .advanced-settings-wrap { position: fixed; bottom: 2rem; right: 2rem; z-index: 100; }
        .settings-toggle {
          display: flex; align-items: center; gap: 0.5rem;
          background: white; border: 1px solid rgba(0,0,0,0.1);
          padding: 0.75rem 1.25rem; border-radius: 100px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05); cursor: pointer;
          font-weight: 600; font-size: 0.85rem; color: var(--text-secondary);
          transition: all 0.2s;
        }
        .settings-toggle:hover { background: #f8fafc; transform: translateY(-2px); }

        .settings-panel {
          position: absolute; bottom: 4rem; right: 0; width: 300px;
          padding: 1.5rem; animation: slideUp 0.3s ease;
        }
        .settings-panel h4 { font-size: 0.85rem; margin-bottom: 1.5rem; text-transform: uppercase; color: var(--text-secondary); }
        .config-list { display: flex; flex-direction: column; gap: 1.5rem; }
        
        .item-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
        .name { font-size: 0.9rem; font-weight: 600; }
        .status-pill { font-size: 0.65rem; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase; font-weight: 800; }
        .status-pill.stable { background: #eff6ff; color: #3b82f6; }
        .status-pill.experimental { background: #fef2f2; color: #ef4444; }

        .impact-bar { height: 4px; background: rgba(0,0,0,0.05); border-radius: 2px; overflow: hidden; margin-bottom: 0.25rem; }
        .fill { height: 100%; background: #10b981; }
        .impact-label { font-size: 0.7rem; color: var(--text-secondary); }

        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
        </div>
    );
}
