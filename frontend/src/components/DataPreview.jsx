import { useState } from 'react';
import { Table, Layout } from 'lucide-react';

export default function DataPreview({ previews }) {
    const [view, setView] = useState("cleaned");

    if (!previews) return null;

    const data = previews[view];
    const columns = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div className="data-preview glass-panel">
            <div className="preview-header">
                <div className="title-wrap">
                    <Table size={20} />
                    <h2>Dataset Sample Preview</h2>
                </div>
                <div className="toggle-group">
                    <button
                        className={view === "original" ? "active" : ""}
                        onClick={() => setView("original")}
                    >
                        Original
                    </button>
                    <button
                        className={view === "cleaned" ? "active" : ""}
                        onClick={() => setView("cleaned")}
                    >
                        Cleaned
                    </button>
                </div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, i) => (
                            <tr key={i}>
                                {columns.map((col, j) => (
                                    <td key={j}>{row[col]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style jsx>{`
        .data-preview { padding: 2.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .preview-header { display: flex; justify-content: space-between; align-items: center; }
        .title-wrap { display: flex; align-items: center; gap: 0.75rem; }
        .title-wrap h2 { font-size: 1.25rem; }
        
        .toggle-group { display: flex; background: rgba(0,0,0,0.05); padding: 0.25rem; border-radius: 8px; }
        .toggle-group button { 
          padding: 0.5rem 1rem; border: none; border-radius: 6px; 
          background: none; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: 0.2s;
        }
        .toggle-group button.active { background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

        .table-container { overflow-x: auto; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05); }
        table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        th { background: rgba(0,0,0,0.02); text-align: left; padding: 1rem; color: var(--text-secondary); border-bottom: 1px solid rgba(0,0,0,0.05); }
        td { padding: 1rem; border-bottom: 1px solid rgba(0,0,0,0.03); }
        tr:last-child td { border-bottom: none; }
      `}</style>
        </div>
    );
}
