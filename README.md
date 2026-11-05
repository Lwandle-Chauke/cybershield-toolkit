# 🛡️ CyberShield Toolkit

Advanced security analysis and threat detection platform. A full-stack web application for monitoring security logs, analyzing threats, verifying file integrity, and assessing password strength.

## 🎯 Features

### Release 1: Functional MVP ✅
- **Log Analysis** - Parse and analyze SSH and Windows Event logs
- **Threat Detection** - Detect brute force attacks and suspicious activity
- **File Integrity** - Generate and verify SHA-256 file hashes
- **Password Security** - Assess password strength with actionable feedback
- **Security Dashboard** - Real-time system status and module monitoring
- **Responsive UI** - Works on desktop, tablet, and mobile

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for fast development
- **Axios** for API communication
- Responsive two-column layout with collapsible sidebar

### Backend
- **Python 3.14** with FastAPI
- **Pydantic** for data validation
- **Uvicorn** ASGI server
- RESTful API design
- Comprehensive test coverage with Pytest

## 📦 Project Structure
cybershield-toolkit/
├── frontend/ # React TypeScript application
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── services/ # API service layer
│ │ ├── types/ # TypeScript interfaces
│ │ └── App.tsx # Main application
│ ├── package.json
│ └── vite.config.ts
│
├── backend/ # Python FastAPI application
│ ├── app/
│ │ ├── main.py # FastAPI app entry point
│ │ ├── api/ # Route definitions
│ │ ├── core/ # Security & models
│ │ ├── analyzers/ # Log parsing logic
│ │ └── detectors/ # Threat detection
│ ├── tests/ # Pytest test suite (9 tests)
│ └── requirements.txt # Python dependencies
│
├── sample-data/ # Example log files
├── docs/ # Documentation
└── README.md

text

## 🚀 Quick Start

### Prerequisites
- Node.js v24.21.0+
- Python 3.10+
- Git

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
pytest tests/ -v  # Run all tests (9/9 passing)
python -m app.main  # Start server on http://localhost:8000
Frontend Setup
bash
cd frontend
npm install
npm run dev  # Start on http://localhost:5173
📋 API Endpoints
Password Security
POST /api/v1/password/assess - Assess password strength (local processing)
File Integrity
POST /api/v1/files/hash - Calculate SHA-256 hash
POST /api/v1/files/verify - Verify file hasn't been modified
Log Analysis
POST /api/v1/logs/analyze - Analyze log content (paste)
POST /api/v1/logs/upload-and-analyze - Upload and analyze log file
Dashboard
GET /api/v1/dashboard/overview - Get system status and module readiness
GET /health - Health check endpoint
🧪 Testing
bash
cd backend
pytest tests/ -v
Test Results:

✅ Password validator: 4/4 passing
✅ SSH log analyzer: 3/3 passing
✅ Brute force detector: 2/2 passing
Total: 9/9 passing
🎨 Technology Stack
Component	Technology	Version
Frontend	React + TypeScript	18.x
Styling	Tailwind CSS	3.x
Build Tool	Vite	5.x
Backend	FastAPI	0.109.0
ASGI Server	Uvicorn	0.27.0
Data Validation	Pydantic	2.14.3
Testing	Pytest	7.4.3
🔐 Security Features
CORS protection (configurable origins)
Input validation with Pydantic
Local password assessment (never transmitted to backend)
✅ SHA-256 file hashing (industry standard)
✅ Type-safe TypeScript + Python type hints
✅ Error handling and validation throughout
📈 Release Roadmap
Release 2: Advanced Capabilities
Windows Event Log advanced analysis
Linux authentication log analysis
Custom detection rules engine
Security event correlation
Threat severity scoring
Historical incident reporting
PostgreSQL database integration
Release 3: Enterprise Features
MITRE ATT&CK technique mapping
SIEM-style event correlation
Automated alert classification
Threat intelligence integration
Role-based access control (RBAC)
Advanced dashboards and reporting
Key Skills Demonstrated
Backend Development

Async REST API design with FastAPI
Data validation and serialization with Pydantic
Unit testing with Pytest
Security best practices
Clean code architecture
Frontend Development

Modern React with TypeScript
Component-based architecture
API integration with Axios
Responsive design (mobile-first)
Tailwind CSS styling
Full-Stack Integration

Client-server communication
Error handling and validation
State management
Testing strategies
License
MIT License

Author
Lwandle Chauke

GitHub: @Lwandle-Chauke
Portfolio: lwandlechauke.online
Status
Active Development - MVP Complete, Ready for Deployment

Last Updated: November 2026

text

### Step 3: Save and commit

```powershell
git add README.md
git commit -m "Add comprehensive README documentation"
git push
