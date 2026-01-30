# Dataset Quality & Readiness Engine (DQRE)

## 🚀 Overview
The **Dataset Quality & Readiness Engine (DQRE)** is an advanced, autonomous system designed to assess, visualize, and improve the quality of machine learning datasets. It leverages statistical theory and machine learning heuristics to calculate a **Data Quality Index (DQI)**, automate data cleaning, and generate improved pipeline code.

![Status](https://img.shields.io/badge/Status-Active-success)
![Python](https://img.shields.io/badge/Backend-FastAPI-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Three.js-violet)

## ✨ Key Features
- **📊 Deep Profiling**: Variable type inference, distribution analysis, and statistical summary.
- **🧠 Quality Engine**: Calculates a comprehensive DQI score based on completeness, uniqueness, consistency, and stability.
- **🧹 Autonomous Cleaning**: Smart handling of missing values (mean/median/mode/iterative) and outliers (Isolation Forest).
- **📉 Impact Analysis**: Estimates model performance improvements before and after cleaning.
- **🕸️ 3D Visualizations**: Interactive Three.js scenes representing data entropy and structure.
- **📜 Audit Trail**: Full transparency with a detailed timeline of all automated decisions.
- **🔖 Certification**: Generates a verifiable "Data Quality Certificate" for your datasets.

## 🏗️ Architecture
The system follows a modern decoupled architecture:

### Backend (Python/FastAPI)
- **Profiler**: Pandas/NumPy based feature extraction.
- **Quality Engine**: Entropy and mutual information calculations.
- **Advanced ML**: Random Forest stability analysis and label confidence scoring.

### Frontend (React/Vite)
- **Dashboard**: Real-time DQI metrics and quality breakdowns.
- **Scene3D**: Ambient data visualization using React Three Fiber.
- **Issue Map**: Spatial heatmap of data anomalies.

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.9+
- Node.js 18+

### 1. Clone the Repository
```bash
git clone https://github.com/ShakthiRithanya/DATASET-QUALITY-READINESS-ENGINE.git
cd DATASET-QUALITY-READINESS-ENGINE
```

### 2. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python run.py
```
*The API will start at `http://localhost:8000`*

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*The app will be available at `http://localhost:5173`*

## 🧾 License
This project is licensed under the MIT License.
