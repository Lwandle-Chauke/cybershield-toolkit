from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routes

app = FastAPI(
    title="CyberShield Toolkit API",
    description="Security analysis and threat detection platform",
    version="1.0.0"
)

# CORS Configuration (will be restricted in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://cyber-shield-toolkit.netlify.app",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)
# Include routes
app.include_router(routes.router)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "CyberShield API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)