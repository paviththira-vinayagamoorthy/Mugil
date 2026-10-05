from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


OrderStatus = Literal[
    "Pending",
    "Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled"
]


class OrderItemCreate(BaseModel):
    food_id: int

    quantity: int = Field(
        ge=1
    )


class OrderCreate(BaseModel):
    customer_id: int

    items: list[OrderItemCreate] = Field(
        min_length=1
    )


class OrderItemResponse(BaseModel):
    id: int
    food_id: int
    quantity: int
    unit_price: Decimal
    subtotal: Decimal

    model_config = ConfigDict(
        from_attributes=True
    )


class OrderResponse(BaseModel):
    id: int
    customer_id: int
    total_amount: Decimal
    status: str
    created_at: datetime
    order_items: list[OrderItemResponse]

    model_config = ConfigDict(
        from_attributes=True
    )


class OrderStatusUpdate(BaseModel):
    status: OrderStatus