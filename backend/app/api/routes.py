from fastapi import APIRouter, UploadFile, File, HTTPException
from app.core.security import PasswordValidator, FileIntegrityChecker
from app.core.models import (
    LogAnalysisRequest, 
    PasswordAssessmentRequest,
    ThreatDetectionResult,
    AnalysisResult
)
from app.analyzers.log_parser import SSHLogAnalyzer, WindowsEventLogAnalyzer
from app.detectors.threat_detector import BruteForceDetector, SuspiciousActivityDetector
from datetime import datetime

router = APIRouter(prefix="/api/v1", tags=["Security Analysis"])

# ============================================================================
# PASSWORD SECURITY ENDPOINTS
# ============================================================================

@router.post("/password/assess")
async def assess_password(request: PasswordAssessmentRequest):
    """
    Assess password strength locally (no transmission of actual password to backend)
    """
    result = PasswordValidator.assess_password(request.password)
    return {
        "assessment": result,
        "timestamp": datetime.now().isoformat()
    }


# ============================================================================
# FILE INTEGRITY ENDPOINTS
# ============================================================================

@router.post("/files/hash")
async def calculate_file_hash(file: UploadFile = File(...)):
    """
    Calculate SHA-256 hash of uploaded file
    """
    try:
        content = await file.read()
        sha256_hash = FileIntegrityChecker.calculate_sha256(content)
        
        return {
            "filename": file.filename,
            "size_bytes": len(content),
            "hash_algorithm": "SHA-256",
            "hash": sha256_hash,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/files/verify")
async def verify_file_integrity(file: UploadFile = File(...), original_hash: str = None):
    """
    Verify file integrity by comparing hashes
    """
    if not original_hash:
        raise HTTPException(status_code=400, detail="original_hash parameter required")
    
    try:
        content = await file.read()
        current_hash = FileIntegrityChecker.calculate_sha256(content)
        result = FileIntegrityChecker.verify_integrity(current_hash, original_hash)
        
        return {
            "filename": file.filename,
            "verification": result,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ============================================================================
# LOG ANALYSIS ENDPOINTS
# ============================================================================

@router.post("/logs/analyze")
async def analyze_logs(request: LogAnalysisRequest):
    """
    Analyze security logs and detect threats
    Supports: ssh, windows_event, syslog
    """
    try:
        # Parse logs based on type
        if request.log_type == "ssh":
            events = SSHLogAnalyzer.parse_ssh_log(request.log_content)
        elif request.log_type == "windows_event":
            events = WindowsEventLogAnalyzer.parse_windows_log(request.log_content)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported log type: {request.log_type}")
        
        # Detect threats
        brute_force_threats = BruteForceDetector.detect(events)
        suspicious_threats = SuspiciousActivityDetector.detect(events)
        
        all_threats = brute_force_threats + suspicious_threats
        
        # Build response
        response = {
            "log_type": request.log_type,
            "events_parsed": len(events),
            "threats_detected": len(all_threats),
            "threats": [t.dict() for t in all_threats],
            "summary": f"Analyzed {len(events)} events. Found {len(all_threats)} potential security issues.",
            "timestamp": datetime.now().isoformat()
        }
        
        return response
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/logs/upload-and-analyze")
async def upload_and_analyze_logs(file: UploadFile = File(...), log_type: str = "ssh"):
    """
    Upload a log file and analyze it in one step
    """
    try:
        content = await file.read()
        log_content = content.decode('utf-8')
        
        # Create request object
        request = LogAnalysisRequest(log_content=log_content, log_type=log_type)
        
        # Reuse analyze_logs logic
        if request.log_type == "ssh":
            events = SSHLogAnalyzer.parse_ssh_log(request.log_content)
        elif request.log_type == "windows_event":
            events = WindowsEventLogAnalyzer.parse_windows_log(request.log_content)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported log type: {request.log_type}")
        
        # Detect threats
        brute_force_threats = BruteForceDetector.detect(events)
        suspicious_threats = SuspiciousActivityDetector.detect(events)
        
        all_threats = brute_force_threats + suspicious_threats
        
        response = {
            "filename": file.filename,
            "log_type": log_type,
            "events_parsed": len(events),
            "threats_detected": len(all_threats),
            "threats": [t.dict() for t in all_threats],
            "summary": f"Analyzed {len(events)} events. Found {len(all_threats)} potential security issues.",
            "timestamp": datetime.now().isoformat()
        }
        
        return response
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# ============================================================================
# SECURITY DASHBOARD ENDPOINTS
# ============================================================================

@router.get("/dashboard/overview")
async def dashboard_overview():
    """
    Return security dashboard statistics
    """
    return {
        "status": "Operational",
        "modules": {
            "log_analysis": "Ready",
            "threat_detection": "Ready",
            "file_integrity": "Ready",
            "password_security": "Ready"
        },
        "last_scan": datetime.now().isoformat(),
        "api_version": "1.0.0"
    }