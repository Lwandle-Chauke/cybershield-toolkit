# CyberShield Toolkit

![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Frontend-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Security](https://img.shields.io/badge/Domain-Cybersecurity-red?style=for-the-badge&logo=shieldsdotio&logoColor=white)
![Status](https://img.shields.io/badge/Status-MVP_Complete-success?style=for-the-badge)
![Developer](https://img.shields.io/badge/Developer-Lwandle_Chauke-8A2BE2?style=for-the-badge)

**CyberShield Toolkit** is a full-stack cybersecurity analysis and threat detection platform designed to make essential security assessment capabilities accessible through a centralised web interface.

The application combines a React and TypeScript frontend with a Python FastAPI backend to provide tools for security log analysis, suspicious activity detection, file integrity verification and password security assessment.

CyberShield is being developed as a modular security toolkit, with an architecture designed to accommodate additional detection capabilities, security analytics and more advanced threat monitoring functionality.

---

## Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Application Architecture](#-application-architecture)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Security Considerations](#-security-considerations)
- [Development Roadmap](#-development-roadmap)
- [Technical Skills Demonstrated](#-technical-skills-demonstrated)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## Overview

CyberShield Toolkit addresses several fundamental cybersecurity monitoring and assessment needs through a single application.

Rather than relying on separate utilities for password assessment, file hashing and log analysis, CyberShield brings these capabilities together in one interface.

The platform currently focuses on four primary security functions:

1. **Security Log Analysis:** Processing SSH and Windows Event log data to identify potentially suspicious activity.
2. **Threat Detection:** Identifying patterns associated with brute-force attacks and other suspicious authentication behaviour.
3. **File Integrity Monitoring:** Generating and verifying SHA-256 cryptographic hashes to identify file modifications.
4. **Password Security Assessment:** Evaluating password strength and providing actionable recommendations.

A centralised dashboard provides visibility into the application's system status and available security modules.

### Project Objectives

- Develop a modular cybersecurity analysis platform.
- Implement practical security analysis functionality using Python.
- Apply secure software development principles.
- Build RESTful APIs for communication between frontend and backend components.
- Demonstrate full-stack development and software architecture.
- Establish a foundation for more advanced security monitoring and threat detection capabilities.

## Key Features

### 1. Security Log Analysis

Analyses authentication-related log data to identify potentially suspicious events.

**Current capabilities:**
- SSH authentication log parsing.
- Windows Event log analysis support.
- Processing of pasted log content.
- Log file upload and analysis.
- Extraction of relevant authentication events.
- Structured analysis results.

**Purpose:** Help identify unusual authentication patterns and provide a foundation for security event investigation.

### 2. Threat Detection

Identifies potentially malicious activity through rule-based analysis of security events.

**Current capabilities:**
- Brute-force attack pattern detection.
- Identification of repeated authentication failures.
- Analysis of suspicious login activity.
- Detection based on configurable analysis logic.

**Purpose:** Demonstrate how security events can be transformed into actionable threat indicators.

### 3. File Integrity Verification

Provides file integrity checking through SHA-256 cryptographic hashing.

**Current capabilities:**
- Generate SHA-256 hashes for files.
- Verify file integrity against previously generated hashes.
- Identify changes through hash comparison.
- Support integrity verification workflows.

**Purpose:** Detect unexpected file modifications and demonstrate the application of cryptographic hashing in security monitoring.

### 4. Password Security Assessment

Evaluates password strength through local password analysis.

**Current capabilities:**
- Password strength assessment.
- Security-related validation.
- Identification of password weaknesses.
- Actionable password improvement recommendations.

**Privacy consideration:** Password assessment is performed locally in the frontend. Passwords are not transmitted to the backend for assessment.

### 5. Security Dashboard

Provides a centralised overview of the application's security modules.

**Current capabilities:**
- System health visibility.
- Security module readiness indicators.
- Centralised navigation.
- Application status monitoring.

### 6. Responsive User Interface

Designed to provide a consistent experience across different screen sizes.

**Interface characteristics:**
- React component-based architecture.
- Responsive two-column layout.
- Collapsible navigation sidebar.
- Mobile, tablet and desktop support.
- API-driven frontend functionality.

---

## Application Architecture

CyberShield follows a client-server architecture, separating the presentation layer from the backend security processing logic.

### High-Level Architecture

```text
                 CYBERSHIELD TOOLKIT
                         |
             +-----------+-----------+
             |                       |
        FRONTEND                  BACKEND
             |                       |
       React 18                 FastAPI
       TypeScript               Python
       Tailwind CSS             Pydantic
       Axios                    Uvicorn
       Vite                         |
             |                       |
             +------ REST API -------+
                         |
              +----------+----------+
              |          |          |
          Password    File       Log Analysis
          Assessment  Integrity  & Threat
                                  Detection
              |          |          |
              +----------+----------+
                         |
                 Structured Results
                         |
                 Security Dashboard
```

### Frontend Architecture

The frontend is responsible for:
- Rendering the application interface.
- Managing user interactions.
- Communicating with backend endpoints.
- Displaying security analysis results.
- Handling API errors and application states.
- Providing responsive navigation and layouts.

**Technologies:** React, TypeScript, Tailwind CSS, Vite and Axios.

### Backend Architecture

The backend handles security-related processing and API functionality.

Its responsibilities include:
- REST API endpoint management.
- Request validation and data serialization.
- Security log processing.
- Threat detection logic.
- Cryptographic file hashing.
- Password assessment support.
- Application health monitoring.

**Technologies:** Python, FastAPI, Pydantic and Uvicorn.

---

## Technology Stack

| Component | Technology | Purpose |
|---|---|---|
| Programming Language | Python 3.14 | Backend development |
| Frontend Framework | React 18 | User interface |
| Frontend Language | TypeScript | Type safety |
| Backend Framework | FastAPI | REST API development |
| Styling | Tailwind CSS | Responsive UI |
| Build Tool | Vite | Frontend development and builds |
| HTTP Client | Axios | API communication |
| Data Validation | Pydantic | Request validation and serialization |
| ASGI Server | Uvicorn | Backend application server |
| Cryptography | SHA-256 | File integrity verification |
| Testing | Pytest | Backend testing |
| Version Control | Git | Source code management |
| Repository Hosting | GitHub | Project versioning and collaboration |

---

## 📂 Project Structure

```text
cybershield-toolkit/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── React UI components
│   │   │
│   │   ├── services/
│   │   │   └── API service layer
│   │   │
│   │   ├── types/
│   │   │   └── TypeScript interfaces
│   │   │
│   │   └── App.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   │
│   │   ├── api/
│   │   │   └── API route definitions
│   │   │
│   │   ├── core/
│   │   │   └── Core security logic and models
│   │   │
│   │   ├── analyzers/
│   │   │   └── Security log parsing
│   │   │
│   │   └── detectors/
│   │       └── Threat detection logic
│   │
│   ├── tests/
│   │   └── Backend test suite
│   │
│   └── requirements.txt
│
├── sample-data/
│   └── Example security log data
│
├── docs/
│   └── Project documentation
│
├── .gitignore
└── README.md
```

---

## Getting Started

Follow these instructions to run CyberShield locally on your development machine.

### Prerequisites

Ensure that the following tools are installed:

- Python 3.10 or later (developed using Python 3.14).
- Node.js 24 or later.
- npm.
- Git.

Check your installations:

```bash
python --version
node --version
npm --version
git --version
```

### 1. Clone the Repository

```bash
git clone https://github.com/Lwandle-Chauke/cybershield-toolkit.git
```

Navigate into the project directory:

```bash
cd cybershield-toolkit
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv .venv
```

Activate the environment on Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

Run the backend tests:

```bash
pytest tests/ -v
```

Start the FastAPI application:

```bash
python -m app.main
```

The backend will be available at:

- API: http://localhost:8000
- Interactive API documentation: http://localhost:8000/docs
- Alternative API documentation: http://localhost:8000/redoc
- Health check: http://localhost:8000/health

### 3. Frontend Setup

Open a second terminal from the project root.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

http://localhost:5173

**Note:** Keep both development servers running while using the application.

---

## API Documentation

CyberShield exposes RESTful API endpoints for its security functionality.

Base URL:

```text
http://localhost:8000
```

API version:

```text
/api/v1
```

### Password Security

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/password/assess` | Assess password strength |

Password assessment is performed locally in the frontend. The backend endpoint is available as part of the API functionality.

### File Integrity

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/files/hash` | Generate a SHA-256 file hash |
| POST | `/api/v1/files/verify` | Verify file integrity |

### Security Log Analysis

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/logs/analyze` | Analyse pasted log content |
| POST | `/api/v1/logs/upload-and-analyze` | Upload and analyse a log file |

### Dashboard and System Health

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/dashboard/overview` | Retrieve system status and module readiness |
| GET | `/health` | Check backend application health |

For request parameters, response schemas and interactive endpoint testing, consult the FastAPI Swagger documentation at `/docs`.

---

## Testing

CyberShield uses Pytest to validate backend functionality.

The current MVP test suite contains **9 passing tests** across three primary areas.

### Test Coverage

| Component | Tests | Result |
|---|---:|---|
| Password Validator | 4 | Passing |
| SSH Log Analyzer | 3 | Passing |
| Brute-Force Detector | 2 | Passing |
| **Total** | **9** | **9/9 Passing** |

### Running Tests

From the backend directory:

```bash
pytest tests/ -v
```

The verbose flag displays individual test results and makes it easier to identify failures.

Testing helps validate the application's security-related processing logic and provides a foundation for expanding test coverage as additional modules are developed.

---

## Security Considerations

Security is a central consideration in CyberShield's development.

The current implementation incorporates the following measures:

| Security Measure | Implementation |
|---|---|
| Input Validation | Pydantic validation |
| Password Privacy | Local frontend assessment |
| File Integrity | SHA-256 cryptographic hashing |
| API Protection | Configurable CORS origins |
| Error Handling | Structured application error handling |
| Type Safety | TypeScript and Python type hints |
| Threat Detection | Rule-based suspicious activity analysis |

### Security Scope and Limitations

CyberShield is currently an MVP and is intended for development, demonstration and controlled security analysis.

- SHA-256 hashing supports integrity comparison but does not independently establish file authenticity.
- Rule-based threat detection depends on the detection logic and available log data.
- CORS configuration should be restricted to trusted origins before deployment.
- Production deployment requires additional security controls, including authentication, authorisation, rate limiting, secure configuration management and appropriate monitoring.
- The toolkit should not be considered a replacement for a production SIEM or enterprise security monitoring platform.

---

## Development Roadmap

CyberShield is being developed incrementally, with future releases focused on expanding its analytical capabilities and moving towards a more comprehensive security monitoring platform.

### Release 1: Functional MVP

<details>
<summary>Completed functionality</summary>

- [x] React and TypeScript frontend.
- [x] Python FastAPI backend.
- [x] Security dashboard.
- [x] SSH log analysis.
- [x] Windows Event log analysis support.
- [x] Brute-force attack detection.
- [x] SHA-256 file hashing.
- [x] File integrity verification.
- [x] Password strength assessment.
- [x] REST API integration.
- [x] Initial backend test suite.
- [x] Responsive user interface.

</details>

### Release 2: Advanced Security Analysis

Planned enhancements:

- [ ] Advanced Windows Event Log analysis.
- [ ] Extended Linux authentication log analysis.
- [ ] Configurable detection rules engine.
- [ ] Security event correlation.
- [ ] Threat severity scoring.
- [ ] Historical incident reporting.
- [ ] PostgreSQL database integration.
- [ ] Persistent security event storage.
- [ ] Advanced security analytics.

### Release 3: Enterprise Security Capabilities

Long-term development objectives:

- [ ] MITRE ATT&CK framework mapping.
- [ ] SIEM-style event correlation.
- [ ] Automated alert classification.
- [ ] Threat intelligence integration.
- [ ] Role-Based Access Control (RBAC).
- [ ] Advanced security dashboards.
- [ ] Incident management workflows.
- [ ] Reporting and audit capabilities.
- [ ] Enhanced monitoring and alerting.

---

## Technical Skills Demonstrated

CyberShield demonstrates practical application of software engineering and cybersecurity concepts across multiple development areas.

### Backend Engineering

- Python application development.
- Asynchronous REST API development.
- FastAPI architecture.
- Pydantic data validation and serialization.
- Modular application design.
- Backend testing with Pytest.
- Error handling and exception management.
- Cryptographic hashing.

### Frontend Engineering

- React component-based development.
- TypeScript and static typing.
- Responsive user interface development.
- Tailwind CSS.
- API integration using Axios.
- Application state and UI management.
- Reusable component architecture.

### Cybersecurity

- Security log analysis.
- Authentication event monitoring.
- Brute-force attack detection.
- Password security assessment.
- Cryptographic file integrity verification.
- Secure input validation.
- Security-focused application design.

### Software Engineering

- Full-stack application development.
- Client-server architecture.
- RESTful API design.
- Separation of concerns.
- Git and GitHub version control.
- Test-driven validation principles.
- Technical documentation.
- Iterative software development.

---

## Contributing

CyberShield is an actively developed project.

Contributions, suggestions and constructive feedback are welcome.

For proposed changes:

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit your changes with a descriptive message.
5. Submit a pull request.

Example:

```bash
git checkout -b feature/new-security-module
git add .
git commit -m "Add new security analysis module"
git push origin feature/new-security-module
```

---

## License

This project is distributed under the MIT License.

See the `LICENSE` file for the full licence terms.

---

## Author

**Lwandle Chauke**

Software Developer | Application Development | Cybersecurity

- GitHub: [@Lwandle-Chauke](https://github.com/Lwandle-Chauke)
- Portfolio: [lwandlauchauke.online](https://lwandlauchauke.online)

---

## Project Status

![MVP Complete](https://img.shields.io/badge/MVP-Complete-success?style=flat-square)
![Active Development](https://img.shields.io/badge/Development-Active-blue?style=flat-square)

**Current Release:** Release 1 – Functional MVP

**Development Status:** Active Development

**Last Updated:** November 2026

---

*CyberShield Toolkit is an independent software development project exploring the intersection of application development, security engineering and practical cybersecurity analysis.*
