from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.db.base import Base
from app.db.database import engine

# =========================================================
# IMPORT ALL MODELS
# =========================================================

from app.models.food import Food
from app.models.category import Category
from app.models.customer import Customer
from app.models.order_item import OrderItem
from app.models.order import Order
from app.models.user import User

# =========================================================
# IMPORT ROUTERS
# =========================================================

from app.routers.category import router as category_router
from app.routers.food import router as food_router
from app.routers.customer import router as customer_router
from app.routers.order import router as order_router
from app.routers.dashboard import router as dashboard_router
from app.routers.auth import router as auth_router
from app.routers.users import router as users_router


# =========================================================
# CREATE DATABASE TABLES
# =========================================================

Base.metadata.create_all(bind=engine)


# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="Food Ordering API",
    description="REST API for Food Ordering System",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://mugil-livid.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# ROUTERS
# =========================================================

app.include_router(category_router)
app.include_router(food_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(dashboard_router)
app.include_router(auth_router)
app.include_router(users_router)


# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():
    return {
        "message": "Food Ordering API is running"
    }


# =========================================================
# DATABASE TEST
# =========================================================

@app.get("/db-test")
def database_test():

    with engine.connect() as connection:

        result = connection.execute(
            text("SELECT DATABASE()")
        )

        database_name = result.scalar()

    return {
        "message": "Database connection successful",
        "database": database_name
    }