export const METRIC_EXPLANATIONS = {
    "Noise Level": {
        "definition": "Measures statistical chaos within features using normalized entropy and variance instability.",
        "why": "High noise levels can lead to model overfitting on random patterns rather than signal.",
        "threshold": "Optimal < 20%, Critical > 50%"
    },
    "Redundancy": {
        "definition": "Quantifies pairwise correlation overlap and matrix linear dependency.",
        "why": "Redundant features increase model complexity without adding predictive power, often causing multicollinearity.",
        "threshold": "Optimal < 10%, Critical > 30%"
    },
    "Label Trust": {
        "definition": "Validated via cross-validated confident learning and label-feature alignment.",
        "why": "Noisy labels create a 'garbage-in, garbage-out' scenario where the model learns incorrect mappings.",
        "threshold": "Optimal > 85%, Critical < 60%"
    },
    "Usefulness": {
        "definition": "Computed through Mutual Information (MI) scores between independent variables and the target.",
        "why": "Features with low usefulness provide no signal, potentially masking important relationships.",
        "threshold": "Optimal > 40%, Critical < 10%"
    }
};
