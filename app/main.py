from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, users, boards, tasks, time_tracking, reports

# Khởi tạo ứng dụng FastAPI
app = FastAPI(
    title="Time Tracking App",
    description="Ứng dụng theo dõi thời gian làm việc trên các task",
    version="1.0.0"
)

# -------------------------------
# Cấu hình CORS
# -------------------------------
# Trong môi trường dev: cho phép FE ở localhost:5173
# Trong production: nên giới hạn domain cụ thể (ví dụ https://myapp.com)
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------
# Endpoint kiểm tra sức khỏe hệ thống
# -------------------------------
@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok"}

# -------------------------------
# Include các router từ app/api
# -------------------------------
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(boards.router, prefix="/boards", tags=["boards"])
app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
app.include_router(time_tracking.router, prefix="/time", tags=["time_tracking"])
app.include_router(reports.router, prefix="/reports", tags=["reports"])

# -------------------------------
# Root endpoint
# -------------------------------
@app.get("/", tags=["root"])
def root():
    return {"message": "Welcome to the Time Tracking App"}