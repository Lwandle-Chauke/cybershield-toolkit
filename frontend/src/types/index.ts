export interface AnalysisResult {
  timestamp: string;
  severity: "Critical" | "High" | "Medium" | "Low" | "Info";
  title: string;
  description: string;
  count?: number;
}

export interface LogAnalysisResponse {
  log_type: string;
  events_parsed: number;
  threats_detected: number;
  threats: AnalysisResult[];
  summary: string;
  timestamp: string;
}

export interface PasswordAssessmentResponse {
  assessment: {
    score: number;
    strength: "Strong" | "Moderate" | "Weak" | "Very Weak";
    feedback: string[];
  };
  timestamp: string;
}

export interface FileHashResponse {
  filename: string;
  size_bytes: number;
  hash_algorithm: string;
  hash: string;
  timestamp: string;
}

export interface FileVerificationResponse {
  filename: string;
  verification: {
    match: boolean;
    original_hash: string;
    current_hash: string;
    status: "Intact" | "Modified";
  };
  timestamp: string;
}

export interface DashboardOverview {
  status: string;
  modules: Record<string, string>;
  last_scan: string;
  api_version: string;
}