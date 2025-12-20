# create_admin.py
from app.database.connection import SessionLocal
from app.database.models import User
from app.core.security import get_password_hash

def create_admin():
    db = SessionLocal()
    try:
        admin_exists = db.query(User).filter(User.username == "admin").first()
        if admin_exists:
            print("Admin đã tồn tại!")
            return

        admin_user = User(
            username="admin",
            email="admin@gmail.com",
            full_name="Admin",
            password_hash=get_password_hash("12345678"),
            role="admin",
            is_active=True
        )
        db.add(admin_user)
        db.commit()
        print("Đã tạo admin user thành công!")
    finally:
        db.close()

if __name__ == "__main__":
    create_admin()
