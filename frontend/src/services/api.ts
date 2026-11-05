import type {
  LogAnalysisResponse,
  PasswordAssessmentResponse,
  FileHashResponse,
  FileVerificationResponse,
  DashboardOverview,
} from "../types";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiService = {
  // Password endpoints
  assessPassword: async (password: string): Promise<PasswordAssessmentResponse> => {
    const response = await api.post("/api/v1/password/assess", {
      password,
    });
    return response.data;
  },

  // File endpoints
  calculateFileHash: async (file: File): Promise<FileHashResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/v1/files/hash", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  verifyFileIntegrity: async (
    file: File,
    originalHash: string
  ): Promise<FileVerificationResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(
      `/api/v1/files/verify?original_hash=${originalHash}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  // Log endpoints
  analyzeLogs: async (
    logContent: string,
    logType: string
  ): Promise<LogAnalysisResponse> => {
    const response = await api.post("/api/v1/logs/analyze", {
      log_content: logContent,
      log_type: logType,
    });
    return response.data;
  },

  uploadAndAnalyzeLogs: async (
    file: File,
    logType: string
  ): Promise<LogAnalysisResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(
      `/api/v1/logs/upload-and-analyze?log_type=${logType}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },

  // Dashboard endpoints
  getDashboardOverview: async (): Promise<DashboardOverview> => {
    const response = await api.get("/api/v1/dashboard/overview");
    return response.data;
  },
};