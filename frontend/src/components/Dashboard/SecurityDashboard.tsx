import type React from "react";
import { useEffect, useState } from "react";
import {
  Activity,
  Boxes,
  Cpu,
  Clock3,
  Loader2,
} from "lucide-react";

import type { DashboardOverview } from "../../types";
import { apiService } from "../../services/api";
import { ErrorNotice } from "../UI/SecurityUI";

export const SecurityDashboard: React.FC = () => {
  const [overview, setOverview] = useState<DashboardOverview | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const data = await apiService.getDashboardOverview();
        setOverview(data);
      } catch (err) {
        console.error("Failed to fetch dashboard overview:", err);
        setError(
          "Failed to load dashboard data. Ensure backend is running on http://localhost:8000"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="security-panel loading-state" role="status">
        <Loader2
          size={30}
          className="loading-spinner"
          aria-hidden="true"
        />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorNotice message={error} />;
  }

  return (
    <div className="section-stack">
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-top">
            <p>System Status</p>

            <span className="metric-icon tone-green" aria-hidden="true">
              <Activity size={20} />
            </span>
          </div>

          <p className="metric-value">
            {overview?.status || "Unknown"}
          </p>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <p>Active Modules</p>

            <span className="metric-icon tone-cyan" aria-hidden="true">
              <Boxes size={20} />
            </span>
          </div>

          <p className="metric-value">
            {Object.values(overview?.modules || {}).length}
          </p>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <p>API Version</p>

            <span className="metric-icon tone-green" aria-hidden="true">
              <Cpu size={20} />
            </span>
          </div>

          <p className="metric-value">
            {overview?.api_version || "N/A"}
          </p>
        </div>

        <div className="metric-card">
          <div className="metric-top">
            <p>Last Scan</p>

            <span className="metric-icon tone-amber" aria-hidden="true">
              <Clock3 size={20} />
            </span>
          </div>

          <p className="metric-value metric-time">
            {overview?.last_scan
              ? new Date(overview.last_scan).toLocaleTimeString()
              : "N/A"}
          </p>
        </div>
      </div>

      {overview?.modules &&
        Object.keys(overview.modules).length > 0 && (
          <section className="security-panel">
            <h2 className="section-label">Module Status</h2>

            <div className="modules-grid">
              {Object.entries(overview.modules).map(
                ([module, status]) => (
                  <div key={module} className="module-card">
                    <span className="module-icon" aria-hidden="true">
                      <Boxes size={20} />
                    </span>

                    <div className="module-copy">
                      <p className="module-name">
                        {module.replace(/_/g, " ")}
                      </p>

                      <p className="module-status">
                        <span
                          className="status-dot"
                          aria-hidden="true"
                        />
                        {typeof status === "string"
                          ? status
                          : "Active"}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}
    </div>
  );
};