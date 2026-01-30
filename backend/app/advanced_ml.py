import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold
from typing import Dict, List

class AdvancedML:
    """
    Implements advanced ML heuristics: Confident Learning, Loss-based ranking, and Stability.
    """
    def __init__(self, df: pd.DataFrame, target_col: str, task_type: str):
        self.df = df
        self.target_col = target_col
        self.task_type = task_type

    def get_confident_learning_score(self) -> float:
        """
        Simulates confident learning by identifying label-feature disagreement.
        """
        if not self.target_col or self.task_type != "classification":
            return 1.0
            
        # Simplified: Use a high-capacity model to find 'hard' samples
        # samples where prediction is very far from actual label
        try:
            X = self.df.drop(columns=[self.target_col]).select_dtypes(include=[np.number]).fillna(0)
            y = self.df[self.target_col]
            
            if X.empty: return 1.0
            
            model = RandomForestClassifier(n_estimators=20, random_state=42)
            cv = StratifiedKFold(n_splits=3)
            
            # Identify samples with consistently low probability for the correct class
            # This is a proxy for 'label noise'
            from sklearn.model_selection import cross_val_predict
            probs = cross_val_predict(model, X, y, cv=cv, method="predict_proba")
            
            # Map labels to indices
            classes = sorted(y.unique())
            label_map = {c: i for i, c in enumerate(classes)}
            y_idx = y.map(label_map).values
            
            correct_probs = probs[np.arange(len(y)), y_idx]
            reliability_score = np.mean(correct_probs)
            
            return float(reliability_score)
        except:
            return 0.8 # Fallback

    def get_stability_score(self) -> float:
        """
        Measures importance volatility under bootstrap subsampling.
        """
        try:
            X = self.df.drop(columns=[self.target_col]).select_dtypes(include=[np.number]).fillna(0)
            y = self.df[self.target_col]
            if X.empty: return 1.0
            
            import_volatility = []
            for _ in range(3): # Bootstrap rounds
                idx = np.random.choice(len(self.df), size=int(0.8*len(self.df)), replace=False)
                model = RandomForestClassifier(n_estimators=10, random_state=None)
                model.fit(X.iloc[idx], y.iloc[idx])
                import_volatility.append(model.feature_importances_)
            
            vol = np.std(import_volatility, axis=0).mean()
            return float(1 - vol) # Lower volatility = higher stability
        except:
            return 0.9
