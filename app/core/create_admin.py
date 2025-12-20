from app.database.connection import SessionLocal
from app.database.models import User
from app.core.security import get_password_hash

def create_admin():
    db = SessionLocal()
    try:
        admin = db.query(User).filter(User.username == "admin").first()

        if admin:
            admin.hashed_password = get_password_hash("12345678")
            admin.role = "admin"
            admin.is_active = True
            print("Đã UPDATE admin user!")
        else:
            admin = User(
                username="admin",
                email="admin@gmail.com",
                full_name="Admin",
                hashed_password=get_password_hash("12345678"),
                role="admin",
                is_active=True
            )
            db.add(admin)
            print("Đã CREATE admin user!")

        db.commit()
    finally:
        db.close()

if name == "main":
    create_admin()
