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

            
        </div>
    );
}
