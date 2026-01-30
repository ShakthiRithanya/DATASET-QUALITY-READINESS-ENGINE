import { Terminal, Copy } from 'lucide-react';

export default function PipelinePreview({ code }) {
    if (!code) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        alert("Pipeline code copied!");
    };

    return (
        <div className="pipeline-preview glass-panel">
            <div className="preview-header">
                <div className="title-wrap">
                    <Terminal size={20} />
                    <h2>Deployment Pipeline</h2>
                </div>
                <button onClick={copyToClipboard} className="copy-btn">
                    <Copy size={16} /> Copy Code
                </button>
            </div>

            <pre className="code-block">
                <code>{code}</code>
            </pre>

            <style jsx>{`
        .pipeline-preview { padding: 2.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
        .preview-header { display: flex; justify-content: space-between; align-items: center; }
        .title-wrap { display: flex; align-items: center; gap: 0.75rem; }
        .title-wrap h2 { font-size: 1.25rem; }
        
        .copy-btn { 
          display: flex; align-items: center; gap: 0.5rem; 
          background: #334155; color: white; border: none; 
          padding: 0.5rem 1rem; border-radius: 8px; font-size: 0.8rem;
          font-weight: 600; cursor: pointer; transition: 0.2s;
        }
        .copy-btn:hover { background: #1e293b; }

        .code-block { 
          background: #1e293b; color: #e2e8f0; padding: 2rem; 
          border-radius: 12px; font-family: 'Fira Code', monospace; 
          font-size: 0.85rem; line-height: 1.6; overflow-x: auto;
        }
        code { white-space: pre-wrap; }
      `}</style>
        </div>
    );
}
