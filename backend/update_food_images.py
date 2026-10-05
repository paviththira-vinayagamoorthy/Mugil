from urllib.parse import quote

from app.models.food import Food
from app.db.database import SessionLocal


# =========================================================
# FOOD IMAGE KEYWORDS
# =========================================================

CATEGORY_KEYWORDS = {
    "Burgers": "burger,food",
    "Pizza": "pizza,food",
    "Italian Pizza": "italian,pizza",
    "Rice": "fried,rice",
    "Biryani": "biryani",
    "Noodles": "noodles",
    "Pasta": "pasta",
    "Chicken": "chicken,food",
    "Seafood": "seafood,food",
    "Vegetarian": "vegetarian,food",
    "Breakfast": "breakfast,food",
    "Desserts": "dessert,food",
    "Drinks": "drink,juice",
    "Snacks": "snacks,food",
    "Indian": "indian,food",
    "Sri Lankan": "srilankan,food",
}


def get_image_keyword(food):
    name = food.name.lower()

    # More specific food keywords
    special_keywords = {
        "burger": "burger",
        "pizza": "pizza",
        "biryani": "biryani",
        "fried rice": "fried,rice",
        "rice and curry": "rice,curry",
        "noodles": "noodles",
        "pasta": "pasta",
        "kottu": "kottu",
        "devilled": "devilled,chicken",
        "chicken 65": "chicken,65",
        "chicken wings": "chicken,wings",
        "grilled chicken": "grilled,chicken",
        "chicken tikka": "chicken,tikka",
        "prawns": "prawns",
        "calamari": "calamari",
        "fish and chips": "fish,and,chips",
        "grilled fish": "grilled,fish",
        "paneer": "paneer",
        "samosa": "samosa",
        "roll": "spring,roll",
        "french fries": "french,fries",
        "cake": "cake,dessert",
        "brownie": "brownie",
        "cheesecake": "cheesecake",
        "mousse": "chocolate,mousse",
        "ice cream": "ice,cream",
        "juice": "fruit,juice",
        "milkshake": "milkshake",
        "pancakes": "pancakes",
        "french toast": "french,toast",
        "omelette": "omelette",
        "dosa": "dosa",
        "idli": "idli,sambar",
        "hoppers": "hoppers",
        "string hopper": "string,hoppers",
        "pol sambol": "pol,sambol",
        "dal curry": "dal,curry",
    }

    for key, keyword in special_keywords.items():
        if key in name:
            return keyword

    category = food.category.name if food.category else ""

    return CATEGORY_KEYWORDS.get(
        category,
        "delicious,food"
    )


# =========================================================
# DATABASE
# =========================================================

db = SessionLocal()

try:
    foods = db.query(Food).all()

    print("=" * 60)
    print("UPDATING FOOD IMAGES")
    print("=" * 60)

    updated = 0

    for food in foods:

        keyword = get_image_keyword(food)

        # Unique lock for every food
        lock_number = food.id + 5000

        image_url = (
            f"https://loremflickr.com/800/600/"
            f"{quote(keyword)}?lock={lock_number}"
        )

        food.image = image_url

        updated += 1

        print(
            f"{food.id:3} | "
            f"{food.name:30} | "
            f"{keyword}"
        )

    db.commit()

    print("\n" + "=" * 60)
    print("IMAGE UPDATE COMPLETED")
    print("=" * 60)
    print(f"Foods updated : {updated}")
    print("=" * 60)

except Exception as e:
    db.rollback()
    print("\nERROR:", e)

finally:
    db.close()