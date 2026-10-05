from decimal import Decimal

from app.db.database import SessionLocal

# Import ALL models
from app.models.food import Food
from app.models.category import Category
from app.models.customer import Customer
from app.models.order_item import OrderItem
from app.models.order import Order
from app.models.user import User


# ============================================================
# 200 NEW FOODS
# ============================================================

FOODS = [
    # ========================================================
    # BURGERS - 15
    # ========================================================
    ("Double Chicken Burger", "Juicy double chicken burger with fresh vegetables.", 1450, "Burgers"),
    ("Spicy Chicken Burger", "Spicy crispy chicken burger with special sauce.", 1350, "Burgers"),
    ("Crispy Chicken Burger", "Crispy fried chicken burger with lettuce.", 1250, "Burgers"),
    ("BBQ Chicken Burger", "Chicken burger with smoky BBQ sauce.", 1400, "Burgers"),
    ("Cheese Chicken Burger", "Chicken burger loaded with melted cheese.", 1500, "Burgers"),
    ("Classic Beef Burger", "Classic beef burger with fresh vegetables.", 1550, "Burgers"),
    ("Double Beef Burger", "Double beef patties with cheese and sauce.", 1850, "Burgers"),
    ("Cheesy Beef Burger", "Beef burger with extra melted cheese.", 1750, "Burgers"),
    ("BBQ Beef Burger", "Grilled beef burger with BBQ sauce.", 1700, "Burgers"),
    ("Jalapeno Burger", "Spicy burger with jalapenos and cheese.", 1550, "Burgers"),
    ("Mushroom Burger", "Burger topped with sauteed mushrooms.", 1450, "Burgers"),
    ("Mexican Burger", "Mexican style burger with spicy salsa.", 1600, "Burgers"),
    ("Double Cheese Burger", "Two patties with double cheese.", 1800, "Burgers"),
    ("Chicken Tower Burger", "Tall chicken burger with crispy layers.", 1650, "Burgers"),
    ("Crispy Fish Burger", "Crispy fish fillet burger with tartar sauce.", 1450, "Burgers"),

    # ========================================================
    # PIZZA - 15
    # ========================================================
    ("Chicken Cheese Pizza", "Chicken pizza with extra mozzarella cheese.", 2200, "Pizza"),
    ("Spicy Chicken Pizza", "Spicy chicken pizza with fresh peppers.", 2300, "Pizza"),
    ("BBQ Chicken Pizza", "BBQ chicken pizza with smoky sauce.", 2400, "Pizza"),
    ("Chicken Tikka Pizza", "Chicken tikka pizza with aromatic spices.", 2350, "Pizza"),
    ("Pepperoni Pizza", "Classic pepperoni pizza with mozzarella.", 2500, "Pizza"),
    ("Beef Pepperoni Pizza", "Beef pepperoni pizza with cheese.", 2600, "Pizza"),
    ("Four Cheese Pizza", "Pizza with four delicious cheese varieties.", 2700, "Pizza"),
    ("Mushroom Cheese Pizza", "Mushroom and cheese loaded pizza.", 2250, "Pizza"),
    ("Vegetable Supreme Pizza", "Mixed vegetable pizza with cheese.", 2100, "Pizza"),
    ("Hawaiian Pizza", "Chicken, pineapple and cheese pizza.", 2450, "Pizza"),
    ("Seafood Pizza", "Seafood pizza with prawns and fish.", 2800, "Pizza"),
    ("Prawn Pizza", "Fresh prawn pizza with mozzarella.", 2900, "Pizza"),
    ("Mexican Pizza", "Spicy Mexican style pizza.", 2400, "Pizza"),
    ("Paneer Pizza", "Indian paneer pizza with spices.", 2300, "Pizza"),
    ("Garlic Chicken Pizza", "Garlic chicken pizza with herbs.", 2350, "Pizza"),

    # ========================================================
    # RICE - 15
    # ========================================================
    ("Chicken Garlic Rice", "Fried rice with chicken and garlic.", 1250, "Rice"),
    ("Chicken Pepper Rice", "Pepper chicken fried rice.", 1300, "Rice"),
    ("Chicken Schezwan Rice", "Spicy Schezwan chicken fried rice.", 1400, "Rice"),
    ("Beef Fried Rice", "Fried rice with tender beef.", 1500, "Rice"),
    ("Beef Schezwan Rice", "Spicy Schezwan beef rice.", 1600, "Rice"),
    ("Prawn Fried Rice", "Fried rice with fresh prawns.", 1700, "Rice"),
    ("Seafood Fried Rice", "Mixed seafood fried rice.", 1800, "Rice"),
    ("Egg Fried Rice", "Classic fried rice with eggs.", 950, "Rice"),
    ("Vegetable Garlic Rice", "Garlic fried rice with vegetables.", 900, "Rice"),
    ("Chinese Chicken Rice", "Chinese style chicken rice.", 1350, "Rice"),
    ("Thai Chicken Rice", "Thai inspired chicken fried rice.", 1450, "Rice"),
    ("Spicy Mixed Rice", "Spicy mixed meat and vegetable rice.", 1650, "Rice"),
    ("Mushroom Fried Rice", "Fried rice with fresh mushrooms.", 1050, "Rice"),
    ("Paneer Fried Rice", "Indian style paneer fried rice.", 1200, "Rice"),
    ("Cashew Chicken Rice", "Chicken rice with roasted cashews.", 1550, "Rice"),

    # ========================================================
    # BIRYANI - 15
    # ========================================================
    ("Mutton Biryani", "Aromatic basmati rice with tender mutton.", 1900, "Biryani"),
    ("Beef Biryani", "Fragrant beef biryani with spices.", 1750, "Biryani"),
    ("Prawn Biryani", "Aromatic biryani with fresh prawns.", 2100, "Biryani"),
    ("Fish Biryani", "Spiced fish biryani with basmati rice.", 1800, "Biryani"),
    ("Egg Biryani", "Aromatic egg biryani with spices.", 1200, "Biryani"),
    ("Vegetable Biryani", "Fresh vegetable biryani with herbs.", 1100, "Biryani"),
    ("Paneer Biryani", "Paneer biryani with aromatic spices.", 1350, "Biryani"),
    ("Chicken Tikka Biryani", "Chicken tikka served with fragrant rice.", 1800, "Biryani"),
    ("Hyderabadi Chicken Biryani", "Traditional Hyderabadi chicken biryani.", 1850, "Biryani"),
    ("Hyderabadi Mutton Biryani", "Rich Hyderabadi mutton biryani.", 2200, "Biryani"),
    ("Spicy Chicken Biryani", "Extra spicy chicken biryani.", 1750, "Biryani"),
    ("Royal Chicken Biryani", "Premium chicken biryani with cashews.", 2100, "Biryani"),
    ("Special Mixed Biryani", "Mixed meat biryani with rich spices.", 2300, "Biryani"),
    ("Cashew Chicken Biryani", "Chicken biryani topped with cashews.", 1950, "Biryani"),
    ("Kebab Biryani", "Aromatic rice served with juicy kebabs.", 2000, "Biryani"),

    # ========================================================
    # NOODLES - 15
    # ========================================================
    ("Chicken Hakka Noodles", "Classic Hakka noodles with chicken.", 1200, "Noodles"),
    ("Beef Hakka Noodles", "Hakka noodles with tender beef.", 1400, "Noodles"),
    ("Prawn Hakka Noodles", "Hakka noodles with fresh prawns.", 1550, "Noodles"),
    ("Seafood Noodles", "Mixed seafood noodles with vegetables.", 1650, "Noodles"),
    ("Egg Noodles", "Stir fried noodles with egg.", 900, "Noodles"),
    ("Vegetable Noodles", "Fresh vegetable stir fried noodles.", 850, "Noodles"),
    ("Schezwan Chicken Noodles", "Spicy Schezwan chicken noodles.", 1350, "Noodles"),
    ("Schezwan Beef Noodles", "Spicy Schezwan beef noodles.", 1500, "Noodles"),
    ("Singapore Noodles", "Singapore style spicy noodles.", 1250, "Noodles"),
    ("Thai Noodles", "Thai style noodles with vegetables.", 1300, "Noodles"),
    ("Garlic Chicken Noodles", "Garlic flavored chicken noodles.", 1250, "Noodles"),
    ("Spicy Seafood Noodles", "Hot and spicy seafood noodles.", 1750, "Noodles"),
    ("Mushroom Noodles", "Stir fried mushroom noodles.", 950, "Noodles"),
    ("Paneer Noodles", "Noodles with spicy paneer.", 1100, "Noodles"),
    ("Mixed Meat Noodles", "Noodles with chicken, beef and vegetables.", 1600, "Noodles"),

    # ========================================================
    # PASTA - 15
    # ========================================================
    ("Chicken Carbonara", "Creamy pasta with chicken and herbs.", 1600, "Pasta"),
    ("Beef Carbonara", "Creamy pasta with tender beef.", 1750, "Pasta"),
    ("Chicken Arrabbiata", "Spicy tomato pasta with chicken.", 1500, "Pasta"),
    ("Beef Arrabbiata", "Spicy tomato pasta with beef.", 1650, "Pasta"),
    ("Prawn Alfredo", "Creamy Alfredo pasta with prawns.", 1900, "Pasta"),
    ("Chicken Pesto Pasta", "Chicken pasta with fresh pesto sauce.", 1700, "Pasta"),
    ("Vegetable Pesto Pasta", "Pesto pasta with fresh vegetables.", 1400, "Pasta"),
    ("Seafood Pasta", "Creamy pasta with mixed seafood.", 2100, "Pasta"),
    ("Cheesy Chicken Pasta", "Chicken pasta with extra cheese.", 1750, "Pasta"),
    ("Spicy Chicken Pasta", "Spicy pasta with chicken and peppers.", 1600, "Pasta"),
    ("Mushroom Cream Pasta", "Creamy mushroom pasta.", 1450, "Pasta"),
    ("Four Cheese Pasta", "Creamy pasta with four cheeses.", 1650, "Pasta"),
    ("Garlic Prawn Pasta", "Garlic prawns tossed with pasta.", 1950, "Pasta"),
    ("Tomato Basil Pasta", "Classic tomato and basil pasta.", 1250, "Pasta"),
    ("Lasagna Special", "Layered pasta with meat and cheese.", 1800, "Pasta"),

    # ========================================================
    # CHICKEN - 15
    # ========================================================
    ("Chicken Manchurian", "Crispy chicken in Manchurian sauce.", 1450, "Chicken"),
    ("Chicken Chilli", "Spicy chilli chicken with peppers.", 1500, "Chicken"),
    ("Chicken Devilled", "Sri Lankan style spicy devilled chicken.", 1550, "Chicken"),
    ("Chicken Pepper Fry", "Pepper fried chicken with spices.", 1500, "Chicken"),
    ("Chicken Kebab", "Juicy grilled chicken kebabs.", 1400, "Chicken"),
    ("Chicken Tikka", "Grilled chicken tikka with spices.", 1450, "Chicken"),
    ("Chicken Wings", "Crispy fried chicken wings.", 1350, "Chicken"),
    ("BBQ Chicken Wings", "Chicken wings with BBQ glaze.", 1450, "Chicken"),
    ("Spicy Chicken Wings", "Hot and spicy crispy wings.", 1450, "Chicken"),
    ("Chicken Drumsticks", "Crispy fried chicken drumsticks.", 1500, "Chicken"),
    ("Grilled Chicken", "Healthy grilled chicken with herbs.", 1650, "Chicken"),
    ("Butter Chicken", "Creamy Indian butter chicken.", 1700, "Chicken"),
    ("Chicken Korma", "Rich creamy chicken curry.", 1750, "Chicken"),
    ("Chicken Masala", "Spicy chicken cooked in masala gravy.", 1550, "Chicken"),
    ("Chicken Curry Special", "Traditional spicy chicken curry.", 1500, "Chicken"),

    # ========================================================
    # SEAFOOD - 15
    # ========================================================
    ("Garlic Prawns", "Fresh prawns cooked with garlic butter.", 1900, "Seafood"),
    ("Devilled Prawns", "Spicy Sri Lankan style devilled prawns.", 1950, "Seafood"),
    ("Chilli Prawns", "Prawns cooked with chilli and peppers.", 1900, "Seafood"),
    ("Prawn Tempura", "Crispy Japanese style prawn tempura.", 2100, "Seafood"),
    ("Grilled Prawns", "Fresh prawns grilled with herbs.", 2200, "Seafood"),
    ("Butter Prawns", "Prawns cooked in creamy butter sauce.", 2150, "Seafood"),
    ("Fried Fish Fillet", "Crispy fried fish fillet.", 1700, "Seafood"),
    ("Grilled Fish Fillet", "Fresh grilled fish with herbs.", 1800, "Seafood"),
    ("Fish and Chips", "Crispy fish with golden fries.", 1650, "Seafood"),
    ("Devilled Fish", "Spicy devilled fish with vegetables.", 1750, "Seafood"),
    ("Fish Curry", "Traditional spicy fish curry.", 1550, "Seafood"),
    ("Crab Curry", "Sri Lankan style spicy crab curry.", 2400, "Seafood"),
    ("Crab Pepper", "Fresh crab cooked with black pepper.", 2500, "Seafood"),
    ("Seafood Platter", "Mixed seafood platter for sharing.", 3200, "Seafood"),
    ("Calamari Fry", "Crispy fried calamari rings.", 1850, "Seafood"),

    # ========================================================
    # VEGETARIAN - 15
    # ========================================================
    ("Vegetable Manchurian", "Crispy vegetable balls in Manchurian sauce.", 1100, "Vegetarian"),
    ("Paneer Butter Masala", "Paneer cooked in creamy tomato gravy.", 1450, "Vegetarian"),
    ("Palak Paneer", "Paneer cooked with spinach.", 1400, "Vegetarian"),
    ("Chilli Paneer", "Spicy paneer with peppers.", 1350, "Vegetarian"),
    ("Paneer Tikka", "Grilled paneer with Indian spices.", 1400, "Vegetarian"),
    ("Vegetable Korma", "Mixed vegetables in creamy gravy.", 1200, "Vegetarian"),
    ("Dal Curry", "Traditional lentil curry.", 850, "Vegetarian"),
    ("Chana Masala", "Spiced chickpea curry.", 950, "Vegetarian"),
    ("Aloo Gobi", "Potato and cauliflower curry.", 950, "Vegetarian"),
    ("Mixed Vegetable Curry", "Fresh mixed vegetable curry.", 900, "Vegetarian"),
    ("Vegetable Stir Fry", "Fresh vegetables stir fried with herbs.", 950, "Vegetarian"),
    ("Mushroom Pepper", "Mushrooms cooked with black pepper.", 1150, "Vegetarian"),
    ("Garlic Mushroom", "Mushrooms with garlic and herbs.", 1100, "Vegetarian"),
    ("Vegetable Cutlet", "Crispy vegetable cutlets.", 750, "Vegetarian"),
    ("Cheese Vegetable Wrap", "Fresh vegetables and cheese wrap.", 1000, "Vegetarian"),

    # ========================================================
    # BREAKFAST - 15
    # ========================================================
    ("Cheese Omelette", "Fluffy omelette filled with cheese.", 750, "Breakfast"),
    ("Chicken Omelette", "Omelette with seasoned chicken.", 950, "Breakfast"),
    ("Vegetable Omelette", "Healthy omelette with fresh vegetables.", 700, "Breakfast"),
    ("French Toast", "Golden French toast with honey.", 850, "Breakfast"),
    ("Chocolate Pancakes", "Fluffy pancakes with chocolate sauce.", 950, "Breakfast"),
    ("Banana Pancakes", "Fresh banana pancakes with honey.", 900, "Breakfast"),
    ("Blueberry Pancakes", "Pancakes with blueberries and syrup.", 1100, "Breakfast"),
    ("Chicken Sandwich", "Grilled chicken breakfast sandwich.", 1050, "Breakfast"),
    ("Egg Sandwich", "Egg sandwich with fresh vegetables.", 800, "Breakfast"),
    ("Cheese Sandwich", "Toasted sandwich with melted cheese.", 850, "Breakfast"),
    ("Chicken Wrap", "Breakfast wrap with chicken and vegetables.", 1000, "Breakfast"),
    ("Egg Wrap", "Egg wrap with fresh vegetables.", 850, "Breakfast"),
    ("Breakfast Burrito", "Egg, cheese and vegetable burrito.", 1200, "Breakfast"),
    ("Granola Bowl", "Granola with fruits and yogurt.", 950, "Breakfast"),
    ("Fruit and Yogurt Bowl", "Fresh fruits served with yogurt.", 900, "Breakfast"),

    # ========================================================
    # DESSERTS - 15
    # ========================================================
    ("Chocolate Brownie", "Warm chocolate brownie.", 750, "Desserts"),
    ("Chocolate Brownie Ice Cream", "Brownie served with vanilla ice cream.", 950, "Desserts"),
    ("Red Velvet Cake", "Soft red velvet cake with cream cheese.", 900, "Desserts"),
    ("Vanilla Cake", "Classic soft vanilla cake.", 750, "Desserts"),
    ("Black Forest Cake", "Chocolate cake with cream and cherries.", 950, "Desserts"),
    ("Cheesecake", "Creamy classic cheesecake.", 1000, "Desserts"),
    ("Strawberry Cheesecake", "Cheesecake with strawberry topping.", 1100, "Desserts"),
    ("Chocolate Mousse", "Smooth and creamy chocolate mousse.", 800, "Desserts"),
    ("Mango Mousse", "Fresh mango mousse dessert.", 800, "Desserts"),
    ("Caramel Pudding", "Silky caramel pudding.", 700, "Desserts"),
    ("Chocolate Pudding", "Rich chocolate pudding.", 700, "Desserts"),
    ("Fruit Salad", "Fresh seasonal fruit salad.", 650, "Desserts"),
    ("Ice Cream Sundae", "Ice cream topped with chocolate sauce.", 850, "Desserts"),
    ("Brownie Sundae", "Brownie with ice cream and chocolate sauce.", 1000, "Desserts"),
    ("Waffle with Ice Cream", "Crispy waffle served with ice cream.", 1100, "Desserts"),

    # ========================================================
    # DRINKS - 15
    # ========================================================
    ("Strawberry Milkshake", "Creamy fresh strawberry milkshake.", 850, "Drinks"),
    ("Vanilla Milkshake", "Classic creamy vanilla milkshake.", 800, "Drinks"),
    ("Banana Milkshake", "Fresh banana milkshake.", 750, "Drinks"),
    ("Mango Milkshake", "Fresh mango milkshake.", 850, "Drinks"),
    ("Oreo Milkshake", "Creamy Oreo cookie milkshake.", 950, "Drinks"),
    ("Peanut Butter Milkshake", "Rich peanut butter milkshake.", 950, "Drinks"),
    ("Iced Coffee", "Cold creamy iced coffee.", 750, "Drinks"),
    ("Caramel Iced Coffee", "Iced coffee with caramel.", 850, "Drinks"),
    ("Cold Chocolate", "Chilled chocolate drink.", 800, "Drinks"),
    ("Fresh Orange Juice", "Freshly squeezed orange juice.", 650, "Drinks"),
    ("Fresh Watermelon Juice", "Fresh watermelon juice.", 600, "Drinks"),
    ("Fresh Pineapple Juice", "Fresh pineapple juice.", 650, "Drinks"),
    ("Mango Juice", "Refreshing mango juice.", 650, "Drinks"),
    ("Passion Fruit Juice", "Fresh passion fruit juice.", 700, "Drinks"),
    ("Mint Lime Juice", "Refreshing lime and mint drink.", 650, "Drinks"),

    # ========================================================
    # SNACKS - 15
    # ========================================================
    ("Chicken Spring Rolls", "Crispy spring rolls filled with chicken.", 850, "Snacks"),
    ("Vegetable Spring Rolls", "Crispy vegetable spring rolls.", 700, "Snacks"),
    ("Chicken Samosa", "Crispy samosa filled with spicy chicken.", 650, "Snacks"),
    ("Vegetable Samosa", "Classic vegetable samosa.", 550, "Snacks"),
    ("Chicken Nuggets", "Crispy golden chicken nuggets.", 900, "Snacks"),
    ("Cheese Balls", "Crispy cheese filled snack balls.", 850, "Snacks"),
    ("Mozzarella Sticks", "Crispy mozzarella cheese sticks.", 950, "Snacks"),
    ("Onion Rings", "Crispy golden onion rings.", 700, "Snacks"),
    ("Loaded Fries", "Fries topped with cheese and sauce.", 950, "Snacks"),
    ("Cheesy Fries", "Golden fries with melted cheese.", 900, "Snacks"),
    ("Spicy Fries", "Crispy fries with spicy seasoning.", 750, "Snacks"),
    ("Chicken Popcorn", "Crispy bite-sized chicken pieces.", 950, "Snacks"),
    ("Fish Fingers", "Crispy fish fingers with sauce.", 1050, "Snacks"),
    ("Garlic Bread", "Toasted garlic bread with herbs.", 700, "Snacks"),
    ("Cheese Garlic Bread", "Garlic bread topped with mozzarella.", 900, "Snacks"),
]


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
}


