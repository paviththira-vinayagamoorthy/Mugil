from decimal import Decimal

from app.db.database import SessionLocal

from app.models.food import Food
from app.models.category import Category
from app.models.customer import Customer
from app.models.order_item import OrderItem
from app.models.order import Order
from app.models.user import User


# ============================================================
# FOOD DATA
# ============================================================

FOOD_DATA = {

    "Burgers": [
        ("Classic", 1200),
        ("Spicy", 1300),
        ("Cheese", 1400),
        ("BBQ", 1450),
        ("Crispy", 1350),
        ("Double", 1650),
        ("Jumbo", 1800),
        ("Grilled", 1500),
        ("Mexican", 1550),
        ("Pepper", 1450),
        ("Garlic", 1400),
        ("Special", 1700),
    ],

    "Pizza": [
        ("Chicken", 2200),
        ("Spicy Chicken", 2300),
        ("BBQ Chicken", 2400),
        ("Cheese", 2100),
        ("Beef", 2500),
        ("Pepperoni", 2600),
        ("Seafood", 2800),
        ("Prawn", 2900),
        ("Vegetable", 2000),
        ("Mushroom", 2150),
        ("Paneer", 2250),
        ("Mexican", 2350),
    ],

    "Rice": [
        ("Chicken", 1200),
        ("Beef", 1450),
        ("Prawn", 1700),
        ("Seafood", 1800),
        ("Egg", 900),
        ("Vegetable", 850),
        ("Garlic Chicken", 1300),
        ("Pepper Chicken", 1350),
        ("Schezwan Chicken", 1400),
        ("Thai Chicken", 1450),
        ("Mushroom", 1000),
        ("Paneer", 1150),
    ],

    "Biryani": [
        ("Chicken", 1700),
        ("Spicy Chicken", 1750),
        ("Mutton", 2000),
        ("Beef", 1800),
        ("Prawn", 2100),
        ("Fish", 1850),
        ("Egg", 1200),
        ("Vegetable", 1100),
        ("Paneer", 1350),
        ("Hyderabadi Chicken", 1900),
        ("Royal Chicken", 2100),
        ("Special Mixed", 2300),
    ],

    "Noodles": [
        ("Chicken", 1200),
        ("Beef", 1400),
        ("Prawn", 1550),
        ("Seafood", 1650),
        ("Egg", 900),
        ("Vegetable", 850),
        ("Schezwan Chicken", 1350),
        ("Schezwan Beef", 1500),
        ("Singapore", 1250),
        ("Thai", 1300),
        ("Garlic Chicken", 1250),
        ("Mushroom", 950),
    ],

    "Pasta": [
        ("Chicken Alfredo", 1600),
        ("Beef Alfredo", 1750),
        ("Chicken Carbonara", 1650),
        ("Beef Carbonara", 1800),
        ("Chicken Arrabbiata", 1500),
        ("Prawn Alfredo", 1900),
        ("Seafood", 2100),
        ("Pesto Chicken", 1700),
        ("Vegetable Pesto", 1400),
        ("Mushroom Cream", 1450),
        ("Four Cheese", 1650),
        ("Garlic Prawn", 1950),
    ],

    "Chicken": [
        ("Chicken Manchurian", 1450),
        ("Chilli Chicken", 1500),
        ("Devilled Chicken", 1550),
        ("Pepper Chicken", 1500),
        ("Chicken Kebab", 1400),
        ("Chicken Tikka", 1450),
        ("Chicken Wings", 1350),
        ("BBQ Chicken Wings", 1450),
        ("Spicy Chicken Wings", 1500),
        ("Chicken Drumsticks", 1500),
        ("Grilled Chicken", 1650),
        ("Butter Chicken", 1700),
    ],

    "Seafood": [
        ("Garlic Prawns", 1900),
        ("Devilled Prawns", 1950),
        ("Chilli Prawns", 1900),
        ("Prawn Tempura", 2100),
        ("Grilled Prawns", 2200),
        ("Butter Prawns", 2150),
        ("Fried Fish", 1700),
        ("Grilled Fish", 1800),
        ("Fish and Chips", 1650),
        ("Devilled Fish", 1750),
        ("Fish Curry", 1550),
        ("Crab Curry", 2400),
    ],

    "Vegetarian": [
        ("Vegetable Manchurian", 1100),
        ("Paneer Butter Masala", 1450),
        ("Palak Paneer", 1400),
        ("Chilli Paneer", 1350),
        ("Paneer Tikka", 1400),
        ("Vegetable Korma", 1200),
        ("Dal Curry", 850),
        ("Chana Masala", 950),
        ("Aloo Gobi", 950),
        ("Mixed Vegetable Curry", 900),
        ("Vegetable Stir Fry", 950),
        ("Mushroom Pepper", 1150),
    ],

    "Breakfast": [
        ("Cheese Omelette", 750),
        ("Chicken Omelette", 950),
        ("Vegetable Omelette", 700),
        ("French Toast", 850),
        ("Chocolate Pancakes", 950),
        ("Banana Pancakes", 900),
        ("Blueberry Pancakes", 1100),
        ("Chicken Sandwich", 1050),
        ("Egg Sandwich", 800),
        ("Cheese Sandwich", 850),
        ("Chicken Wrap", 1000),
        ("Breakfast Burrito", 1200),
    ],

    "Desserts": [
        ("Chocolate Brownie", 750),
        ("Brownie Ice Cream", 950),
        ("Red Velvet Cake", 900),
        ("Vanilla Cake", 750),
        ("Black Forest Cake", 950),
        ("Cheesecake", 1000),
        ("Strawberry Cheesecake", 1100),
        ("Chocolate Mousse", 800),
        ("Mango Mousse", 800),
        ("Caramel Pudding", 700),
        ("Chocolate Pudding", 700),
        ("Ice Cream Sundae", 850),
    ],

    "Drinks": [
        ("Strawberry Milkshake", 850),
        ("Vanilla Milkshake", 800),
        ("Banana Milkshake", 750),
        ("Mango Milkshake", 850),
        ("Oreo Milkshake", 950),
        ("Peanut Butter Milkshake", 950),
        ("Iced Coffee", 750),
        ("Caramel Iced Coffee", 850),
        ("Cold Chocolate", 800),
        ("Fresh Orange Juice", 650),
        ("Watermelon Juice", 600),
        ("Pineapple Juice", 650),
    ],

    "Snacks": [
        ("Chicken Spring Rolls", 850),
        ("Vegetable Spring Rolls", 700),
        ("Chicken Samosa", 650),
        ("Vegetable Samosa", 550),
        ("Chicken Nuggets", 900),
        ("Cheese Balls", 850),
        ("Mozzarella Sticks", 950),
        ("Onion Rings", 700),
        ("Loaded Fries", 950),
        ("Cheesy Fries", 900),
        ("Chicken Popcorn", 950),
        ("Fish Fingers", 1050),
    ],

    "Indian": [
        ("Butter Naan", 500),
        ("Garlic Naan", 600),
        ("Cheese Naan", 750),
        ("Plain Naan", 450),
        ("Paneer Tikka Masala", 1500),
        ("Chicken Tikka Masala", 1650),
        ("Mutton Curry", 1900),
        ("Chicken Korma", 1700),
        ("Dal Tadka", 900),
        ("Chana Masala", 950),
        ("Aloo Paratha", 850),
        ("Paneer Paratha", 950),
    ],

    "Sri Lankan": [
        ("Chicken Kottu", 1400),
        ("Cheese Kottu", 1300),
        ("Beef Kottu", 1550),
        ("Mutton Kottu", 1750),
        ("Prawn Kottu", 1800),
        ("Vegetable Kottu", 1100),
        ("Egg Kottu", 1000),
        ("String Hopper Kottu", 1200),
        ("Chicken String Hoppers", 1300),
        ("Fish Curry Rice", 1400),
        ("Chicken Curry Rice", 1350),
        ("Mutton Curry Rice", 1700),
    ],
}


