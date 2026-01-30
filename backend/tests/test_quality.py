import pandas as pd
import numpy as np
from app.quality import QualityEngine

def test_quality_noise():
    df = pd.DataFrame({
        "var": [1, 1.1, 1, 1.2, 1, 1.1],
        "noise": np.random.rand(6)
    })
    profiler_results = {"target": None}
    engine = QualityEngine(df, profiler_results)
    report = engine.summarize_quality()
    
    assert "dqi" in report
    assert 0 <= report["dqi"] <= 1
