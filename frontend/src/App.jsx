import { useState } from 'react';
import Scene3D from './components/Scene3D';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import AuditTimeline from './components/AuditTimeline';
import ImpactView from './components/ImpactView';
import CertificateView from './components/CertificateView';
import DataIssueMap from './components/DataIssueMap';
import PipelinePreview from './components/PipelinePreview';
import CleaningStats from './components/CleaningStats';
import DataPreview from './components/DataPreview';
import UsageGuide from './components/UsageGuide';
import Footer from './components/Footer';
import AdvancedSettings from './components/AdvancedSettings';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [report, setReport] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [targetCol, setTargetCol] = useState("");

  const handleAnalysis = (data, file, target) => {
    setReport(data);
    setRawFile(file);
    setTargetCol(target);
  };

  return (
    <div className="app-root">
      <Scene3D />
      <Header />

      <main className="main-content">
        <AnimatePresence mode="wait">
          {!report ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              className="landing-view"
            >
              <div className="hero">
                <h1 className="gradient-text">Intelligent Data Readiness</h1>
                <p>Quantify, diagnose, and refine your datasets with our production-grade ML quality engine.</p>
              </div>
              <FileUpload onUpload={handleAnalysis} />
              <UsageGuide />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="results-view"
            >
              <Dashboard data={report} originalFile={rawFile} targetCol={targetCol} />

              <div style={{ width: '100%', maxWidth: '1200px', padding: '0 2rem' }}>
                <DataIssueMap issueMap={report.issue_map} />
              </div>

              <div className="details-grid">
                <CleaningStats stats={report.cleaning_stats} />
                <ImpactView impact={report.impact} />
                <AuditTimeline logs={report.audit_log} />
              </div>

              <div style={{ width: '100%', maxWidth: '1200px', padding: '0 2rem' }}>
                <DataPreview previews={report.previews} />
              </div>

              <div style={{ width: '100%', maxWidth: '1200px', padding: '0 2rem' }}>
                <PipelinePreview code={report.pipeline_code} />
              </div>

              <div style={{ width: '100%', maxWidth: '1200px', padding: '0 2rem' }}>
                <CertificateView cert={report.certificate} />
              </div>

              <button className="reset-btn" onClick={() => setReport(null)}>
                Process New Dataset
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <AdvancedSettings />

      <style jsx>{`
        .app-root { min-height: 100vh; }
        .main-content { padding-top: 120px; padding-bottom: 5rem; z-index: 10; position: relative; }
        .landing-view { text-align: center; max-width: 800px; margin: 0 auto; padding: 2rem; }
        .hero { margin-bottom: 3rem; }
        .hero h1 { font-size: 4rem; font-weight: 800; margin-bottom: 1rem; }
        .hero p { font-size: 1.25rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; line-height: 1.6; }
        
        .results-view { display: flex; flex-direction: column; gap: 2rem; align-items: center; }
        .details-grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 2rem; 
          width: 100%; 
          max-width: 1200px; 
          padding: 0 2rem;
        }
        
        .reset-btn {
          margin-top: 3rem;
          background: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.1);
          padding: 0.75rem 2rem;
          border-radius: 100px;
          font-family: inherit;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .reset-btn:hover { background: rgba(0,0,0,0.1); }

        @media (max-width: 1024px) {
          .details-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

export default App;
