import pandas as pd
from app.profiler import DataProfiler

def test_profiler_basic():
    df = pd.DataFrame({
        "age": [25, 30, 35, 40],
        "city": ["NY", "LA", "NY", "CHI"],
        "target": [0, 1, 0, 1]
    })
    profiler = DataProfiler(df, target_col="target")
    profile = profiler.profile_data()
    
    assert profile["num_rows"] == 4
    assert profile["num_cols"] == 3
    assert profile["target"]["task_type"] == "classification"
