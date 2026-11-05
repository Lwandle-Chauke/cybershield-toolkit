import type React from "react";
import { useState } from "react";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  ScrollText,
  ClipboardPaste,
  ShieldCheck,
  FileText,
  ScanLine,
} from "lucide-react";

import type { LogAnalysisResponse } from "../../types";
import { apiService } from "../../services/api";
import {
  EmptyState,
  ErrorNotice,
  FilePicker,
} from "../UI/SecurityUI";

export const LogAnalyzerComponent: React.FC = () => {
  const [logContent, setLogContent] = useState("");
  const [logType, setLogType] =
    useState<"ssh" | "windows_event">("ssh");
  const [result, setResult] = useState<LogAnalysisResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [mode, setMode] = useState<"paste" | "upload">("paste");
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!logContent.trim()) {
      setError("Please enter log content");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiService.analyzeLogs(
        logContent,
        logType
      );
      setResult(data);
    } catch (err) {
      console.error("Failed to analyze logs:", err);
      setError("Failed to analyze logs. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uploadFile) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiService.uploadAndAnalyzeLogs(
        uploadFile,
        logType
      );
      setResult(data);
    } catch (err) {
      console.error("Failed to upload and analyze:", err);
      setError(
        "Failed to analyze log file. Check backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const getThreatColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "threat-critical";
      case "high":
        return "threat-high";
      case "medium":
        return "threat-medium";
      case "low":
        return "threat-low";
      default:
        return "threat-info";
    }
  };

  return (
    <div className="section-stack">
      <section className="security-panel">
        <div className="tool-toolbar">
          <div
            className="segmented-tabs"
            role="group"
            aria-label="Log input mode"
          >
            <button
              type="button"
              className={`segment-button ${
                mode === "paste" ? "is-active" : ""
              }`}
              aria-pressed={mode === "paste"}
              onClick={() => {
                setMode("paste");
                setResult(null);
                setError(null);
              }}
            >
              <ClipboardPaste size={18} aria-hidden="true" />
              Paste Logs
            </button>

            <button
              type="button"
              className={`segment-button ${
                mode === "upload" ? "is-active" : ""
              }`}
              aria-pressed={mode === "upload"}
              onClick={() => {
                setMode("upload");
                setResult(null);
                setError(null);
              }}
            >
              <Upload size={18} aria-hidden="true" />
              Upload File
            </button>
          </div>

          <div className="log-type-control">
            <label
              htmlFor="log-type"
              className="visually-hidden"
            >
              Log Type
            </label>

            <select
              id="log-type"
              value={logType}
              onChange={(e) =>
                setLogType(
                  e.target.value as "ssh" | "windows_event"
                )
              }
              className="text-control"
            >
              <option value="ssh">
                SSH Authentication Logs
              </option>
              <option value="windows_event">
                Windows Event Logs
              </option>
            </select>
          </div>
        </div>

        {mode === "paste" && (
          <form onSubmit={handleAnalyze} className="tool-form">
            <div className="field-group">
              <label
                htmlFor="log-content"
                className="visually-hidden"
              >
                Log Content
              </label>

              <textarea
                id="log-content"
                value={logContent}
                onChange={(e) => setLogContent(e.target.value)}
                placeholder="Paste your log entries here..."
                rows={10}
                className="text-control mono log-editor"
              />

              <p className="field-hint">
                Paste raw log entries (syslog or Windows Event
                format).
              </p>
            </div>

            {error && <ErrorNotice message={error} />}

            <button
              type="submit"
              disabled={loading || !logContent.trim()}
              className="primary-button"
            >
              <ScanLine size={18} aria-hidden="true" />
              {loading ? "Analyzing Logs..." : "Analyze Logs"}
            </button>
          </form>
        )}

        {mode === "upload" && (
          <form onSubmit={handleUpload} className="tool-form">
            <FilePicker
              id="log-file-input"
              accept=".log,.txt"
              icon={<Upload size={34} strokeWidth={1.8} />}
              title="Click to select a log file"
              description="Supported formats: .log, .txt"
              onChange={(e) => {
                setUploadFile(e.target.files?.[0] || null);
                setResult(null);
                setError(null);
              }}
            />

            {uploadFile && (
              <div className="selected-file">
                <span
                  className="selected-file-icon"
                  aria-hidden="true"
                >
                  <FileText size={22} />
                </span>

                <div>
                  <strong>{uploadFile.name}</strong>
                </div>
              </div>
            )}

            {error && <ErrorNotice message={error} />}

            <button
              type="submit"
              disabled={loading || !uploadFile}
              className="primary-button"
            >
              <ScanLine size={18} aria-hidden="true" />
              {loading ? "Analyzing..." : "Upload & Analyze"}
            </button>
          </form>
        )}
      </section>

      <section className="security-panel result-panel">
        <h2 className="section-label">Analysis Results</h2>

        {result ? (
          <div className="result-stack">
            <div className="analysis-metrics">
              <div className="result-metric">
                <span
                  className="metric-icon tone-cyan"
                  aria-hidden="true"
                >
                  <ScrollText size={19} />
                </span>

                <p className="detail-label">Events Parsed</p>
                <strong>{result.events_parsed}</strong>
              </div>

              <div className="result-metric">
                <span
                  className="metric-icon tone-red"
                  aria-hidden="true"
                >
                  <AlertCircle size={19} />
                </span>

                <p className="detail-label">Threats Detected</p>
                <strong className="danger-text">
                  {result.threats_detected}
                </strong>
              </div>

              <div className="result-metric">
                <span
                  className="metric-icon tone-green"
                  aria-hidden="true"
                >
                  <FileText size={19} />
                </span>

                <p className="detail-label">Log Type</p>
                <strong className="log-type-value">
                  {result.log_type.replace(/_/g, " ")}
                </strong>
              </div>
            </div>

            {result.threats.length > 0 ? (
              <div className="threat-list">
                <h3 className="result-subtitle danger-text">
                  Detected Threats
                </h3>

                {result.threats.map((threat, idx) => (
                  <div
                    key={idx}
                    className={`threat-card ${getThreatColor(
                      threat.severity
                    )}`}
                  >
                    <AlertCircle size={21} aria-hidden="true" />

                    <div className="threat-copy">
                      <h4>{threat.title}</h4>
                      <p>{threat.description}</p>

                      <div className="threat-meta">
                        <span>
                          <strong>Severity:</strong>{" "}
                          {threat.severity}
                        </span>

                        {threat.count && (
                          <span>
                            <strong>Count:</strong>{" "}
                            {threat.count}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="threat-card threat-low">
                <CheckCircle2 size={21} aria-hidden="true" />
                <p>No threats detected in analyzed logs.</p>
              </div>
            )}

            <div className="summary-card">
              <p className="detail-label">Summary</p>
              <p className="mono">{result.summary}</p>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={<ShieldCheck size={44} strokeWidth={1.6} />}
            message="Results will appear here after you run an analysis."
          />
        )}
      </section>
    </div>
  );
};