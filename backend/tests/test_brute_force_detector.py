from app.detectors.threat_detector import BruteForceDetector

def test_detect_brute_force():
    events = [
        {"status": "FAILED", "username": "admin", "source_ip": "192.168.1.100"},
        {"status": "FAILED", "username": "admin", "source_ip": "192.168.1.100"},
        {"status": "FAILED", "username": "admin", "source_ip": "192.168.1.100"},
        {"status": "FAILED", "username": "admin", "source_ip": "192.168.1.100"},
        {"status": "FAILED", "username": "admin", "source_ip": "192.168.1.100"},
        {"status": "FAILED", "username": "admin", "source_ip": "192.168.1.100"},
    ]
    
    threats = BruteForceDetector.detect(events)
    
    assert len(threats) > 0
    assert "Brute Force" in threats[0].title
    assert threats[0].count == 6

def test_no_brute_force():
    events = [
        {"status": "FAILED", "username": "admin", "source_ip": "192.168.1.100"},
        {"status": "SUCCESS", "username": "ubuntu", "source_ip": "192.168.1.50"},
    ]
    
    threats = BruteForceDetector.detect(events)
    
    assert len(threats) == 0