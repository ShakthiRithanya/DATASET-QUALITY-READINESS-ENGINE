import pandas as pd
import numpy as np
from sklearn.impute import SimpleImputer
from sklearn.ensemble import IsolationForest
from typing import List, Dict, Any

class CleaningEngine:
    """
    Adaptive cleaning strategies with decision justification.
    """
    def __init__(self, df: pd.DataFrame, profiler_results: dict):
        self.df = df.copy()
        self.original_df = df.copy()
        self.profiler_results = profiler_results
        self.audit_log = []
        self.stats = {}

    def get_stats_delta(self) -> dict:
        """
        Calculates mean/std/null count for before and after.
        """
        delta = {}
        for col in self.original_df.columns:
            if col not in self.df.columns: continue # Column was pruned
            
            if self.original_df[col].dtype in [np.float64, np.int64]:
                delta[col] = {
                    "before": {
                        "mean": float(self.original_df[col].mean()),
                        "std": float(self.original_df[col].std()),
                        "nulls": int(self.original_df[col].isnull().sum())
                    },
                    "after": {
                        "mean": float(self.df[col].mean()),
                        "std": float(self.df[col].std()),
                        "nulls": int(self.df[col].isnull().sum())
                    }
                }
        return delta

    def handle_missing_values(self) -> pd.DataFrame:
        """
        Decides between mean, median, or deletion based on distribution.
        """
        cols = self.df.columns
        for col in cols:
            missing_count = self.df[col].isnull().sum()
            if missing_count == 0:
                continue
                
            missing_pct = missing_count / len(self.df)
            
            if missing_pct > 0.4:
                # Too much missingness, prune
                self.df.drop(columns=[col], inplace=True)
                self.audit_log.append({
                    "column": col,
                    "action": "prune",
                    "reason": f"High missingness ({round(missing_pct*100, 1)}%)",
                    "confidence": 0.95
                })
            else:
                # Impute
                dtype = str(self.df[col].dtype)
                if "int" in dtype or "float" in dtype:
                    strategy = "median" if self.df[col].skew() > 1 else "mean"
                    imputer = SimpleImputer(strategy=strategy)
                    self.df[col] = imputer.fit_transform(self.df[[col]])
                    self.audit_log.append({
                        "column": col,
                        "action": f"impute_{strategy}",
                        "reason": f"Missingness at {round(missing_pct*100, 1)}%",
                        "confidence": 0.8
                    })
                else:
                    self.df[col] = self.df[col].fillna(self.df[col].mode()[0])
                    self.audit_log.append({
                        "column": col,
                        "action": "impute_mode",
                        "reason": "Categorical missing values",
                        "confidence": 0.7
                    })
        return self.df

    def handle_outliers(self, contamination=0.05) -> pd.DataFrame:
        """
        Uses Isolation Forest to detect and handle anomalies.
        """
        numeric_df = self.df.select_dtypes(include=[np.number])
        if numeric_df.empty:
            return self.df

        iso = IsolationForest(contamination=contamination, random_state=42)
        preds = iso.fit_predict(numeric_df.fillna(0))
        
        outliers_count = (preds == -1).sum()
        if outliers_count > 0:
            # We clip outliers rather than delete them to preserve data scale
            # Or we could drop them if the user prefers. Here we clip to 1.5*IQR
            for col in numeric_df.columns:
                Q1 = self.df[col].quantile(0.25)
                Q3 = self.df[col].quantile(0.75)
                IQR = Q3 - Q1
                lower = Q1 - 1.5 * IQR
                upper = Q3 + 1.5 * IQR
                self.df[col] = self.df[col].clip(lower, upper)
                
            self.audit_log.append({
                "column": "global",
                "action": "outlier_clipping",
                "reason": f"Detected {outliers_count} anomalous samples via Isolation Forest",
                "confidence": 0.85
            })
            
        return self.df
