import uvicorn
import os

if __name__ == "__main__":
    print("🚀 Starting DQRE Intelligence Engine...")
    print("🔗 Backend API: http://localhost:8000")
    print("📖 Documentation: http://localhost:8000/docs")
    
    # Run the FastAPI app
    uvicorn.run(
        "app.main:app", 
        host="0.0.0.0", 
        port=8000, 
        reload=True
    )
