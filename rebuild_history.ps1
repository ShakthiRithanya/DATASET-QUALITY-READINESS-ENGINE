$ErrorActionPreference = "Stop"

# Initialize
git init
git config user.email "shakthirithanyasr07@gmail.com"
git config user.name "Shakthi Rithanya S"

# 1. Project Root
git add README.md
git commit -m "Initial commit: Project structure and README"
git add .gitignore
git commit -m "chore: add root .gitignore"
git add Procfile
git commit -m "chore: add deployment configuration"
git add setup.bat setup.sh
git commit -m "chore: add local environment setup scripts"

# 2. Backend Base
git add backend/requirements.txt
git commit -m "feat: add backend dependencies"
git add backend/run.py
git commit -m "feat: add backend entry point"
git add backend/README.md
git commit -m "docs: add backend documentation"

# 3. Backend App Core
git add backend/app/__init__.py
git commit -m "feat: init backend package"
git add backend/app/logger.py
git commit -m "feat: add logging utility"
git add backend/app/schemas.py
git commit -m "feat: add pydantic schemas"
git add backend/app/metadata.json
git commit -m "chore: add engine metadata"

# 4. ML Modules
git add backend/app/profiler.py
git commit -m "feat: implement DataProfiler"
git add backend/app/cleaning.py
git commit -m "feat: implement CleaningEngine"
git add backend/app/advanced_ml.py
git commit -m "feat: implement AdvancedML heuristics"
git add backend/app/quality.py
git commit -m "feat: implement QualityEngine with DQI"
git add backend/app/evaluator.py
git commit -m "feat: implement ImpactEvaluator"
git add backend/app/pipelines.py
git commit -m "feat: implement PipelineGenerator"

# 5. Backend API & Tests
git add backend/app/main.py
git commit -m "feat: implement FastAPI endpoints"
git add backend/tests
git commit -m "test: add backend unit tests"

# 6. Frontend Configuration
git add frontend/package.json
git commit -m "feat: init frontend package"
git add frontend/vite.config.js
git commit -m "feat: config vite"
git add frontend/index.html
git commit -m "style: set up premium typography"
git add frontend/.gitignore
git commit -m "chore: frontend gitignore"

# 7. Frontend Styling
git add frontend/src/index.css
git commit -m "style: implement glassmorphism theme"
git add frontend/src/App.css
git commit -m "style: base app layout"

# 8. Frontend Components - Core & Assets
git add frontend/src/assets
git commit -m "chore: add assets"
git add frontend/src/constants
git commit -m "feat: add metric explanations"
git add frontend/src/components/Header.jsx
git commit -m "feat: add application header"
git add frontend/src/components/Footer.jsx
git commit -m "feat: add footer"

# 9. Frontend Components - Functional
git add frontend/src/components/FileUpload.jsx
git commit -m "feat: add file upload component"
git add frontend/src/components/UsageGuide.jsx
git commit -m "feat: add usage guide"
git add frontend/src/components/AdvancedSettings.jsx
git commit -m "feat: add settings panel"

# 10. Frontend Components - Visualization
git add frontend/src/components/MetricCard.jsx
git commit -m "feat: add metric cards"
git add frontend/src/components/CleaningStats.jsx
git commit -m "feat: add cleaning stats viz"
git add frontend/src/components/DataIssueMap.jsx
git commit -m "feat: add issue map heatmap"
git add frontend/src/components/ImpactView.jsx
git commit -m "feat: add impact estimation view"
git add frontend/src/components/DataPreview.jsx
git commit -m "feat: add data preview table"

# 11. Frontend Components - Export & 3D
git add frontend/src/components/PipelinePreview.jsx
git commit -m "feat: add pipeline code viewer"
git add frontend/src/components/CertificateView.jsx
git commit -m "feat: add certificate generator"
git add frontend/src/components/AuditTimeline.jsx
git commit -m "feat: add audit timeline"
git add frontend/src/components/Scene3D.jsx
git commit -m "feat: add 3D ambient scene"

# 12. Frontend Main
git add frontend/src/App.jsx
git commit -m "feat: complete app orchestration"
git add frontend/src/main.jsx
git commit -m "feat: frontend entry point"

# 13. Documentation & Data
git add docs/ARCHITECTURE.md
git commit -m "docs: add system architecture"
git add docs/samples
git commit -m "data: add sample datasets"
git add .github
git commit -m "ci: add github actions"

# 14. Finalize
git add .
git commit -m "chore: final project build"

# Push
git remote add origin https://github.com/ShakthiRithanya/DATASET-QUALITY-READINESS-ENGINE.git
git branch -M main
git push -u origin main --force
