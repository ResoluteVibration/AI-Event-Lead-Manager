from fastapi import FastAPI
from sqlalchemy import text

from app.db.database import engine
from app.routes.leads import router as leads_router


app = FastAPI(
    title="AI Event Lead Manager API",
    version="1.0.0",
)


app.include_router(leads_router)


@app.get("/")
def root():
    return {
        "message": "AI Event Lead Manager API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


@app.get("/health/db")
def database_health_check():
    with engine.connect() as connection:
        result = connection.execute(
            text("SELECT 1")
        )

        value = result.scalar()

    return {
        "database": "connected",
        "result": value,
    }