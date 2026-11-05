from app.analyzers.log_parser import SSHLogAnalyzer

def test_parse_failed_login():
    log_line = "Nov  3 10:15:22 server sshd[1234]: Failed password for invalid user admin from 192.168.1.100 port 54321 ssh2"
    events = SSHLogAnalyzer.parse_ssh_log(log_line)
    
    assert len(events) == 1
    assert events[0]["status"] == "FAILED"
    assert events[0]["source_ip"] == "192.168.1.100"

def test_parse_successful_login():
    log_line = "Nov  3 10:15:22 server sshd[1234]: Accepted password for user ubuntu from 192.168.1.50 port 54321 ssh2"
    events = SSHLogAnalyzer.parse_ssh_log(log_line)
    
    assert len(events) == 1
    assert events[0]["status"] == "SUCCESS"

def test_multiple_events():
    log_content = """
    Nov  3 10:15:22 server sshd[1234]: Failed password for user admin from 192.168.1.100 port 54321 ssh2
    Nov  3 10:15:23 server sshd[1235]: Failed password for user admin from 192.168.1.100 port 54322 ssh2
    Nov  3 10:15:24 server sshd[1236]: Accepted password for user ubuntu from 192.168.1.50 port 54321 ssh2
    """
    events = SSHLogAnalyzer.parse_ssh_log(log_content)
    
    assert len(events) == 3
    assert sum(1 for e in events if e["status"] == "FAILED") == 2
    assert sum(1 for e in events if e["status"] == "SUCCESS") == 1