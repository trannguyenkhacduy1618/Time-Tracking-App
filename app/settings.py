from pydantic import BaseSettings, PostgresDsn

class Settings(BaseSettings):
    # Database
    DATABASE_URL: postgresql://time_tracker_db_z4ui_user:EswQOcmV6hUQesZu19wEOWfZtIXp5A2A@dpg-d4vnfh6mcj7s73dqj6fg-a/time_tracker_db_z4ui

    # JWT
    SECRET_KEY: str
    access_token_expire_minutes: int = 60  # 1 giờ

    # App settings
    APP_NAME: str = "Time Tracking App"
    DEBUG: bool = True

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
