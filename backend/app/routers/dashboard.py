from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.dependencies.auth import require_admin
from app.models.category import Category
from app.models.customer import Customer
from app.models.food import Food
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.user import User


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    total_categories = (
        db.query(Category)
        .count()
    )

    total_foods = (
        db.query(Food)
        .count()
    )

    total_customers = (
        db.query(Customer)
        .count()
    )

    total_orders = (
        db.query(Order)
        .count()
    )

    total_revenue = (
        db.query(
            func.coalesce(
                func.sum(Order.total_amount),
                0
            )
        )
        .filter(
            Order.status != "Cancelled"
        )
        .scalar()
    )

    pending_orders = (
        db.query(Order)
        .filter(
            Order.status == "Pending"
        )
        .count()
    )

    delivered_orders = (
        db.query(Order)
        .filter(
            Order.status == "Delivered"
        )
        .count()
    )

    return {
        "total_categories": total_categories,
        "total_foods": total_foods,
        "total_customers": total_customers,
        "total_orders": total_orders,
        "total_revenue": float(total_revenue),
        "pending_orders": pending_orders,
        "delivered_orders": delivered_orders
    }


@router.get("/popular-foods")
def get_popular_foods(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    popular_foods = (
        db.query(
            Food.id,
            Food.name,
            Food.price,
            func.sum(
                OrderItem.quantity
            ).label("total_quantity")
        )
        .join(
            OrderItem,
            Food.id == OrderItem.food_id
        )
        .join(
            Order,
            Order.id == OrderItem.order_id
        )
        .filter(
            Order.status != "Cancelled"
        )
        .group_by(
            Food.id,
            Food.name,
            Food.price
        )
        .order_by(
            func.sum(
                OrderItem.quantity
            ).desc()
        )
        .all()
    )

    return [
        {
            "food_id": food.id,
            "food_name": food.name,
            "price": float(food.price),
            "total_quantity": food.total_quantity
        }
        for food in popular_foods
    ]