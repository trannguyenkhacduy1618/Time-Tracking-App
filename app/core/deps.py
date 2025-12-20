from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.database.models import User
from app.database.user_repository import user_repository
from app.core.security import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    """
    Decode JWT → lấy user hiện tại
    """
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication token",
        )

    # ✅ Decode JWT → user_id
    user_id = decode_access_token(token)

    # ✅ Query user bằng ID
    user = user_repository.get(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is inactive",
        )

    return user


def optional_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> Optional[User]:
    """
    Không bắt buộc login
    """
    if not token:
        return None

    try:
        user_id = decode_access_token(token)
        return user_repository.get(db, user_id)
    except HTTPException:
        return None


def require_admin(
    current_user: User = Depends(get_current_user),
) -> User:
    """
    Chỉ cho admin
    """
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required",
        )
    return current_user


def require_role(
    role: str,
    current_user: User = Depends(get_current_user),
) -> User:
    if current_user.role != role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"{role} privileges required",
        )
    return current_user


# Alias cũ
get_current_admin_user = require_admin
