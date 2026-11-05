from typing import List, Dict
from collections import defaultdict
from app.core.models import AnalysisResult
from datetime import datetime

class BruteForceDetector:
    """Detect brute force attacks (repeated failed logins)"""
    
    FAILED_LOGIN_THRESHOLD = 5  # Flag after 5 failed attempts
    
    @staticmethod
    def detect(events: List[Dict]) -> List[AnalysisResult]:
        """
        Analyze events for brute force patterns
        Returns list of threat findings
        """
        threats = []
        failed_attempts = defaultdict(int)
        failed_sources = defaultdict(list)
        
        for event in events:
            # Check for failed authentication
            if event.get("status") == "FAILED":
                # Track by username
                username = event.get("username", "unknown")
                failed_attempts[username] += 1
                failed_sources[username].append(event.get("source_ip", "unknown"))
        
        # Flag suspicious activity
        for username, count in failed_attempts.items():
            if count >= BruteForceDetector.FAILED_LOGIN_THRESHOLD:
                unique_sources = set(failed_sources[username])
                threat = AnalysisResult(
                    timestamp=datetime.now(),
                    severity="High" if count >= 10 else "Medium",
                    title=f"Possible Brute Force Attack on {username}",
                    description=f"Detected {count} failed login attempts for user '{username}' from {len(unique_sources)} unique source(s): {', '.join(unique_sources)}",
                    count=count
                )
                threats.append(threat)
        
        return threats


class SuspiciousActivityDetector:
    """Detect other suspicious patterns"""
    
    @staticmethod
    def detect(events: List[Dict]) -> List[AnalysisResult]:
        """
        Detect unusual patterns in events
        """
        threats = []
        
        # Detect rapid disconnects
        disconnect_count = sum(1 for e in events if e.get("status") == "DISCONNECTED")
        if disconnect_count >= 10:
            threat = AnalysisResult(
                timestamp=datetime.now(),
                severity="Low",
                title="Multiple Rapid Disconnections Detected",
                description=f"Detected {disconnect_count} session disconnections. May indicate network instability or scanning activity.",
                count=disconnect_count
            )
            threats.append(threat)
        
        return threats