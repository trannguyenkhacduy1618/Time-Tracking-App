from typing import Generator, Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import User
from app.database.user_repository import UserRepository
from app.core.security import verify_password

# OAuth2 scheme dùng cho token-based auth
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_db() -> Generator[Session, None, None]:
    """
    Dependency tạo session DB.
    Dùng trong route với: db: Session = Depends(get_db)
    """
    db_session = None
    try:
        db_session = next(get_db())
        yield db_session
    finally:
        if db_session:
            db_session.close()


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """
    Lấy user hiện tại từ token.
    Raise 401 nếu token invalid hoặc user không tồn tại.
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing token",
        )
    user_repo = UserRepository(db)
    user = user_repo.get_user_by_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
        )
    return user


def optional_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> Optional[User]:
    """
    Lấy user hiện tại nếu có token.
    Trả về None nếu không có token hoặc token invalid.
    Useful cho các endpoint không bắt buộc login.
    """
    if token:
        try:
            return get_current_user(token=token, db=db)
        except HTTPException:
            return None
    return None


def require_admin(current_user: User = Depends(get_current_user)) -> User:
    """
    Kiểm tra user có role admin hay không.
    Raise 403 nếu không phải admin.
    """
    if not getattr(current_user, "is_admin", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required",
        )
    return current_user


def require_role(
    role: str,
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Kiểm tra user có role cụ thể.
    Raise 403 nếu không có quyền.
    """
    if getattr(current_user, "role", None) != role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"{role} privileges required",
        )
    return current_user


# Nếu cần có các dependency khác trong tương lai,
# chỉ cần thêm ở đây để reuse trong các router.
