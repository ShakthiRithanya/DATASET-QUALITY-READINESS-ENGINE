from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import json
from .profiler import DataProfiler
from .quality import QualityEngine
from .cleaning import CleaningEngine
from .evaluator import ImpactEvaluator
from .pipelines import PipelineGenerator
from .schemas import AnalysisResponse

app = FastAPI(title="DQRE API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze_dataset(
    file: UploadFile = File(...),
    target_col: str = Form(None)
):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))
    
    # 1. Profile
    profiler = DataProfiler(df, target_col)
    profile = profiler.profile_data()
    
    # 2. Quality
    quality_engine = QualityEngine(df, profile)
    quality_report = quality_engine.summarize_quality(target_col)
    
    # 3. Clean
    cleaner = CleaningEngine(df, profile)
    cleaner.handle_missing_values()
    cleaner.handle_outliers()
    cleaned_df = cleaner.df
    
    # 4. Impact
    evaluator = ImpactEvaluator(
        df, 
        cleaned_df, 
        target_col, 
        profile["target"]["task_type"] if profile["target"] else "classification"
    )
    impact_report = evaluator.evaluate_delta() if target_col else None
    
    # 5. Certificate
    certificate = quality_engine.generate_certificate(quality_report)

    # 6. Issue Map
    issue_map = quality_engine.generate_issue_map()

    # 7. Pipeline Code
    pipeliner = PipelineGenerator(cleaner.audit_log)
    pipeline_code = pipeliner.generate_code()

    # 8. Stats Delta
    cleaning_stats = cleaner.get_stats_delta()

    # 9. Data Previews
    original_preview = df.head(5).to_dict(orient="records")
    cleaned_preview = cleaner.df.head(5).to_dict(orient="records")
    
    return {
        "profile": profile,
        "quality": quality_report,
        "audit_log": cleaner.audit_log,
        "cleaning_stats": cleaning_stats,
        "impact": impact_report,
        "certificate": certificate,
        "issue_map": issue_map,
        "pipeline_code": pipeline_code,
        "previews": {
            "original": original_preview,
            "cleaned": cleaned_preview
        },
        "dqi": quality_report["dqi"],
        "status": quality_report["status"]
    }

@app.post("/export")
async def export_dataset(
    file: UploadFile = File(...),
    target_col: str = Form(None)
):
    contents = await file.read()
    df = pd.read_csv(io.BytesIO(contents))
    
    profiler = DataProfiler(df, target_col)
    profile = profiler.profile_data()
    
    cleaner = CleaningEngine(df, profile)
    cleaner.handle_missing_values()
    cleaner.handle_outliers()
    
    output = io.StringIO()
    cleaner.df.to_csv(output, index=False)
    
    from fastapi.responses import StreamingResponse
    return StreamingResponse(
        io.BytesIO(output.getvalue().encode()),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=cleaned_dataset.csv"}
    )

@app.get("/config")
def get_config():
    with open("backend/app/metadata.json", "r") as f:
        return json.load(f)

@app.get("/health")
def health_check():
    return {"status": "alive", "engine": "DQRE v1.0"}
