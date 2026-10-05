from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.dependencies.auth import require_admin
from app.models.user import User


router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# =========================================================
# GET ALL USERS - ADMIN
# =========================================================

@router.get("/")
def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    users = (
        db.query(User)
        .order_by(User.created_at.desc())
        .all()
    )

    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active,
            "created_at": user.created_at
        }
        for user in users
    ]


# =========================================================
# GET SINGLE USER - ADMIN
# =========================================================

@router.get("/{user_id}")
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "is_active": user.is_active,
        "created_at": user.created_at
    }


# =========================================================
# UPDATE USER ACTIVE STATUS - ADMIN
# =========================================================

@router.patch("/{user_id}/status")
def update_user_status(
    user_id: int,
    status_data: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if "is_active" not in status_data:
        raise HTTPException(
            status_code=400,
            detail="is_active field is required"
        )

    new_status = status_data["is_active"]

    if not isinstance(new_status, bool):
        raise HTTPException(
            status_code=400,
            detail="is_active must be true or false"
        )

    # Prevent admin from deactivating themselves
    if (
        user.id == current_user.id
        and new_status is False
    ):
        raise HTTPException(
            status_code=400,
            detail="You cannot deactivate your own account"
        )

    user.is_active = new_status

    db.commit()
    db.refresh(user)

    return {
        "message": "User status updated successfully",
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "is_active": user.is_active
    }