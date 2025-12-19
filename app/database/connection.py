# app/database/connection.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database.models import Base
from app.core.config import settings
from fastapi import FastAPI

# 1. Tạo engine duy nhất
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    future=True,  # SQLAlchemy 2.0 style
)

# 2. Tạo SessionLocal class
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
    future=True
)

# 3. Dependency để lấy session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 4. Hàm tạo bảng tự động
def create_tables():
    Base.metadata.create_all(bind=engine)


# 5. Nếu muốn gọi tự động khi FastAPI startup
def init_app(app: FastAPI):
    @app.on_event("startup")
    def on_startup():
        create_tables()
