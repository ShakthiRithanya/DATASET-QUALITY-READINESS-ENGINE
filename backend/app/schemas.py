from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class AnalysisResponse(BaseModel):
    profile: Dict[str, Any]
    quality: Dict[str, Any]
    audit_log: List[Dict[str, Any]]
    impact: Optional[Dict[str, Any]]
    certificate: Dict[str, Any]
    issue_map: List[Dict[str, Any]]
    pipeline_code: str
    dqi: float
    status: str
