import os
import tempfile
import hmac
import hashlib
import requests
from fastapi import FastAPI, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from celery import Celery
from .generate_readme import generate_readme, read_python_file
from .webhook import github_webhook
from .rag_chat_agent import RAGChatAgent

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

celery_app = Celery(
    'livingdocs_ai',
    broker='redis://localhost:6379/0',
    backend='redis://localhost:6379/0'
)

# GitHub OAuth callback endpoint
@app.get("/oauth/github/callback")
async def github_oauth_callback(request: Request):
    code = request.query_params.get("code")
    if not code:
        return {"error": "Missing code parameter"}
    client_id = os.getenv("GITHUB_CLIENT_ID", "YOUR_CLIENT_ID")
    client_secret = os.getenv("GITHUB_CLIENT_SECRET", "YOUR_CLIENT_SECRET")
    # Exchange code for access token
    token_url = "https://github.com/login/oauth/access_token"
    headers = {"Accept": "application/json"}
    data = {
        "client_id": client_id,
        "client_secret": client_secret,
        "code": code
    }
    resp = requests.post(token_url, headers=headers, data=data)
    token_data = resp.json()
    access_token = token_data.get("access_token")
    if not access_token:
        return {"error": "Failed to obtain access token"}
    # Fetch user repos
    repos_url = "https://api.github.com/user/repos"
    user_resp = requests.get(repos_url, headers={"Authorization": f"token {access_token}"})
    repos = user_resp.json()
    # TODO: Save access_token and repos to DB for user
    return {"access_token": access_token, "repos": repos}

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

celery_app = Celery(
    'livingdocs_ai',
    broker='redis://localhost:6379/0',
    backend='redis://localhost:6379/0'
)

@app.get("/")
def read_root():
    return {"message": "LivingDocs AI Backend is running"}

# Path-based endpoint
@app.post("/generate-readme/path")
def generate_readme_from_path(python_file_path: str = Form(...), model: str = Form("gpt-4o")):
    code, _ = read_python_file(python_file_path)
    if not code:
        return {"error": "Failed to read or parse Python file."}
    readme = generate_readme(code, model=model)
    if not readme:
        return {"error": "Failed to generate README."}
    return {"readme": readme}

# File upload endpoint
@app.post("/generate-readme/upload")
async def generate_readme_from_upload(file: UploadFile = File(...), model: str = Form("gpt-4o")):
    try:
        contents = await file.read()
        with tempfile.NamedTemporaryFile(delete=False, suffix=".py") as tmp:
            tmp.write(contents)
            tmp_path = tmp.name
        code, _ = read_python_file(tmp_path)
        os.unlink(tmp_path)
        if not code:
            return {"error": "Failed to read or parse uploaded file."}
        readme = generate_readme(code, model=model)
        if not readme:
            return {"error": "Failed to generate README."}
        return {"readme": readme}
    except Exception as e:
        return {"error": str(e)}

# Register webhook endpoint
@app.post("/webhook/github")
async def github_webhook_endpoint(request: Request):
    secret = os.getenv("GITHUB_WEBHOOK_SECRET", "changeme")
    signature = request.headers.get("X-Hub-Signature-256")
    body = await request.body()
    expected = "sha256=" + hmac.new(secret.encode(), body, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature or "", expected):
        return {"error": "Invalid signature"}
    return await github_webhook(request)

@app.post("/chat")
async def chat_endpoint(request: Request):
    try:
        data = await request.json()
        query = data.get("query")
        if not query:
            return {"error": "No query provided."}
        agent = RAGChatAgent()
        answer = agent.answer_query(query)
        return {"answer": answer}
    except Exception as e:
        return {"error": str(e)}

# Example Celery task
def example_task():
    return "Task completed!"

celery_app.task(example_task)
