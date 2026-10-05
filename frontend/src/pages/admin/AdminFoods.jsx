import {
  Plus,
  Search,
  Pencil,
  Trash2,
  LoaderCircle,
  AlertCircle,
  ArrowLeft,
  UtensilsCrossed,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";

function AdminFoods() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingFood, setEditingFood] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    is_available: true,
    category_id: "",
  });

  const token = localStorage.getItem("access_token");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [foodsResponse, categoriesResponse] =
        await Promise.all([
          api.get("/foods"),
          api.get("/categories"),
        ]);

      setFoods(
        Array.isArray(foodsResponse.data)
          ? foodsResponse.data
          : []
      );

      setCategories(
        Array.isArray(categoriesResponse.data)
          ? categoriesResponse.data
          : []
      );
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.detail ||
          "Unable to load food data."
      );
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(
      (item) => item.id === categoryId
    );

    return category?.name || "Other";
  };

  const handleChange = (event) => {
    const { name, value, type, checked } =
      event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const openAddModal = () => {
    setEditingFood(null);

    setForm({
      name: "",
      description: "",
      price: "",
      image: "",
      is_available: true,
      category_id:
        categories.length > 0
          ? String(categories[0].id)
          : "",
    });

    setShowModal(true);
  };

  const openEditModal = (food) => {
    setEditingFood(food);

    setForm({
      name: food.name || "",
      description: food.description || "",
      price: food.price || "",
      image: food.image || "",
      is_available: food.is_available,
      category_id: String(
        food.category_id || ""
      ),
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingFood(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        name: form.name.trim(),
        description:
          form.description.trim() || null,
        price: Number(form.price),
        image: form.image.trim() || null,
        is_available: form.is_available,
        category_id: Number(form.category_id),
      };

      if (editingFood) {
        await api.put(
          `/foods/${editingFood.id}`,
          payload,
          authConfig
        );
      } else {
        await api.post(
          "/foods",
          payload,
          authConfig
        );
      }

      closeModal();

      await fetchData();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Unable to save food."
      );
    }
  };

  const handleDelete = async (foodId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(
        `/foods/${foodId}`,
        authConfig
      );

      setFoods((current) =>
        current.filter(
          (food) => food.id !== foodId
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Unable to delete food."
      );
    }
  };

  const filteredFoods = foods.filter((food) =>
    food.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-orange-500"
            >
              <ArrowLeft size={17} />
              Admin Dashboard
            </Link>

            <p className="mt-6 font-bold text-orange-500">
              Food Management
            </p>

            <h1 className="mt-1 text-4xl font-black text-gray-900">
              Manage Foods
            </h1>

            <p className="mt-2 text-gray-500">
              Add, update and manage your food menu.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
          >
            <Plus size={20} />
            Add Food
          </button>

        </div>

        {/* Search */}
        <div className="mt-8">

          <div className="relative max-w-xl">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search foods..."
              className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            />

          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-5 text-red-600">
            <div className="flex items-center gap-3">
              <AlertCircle size={22} />
              <p className="font-semibold">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">

            <div className="text-center">

              <LoaderCircle
                size={40}
                className="mx-auto animate-spin text-orange-500"
              />

              <p className="mt-4 font-semibold text-gray-600">
                Loading foods...
              </p>

            </div>

          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          filteredFoods.length === 0 && (
            <div className="mt-10 rounded-[2rem] bg-white p-14 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                <UtensilsCrossed size={35} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-gray-900">
                No foods found
              </h2>

              <p className="mt-2 text-gray-500">
                Add your first food item to the menu.
              </p>

              <button
                onClick={openAddModal}
                className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white"
              >
                Add Food
              </button>

            </div>
          )}

        {/* Food Grid */}
        {!loading &&
          filteredFoods.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredFoods.map((food) => (
                <div
                  key={food.id}
                  className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Image */}
                  <div className="relative h-52 bg-orange-50">

                    {food.image ? (
                      <img
                        src={food.image}
                        alt={food.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-6xl">
                        🍔
                      </div>
                    )}

                    <span
                      className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-black ${
                        food.is_available
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {food.is_available
                        ? "Available"
                        : "Unavailable"}
                    </span>

                  </div>

                  {/* Content */}
                  <div className="p-5">

                    <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
                      {getCategoryName(
                        food.category_id
                      )}
                    </p>

                    <h2 className="mt-1 text-xl font-black text-gray-900">
                      {food.name}
                    </h2>

                    <p className="mt-2 min-h-10 text-sm leading-5 text-gray-500">
                      {food.description ||
                        "No description available."}
                    </p>

                    <div className="mt-5 flex items-center justify-between">

                      <p className="text-xl font-black text-orange-500">
                        Rs.{" "}
                        {Number(
                          food.price
                        ).toLocaleString()}
                      </p>

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            openEditModal(food)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition hover:bg-orange-100"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(food.id)
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

      </main>

      {/* =====================================
          MODAL
      ====================================== */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">

            <div className="flex items-start justify-between">

              <div>
                <p className="font-bold text-orange-500">
                  Food Management
                </p>

                <h2 className="mt-1 text-2xl font-black text-gray-900">
                  {editingFood
                    ? "Edit Food"
                    : "Add New Food"}
                </h2>
              </div>

              <button
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Food Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Example: Chicken Burger"
                  required
                  minLength={2}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe the food..."
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Price */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="2500"
                    min="1"
                    step="0.01"
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Category
                  </label>

                  <select
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="">
                      Select category
                    </option>

                    {categories.map(
                      (category) => (
                        <option
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </option>
                      )
                    )}
                  </select>
                </div>

              </div>

              {/* Image */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Availability */}
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl bg-gray-50 p-4">

                <input
                  type="checkbox"
                  name="is_available"
                  checked={form.is_available}
                  onChange={handleChange}
                  className="h-5 w-5 accent-orange-500"
                />

                <div>
                  <p className="font-bold text-gray-900">
                    Available for ordering
                  </p>

                  <p className="text-sm text-gray-500">
                    Customers can order this food.
                  </p>
                </div>

              </label>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl border border-gray-200 px-6 py-3 font-bold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-2xl bg-orange-500 px-7 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
                >
                  {editingFood
                    ? "Update Food"
                    : "Add Food"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminFoods;