from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.dependencies.auth import get_current_user, require_admin
from app.models.customer import Customer
from app.models.food import Food
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.user import User
from app.schemas.order import (
    OrderCreate,
    OrderResponse,
    OrderStatusUpdate
)


router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


# Fixed delivery fee
DELIVERY_FEE = Decimal("250.00")


# =========================================================
# CREATE ORDER
# =========================================================

@router.post(
    "/",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED
)
def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == order_data.customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    # Customer can only create an order for their own account
    if (
        current_user.role != "admin"
        and current_user.email != customer.email
    ):
        raise HTTPException(
            status_code=403,
            detail="You can only create orders for yourself"
        )

    new_order = Order(
        customer_id=order_data.customer_id,
        total_amount=Decimal("0.00"),
        status="Pending"
    )

    db.add(new_order)
    db.flush()

    food_subtotal = Decimal("0.00")

    for item in order_data.items:

        food = (
            db.query(Food)
            .filter(Food.id == item.food_id)
            .first()
        )

        if not food:
            db.rollback()

            raise HTTPException(
                status_code=404,
                detail=f"Food with id {item.food_id} not found"
            )

        if not food.is_available:
            db.rollback()

            raise HTTPException(
                status_code=400,
                detail=f"{food.name} is currently unavailable"
            )

        unit_price = Decimal(
            str(food.price)
        )

        subtotal = (
            unit_price * item.quantity
        )

        order_item = OrderItem(
            order_id=new_order.id,
            food_id=food.id,
            quantity=item.quantity,
            unit_price=unit_price,
            subtotal=subtotal
        )

        db.add(order_item)

        food_subtotal += subtotal

    # Food subtotal + delivery fee
    total_amount = (
        food_subtotal + DELIVERY_FEE
    )

    new_order.total_amount = total_amount

    db.commit()
    db.refresh(new_order)

    return new_order


# =========================================================
# GET ALL ORDERS - ADMIN
# =========================================================

@router.get(
    "/",
    response_model=list[OrderResponse]
)
def get_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    orders = (
        db.query(Order)
        .order_by(Order.created_at.desc())
        .all()
    )

    return orders


# =========================================================
# GET CUSTOMER ORDERS
# =========================================================

@router.get(
    "/customer/{customer_id}",
    response_model=list[OrderResponse]
)
def get_customer_orders(
    customer_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    # Customer can only view their own orders
    if (
        current_user.role != "admin"
        and current_user.email != customer.email
    ):
        raise HTTPException(
            status_code=403,
            detail="You can only view your own orders"
        )

    orders = (
        db.query(Order)
        .filter(Order.customer_id == customer_id)
        .order_by(Order.created_at.desc())
        .all()
    )

    return orders


# =========================================================
# GET SINGLE ORDER - ADMIN
# =========================================================

@router.get(
    "/{order_id}",
    response_model=OrderResponse
)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order


# =========================================================
# UPDATE ORDER STATUS - ADMIN
# =========================================================

@router.put(
    "/{order_id}/status",
    response_model=OrderResponse
)
def update_order_status(
    order_id: int,
    status_data: OrderStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order.status = status_data.status

    db.commit()
    db.refresh(order)

    return order


# =========================================================
# DELETE ORDER - ADMIN
# =========================================================

@router.delete(
    "/{order_id}",
    status_code=status.HTTP_204_NO_CONTENT
)
def delete_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    db.delete(order)
    db.commit()

    return None