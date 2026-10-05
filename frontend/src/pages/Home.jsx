import {
  Search,
  ShoppingCart,
  Star,
  ArrowRight,
  Plus,
  LoaderCircle,
  AlertCircle,
  Utensils,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";
import { useCart } from "../context/CartContext";


// =====================================================
// HOME PAGE
// =====================================================

function Home() {
  const { addToCart } = useCart();

  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [foodsResponse, categoriesResponse] =
        await Promise.all([
          api.get("/foods/?page=1&limit=500"),
          api.get("/categories/"),
        ]);

      console.log("FOODS:", foodsResponse.data);
      console.log("CATEGORIES:", categoriesResponse.data);

      const foodData = Array.isArray(foodsResponse.data)
        ? foodsResponse.data
        : [];

      const categoryData = Array.isArray(
        categoriesResponse.data
      )
        ? categoriesResponse.data
        : [];

      setFoods(foodData);
      setCategories(categoryData);

    } catch (err) {
      console.error("FOOD LOADING ERROR:", err);

      setError(
        err?.response?.data?.detail ||
          "Unable to load food items."
      );

    } finally {
      setLoading(false);
    }
  };


  // =====================================================
  // CATEGORY NAME
  // =====================================================

  const getCategoryName = (categoryId) => {
    const category = categories.find(
      (item) => item.id === categoryId
    );

    return category?.name || "Other";
  };


  // =====================================================
  // GET DIFFERENT FALLBACK IMAGES
  // =====================================================

  const getFallbackImage = (food) => {
    const category = getCategoryName(
      food.category_id
    ).toLowerCase();

    const name = (
      food.name || ""
    ).toLowerCase();


    // Pizza
    if (
      name.includes("pizza") ||
      category.includes("pizza") ||
      category.includes("italian")
    ) {
      return "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=85";
    }


    // Burger
    if (
      name.includes("burger") ||
      name.includes("zinger") ||
      category.includes("burger")
    ) {
      return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85";
    }


    // Biryani
    if (
      name.includes("biryani") ||
      category.includes("biryani")
    ) {
      return "https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=800&q=85";
    }


    // Rice
    if (
      name.includes("rice") ||
      category === "rice"
    ) {
      return "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=85";
    }


    // Pasta
    if (
      name.includes("pasta") ||
      category.includes("pasta")
    ) {
      return "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=85";
    }


    // Noodles
    if (
      name.includes("noodle") ||
      category.includes("noodle")
    ) {
      return "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=85";
    }


    // Chicken
    if (
      name.includes("chicken") ||
      name.includes("fried chicken") ||
      category.includes("chicken")
    ) {
      return "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=85";
    }


    // Seafood
    if (
      name.includes("fish") ||
      name.includes("prawn") ||
      name.includes("shrimp") ||
      name.includes("seafood") ||
      category.includes("seafood")
    ) {
      return "https://images.unsplash.com/photo-1535140728325-a4d3707eee61?auto=format&fit=crop&w=800&q=85";
    }


    // Dessert
    if (
      name.includes("cake") ||
      name.includes("ice cream") ||
      name.includes("dessert") ||
      name.includes("pudding") ||
      category.includes("dessert")
    ) {
      return "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=85";
    }


    // Drinks
    if (
      name.includes("juice") ||
      name.includes("coffee") ||
      name.includes("tea") ||
      name.includes("shake") ||
      name.includes("drink") ||
      category.includes("drink")
    ) {
      return "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=85";
    }


    // Vegetarian
    if (
      category.includes("vegetarian") ||
      category.includes("vegetable")
    ) {
      return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85";
    }


    // Breakfast
    if (
      category.includes("breakfast") ||
      name.includes("egg") ||
      name.includes("omelette") ||
      name.includes("pancake")
    ) {
      return "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=85";
    }


    // Snacks
    if (
      category.includes("snack") ||
      name.includes("samosa") ||
      name.includes("roll") ||
      name.includes("fries")
    ) {
      return "https://images.unsplash.com/photo-1621939514649-280e2aa88f11?auto=format&fit=crop&w=800&q=85";
    }


    // Indian
    if (
      category.includes("indian")
    ) {
      return "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=85";
    }


    // Sri Lankan
    if (
      category.includes("sri lankan")
    ) {
      return "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=800&q=85";
    }


    // General food
    return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=85";
  };


  // =====================================================
  // IMAGE ERROR HANDLER
  // =====================================================

  const handleImageError = (event, food) => {
    event.currentTarget.onerror = null;

    event.currentTarget.src =
      getFallbackImage(food);
  };


  // =====================================================
  // FILTER FOODS
  // =====================================================

  const filteredFoods = useMemo(() => {
    const searchText = search
      .trim()
      .toLowerCase();

    return foods.filter((food) => {
      const matchesSearch =
        !searchText ||
        food.name
          ?.toLowerCase()
          .includes(searchText) ||
        food.description
          ?.toLowerCase()
          .includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        getCategoryName(food.category_id) ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory &&
        food.is_available !== false
      );
    });
  }, [
    foods,
    categories,
    search,
    selectedCategory,
  ]);


  // =====================================================
  // POPULAR FOODS
  // =====================================================

  const popularFoods = foods
    .filter(
      (food) => food.is_available !== false
    )
    .slice(0, 4);


  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <Navbar />


      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden bg-[#17120f]">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-orange-400/10 blur-3xl" />


        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">


          {/* HERO TEXT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-500/10 px-4 py-2 text-sm font-bold text-orange-300">

              <Star
                size={16}
                fill="currentColor"
              />

              Delicious food, delivered

            </div>


            <h1 className="mt-6 max-w-2xl text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">

              Your cravings.
              <br />

              <span className="text-orange-500">
                Our mission.
              </span>

            </h1>


            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">

              Discover delicious meals from your
              favourite categories and get them
              delivered straight to your door.

            </p>


            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <a
                href="#foods"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 font-black text-white shadow-xl shadow-orange-900/20 transition hover:-translate-y-0.5 hover:bg-orange-600"
              >
                Explore Foods

                <ArrowRight size={19} />

              </a>


              <Link
                to="/cart"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 py-4 font-bold text-white backdrop-blur transition hover:bg-white/15"
              >

                <ShoppingCart size={19} />

                View Cart

              </Link>

            </div>

          </div>


          {/* HERO IMAGE */}

          <div className="relative">

            <div className="absolute inset-8 rounded-full bg-orange-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur">

              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85"
                alt="Delicious burger"
                className="h-[380px] w-full rounded-[2.5rem] object-cover sm:h-[480px]"
              />


              <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/20 bg-black/60 p-4 backdrop-blur-md">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs font-semibold text-gray-300">
                      Today's favourite
                    </p>

                    <p className="mt-1 text-lg font-black text-white">
                      Classic Cheese Burger
                    </p>

                  </div>


                  <span className="rounded-xl bg-orange-500 px-3 py-2 text-sm font-black text-white">
                    Rs. 850
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          FOOD SECTION
      ================================================= */}

      <section
        id="foods"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >


        {/* HEADING */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <p className="font-bold text-orange-500">
              Explore our menu
            </p>

            <h2 className="mt-1 text-4xl font-black text-gray-900">
              What are you craving?
            </h2>

            <p className="mt-2 text-gray-500">
              Find something delicious for every mood.
            </p>

          </div>


          {/* SEARCH */}

          <div className="relative w-full lg:w-96">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search for food..."
              className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm font-medium outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />

          </div>

        </div>


        {/* =================================================
            CATEGORIES
        ================================================= */}

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">

          <button
            onClick={() =>
              setSelectedCategory("All")
            }
            className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
              selectedCategory === "All"
                ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-500"
            }`}
          >
            All Foods
          </button>


          {categories.map((category) => (

            <button
              key={category.id}
              onClick={() =>
                setSelectedCategory(category.name)
              }
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${
                selectedCategory === category.name
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                  : "bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-500"
              }`}
            >
              {category.name}
            </button>

          ))}

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (

          <div className="flex min-h-[300px] items-center justify-center">

            <div className="text-center">

              <LoaderCircle
                size={42}
                className="mx-auto animate-spin text-orange-500"
              />

              <p className="mt-4 font-semibold text-gray-600">
                Finding delicious food...
              </p>

            </div>

          </div>

        )}


        {/* =================================================
            ERROR
        ================================================= */}

        {!loading && error && (

          <div className="mt-10 rounded-3xl border border-red-100 bg-red-50 p-8 text-center">

            <AlertCircle
              size={40}
              className="mx-auto text-red-500"
            />

            <p className="mt-4 font-bold text-red-600">
              {error}
            </p>

            <button
              onClick={fetchData}
              className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
            >
              Try Again
            </button>

          </div>

        )}


        {/* =================================================
            FOOD COUNT
        ================================================= */}

        {!loading &&
          !error &&
          foods.length > 0 && (

            <div className="mt-8 flex items-center justify-between">

              <p className="text-sm font-semibold text-gray-500">

                Showing{" "}

                <span className="font-black text-orange-500">
                  {filteredFoods.length}
                </span>{" "}

                foods

              </p>


              <p className="text-sm font-semibold text-gray-400">
                Total available: {foods.length}
              </p>

            </div>

          )}


        {/* =================================================
            FOOD CARDS
        ================================================= */}

        {!loading &&
          !error &&
          filteredFoods.length > 0 && (

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredFoods.map((food) => (

                <div
                  key={food.id}
                  className="group overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >


                  {/* IMAGE */}

                  <div className="relative h-56 overflow-hidden bg-orange-50">

                    <img
                      src={
                        food.image ||
                        getFallbackImage(food)
                      }
                      alt={food.name}
                      onError={(event) =>
                        handleImageError(
                          event,
                          food
                        )
                      }
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />


                    {/* CATEGORY */}

                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-black text-orange-500 shadow-sm backdrop-blur">

                      {getCategoryName(
                        food.category_id
                      )}

                    </div>


                    {/* RATING */}

                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1.5 text-xs font-bold text-white backdrop-blur">

                      <Star
                        size={13}
                        fill="currentColor"
                      />

                      4.8

                    </div>

                  </div>


                  {/* CONTENT */}

                  <div className="p-5">

                    <h3 className="text-lg font-black text-gray-900">
                      {food.name}
                    </h3>


                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">

                      {food.description ||
                        "Freshly prepared and made with delicious ingredients."}

                    </p>


                    <div className="mt-5 flex items-center justify-between">

                      <div>

                        <p className="text-xs font-semibold text-gray-400">
                          Starting from
                        </p>

                        <p className="mt-1 text-xl font-black text-orange-500">

                          Rs.{" "}

                          {Number(
                            food.price
                          ).toLocaleString()}

                        </p>

                      </div>


                      <button
                        onClick={() =>
                          addToCart(food)
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg shadow-orange-200 transition hover:scale-105 hover:bg-orange-600"
                        title="Add to cart"
                      >
                        <Plus size={21} />
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}


        {/* =================================================
            NO FOOD
        ================================================= */}

        {!loading &&
          !error &&
          filteredFoods.length === 0 && (

            <div className="mt-10 rounded-[2rem] bg-white p-14 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-500">

                <Utensils size={36} />

              </div>


              <h3 className="mt-6 text-2xl font-black text-gray-900">
                No food found
              </h3>


              <p className="mt-2 text-gray-500">
                Try another search or category.
              </p>


              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white hover:bg-orange-600"
              >
                Clear Filters
              </button>

            </div>

          )}

      </section>


      {/* =================================================
          POPULAR
      ================================================= */}

      {!loading &&
        popularFoods.length > 0 && (

          <section className="border-t border-orange-100 bg-white">

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

              <div className="flex items-end justify-between">

                <div>

                  <p className="font-bold text-orange-500">
                    Customer favourites
                  </p>

                  <h2 className="mt-1 text-3xl font-black text-gray-900">
                    Popular right now 🔥
                  </h2>

                </div>


                <a
                  href="#foods"
                  className="hidden items-center gap-2 font-bold text-orange-500 sm:flex"
                >
                  View menu
                  <ArrowRight size={18} />
                </a>

              </div>


              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {popularFoods.map((food) => (

                  <div
                    key={food.id}
                    className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-[#fffaf5] p-4"
                  >

                    <img
                      src={
                        food.image ||
                        getFallbackImage(food)
                      }
                      alt={food.name}
                      onError={(event) =>
                        handleImageError(
                          event,
                          food
                        )
                      }
                      className="h-16 w-16 rounded-xl object-cover"
                    />


                    <div className="min-w-0">

                      <p className="truncate font-black text-gray-900">
                        {food.name}
                      </p>

                      <p className="mt-1 text-sm font-bold text-orange-500">

                        Rs.{" "}

                        {Number(
                          food.price
                        ).toLocaleString()}

                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </section>

        )}


      {/* =================================================
          CTA
      ================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="overflow-hidden rounded-[2.5rem] bg-orange-500 px-6 py-12 text-center shadow-2xl shadow-orange-200 sm:px-10">

          <h2 className="text-3xl font-black text-white sm:text-4xl">
            Hungry already?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-orange-100">

            Choose your favourite food, add it to
            your cart and enjoy a delicious meal.

          </p>


          <a
            href="#foods"
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-black text-orange-500 transition hover:bg-orange-50"
          >
            Order Now
            <ArrowRight size={19} />
          </a>

        </div>

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="border-t border-orange-100 bg-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-center sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:text-left">

          <div>

            <p className="font-black text-gray-900">

              Food
              <span className="text-orange-500">
                Nest
              </span>

            </p>

            <p className="mt-1 text-sm text-gray-500">
              Delicious food, delivered.
            </p>

          </div>


          <p className="text-sm text-gray-400">
            © 2026 Mugil. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Home;