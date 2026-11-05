import hashlib
import re
from typing import Dict, List

class PasswordValidator:
    """Evaluate password strength locally"""
    
    @staticmethod
    def assess_password(password: str) -> Dict:
        """
        Analyze password strength
        Returns: dict with score (0-100) and feedback
        """
        score = 0
        feedback = []
        
        # Length check
        if len(password) >= 8:
            score += 20
        else:
            feedback.append("Password should be at least 8 characters")
        
        if len(password) >= 12:
            score += 10
        
        # Uppercase check
        if re.search(r'[A-Z]', password):
            score += 20
        else:
            feedback.append("Add uppercase letters")
        
        # Lowercase check
        if re.search(r'[a-z]', password):
            score += 20
        else:
            feedback.append("Add lowercase letters")
        
        # Number check
        if re.search(r'[0-9]', password):
            score += 15
        else:
            feedback.append("Add numbers")
        
        # Special character check
        if re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            score += 15
        else:
            feedback.append("Add special characters")
        
        # Cap score at 100
        score = min(score, 100)
        
        # Determine strength level
        if score >= 80:
            strength = "Strong"
        elif score >= 60:
            strength = "Moderate"
        elif score >= 40:
            strength = "Weak"
        else:
            strength = "Very Weak"
        
        return {
            "score": score,
            "strength": strength,
            "feedback": feedback
        }


class FileIntegrityChecker:
    """Generate and compare file hashes"""
    
    @staticmethod
    def calculate_sha256(file_content: bytes) -> str:
        """Calculate SHA-256 hash of file content"""
        return hashlib.sha256(file_content).hexdigest()
    
    @staticmethod
    def verify_integrity(current_hash: str, original_hash: str) -> Dict:
        """Compare hashes and report integrity status"""
        match = current_hash == original_hash
        return {
            "match": match,
            "original_hash": original_hash,
            "current_hash": current_hash,
            "status": "Intact" if match else "Modified"
        }