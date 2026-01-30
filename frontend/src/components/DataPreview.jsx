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

            
        </div>
    );
}
