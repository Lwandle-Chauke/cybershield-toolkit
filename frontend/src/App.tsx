import type React from "react";
import { useState } from "react";
import {
  Shield,
  Menu,
  X,
  LayoutDashboard,
  ScrollText,
  FileCheck,
  KeyRound,
  ArrowUpRight,
} from "lucide-react";

import { SecurityDashboard } from "./components/Dashboard/SecurityDashboard";
import { LogAnalyzerComponent } from "./components/LogAnalyzer/LogAnalyzerComponent";
import { FileIntegrityChecker } from "./components/FileIntegrity/FileIntegrityChecker";
import { PasswordAssessment } from "./components/PasswordChecker/PasswordAssessment";
import { PageHeading } from "./components/UI/SecurityUI";

type Tab = "dashboard" | "logs" | "files" | "password";

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    {
      id: "dashboard" as const,
      label: "Overview",
      icon: LayoutDashboard,
      eyebrow: "Command Center",
      title: "Security Overview",
      description: "Real-time security monitoring and module status.",
    },
    {
      id: "logs" as const,
      label: "Log Analysis",
      icon: ScrollText,
      eyebrow: "Threat Detection",
      title: "Log Analysis",
      description:
        "Scan authentication logs for threats and suspicious activity.",
    },
    {
      id: "files" as const,
      label: "File Integrity",
      icon: FileCheck,
      eyebrow: "Tamper Detection",
      title: "File Integrity",
      description:
        "Fingerprint files with SHA-256 and confirm they haven’t changed.",
    },
    {
      id: "password" as const,
      label: "Password Check",
      icon: KeyRound,
      eyebrow: "Credential Hygiene",
      title: "Password Check",
      description:
        "Score a password’s strength and review security recommendations.",
    },
  ];

  const currentPage = tabs.find((item) => item.id === activeTab)!;
  const PageIcon = currentPage.icon;

  const quickActions = [
    {
      id: "logs" as const,
      title: "Log Analysis",
      description:
        "Detect threats and suspicious authentication activity.",
      icon: ScrollText,
    },
    {
      id: "files" as const,
      title: "File Integrity",
      description:
        "Hash files and verify they haven’t been tampered with.",
      icon: FileCheck,
    },
    {
      id: "password" as const,
      title: "Password Check",
      description:
        "Review password strength and actionable security feedback.",
      icon: KeyRound,
    },
  ];

  return (
    <div className="security-app">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand">
            <span className="brand-icon" aria-hidden="true">
              <Shield size={25} strokeWidth={1.8} />
            </span>

            <div>
              <span className="brand-name">CyberShield</span>
              <span className="brand-caption">SecOps Console</span>
            </div>
          </div>

          <nav className="desktop-nav" aria-label="Main navigation">
            {tabs.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`nav-button ${
                    activeTab === item.id ? "is-active" : ""
                  }`}
                  aria-current={
                    activeTab === item.id ? "page" : undefined
                  }
                >
                  <Icon size={17} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button
            type="button"
            className="menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={
              mobileMenuOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {tabs.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`nav-button ${
                    activeTab === item.id ? "is-active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  aria-current={
                    activeTab === item.id ? "page" : undefined
                  }
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </header>

      <main className="site-main">
        <PageHeading
          icon={<PageIcon size={27} strokeWidth={1.8} />}
          eyebrow={currentPage.eyebrow}
          title={currentPage.title}
          description={currentPage.description}
        />

        {activeTab === "dashboard" && (
          <div className="section-stack">
            <SecurityDashboard />

            <section className="security-panel">
              <h2 className="section-label">Quick Actions</h2>

              <div className="quick-actions">
                {quickActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={action.id}
                      type="button"
                      className="quick-action"
                      onClick={() => setActiveTab(action.id)}
                    >
                      <span className="action-icon" aria-hidden="true">
                        <Icon size={23} strokeWidth={1.8} />
                      </span>

                      <span className="action-copy">
                        <strong>{action.title}</strong>
                        <span>{action.description}</span>
                      </span>

                      <ArrowUpRight
                        size={19}
                        className="action-arrow"
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {activeTab === "logs" && <LogAnalyzerComponent />}
        {activeTab === "files" && <FileIntegrityChecker />}
        {activeTab === "password" && <PasswordAssessment />}
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <Shield size={15} aria-hidden="true" />
          <span>Security Analysis Toolkit</span>
        </div>

      
      </footer>
    </div>
  );
};