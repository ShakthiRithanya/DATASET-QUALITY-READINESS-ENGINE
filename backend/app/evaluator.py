import pandas as pd
import numpy as np
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

class ImpactEvaluator:
    """
    Measures the performance delta of a dataset after transformations.
    """
    def __init__(self, original_df: pd.DataFrame, cleaned_df: pd.DataFrame, target_col: str, task_type: str):
        self.original_df = original_df
        self.cleaned_df = cleaned_df
        self.target_col = target_col
        self.task_type = task_type

    def evaluate_delta(self) -> dict:
        if not self.target_col or self.target_col not in self.original_df.columns:
            return {"error": "Target column missing for evaluation"}

        orig_score = self._train_proxy(self.original_df)
        clean_score = self._train_proxy(self.cleaned_df)
        
        delta = clean_score - orig_score
        
        return {
            "original_score": round(orig_score, 4),
            "cleaned_score": round(clean_score, 4),
            "delta": round(delta, 4),
            "improvement_detected": delta > 0,
            "risk_of_overcleaning": delta < -0.05
        }

    def _train_proxy(self, df: pd.DataFrame) -> float:
        # Mini-pipeline for proxy training
        tdf = df.copy()
        
        # Drop rows with NaN target
        tdf = tdf.dropna(subset=[self.target_col])
        if len(tdf) < 10:
            return 0.0
            
        y = tdf[self.target_col]
        X = tdf.drop(columns=[self.target_col])
        
        # Simple encoding for X
        for col in X.columns:
            if X[col].dtype == 'object':
                X[col] = LabelEncoder().fit_transform(X[col].astype(str))
            X[col] = X[col].fillna(0)
            
        if self.task_type == "classification":
            model = RandomForestClassifier(n_estimators=50, max_depth=5, random_state=42)
            scoring = "accuracy"
            # Encode y if needed
            if y.dtype == 'object':
                y = LabelEncoder().fit_transform(y.astype(str))
        else:
            model = RandomForestRegressor(n_estimators=50, max_depth=5, random_state=42)
            scoring = "neg_mean_squared_error"
            
        try:
            scores = cross_val_score(model, X, y, cv=3, scoring=scoring)
            return float(np.mean(scores))
        except:
            return 0.0
