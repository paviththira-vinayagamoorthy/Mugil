from pydantic import BaseModel, ConfigDict, Field


class FoodCreate(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=150
    )

    description: str | None = None

    price: float = Field(
        gt=0
    )

    image: str | None = None

    is_available: bool = True

    category_id: int = Field(
        gt=0
    )


class FoodUpdate(BaseModel):
    name: str | None = Field(
        default=None,
        min_length=2,
        max_length=150
    )

    description: str | None = None

    price: float | None = Field(
        default=None,
        gt=0
    )

    image: str | None = None

    is_available: bool | None = None

    category_id: int | None = Field(
        default=None,
        gt=0
    )


class FoodResponse(BaseModel):
    id: int
    name: str
    description: str | None
    price: float
    image: str | None
    is_available: bool
    category_id: int

    model_config = ConfigDict(
        from_attributes=True
    )