import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
try:
    from openai import AsyncOpenAI  # type: ignore
except ImportError:
    AsyncOpenAI = None

app = FastAPI(
    title="LivingDocs AI Backend",
    description="API for Autonomous Documentation Platform",
    version="0.1.0"
)

# Initialize OpenAI Client
if AsyncOpenAI:
    client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
else:
    client = None

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

class Commit(BaseModel):
    id: str
    message: str
    author: Dict[str, Any]
    added: List[str] = []
    modified: List[str] = []
    removed: List[str] = []

class WebhookPayload(BaseModel):
    ref: str
    repository: Dict[str, Any]
    commits: List[Commit]

@app.get("/")
async def root():
    return {"status": "online", "service": "LivingDocs AI Engine"}

@app.post("/chat")
async def chat_with_codebase(request: ChatRequest):
    """
    Phase 2: RAG Interface (Connected to LLM).
    """
    try:
        # In a full RAG implementation, we would search pgvector here 
        # and append relevant code chunks to the system prompt.
        
        if not client:
            return {
                "answer": "OpenAI client is not initialized. Please ensure the 'openai' package is installed and configured.",
                "sources": []
            }
        
        response = await client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are LivingDocs AI, an autonomous documentation assistant. Answer questions about the codebase clearly and concisely."},
                {"role": "user", "content": request.query}
            ]
        )
        
        return {
            "answer": response.choices[0].message.content,
            "sources": [] # Placeholder for RAG sources
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/webhooks/github")
async def github_webhook(payload: WebhookPayload):
    """
    Phase 3: Ingestion Engine.
    Parses incoming commits to identify modified files for documentation updates.
    """
    repo_name = payload.repository.get('full_name', 'Unknown Repo')
    print(f"Received push event for {repo_name}")
    
    changed_files = set()
    for commit in payload.commits:
        # Aggregate all added and modified files
        changed_files.update(commit.added)
        changed_files.update(commit.modified)
    
    if changed_files:
        # Trigger Celery task here: process_files.delay(list(changed_files))
        return {
            "status": "processing", 
            "message": f"Identified {len(changed_files)} files for documentation update",
            "files": list(changed_files)
        }
    
    return {"status": "ignored", "message": "No relevant file changes detected"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)