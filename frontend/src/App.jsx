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


    </div>
  );
}

export default App;
