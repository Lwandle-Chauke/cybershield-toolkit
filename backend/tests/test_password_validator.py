from app.core.security import PasswordValidator

def test_strong_password():
    result = PasswordValidator.assess_password("MyP@ssw0rd123!")
    assert result["strength"] == "Strong"
    assert result["score"] >= 80

def test_weak_password():
    result = PasswordValidator.assess_password("weak")
    assert result["strength"] == "Very Weak"
    assert len(result["feedback"]) > 0

def test_moderate_password():
    result = PasswordValidator.assess_password("Password123")
    assert result["strength"] in ["Moderate", "Strong"]

def test_password_feedback():
    result = PasswordValidator.assess_password("short")
    assert any("at least 8 characters" in fb for fb in result["feedback"])