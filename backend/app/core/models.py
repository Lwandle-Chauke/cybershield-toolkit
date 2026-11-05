from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import datetime

class AnalysisResult(BaseModel):
    """Base model for analysis results"""
    model_config = ConfigDict(json_encoders={datetime: lambda v: v.isoformat()})
    
    timestamp: datetime
    severity: str  # "Critical", "High", "Medium", "Low", "Info"
    title: str
    description: str
    count: Optional[int] = None

class LogAnalysisRequest(BaseModel):
    """Request model for log analysis"""
    log_content: str
    log_type: str  # "ssh", "windows_event", "syslog", "custom"

class FileIntegrityRequest(BaseModel):
    """Request model for file integrity checking"""
    file_name: str
    original_hash: str
    current_hash: str

class PasswordAssessmentRequest(BaseModel):
    """Request model for password assessment"""
    password: str

class ThreatDetectionResult(BaseModel):
    """Response model for threat detection"""
    threats_found: int
    results: List[AnalysisResult]
    summary: str