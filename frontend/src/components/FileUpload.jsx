import { useRef, useState } from 'react';
import { Upload, FileCode, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FileUpload({ onUpload }) {
    const [file, setFile] = useState(null);
    const [target, setTarget] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) setFile(selected);
    };

    const handleProcess = async () => {
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        if (target) formData.append("target_col", target);

        try {
            const response = await fetch("http://localhost:8000/analyze", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            onUpload(data, file, target);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container glass-panel">
            <div
                className={`drop-area ${file ? 'active' : ''}`}
                onClick={() => !file && inputRef.current.click()}
            >
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    hidden
                    accept=".csv"
                />
                <AnimatePresence mode="wait">
                    {!file ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="empty-state"
                        >
                            <Upload size={48} className="icon-blue" />
                            <h3>Drop your dataset</h3>
                            <p>Supports .CSV (Parquet/Tabular support coming soon)</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="file"
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="file-state"
                        >
                            <FileCode size={48} className="icon-mint" />
                            <h3>{file.name}</h3>
                            <p>{(file.size / 1024).toFixed(1)} KB</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="form-controls">
                <div className="input-group">
                    <label>Target Column (Optional)</label>
                    <input
                        type="text"
                        placeholder="e.g. price, label, target"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                    />
                </div>
                <button
                    className="process-btn"
                    disabled={!file || loading}
                    onClick={handleProcess}
                >
                    {loading ? "Analyzing..." : "Initialize Engine"}
                </button>
            </div>

            <style jsx>{`
        .upload-container {
          padding: 2.5rem;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }
        .drop-area {
          border: 2px dashed rgba(0, 0, 0, 0.05);
          border-radius: 16px;
          padding: 4rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
        }
        .drop-area:hover {
          border-color: #3b82f6;
          background: rgba(59, 130, 246, 0.02);
        }
        .drop-area.active {
          border-style: solid;
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.02);
        }
        .empty-state h3, .file-state h3 { margin-top: 1.5rem; }
        .empty-state p, .file-state p { color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.5rem; }
        .form-controls { margin-top: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .input-group { display: flex; flex-direction: column; gap: 0.5rem; }
        .input-group label { font-size: 0.85rem; font-weight: 500; color: var(--text-secondary); }
        .input-group input { 
          padding: 0.8rem 1rem; 
          border-radius: 12px; 
          border: 1px solid rgba(0, 0, 0, 0.1); 
          background: white;
          font-family: inherit;
        }
        .process-btn {
          background: #334155;
          color: white;
          border: none;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .process-btn:hover { background: #1e293b; }
        .process-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .icon-blue { color: #3b82f6; }
        .icon-mint { color: #10b981; }
      `}</style>
        </div>
    );
}
