# AI Event Lead Manager

A full-stack application for managing leads collected at business events, with AI-powered lead summaries and follow-up drafts.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Python, FastAPI
- **Database:** PostgreSQL
- **ORM / Migrations:** SQLAlchemy, Alembic
- **AI:** Google Gemini API
- **Development:** Docker

## Features

- Add, edit, and delete leads
- Search and filter leads
- Lead status tracking
- PostgreSQL persistence
- AI-generated lead summaries
- AI-generated follow-up drafts
- Responsive UI

## Setup

### 1. Clone the repository

```bash
git clone "https://github.com/ResoluteVibration/AI-Event-Lead-Manager.git"
cd event-lead-manager

2. Start PostgreSQL
docker compose up -d

3. Backend
cd backend
python -m venv .venv

Windows PowerShell:
.\.venv\Scripts\Activate.ps1

Install dependencies:
pip install -r requirements.txt

Create backend/.env:
DATABASE_URL=postgresql+psycopg://leadmanager:leadmanager_password@localhost:5432/event_lead_manager
GEMINI_API_KEY=your_gemini_api_key

Run migrations:
alembic upgrade head

Start the backend:
uvicorn app.main:app --reload

API documentation:
http://127.0.0.1:8000/docs

4. Frontend
Open another terminal:
cd frontend
npm install

Create frontend/.env.local:
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000

Start the frontend:
npm run dev