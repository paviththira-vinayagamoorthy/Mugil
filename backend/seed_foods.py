from decimal import Decimal

from app.db.database import SessionLocal

# Import Food first because Category has relationship with Food
from app.models.food import Food
from app.models.category import Category
from app.models.customer import Customer
from app.models.order_item import OrderItem
from app.models.order import Order
from app.models.user import User


# =========================================================
# CATEGORIES
# =========================================================

CATEGORIES = [
    {
        "name": "Burgers",
        "description": "Delicious burgers with different fillings and toppings."
    },
    {
        "name": "Pizza",
        "description": "Freshly baked pizzas with tasty toppings."
    },
    {
        "name": "Rice",
        "description": "Popular rice dishes with delicious flavours."
    },
    {
        "name": "Biryani",
        "description": "Aromatic and flavourful biryani dishes."
    },
    {
        "name": "Noodles",
        "description": "Tasty noodles prepared with vegetables, meat and sauces."
    },
    {
        "name": "Pasta",
        "description": "Creamy and flavourful pasta dishes."
    },
    {
        "name": "Chicken",
        "description": "Delicious chicken-based meals."
    },
    {
        "name": "Seafood",
        "description": "Fresh and tasty seafood dishes."
    },
    {
        "name": "Vegetarian",
        "description": "Fresh vegetarian meals and dishes."
    },
    {
        "name": "Breakfast",
        "description": "Delicious breakfast options."
    },
    {
        "name": "Desserts",
        "description": "Sweet desserts and treats."
    },
    {
        "name": "Drinks",
        "description": "Refreshing cold and hot drinks."
    },
    {
        "name": "Snacks",
        "description": "Quick and delicious snacks."
    },
    {
        "name": "Indian",
        "description": "Popular Indian dishes and flavours."
    },
    {
        "name": "Sri Lankan",
        "description": "Traditional Sri Lankan food and flavours."
    },
]


# =========================================================
# FOOD DATA
# =========================================================

