import pandas as pd
import numpy as np
from typing import Dict, Any, List
from .logger import logger

class DataProfiler:
    """
    Analyzes the dataset to infer feature types, cardinality, and basic stats.
    """
    def __init__(self, df: pd.DataFrame, target_col: str = None):
        self.df = df
        self.target_col = target_col
        self.profile = {}

    def profile_data(self) -> Dict[str, Any]:
        logger.info(f"Starting data profiling for {len(self.df)} rows")
        self.profile = {
            "num_rows": len(self.df),
            "num_cols": len(self.df.columns),
            "columns": self._analyze_columns(),
            "target": self._analyze_target() if self.target_col else None,
            "missing_stats": self.df.isnull().sum().to_dict(),
            "data_scale": "small" if len(self.df) < 1000 else "medium" if len(self.df) < 100000 else "large"
        }
        return self.profile

    def _analyze_columns(self) -> List[Dict[str, Any]]:
        cols = []
        for col in self.df.columns:
            if col == self.target_col:
                continue
            
            dtype = str(self.df[col].dtype)
            unique_count = self.df[col].nunique()
            cardinality = unique_count / len(self.df)
            
            # Simple inference
            if "int" in dtype or "float" in dtype:
                if unique_count < 20:
                    feat_type = "categorical"
                else:
                    feat_type = "numerical"
            elif "datetime" in dtype:
                feat_type = "temporal"
            else:
                feat_type = "categorical"

            cols.append({
                "name": col,
                "type": feat_type,
                "dtype": dtype,
                "unique_count": unique_count,
                "cardinality_ratio": cardinality,
                "is_sparse": (self.df[col] == 0).mean() > 0.5 or (self.df[col].isnull()).mean() > 0.5
            })
        return cols

    def _analyze_target(self) -> Dict[str, Any]:
        if self.target_col not in self.df.columns:
            return {"error": "Target column not found"}
        
        target_series = self.df[self.target_col]
        unique_count = target_series.nunique()
        dtype = str(target_series.dtype)
        
        if "int" in dtype or "object" in dtype or "bool" in dtype or unique_count < 10:
            task_type = "classification"
        else:
            task_type = "regression"
            
        return {
            "name": self.target_col,
            "task_type": task_type,
            "unique_classes": unique_count if task_type == "classification" else None,
            "class_imbalance": target_series.value_counts(normalize=True).to_dict() if task_type == "classification" else None
        }