# ============================================================
# SEED FUNCTION
# ============================================================

def seed_more_foods():

    db = SessionLocal()

    try:
        # ----------------------------------------------------
        # Load existing food names
        # ----------------------------------------------------

        existing_foods = db.query(Food).all()

        existing_names = {
            food.name.strip().lower()
            for food in existing_foods
        }

        print("=" * 60)
        print("ADDING MORE FOODS")
        print("=" * 60)
        print(f"Existing foods : {len(existing_foods)}")

        added = 0
        skipped = 0

        # ----------------------------------------------------
        # Add foods
        # ----------------------------------------------------

        for index, (name, description, price, category_name) in enumerate(
            FOODS,
            start=301
        ):

            # Check duplicate
            if name.strip().lower() in existing_names:
                skipped += 1
                continue

            # Find category
            category = (
                db.query(Category)
                .filter(Category.name == category_name)
                .first()
            )

            if not category:
                print(
                    f"Category not found: {category_name}"
                )
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
                description=description,
                price=Decimal(str(price)),
                image=image_url,
                is_available=True,
                category_id=category.id
            )

            db.add(food)

            existing_names.add(
                name.strip().lower()
            )

            added += 1

            print(
                f"[{added:03d}/200] Added: {name}"
            )

        # ----------------------------------------------------
        # Save
        # ----------------------------------------------------

        db.commit()

        # ----------------------------------------------------
        # Final count
        # ----------------------------------------------------

        total_foods = db.query(Food).count()
        total_categories = db.query(Category).count()

        print()
        print("=" * 60)
        print("SEED MORE FOODS COMPLETED")
        print("=" * 60)
        print(f"New foods added : {added}")
        print(f"Skipped         : {skipped}")
        print(f"Total foods     : {total_foods}")
        print(f"Total categories: {total_categories}")
        print("=" * 60)

        if total_foods == 500:
            print("SUCCESS: EXACTLY 500 FOODS ARE AVAILABLE!")
        elif total_foods < 500:
            print(
                f"NOTE: {500 - total_foods} more foods are needed."
            )
        else:
            print(
                f"NOTE: Database contains {total_foods} foods."
            )

    except Exception as e:

        db.rollback()

        print()
        print("=" * 60)
        print("SEED FAILED")
        print("=" * 60)
        print(str(e))
        print("=" * 60)

        raise

    finally:
        db.close()


# ============================================================
# RUN
# ============================================================

if __name__ == "__main__":
    seed_more_foods()