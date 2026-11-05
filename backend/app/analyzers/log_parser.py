from typing import List, Dict
from datetime import datetime
import re

class SSHLogAnalyzer:
    """Parse and analyze SSH authentication logs"""
    
    @staticmethod
    def parse_ssh_log(log_content: str) -> List[Dict]:
        """
        Parse SSH logs and extract authentication events
        Expected format: standard syslog format with sshd entries
        """
        events = []
        lines = log_content.strip().split('\n')
        
        for line in lines:
            if 'sshd' in line:
                event = SSHLogAnalyzer._parse_line(line)
                if event:
                    events.append(event)
        
        return events
    
    @staticmethod
    def _parse_line(line: str) -> Dict:
        """Extract relevant information from SSH log line"""
        event = {
            "raw": line,
            "timestamp": None,
            "source_ip": None,
            "username": None,
            "event_type": None,
            "status": None
        }
        
        # Extract timestamp (basic pattern)
        time_match = re.search(r'(\w+ \d+ \d+:\d+:\d+)', line)
        if time_match:
            event["timestamp"] = time_match.group(1)
        
        # Extract source IP
        ip_match = re.search(r'(\d+\.\d+\.\d+\.\d+)', line)
        if ip_match:
            event["source_ip"] = ip_match.group(1)
        
        # Extract username
        user_match = re.search(r'user[=\s]+(\w+)', line, re.IGNORECASE)
        if user_match:
            event["username"] = user_match.group(1)
        
        # Detect event type
        if 'Failed password' in line or 'Invalid user' in line:
            event["event_type"] = "Failed Authentication"
            event["status"] = "FAILED"
        elif 'Accepted' in line:
            event["event_type"] = "Successful Authentication"
            event["status"] = "SUCCESS"
        elif 'Disconnected' in line:
            event["event_type"] = "Session Terminated"
            event["status"] = "DISCONNECTED"
        else:
            event["event_type"] = "Other"
            event["status"] = "OTHER"
        
        return event


class WindowsEventLogAnalyzer:
    """Parse and analyze Windows Event logs"""
    
    @staticmethod
    def parse_windows_log(log_content: str) -> List[Dict]:
        """
        Parse Windows Event logs
        Expected format: standard Windows Event Log export
        """
        events = []
        
        # Split by event entries
        entries = re.split(r'Event$$\d+$$', log_content)
        
        for entry in entries[1:]:  # Skip header
            event = WindowsEventLogAnalyzer._parse_entry(entry)
            if event:
                events.append(event)
        
        return events
    
    @staticmethod
    def _parse_entry(entry: str) -> Dict:
        """Extract event information"""
        event = {
            "raw": entry,
            "event_id": None,
            "source": None,
            "timestamp": None,
            "type": None
        }
        
        # Extract Event ID
        event_id_match = re.search(r'EventID[>:]?\s*(\d+)', entry)
        if event_id_match:
            event["event_id"] = event_id_match.group(1)
        
        # Extract Source
        source_match = re.search(r'Source[>:]?\s*(\w+)', entry)
        if source_match:
            event["source"] = source_match.group(1)
        
        # Classify by Event ID (simplified)
        if event["event_id"] == "4625":
            event["type"] = "Failed Login"
        elif event["event_id"] == "4624":
            event["type"] = "Successful Login"
        
        return event