import type React from "react";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ScanLine,
} from "lucide-react";

import type { PasswordAssessmentResponse } from "../../types";
import { apiService } from "../../services/api";
import { EmptyState, ErrorNotice } from "../UI/SecurityUI";

export const PasswordAssessment: React.FC = () => {
  const [password, setPassword] = useState("");
  const [result, setResult] =
    useState<PasswordAssessmentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAssess = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiService.assessPassword(password);
      setResult(data);
    } catch (err) {
      console.error("Failed to assess password:", err);
      setError(
        "Failed to assess password. Check backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "Strong":
        return "text-[#10b981]";
      case "Moderate":
        return "text-[#f59e0b]";
      case "Weak":
        return "text-[#ef7444]";
      case "Very Weak":
        return "text-[#ef4444]";
      default:
        return "text-gray-400";
    }
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) {
      return "bg-gradient-to-r from-[#10b981] to-[#059669]";
    }

    if (score >= 60) {
      return "bg-gradient-to-r from-[#f59e0b] to-[#d97706]";
    }

    if (score >= 40) {
      return "bg-gradient-to-r from-[#ef7444] to-[#d84315]";
    }

    return "bg-gradient-to-r from-[#ef4444] to-[#dc2626]";
  };

  return (
    <div className="section-stack">
      <section className="security-panel">
        <form onSubmit={handleAssess} className="tool-form">
          <div className="field-group">
            <label htmlFor="assessment-password">
              Password
            </label>

            <div className="password-control">
              <input
                id="assessment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" &&
                  handleAssess(
                    e as unknown as React.FormEvent
                  )
                }
                placeholder="Type a password..."
                className="text-control"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {error && <ErrorNotice message={error} />}

          <button
            type="submit"
            disabled={loading || !password}
            className="primary-button"
          >
            <ScanLine size={18} aria-hidden="true" />
            {loading ? "Analyzing..." : "Assess Password"}
          </button>

          <p className="form-note">
            <KeyRound size={16} aria-hidden="true" />
            <span>
              Evaluate password strength and review security
              feedback.
            </span>
          </p>
        </form>
      </section>

      <section className="security-panel result-panel">
        <h2 className="section-label">Assessment</h2>

        {result ? (
          <div className="result-stack">
            <div>
              <div className="score-heading">
                <span>Strength Score</span>

                <strong
                  className={getStrengthColor(
                    result.assessment.strength
                  )}
                >
                  {result.assessment.score}
                  <span>/100</span>
                </strong>
              </div>

              <div className="score-track">
                <div
                  className={`score-fill ${getScoreBarColor(
                    result.assessment.score
                  )}`}
                  style={{
                    width: `${result.assessment.score}%`,
                  }}
                />
              </div>
            </div>

            <div className="password-metrics">
              <div className="result-metric">
                <p className="detail-label">Strength Level</p>
                <strong
                  className={getStrengthColor(
                    result.assessment.strength
                  )}
                >
                  {result.assessment.strength}
                </strong>
              </div>

              <div className="result-metric">
                <p className="detail-label">
                  Character Length
                </p>
                <strong>{password.length}</strong>
              </div>
            </div>

            {result.assessment.feedback &&
            result.assessment.feedback.length > 0 ? (
              <div>
                <h3 className="result-subtitle">
                  Recommendations for Improvement
                </h3>

                <ul className="recommendation-list">
                  {result.assessment.feedback.map(
                    (feedback, idx) => (
                      <li key={idx}>
                        <span
                          className="recommendation-icon"
                          aria-hidden="true"
                        >
                          <AlertCircle size={18} />
                        </span>

                        <span>{feedback}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ) : (
              <div className="threat-card threat-low">
                <CheckCircle2 size={21} aria-hidden="true" />
                <p>
                  Excellent password! No recommendations needed.
                </p>
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            icon={<KeyRound size={44} strokeWidth={1.6} />}
            message="Your score and recommendations will show up here."
          />
        )}
      </section>
    </div>
  );
};