
# LivingDocs AI

## Tagline
The Documentation That Writes Itself.

## Overview
LivingDocs AI is an autonomous platform that connects to your GitHub/GitLab repositories. It uses AST parsing combined with LLMs to watch your code in real-time. When a Pull Request is merged, it detects logic changes and automatically updates the documentation, API references, and architectural diagrams.

## Architecture
- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Shadcn/UI
- **Backend:** FastAPI (Python), Celery for background jobs
- **Database:** PostgreSQL + pgvector
- **Caching:** Redis
- **ORM:** Prisma (TS) / SQLModel (Py)
- **DevOps:** Docker & Kubernetes (optional), GitHub Actions

## Features
- Auto-Drifting Detection
- Self-Healing PRs
- Visual Architecture Generation (Mermaid.js)
- Chat with Codebase (RAG)
- API Sandbox

## Getting Started
1. Clone the repo
2. Run `docker-compose up` to start all services
3. Access frontend at http://localhost:3000 and backend at http://localhost:8000

## Phase 1
A Python script will read a single Python file, send it to GPT-4o, and generate a README.md.

---

For detailed setup, see each service's README or docs.
