from pydantic import BaseSettings, PostgresDsn

class Settings(BaseSettings):
    # Database
    DATABASE_URL: PostgresDsn

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
