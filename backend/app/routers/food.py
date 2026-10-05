from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.food import Food
from app.models.category import Category
from app.schemas.food import FoodCreate, FoodUpdate, FoodResponse
from app.utils.food_image import get_food_image


router = APIRouter(
    prefix="/foods",
    tags=["Foods"]
)


# =========================================================
# GET ALL FOODS
# =========================================================

@router.get("/", response_model=list[FoodResponse])
def get_foods(
    page: int = Query(1, ge=1),
    limit: int = Query(100, ge=1, le=500),
    sort: str | None = None,
    order: str = "asc",
    category_id: int | None = None,
    search: str | None = None,
    db: Session = Depends(get_db)
):

    query = db.query(Food)

    # -----------------------------------------------------
    # CATEGORY FILTER
    # -----------------------------------------------------

    if category_id:
        query = query.filter(
            Food.category_id == category_id
        )

    # -----------------------------------------------------
    # SEARCH
    # -----------------------------------------------------

    if search:
        query = query.filter(
            Food.name.ilike(f"%{search}%")
        )

    # -----------------------------------------------------
    # SORTING
    # -----------------------------------------------------

    if sort == "price":

        if order.lower() == "desc":
            query = query.order_by(
                Food.price.desc()
            )
        else:
            query = query.order_by(
                Food.price.asc()
            )

    elif sort == "name":

        if order.lower() == "desc":
            query = query.order_by(
                Food.name.desc()
            )
        else:
            query = query.order_by(
                Food.name.asc()
            )

    else:
        query = query.order_by(
            Food.id.asc()
        )

    # -----------------------------------------------------
    # PAGINATION
    # -----------------------------------------------------

    offset = (page - 1) * limit

    foods = (
        query
        .offset(offset)
        .limit(limit)
        .all()
    )

    # -----------------------------------------------------
    # MATCHING FOOD IMAGE
    # -----------------------------------------------------

    for food in foods:

        category_name = ""

        if food.category:
            category_name = food.category.name

        # Generate matching image from food name
        food.image = get_food_image(
            food.name,
            category_name
        )

    return foods


# =========================================================
# GET SINGLE FOOD
# =========================================================

@router.get("/{food_id}", response_model=FoodResponse)
def get_food(
    food_id: int,
    db: Session = Depends(get_db)
):

    food = (
        db.query(Food)
        .filter(Food.id == food_id)
        .first()
    )

    if not food:
        raise HTTPException(
            status_code=404,
            detail="Food not found"
        )

    # -----------------------------------------------------
    # MATCHING IMAGE
    # -----------------------------------------------------

    category_name = ""

    if food.category:
        category_name = food.category.name

    food.image = get_food_image(
        food.name,
        category_name
    )

    return food


# =========================================================
# CREATE FOOD
# =========================================================

@router.post("/", response_model=FoodResponse)
def create_food(
    food_data: FoodCreate,
    db: Session = Depends(get_db)
):

    # -----------------------------------------------------
    # CHECK CATEGORY
    # -----------------------------------------------------

    category = (
        db.query(Category)
        .filter(
            Category.id == food_data.category_id
        )
        .first()
    )

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found"
        )

    # -----------------------------------------------------
    # CREATE FOOD
    # -----------------------------------------------------

    food = Food(
        name=food_data.name,
        description=food_data.description,
        price=food_data.price,
        image=food_data.image,
        is_available=food_data.is_available,
        category_id=food_data.category_id
    )

    db.add(food)
    db.commit()
    db.refresh(food)

    # -----------------------------------------------------
    # MATCHING IMAGE
    # -----------------------------------------------------

    food.image = get_food_image(
        food.name,
        category.name
    )

    return food


# =========================================================
# UPDATE FOOD
# =========================================================

@router.put("/{food_id}", response_model=FoodResponse)
def update_food(
    food_id: int,
    food_data: FoodUpdate,
    db: Session = Depends(get_db)
):

    # -----------------------------------------------------
    # FIND FOOD
    # -----------------------------------------------------

    food = (
        db.query(Food)
        .filter(Food.id == food_id)
        .first()
    )

    if not food:
        raise HTTPException(
            status_code=404,
            detail="Food not found"
        )

    # -----------------------------------------------------
    # UPDATE DATA
    # -----------------------------------------------------

    update_data = food_data.model_dump(
        exclude_unset=True
    )

    # -----------------------------------------------------
    # CHECK CATEGORY
    # -----------------------------------------------------

    category = (
        db.query(Category)
        .filter(
            Category.id == food.category_id
        )
        .first()
    )

    if "category_id" in update_data:

        category = (
            db.query(Category)
            .filter(
                Category.id == update_data["category_id"]
            )
            .first()
        )

        if not category:
            raise HTTPException(
                status_code=404,
                detail="Category not found"
            )

    # -----------------------------------------------------
    # APPLY UPDATE
    # -----------------------------------------------------

    for key, value in update_data.items():
        setattr(food, key, value)

    db.commit()
    db.refresh(food)

    # -----------------------------------------------------
    # MATCHING IMAGE
    # -----------------------------------------------------

    food.image = get_food_image(
        food.name,
        category.name if category else ""
    )

    return food


# =========================================================
# DELETE FOOD
# =========================================================

@router.delete("/{food_id}")
def delete_food(
    food_id: int,
    db: Session = Depends(get_db)
):

    # -----------------------------------------------------
    # FIND FOOD
    # -----------------------------------------------------

    food = (
        db.query(Food)
        .filter(Food.id == food_id)
        .first()
    )

    if not food:
        raise HTTPException(
            status_code=404,
            detail="Food not found"
        )

    # -----------------------------------------------------
    # DELETE
    # -----------------------------------------------------

    db.delete(food)
    db.commit()

    return {
        "message": "Food deleted successfully"
    }