from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    PROJECT_NAME: str = "Time Tracking Backend"

    SECRET_KEY: str = "CHANGE_ME"
    ALGORITHM: str = "HS256"
    access_token_expire_minutes: int = 60 * 24

    DATABASE_URL: str = "postgresql://time_tracker_db_z4ui_user:EswQOcmV6hUQesZu19wEOWfZtIXp5A2A@dpg-d4vnfh6mcj7s73dqj6fg-a/time_tracker_db_z4ui"

    BACKEND_CORS_ORIGINS: List[str] = ["*"]

    class Config:
        env_file = ".env"
        extra = "ignore"
settings = Settings()
