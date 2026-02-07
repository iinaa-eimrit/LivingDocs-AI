from fastapi import Request
from fastapi.responses import JSONResponse

from backend.repo_agent import RepoAgent
from backend.langchain_doc_update import DocUpdateChain
from backend.pr_manager import PRManager
from celery import Celery
import os

celery_app = Celery(
    'livingdocs_ai',
    broker='redis://localhost:6379/0',
    backend='redis://localhost:6379/0'
)

@celery_app.task
def process_webhook(repo_url, branch, changed_files, old_docs):
    agent = RepoAgent(repo_url, branch)
    agent.clone_repo()
    asts = agent.parse_python_files()
    chain = DocUpdateChain()
    pr_manager = PRManager()
    MAX_UPDATES = int(os.getenv("MAX_DOC_UPDATES", 10))
    if len(changed_files) > MAX_UPDATES:
        print(f"User update limit exceeded: {len(changed_files)} > {MAX_UPDATES}")
        # Optionally notify user or log event
        return {"error": f"Too many files changed. Limit is {MAX_UPDATES}."}
    for file in changed_files:
        file_path = os.path.join(agent.clone_dir, file)
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                new_code = f.read()
        except Exception:
            new_code = ""
        old_code = old_docs.get(file, {}).get("old_code", "")
        old_doc = old_docs.get(file, {}).get("old_doc", "")
        # Run LangChain prompt orchestration for doc update
        new_doc = chain.run(old_code, new_code, old_doc)
        pr_url = pr_manager.create_pr(
            repo_name=repo_url.split("github.com/")[-1],
            branch=f"docs-update-{branch}",
            file_path=f"docs/{file}.md",
            content=new_doc,
            pr_title=f"Update docs for {file}",
            pr_body="Automated doc update",
            bot_email="livingdocs-bot@users.noreply.github.com"
        )
        print(f"PR created: {pr_url}")
    agent.cleanup()

async def github_webhook(request: Request):
    try:
        payload = await request.json()
        event = request.headers.get("X-GitHub-Event")
        print(f"Received GitHub event: {event}")
        print(payload)
        # Extract repo URL, branch, changed files, old docs
        repo_url = payload.get("repository", {}).get("clone_url", "")
        branch = payload.get("ref", "main")
        changed_files = []  # TODO: parse from payload
        old_docs = {}  # TODO: fetch from DB
        celery_app.send_task("backend.webhook.process_webhook", args=[repo_url, branch, changed_files, old_docs])
        return JSONResponse({"status": "received", "event": event})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=400)
