from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any

app = FastAPI(
    title="LivingDocs AI Backend",
    description="API for Autonomous Documentation Platform",
    version="0.1.0"
)

# Configure CORS for Frontend (Next.js running on localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str
    repo_id: Optional[str] = None

class WebhookPayload(BaseModel):
    ref: str
    repository: Dict[str, Any]
    commits: list

@app.get("/")
async def root():
    return {"status": "online", "service": "LivingDocs AI Engine"}

@app.post("/chat")
async def chat_with_codebase(request: ChatRequest):
    """
    Phase 2/3: RAG Interface.
    In a real implementation, this would:
    1. Vectorize the query.
    2. Search pgvector for relevant code chunks.
    3. Send context + query to GPT-4o.
    """
    # Mock response for MVP
    return {
        "answer": f"I analyzed your codebase regarding '{request.query}'. \n\n"
                  "Based on `auth/middleware.py`, the validation logic checks for the `X-API-Key` header. "
                  "If missing, it raises a 401 Unauthorized error.\n\n"
                  "Would you like me to generate a sequence diagram for this flow?",
        "sources": ["src/auth/middleware.py", "src/config/security.ts"]
    }

@app.post("/webhooks/github")
async def github_webhook(payload: Dict[str, Any]):
    """
    Phase 3: Ingestion Engine.
    Receives push events from GitHub, triggers AST parsing and Doc generation.
    """
    # In production, verify X-Hub-Signature header here
    
    if "commits" in payload:
        print(f"Received push event for {payload.get('repository', {}).get('full_name')}")
        # Trigger Celery task here:
        # process_repository_changes.delay(payload)
        return {"status": "processing", "message": "Ingestion started"}
    
    return {"status": "ignored", "message": "Not a push event"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)