import {
  Plus,
  Pencil,
  Trash2,
  LoaderCircle,
  AlertCircle,
  ArrowLeft,
  Tags,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const token = localStorage.getItem(
    "access_token"
  );

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/categories"
      );

      setCategories(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.detail ||
          "Unable to load categories."
      );
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setName("");
    setDescription("");
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setName(category.name || "");
    setDescription(
      category.description || ""
    );
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setName("");
    setDescription("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name.trim().length < 2) {
      alert(
        "Category name must contain at least 2 characters."
      );
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        description:
          description.trim() || null,
      };

      if (editingCategory) {
        await api.put(
          `/categories/${editingCategory.id}`,
          payload,
          authConfig
        );
      } else {
        await api.post(
          "/categories",
          payload,
          authConfig
        );
      }

      closeModal();

      await fetchCategories();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Unable to save category."
      );
    }
  };

  const handleDelete = async (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(
        `/categories/${categoryId}`,
        authConfig
      );

      setCategories((current) =>
        current.filter(
          (category) =>
            category.id !== categoryId
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Unable to delete category. It may contain foods."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

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
              Menu Organization
            </p>

            <h1 className="mt-1 text-4xl font-black text-gray-900">
              Categories
            </h1>

            <p className="mt-2 text-gray-500">
              Create and manage your food categories.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
          >
            <Plus size={20} />
            Add Category
          </button>

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
                Loading categories...
              </p>

            </div>

          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          categories.length === 0 && (
            <div className="mt-10 rounded-[2rem] bg-white p-14 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                <Tags size={35} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-gray-900">
                No categories yet
              </h2>

              <p className="mt-2 text-gray-500">
                Create your first food category.
              </p>

              <button
                onClick={openAddModal}
                className="mt-6 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white"
              >
                Add Category
              </button>

            </div>
          )}

        {/* Categories */}
        {!loading &&
          categories.length > 0 && (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {categories.map((category) => (
                <div
                  key={category.id}
                  className="group rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                      🍽️
                    </div>

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          openEditModal(category)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition hover:bg-orange-100"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(category.id)
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </div>

                  <h2 className="mt-6 text-xl font-black text-gray-900">
                    {category.name}
                  </h2>

                  <p className="mt-2 min-h-10 text-sm leading-5 text-gray-500">
                    {category.description ||
                      "No description available."}
                  </p>

                  <div className="mt-5 border-t border-gray-100 pt-4">

                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Category ID
                    </span>

                    <p className="mt-1 font-bold text-gray-700">
                      #{category.id}
                    </p>

                  </div>

                </div>
              ))}

            </div>
          )}

      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-[2rem] bg-white p-7 shadow-2xl">

            <div className="flex items-start justify-between">

              <div>
                <p className="font-bold text-orange-500">
                  Mugil Admin
                </p>

                <h2 className="mt-1 text-2xl font-black text-gray-900">
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h2>
              </div>

              <button
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 hover:bg-gray-200"
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
                  Category Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Example: Burgers"
                  minLength={2}
                  required
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

              </div>

              {/* Description */}
              <div>

                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Describe this category..."
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />

              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl border border-gray-200 px-6 py-3 font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-2xl bg-orange-500 px-7 py-3 font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-600"
                >
                  {editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminCategories;