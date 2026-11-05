import type React from "react";
import { useState } from "react";
import {
  Upload,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Hash,
  ShieldCheck,
  FileCheck,
  FileText,
} from "lucide-react";

import type {
  FileHashResponse,
  FileVerificationResponse,
} from "../../types";
import { apiService } from "../../services/api";
import {
  EmptyState,
  ErrorNotice,
  FilePicker,
} from "../UI/SecurityUI";

export const FileIntegrityChecker: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [hashResult, setHashResult] = useState<FileHashResponse | null>(
    null
  );
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] =
    useState<FileVerificationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"calculate" | "verify">("calculate");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCalculateHash = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiService.calculateFileHash(file);
      setHashResult(data);
    } catch (err) {
      console.error("Failed to calculate hash:", err);
      setError(
        "Failed to calculate hash. Check backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyIntegrity = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file");
      return;
    }

    if (!verifyHash.trim()) {
      setError("Please enter the original hash");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiService.verifyFileIntegrity(
        file,
        verifyHash
      );
      setVerifyResult(data);
    } catch (err) {
      console.error("Failed to verify file:", err);
      setError("Failed to verify file. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";

    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      Math.round((bytes / Math.pow(k, i)) * 100) / 100 +
      " " +
      sizes[i]
    );
  };

  return (
    <div className="section-stack">
      <section className="security-panel">
        <div
          className="segmented-tabs"
          role="group"
          aria-label="File integrity mode"
        >
          <button
            type="button"
            className={`segment-button ${
              tab === "calculate" ? "is-active" : ""
            }`}
            aria-pressed={tab === "calculate"}
            onClick={() => {
              setTab("calculate");
              setVerifyResult(null);
              setError(null);
            }}
          >
            <Hash size={18} aria-hidden="true" />
            Calculate Hash
          </button>

          <button
            type="button"
            className={`segment-button ${
              tab === "verify" ? "is-active" : ""
            }`}
            aria-pressed={tab === "verify"}
            onClick={() => {
              setTab("verify");
              setHashResult(null);
              setError(null);
            }}
          >
            <ShieldCheck size={18} aria-hidden="true" />
            Verify Integrity
          </button>
        </div>

        {tab === "calculate" && (
          <form
            onSubmit={handleCalculateHash}
            className="tool-form"
          >
            <FilePicker
              id="file-input-hash"
              icon={<Upload size={34} strokeWidth={1.8} />}
              title="Click to browse for a file"
              description="Any file type supported"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setHashResult(null);
                setError(null);
              }}
            />

            {file && (
              <div className="selected-file">
                <span
                  className="selected-file-icon"
                  aria-hidden="true"
                >
                  <FileText size={22} />
                </span>

                <div>
                  <strong>{file.name}</strong>
                  <span>{formatFileSize(file.size)}</span>
                </div>
              </div>
            )}

            {error && <ErrorNotice message={error} />}

            <button
              type="submit"
              disabled={loading || !file}
              className="primary-button"
            >
              <Hash size={18} aria-hidden="true" />
              {loading
                ? "Calculating SHA-256..."
                : "Calculate Hash"}
            </button>
          </form>
        )}

        {tab === "verify" && (
          <form
            onSubmit={handleVerifyIntegrity}
            className="tool-form"
          >
            <FilePicker
              id="file-input-verify"
              icon={<Upload size={34} strokeWidth={1.8} />}
              title="Click to select a file to verify"
              description="Compare your file against its original SHA-256 hash"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setVerifyResult(null);
                setError(null);
              }}
            />

            {file && (
              <div className="selected-file">
                <span
                  className="selected-file-icon"
                  aria-hidden="true"
                >
                  <FileText size={22} />
                </span>

                <div>
                  <strong>{file.name}</strong>
                </div>
              </div>
            )}

            <div className="field-group">
              <label htmlFor="original-hash">
                Original SHA-256 Hash
              </label>

              <textarea
                id="original-hash"
                value={verifyHash}
                onChange={(e) => setVerifyHash(e.target.value)}
                placeholder="Paste the original SHA-256 hash here..."
                rows={3}
                className="text-control mono"
              />
            </div>

            {error && <ErrorNotice message={error} />}

            <button
              type="submit"
              disabled={
                loading || !file || !verifyHash.trim()
              }
              className="primary-button"
            >
              <ShieldCheck size={18} aria-hidden="true" />
              {loading ? "Verifying..." : "Verify Integrity"}
            </button>
          </form>
        )}
      </section>

      <section className="security-panel result-panel">
        <h2 className="section-label">Result</h2>

        {tab === "calculate" &&
          (hashResult ? (
            <div className="result-stack">
              <div className="result-heading">
                <span className="action-icon" aria-hidden="true">
                  <Hash size={23} />
                </span>

                <h3>SHA-256 Hash Result</h3>
              </div>

              <div className="result-details">
                <div>
                  <p className="detail-label">Filename</p>
                  <p className="detail-value mono">
                    {hashResult.filename}
                  </p>
                </div>

                <div>
                  <p className="detail-label">File Size</p>
                  <p className="detail-value">
                    {formatFileSize(hashResult.size_bytes)}
                  </p>
                </div>
              </div>

              <div>
                <p className="detail-label">SHA-256 Hash</p>

                <div className="hash-row">
                  <code className="hash-code">
                    {hashResult.hash}
                  </code>

                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(hashResult.hash)
                    }
                    className="icon-button"
                    aria-label={
                      copied ? "Hash copied" : "Copy hash"
                    }
                    title={copied ? "Copied" : "Copy hash"}
                  >
                    {copied ? (
                      <Check size={20} />
                    ) : (
                      <Copy size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={<Hash size={42} strokeWidth={1.6} />}
              message="Your file’s SHA-256 hash will appear here."
            />
          ))}

        {tab === "verify" &&
          (verifyResult ? (
            <div className="result-stack">
              <div
                className={`verification-banner ${
                  verifyResult.verification.match
                    ? "verification-success"
                    : "verification-error"
                }`}
              >
                {verifyResult.verification.match ? (
                  <CheckCircle2 size={27} aria-hidden="true" />
                ) : (
                  <AlertCircle size={27} aria-hidden="true" />
                )}

                <h3>
                  {verifyResult.verification.match
                    ? "File Integrity Verified"
                    : "File Has Been Modified"}
                </h3>
              </div>

              <div>
                <p className="detail-label">Filename</p>
                <p className="detail-value">
                  {verifyResult.filename}
                </p>
              </div>

              <div>
                <p className="detail-label">Original Hash</p>
                <code className="hash-code">
                  {verifyResult.verification.original_hash}
                </code>
              </div>

              <div>
                <p className="detail-label">Current Hash</p>
                <code className="hash-code">
                  {verifyResult.verification.current_hash}
                </code>
              </div>
            </div>
          ) : (
            <EmptyState
              icon={<FileCheck size={42} strokeWidth={1.6} />}
              message="Your file verification result will appear here."
            />
          ))}
      </section>
    </div>
  );
};