FOODS = [
    # -----------------------------------------------------
    # BURGERS
    # -----------------------------------------------------

    ("Classic Chicken Burger", "Burgers", 950),
    ("Spicy Chicken Burger", "Burgers", 1050),
    ("Crispy Chicken Burger", "Burgers", 1100),
    ("Cheese Chicken Burger", "Burgers", 1200),
    ("Double Chicken Burger", "Burgers", 1450),
    ("BBQ Chicken Burger", "Burgers", 1250),
    ("Peri Peri Chicken Burger", "Burgers", 1300),
    ("Grilled Chicken Burger", "Burgers", 1150),
    ("Zinger Burger", "Burgers", 1350),
    ("Mexican Chicken Burger", "Burgers", 1400),
    ("Classic Beef Burger", "Burgers", 1200),
    ("Cheese Beef Burger", "Burgers", 1350),
    ("Double Beef Burger", "Burgers", 1600),
    ("BBQ Beef Burger", "Burgers", 1450),
    ("Mushroom Beef Burger", "Burgers", 1500),
    ("Veggie Burger", "Burgers", 850),
    ("Cheese Veggie Burger", "Burgers", 950),
    ("Spicy Veggie Burger", "Burgers", 900),
    ("Crispy Fish Burger", "Burgers", 1250),
    ("Spicy Fish Burger", "Burgers", 1350),

    # -----------------------------------------------------
    # PIZZA
    # -----------------------------------------------------

    ("Margherita Pizza", "Pizza", 1600),
    ("Chicken Cheese Pizza", "Pizza", 1900),
    ("Spicy Chicken Pizza", "Pizza", 2100),
    ("BBQ Chicken Pizza", "Pizza", 2200),
    ("Chicken Tikka Pizza", "Pizza", 2300),
    ("Peri Peri Chicken Pizza", "Pizza", 2250),
    ("Pepperoni Pizza", "Pizza", 2400),
    ("Beef Pepperoni Pizza", "Pizza", 2450),
    ("Seafood Pizza", "Pizza", 2600),
    ("Prawn Pizza", "Pizza", 2700),
    ("Tuna Pizza", "Pizza", 2200),
    ("Vegetable Pizza", "Pizza", 1700),
    ("Mushroom Pizza", "Pizza", 1850),
    ("Cheese Burst Pizza", "Pizza", 2300),
    ("Four Cheese Pizza", "Pizza", 2500),
    ("Hawaiian Pizza", "Pizza", 2100),
    ("Mexican Pizza", "Pizza", 2250),
    ("Italian Pizza", "Pizza", 2400),
    ("Garlic Chicken Pizza", "Pizza", 2150),
    ("Double Cheese Pizza", "Pizza", 2200),

    # -----------------------------------------------------
    # RICE
    # -----------------------------------------------------

    ("Chicken Fried Rice", "Rice", 1200),
    ("Egg Fried Rice", "Rice", 950),
    ("Vegetable Fried Rice", "Rice", 850),
    ("Mixed Fried Rice", "Rice", 1450),
    ("Seafood Fried Rice", "Rice", 1550),
    ("Prawn Fried Rice", "Rice", 1600),
    ("Beef Fried Rice", "Rice", 1350),
    ("Spicy Chicken Rice", "Rice", 1250),
    ("Devilled Chicken Rice", "Rice", 1400),
    ("Thai Chicken Rice", "Rice", 1500),
    ("Chinese Chicken Rice", "Rice", 1450),
    ("Garlic Rice", "Rice", 850),
    ("Mushroom Rice", "Rice", 950),
    ("Cashew Rice", "Rice", 1100),
    ("Vegetable Rice Bowl", "Rice", 900),
    ("Chicken Rice Bowl", "Rice", 1250),
    ("Beef Rice Bowl", "Rice", 1400),
    ("Prawn Rice Bowl", "Rice", 1550),
    ("Spicy Seafood Rice", "Rice", 1650),
    ("Special Mixed Rice", "Rice", 1700),

    # -----------------------------------------------------
    # BIRYANI
    # -----------------------------------------------------

    ("Chicken Biryani", "Biryani", 1500),
    ("Mutton Biryani", "Biryani", 1900),
    ("Beef Biryani", "Biryani", 1750),
    ("Prawn Biryani", "Biryani", 2000),
    ("Egg Biryani", "Biryani", 1200),
    ("Vegetable Biryani", "Biryani", 1100),
    ("Chicken Tikka Biryani", "Biryani", 1750),
    ("Hyderabadi Chicken Biryani", "Biryani", 1800),
    ("Spicy Chicken Biryani", "Biryani", 1650),
    ("Special Chicken Biryani", "Biryani", 1900),
    ("Family Chicken Biryani", "Biryani", 4500),
    ("Family Mutton Biryani", "Biryani", 5500),
    ("Seafood Biryani", "Biryani", 2100),
    ("Fish Biryani", "Biryani", 1750),
    ("Prawn Special Biryani", "Biryani", 2300),
    ("Cheese Chicken Biryani", "Biryani", 2000),
    ("Masala Chicken Biryani", "Biryani", 1700),
    ("Butter Chicken Biryani", "Biryani", 1900),
    ("Kashmiri Biryani", "Biryani", 1800),
    ("Royal Mixed Biryani", "Biryani", 2400),

    # -----------------------------------------------------
    # NOODLES
    # -----------------------------------------------------

    ("Chicken Noodles", "Noodles", 1100),
    ("Egg Noodles", "Noodles", 900),
    ("Vegetable Noodles", "Noodles", 850),
    ("Mixed Noodles", "Noodles", 1350),
    ("Seafood Noodles", "Noodles", 1500),
    ("Prawn Noodles", "Noodles", 1550),
    ("Beef Noodles", "Noodles", 1300),
    ("Spicy Chicken Noodles", "Noodles", 1200),
    ("Singapore Noodles", "Noodles", 1400),
    ("Hong Kong Noodles", "Noodles", 1450),
    ("Thai Noodles", "Noodles", 1350),
    ("Chilli Garlic Noodles", "Noodles", 1250),
    ("Schezwan Noodles", "Noodles", 1400),
    ("Cheese Noodles", "Noodles", 1300),
    ("Crispy Noodles", "Noodles", 1200),
    ("Chicken Chow Mein", "Noodles", 1350),
    ("Vegetable Chow Mein", "Noodles", 1100),
    ("Special Chow Mein", "Noodles", 1500),
    ("Garlic Chicken Noodles", "Noodles", 1300),
    ("Hot Chicken Noodles", "Noodles", 1250),

    # -----------------------------------------------------
    # PASTA
    # -----------------------------------------------------

    ("Chicken Alfredo Pasta", "Pasta", 1500),
    ("Chicken Carbonara", "Pasta", 1600),
    ("Spaghetti Bolognese", "Pasta", 1650),
    ("Chicken Arrabbiata", "Pasta", 1450),
    ("Seafood Pasta", "Pasta", 1900),
    ("Prawn Pasta", "Pasta", 1950),
    ("Creamy Mushroom Pasta", "Pasta", 1400),
    ("Cheese Pasta", "Pasta", 1350),
    ("Spicy Chicken Pasta", "Pasta", 1550),
    ("Garlic Chicken Pasta", "Pasta", 1500),
    ("Tomato Basil Pasta", "Pasta", 1250),
    ("Vegetable Pasta", "Pasta", 1200),
    ("Beef Pasta", "Pasta", 1700),
    ("Creamy Seafood Pasta", "Pasta", 2000),
    ("Four Cheese Pasta", "Pasta", 1700),
    ("Pesto Chicken Pasta", "Pasta", 1600),
    ("Pesto Vegetable Pasta", "Pasta", 1400),
    ("Lasagna", "Pasta", 1800),
    ("Chicken Lasagna", "Pasta", 1950),
    ("Beef Lasagna", "Pasta", 2100),

    # -----------------------------------------------------
    # CHICKEN
    # -----------------------------------------------------

    ("Chicken 65", "Chicken", 1100),
    ("Chicken Tikka", "Chicken", 1400),
    ("Chicken Kebab", "Chicken", 1300),
    ("Chicken Wings", "Chicken", 1200),
    ("Spicy Chicken Wings", "Chicken", 1300),
    ("BBQ Chicken Wings", "Chicken", 1350),
    ("Chicken Nuggets", "Chicken", 1000),
    ("Crispy Chicken Strips", "Chicken", 1100),
    ("Chicken Popcorn", "Chicken", 950),
    ("Devilled Chicken", "Chicken", 1450),
    ("Chilli Chicken", "Chicken", 1400),
    ("Garlic Chicken", "Chicken", 1350),
    ("Pepper Chicken", "Chicken", 1400),
    ("Butter Chicken", "Chicken", 1550),
    ("Chicken Masala", "Chicken", 1450),
    ("Chicken Curry", "Chicken", 1300),
    ("Chicken Korma", "Chicken", 1600),
    ("Chicken Manchurian", "Chicken", 1500),
    ("Tandoori Chicken", "Chicken", 1700),
    ("Grilled Chicken", "Chicken", 1650),

    # -----------------------------------------------------
    # SEAFOOD
    # -----------------------------------------------------

    ("Fried Fish", "Seafood", 1300),
    ("Spicy Fried Fish", "Seafood", 1400),
    ("Fish and Chips", "Seafood", 1550),
    ("Grilled Fish", "Seafood", 1700),
    ("Fish Curry", "Seafood", 1300),
    ("Devilled Fish", "Seafood", 1450),
    ("Chilli Fish", "Seafood", 1500),
    ("Garlic Fish", "Seafood", 1500),
    ("Prawn Curry", "Seafood", 1700),
    ("Devilled Prawns", "Seafood", 1800),
    ("Garlic Prawns", "Seafood", 1750),
    ("Butter Prawns", "Seafood", 1900),
    ("Prawn Tempura", "Seafood", 1850),
    ("Calamari Rings", "Seafood", 1600),
    ("Fried Calamari", "Seafood", 1650),
    ("Seafood Platter", "Seafood", 2800),
    ("Seafood Soup", "Seafood", 1400),
    ("Crab Curry", "Seafood", 2200),
    ("Tuna Steak", "Seafood", 2000),
    ("Prawn Cocktail", "Seafood", 1800),

    # -----------------------------------------------------
    # VEGETARIAN
    # -----------------------------------------------------

    ("Vegetable Curry", "Vegetarian", 800),
    ("Mixed Vegetable Curry", "Vegetarian", 950),
    ("Paneer Curry", "Vegetarian", 1300),
    ("Paneer Tikka", "Vegetarian", 1400),
    ("Palak Paneer", "Vegetarian", 1350),
    ("Chana Masala", "Vegetarian", 1000),
    ("Dal Curry", "Vegetarian", 750),
    ("Mushroom Curry", "Vegetarian", 1100),
    ("Mushroom Fry", "Vegetarian", 1000),
    ("Vegetable Korma", "Vegetarian", 1200),
    ("Vegetable Manchurian", "Vegetarian", 1250),
    ("Gobi Manchurian", "Vegetarian", 1200),
    ("Aloo Gobi", "Vegetarian", 950),
    ("Vegetable Stir Fry", "Vegetarian", 1000),
    ("Tofu Stir Fry", "Vegetarian", 1100),
    ("Paneer Fried Rice", "Vegetarian", 1200),
    ("Paneer Noodles", "Vegetarian", 1200),
    ("Vegetable Samosa", "Vegetarian", 500),
    ("Cheese Samosa", "Vegetarian", 650),
    ("Vegetable Spring Rolls", "Vegetarian", 750),

    # -----------------------------------------------------
    # BREAKFAST
    # -----------------------------------------------------

    ("Plain Dosa", "Breakfast", 500),
    ("Masala Dosa", "Breakfast", 750),
    ("Cheese Dosa", "Breakfast", 850),
    ("Chicken Dosa", "Breakfast", 1000),
    ("Idli", "Breakfast", 450),
    ("Vada", "Breakfast", 400),
    ("Idli Vada Combo", "Breakfast", 650),
    ("Pongal", "Breakfast", 650),
    ("Poori Masala", "Breakfast", 700),
    ("Egg Roti", "Breakfast", 550),
    ("Cheese Roti", "Breakfast", 650),
    ("Chicken Roti", "Breakfast", 900),
    ("Vegetable Roti", "Breakfast", 650),
    ("Egg Sandwich", "Breakfast", 700),
    ("Chicken Sandwich", "Breakfast", 950),
    ("Club Sandwich", "Breakfast", 1300),
    ("French Toast", "Breakfast", 750),
    ("Pancakes", "Breakfast", 850),
    ("Waffles", "Breakfast", 900),
    ("Breakfast Combo", "Breakfast", 1400),

    # -----------------------------------------------------
    # DESSERTS
    # -----------------------------------------------------

    ("Chocolate Cake", "Desserts", 750),
    ("Vanilla Cake", "Desserts", 700),
    ("Red Velvet Cake", "Desserts", 900),
    ("Black Forest Cake", "Desserts", 850),
    ("Cheesecake", "Desserts", 950),
    ("Chocolate Brownie", "Desserts", 650),
    ("Brownie with Ice Cream", "Desserts", 900),
    ("Chocolate Lava Cake", "Desserts", 950),
    ("Chocolate Mousse", "Desserts", 700),
    ("Strawberry Mousse", "Desserts", 700),
    ("Ice Cream Sundae", "Desserts", 850),
    ("Chocolate Sundae", "Desserts", 900),
    ("Vanilla Ice Cream", "Desserts", 500),
    ("Chocolate Ice Cream", "Desserts", 550),
    ("Strawberry Ice Cream", "Desserts", 550),
    ("Fruit Salad", "Desserts", 650),
    ("Fruit Custard", "Desserts", 700),
    ("Caramel Pudding", "Desserts", 650),
    ("Watalappam", "Desserts", 600),
    ("Chocolate Donut", "Desserts", 500),

    # -----------------------------------------------------
    # DRINKS
    # -----------------------------------------------------

    ("Fresh Lime Juice", "Drinks", 450),
    ("Sweet Lime Juice", "Drinks", 500),
    ("Orange Juice", "Drinks", 550),
    ("Mango Juice", "Drinks", 600),
    ("Pineapple Juice", "Drinks", 550),
    ("Watermelon Juice", "Drinks", 500),
    ("Passion Fruit Juice", "Drinks", 600),
    ("Avocado Juice", "Drinks", 650),
    ("Mixed Fruit Juice", "Drinks", 700),
    ("Mango Smoothie", "Drinks", 750),
    ("Strawberry Smoothie", "Drinks", 750),
    ("Chocolate Milkshake", "Drinks", 800),
    ("Vanilla Milkshake", "Drinks", 750),
    ("Strawberry Milkshake", "Drinks", 800),
    ("Oreo Milkshake", "Drinks", 850),
    ("Iced Coffee", "Drinks", 650),
    ("Cappuccino", "Drinks", 700),
    ("Latte", "Drinks", 700),
    ("Hot Chocolate", "Drinks", 650),
    ("Iced Tea", "Drinks", 500),

    # -----------------------------------------------------
    # SNACKS
    # -----------------------------------------------------

    ("French Fries", "Snacks", 600),
    ("Cheese Fries", "Snacks", 800),
    ("Spicy Fries", "Snacks", 700),
    ("Loaded Fries", "Snacks", 950),
    ("Chicken Nuggets", "Snacks", 900),
    ("Chicken Popcorn", "Snacks", 850),
    ("Fish Fingers", "Snacks", 1000),
    ("Chicken Samosa", "Snacks", 550),
    ("Vegetable Samosa", "Snacks", 450),
    ("Chicken Spring Rolls", "Snacks", 750),
    ("Vegetable Spring Rolls", "Snacks", 650),
    ("Cheese Balls", "Snacks", 800),
    ("Chicken Cheese Balls", "Snacks", 950),
    ("Garlic Bread", "Snacks", 650),
    ("Cheese Garlic Bread", "Snacks", 850),
    ("Chicken Garlic Bread", "Snacks", 1000),
    ("Onion Rings", "Snacks", 650),
    ("Mozzarella Sticks", "Snacks", 900),
    ("Nachos", "Snacks", 850),
    ("Chicken Nachos", "Snacks", 1100),

    # -----------------------------------------------------
    # INDIAN
    # -----------------------------------------------------

    ("Butter Naan", "Indian", 400),
    ("Garlic Naan", "Indian", 500),
    ("Cheese Naan", "Indian", 650),
    ("Chicken Naan", "Indian", 900),
    ("Tandoori Roti", "Indian", 350),
    ("Paneer Naan", "Indian", 750),
    ("Chicken Tikka Masala", "Indian", 1600),
    ("Paneer Butter Masala", "Indian", 1400),
    ("Dal Tadka", "Indian", 950),
    ("Dal Makhani", "Indian", 1100),
    ("Chana Masala Indian", "Indian", 950),
    ("Rajma Masala", "Indian", 1000),
    ("Palak Paneer Indian", "Indian", 1300),
    ("Aloo Gobi Indian", "Indian", 900),
    ("Chicken Vindaloo", "Indian", 1550),
    ("Chicken Korma Indian", "Indian", 1600),
    ("Mutton Curry Indian", "Indian", 1800),
    ("Fish Masala Indian", "Indian", 1500),
    ("Prawn Masala Indian", "Indian", 1750),
    ("Indian Thali", "Indian", 2200),

    # -----------------------------------------------------
    # SRI LANKAN
    # -----------------------------------------------------

    ("Chicken Kottu", "Sri Lankan", 1300),
    ("Cheese Kottu", "Sri Lankan", 1500),
    ("Egg Kottu", "Sri Lankan", 1000),
    ("Vegetable Kottu", "Sri Lankan", 900),
    ("Dolphin Kottu", "Sri Lankan", 1400),
    ("Chicken String Hopper Kottu", "Sri Lankan", 1250),
    ("Parotta with Chicken Curry", "Sri Lankan", 1300),
    ("Parotta with Beef Curry", "Sri Lankan", 1450),
    ("String Hoppers with Chicken Curry", "Sri Lankan", 1250),
    ("String Hoppers with Fish Curry", "Sri Lankan", 1150),
    ("String Hoppers with Dhal Curry", "Sri Lankan", 850),
    ("Milk Rice", "Sri Lankan", 600),
    ("Pol Sambol with Roti", "Sri Lankan", 650),
    ("Coconut Roti", "Sri Lankan", 500),
    ("Egg Roti Sri Lankan", "Sri Lankan", 550),
    ("Chicken Curry Rice Sri Lankan", "Sri Lankan", 1200),
    ("Fish Curry Rice Sri Lankan", "Sri Lankan", 1100),
    ("Dhal Curry Rice Sri Lankan", "Sri Lankan", 800),
    ("Lamprais", "Sri Lankan", 1800),
    ("Sri Lankan Rice and Curry", "Sri Lankan", 1500),
]


