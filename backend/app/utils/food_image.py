from urllib.parse import quote


def get_food_image(food_name: str, category_name: str = "") -> str:
    prompt = (
        f"realistic professional food photography of {food_name}, "
        f"{category_name} cuisine, freshly prepared restaurant dish, "
        f"appetizing, close-up, natural lighting, realistic food, "
        f"no people, no text"
    )

    return (
        "https://gen.pollinations.ai/image/"
        + quote(prompt)
        + "?model=flux"
    )