# ============================================================
# IMAGE KEYWORDS
# ============================================================

IMAGE_KEYWORDS = {
    "Burgers": "burger",
    "Pizza": "pizza",
    "Rice": "fried-rice",
    "Biryani": "biryani",
    "Noodles": "noodles",
    "Pasta": "pasta",
    "Chicken": "chicken-food",
    "Seafood": "seafood",
    "Vegetarian": "vegetarian-food",
    "Breakfast": "breakfast",
    "Desserts": "dessert",
    "Drinks": "drink",
    "Snacks": "snacks",
    "Indian": "indian-food",
    "Sri Lankan": "sri-lankan-food",
}


# ============================================================
# MAIN
# ============================================================

def seed_until_500():

    db = SessionLocal()

    try:

        # ----------------------------------------------------
        # Current foods
        # ----------------------------------------------------

        current_foods = db.query(Food).all()

        current_count = len(current_foods)

        print("=" * 60)
        print("FINAL FOOD SEED")
        print("=" * 60)
        print(f"Current foods : {current_count}")
        print("Target foods  : 500")

        if current_count >= 500:
            print()
            print("Already have 500 or more foods.")
            print("=" * 60)
            return

        # ----------------------------------------------------
        # Existing names
        # ----------------------------------------------------

        existing_names = {
            food.name.strip().lower()
            for food in current_foods
        }

        # ----------------------------------------------------
        # Valid categories
        # ----------------------------------------------------

        categories = (
            db.query(Category)
            .filter(
                Category.name.in_(list(FOOD_DATA.keys()))
            )
            .all()
        )

        category_map = {
            category.name: category
            for category in categories
        }

        # ----------------------------------------------------
        # Generate candidates
        # ----------------------------------------------------

        candidates = []

        for category_name, items in FOOD_DATA.items():

            for food_name, base_price in items:

                variations = [
                    "Special",
                    "Deluxe",
                    "Classic",
                    "Premium",
                    "Family",
                    "Spicy",
                    "Cheesy",
                    "Grilled",
                    "Crispy",
                    "Chef",
                ]

                # Original
                candidates.append(
                    (
                        food_name,
                        base_price,
                        category_name
                    )
                )

                # Variations
                for variation in variations:

                    candidates.append(
                        (
                            f"{variation} {food_name}",
                            base_price + 100,
                            category_name
                        )
                    )

        # ----------------------------------------------------
        # Add unique foods until 500
        # ----------------------------------------------------

        added = 0
        image_lock = current_count + 1

        for name, price, category_name in candidates:

            if current_count + added >= 500:
                break

            if category_name not in category_map:
                continue

            clean_name = name.strip().lower()

            if clean_name in existing_names:
                continue

            category = category_map[category_name]

            keyword = IMAGE_KEYWORDS.get(
                category_name,
                "food"
            )

            image_url = (
                f"https://loremflickr.com/800/600/"
                f"{keyword}?lock={image_lock}"
            )

            food = Food(
                name=name,
                description=(
                    f"Freshly prepared {name.lower()} "
                    f"made with quality ingredients."
                ),
                price=Decimal(str(price)),
                image=image_url,
                is_available=True,
                category_id=category.id
            )

            db.add(food)

            existing_names.add(clean_name)

            added += 1
            image_lock += 1

            print(
                f"[{current_count + added}/500] "
                f"Added: {name}"
            )

        # ----------------------------------------------------
        # Save
        # ----------------------------------------------------

        db.commit()

        # ----------------------------------------------------
        # Final count
        # ----------------------------------------------------

        final_count = db.query(Food).count()

        print()
        print("=" * 60)
        print("FINAL FOOD SEED COMPLETED")
        print("=" * 60)
        print(f"New foods added : {added}")
        print(f"Total foods     : {final_count}")
        print("=" * 60)

        if final_count == 500:
            print("SUCCESS!")
            print("EXACTLY 500 FOODS ARE NOW AVAILABLE.")
        else:
            print(
                f"{500 - final_count} foods are still needed."
            )

    except Exception as error:

        db.rollback()

        print()
        print("=" * 60)
        print("SEED ERROR")
        print("=" * 60)
        print(error)
        print("=" * 60)

        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_until_500()