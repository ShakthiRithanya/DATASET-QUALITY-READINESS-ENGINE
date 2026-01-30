import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';

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


        </div>
    );
}