# =========================================================
# IMAGE KEYWORDS
# =========================================================

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


# =========================================================
# CREATE / GET CATEGORIES
# =========================================================

def create_categories(db):

    category_map = {}

    for category_data in CATEGORIES:

        category = (
            db.query(Category)
            .filter(
                Category.name == category_data["name"]
            )
            .first()
        )

        if not category:

            category = Category(
                name=category_data["name"],
                description=category_data["description"]
            )

            db.add(category)
            db.flush()

        category_map[category.name] = category.id

    return category_map


# =========================================================
# CREATE FOODS
# =========================================================

def create_foods(db, category_map):

    existing_names = {
        food.name
        for food in db.query(Food).all()
    }

    added_count = 0

    for index, (
        name,
        category_name,
        price
    ) in enumerate(FOODS, start=1):

        if name in existing_names:
            continue

        keyword = IMAGE_KEYWORDS.get(
            category_name,
            "food"
        )

        image_url = (
            f"https://loremflickr.com/800/600/"
            f"{keyword}?lock={index}"
        )

        food = Food(
            name=name,
            description=(
                f"Delicious {name.lower()} "
                f"prepared fresh for you."
            ),
            price=Decimal(str(price)),
            image=image_url,
            is_available=True,
            category_id=category_map[category_name]
        )

        db.add(food)

        added_count += 1

    db.commit()

    return added_count


# =========================================================
# MAIN
# =========================================================

def main():

    print("=" * 60)
    print("FOOD ORDERING SYSTEM - FOOD SEED")
    print("=" * 60)

    db = SessionLocal()

    try:

        print("\nCreating/checking categories...")

        category_map = create_categories(db)

        print(
            f"Categories ready: {len(category_map)}"
        )

        print("\nAdding foods...")

        added_count = create_foods(
            db,
            category_map
        )

        total_foods = (
            db.query(Food).count()
        )

        print("\n" + "=" * 60)
        print("SEED COMPLETED")
        print("=" * 60)

        print(
            f"New foods added : {added_count}"
        )

        print(
            f"Total foods     : {total_foods}"
        )

        print(
            f"Total categories: {len(category_map)}"
        )

        print("=" * 60)

    except Exception as error:

        db.rollback()

        print("\nERROR:")
        print(error)

    finally:

        db.close()


# =========================================================
# RUN
# =========================================================

if __name__ == "__main__":
    main()