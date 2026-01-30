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

            
        </div>
    );
}
