import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  DollarSign,
  LayoutDashboard,
  Package,
  RefreshCw,
  ShoppingBag,
  TrendingUp,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem(
        "access_token"
      );

      const response = await api.get(
        "/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(response.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.detail ||
          "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  const getValue = (...keys) => {
    if (!dashboard) return 0;

    for (const key of keys) {
      if (
        dashboard[key] !== undefined &&
        dashboard[key] !== null
      ) {
        return dashboard[key];
      }
    }

    return 0;
  };

  const totalUsers = getValue(
    "total_users",
    "users_count",
    "users"
  );

  const totalFoods = getValue(
    "total_foods",
    "foods_count",
    "foods"
  );

  const totalOrders = getValue(
    "total_orders",
    "orders_count",
    "orders"
  );

  const totalRevenue = getValue(
    "total_revenue",
    "revenue"
  );

  const pendingOrders = getValue(
    "pending_orders",
    "pending_count"
  );

  const deliveredOrders = getValue(
    "delivered_orders",
    "delivered_count"
  );

  const popularFoods =
    dashboard?.popular_foods ||
    dashboard?.popularFoods ||
    [];

  const statCards = [
    {
      title: "Total Revenue",
      value: `Rs. ${Number(
        totalRevenue
      ).toLocaleString()}`,
      icon: DollarSign,
      description: "Overall order revenue",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      description: "Orders received",
    },
    {
      title: "Total Customers",
      value: totalUsers,
      icon: Users,
      description: "Registered users",
    },
    {
      title: "Total Foods",
      value: totalFoods,
      icon: UtensilsCrossed,
      description: "Food items available",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffaf5]">

        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center">

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">

              <RefreshCw
                size={30}
                className="animate-spin text-orange-500"
              />

            </div>

            <h2 className="mt-5 text-xl font-black text-gray-900">
              Loading dashboard...
            </h2>

            <p className="mt-1 text-gray-500">
              Fetching your latest business data.
            </p>

          </div>

        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fffaf5]">

        <Navbar />

        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-6">

          <div className="w-full rounded-3xl bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">

              <AlertCircle size={30} />

            </div>

            <h2 className="mt-5 text-2xl font-black text-gray-900">
              Dashboard unavailable
            </h2>

            <p className="mt-2 text-gray-500">
              {error}
            </p>

            <button
              onClick={fetchDashboard}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              <RefreshCw size={18} />
              Try Again
            </button>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>

            <div className="flex items-center gap-2 text-sm font-bold text-orange-500">

              <LayoutDashboard size={17} />

              Admin Dashboard

            </div>

            <h1 className="mt-2 text-4xl font-black tracking-tight text-gray-900">
              Good morning, Admin 👋
            </h1>

            <p className="mt-2 text-gray-500">
              Here's what's happening with Mugil today.
            </p>

          </div>

          <button
            onClick={fetchDashboard}
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-gray-200 bg-white px-5 py-3 font-bold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-500"
          >
            <RefreshCw size={17} />
            Refresh
          </button>

        </div>

        {/* STATS */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {statCards.map((card) => {

            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 transition group-hover:bg-orange-500 group-hover:text-white">

                    <Icon size={23} />

                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-gray-300 transition group-hover:text-orange-500"
                  />

                </div>

                <p className="mt-6 text-sm font-semibold text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-1 text-3xl font-black text-gray-900">
                  {card.value}
                </h2>

                <p className="mt-2 text-xs text-gray-400">
                  {card.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* ORDER STATUS */}

        <div className="mt-8 grid gap-5 md:grid-cols-2">

          <div className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-500 to-orange-600 p-7 text-white shadow-lg shadow-orange-100">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-bold text-orange-100">
                  Pending Orders
                </p>

                <h2 className="mt-2 text-4xl font-black">
                  {pendingOrders}
                </h2>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">

                <Clock3 size={27} />

              </div>

            </div>

            <p className="mt-5 text-sm text-orange-100">
              Orders waiting for processing.
            </p>

          </div>

          <div className="rounded-3xl border border-green-100 bg-white p-7 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-bold text-gray-500">
                  Delivered Orders
                </p>

                <h2 className="mt-2 text-4xl font-black text-gray-900">
                  {deliveredOrders}
                </h2>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600">

                <CheckCircle2 size={27} />

              </div>

            </div>

            <p className="mt-5 text-sm text-gray-400">
              Successfully completed orders.
            </p>

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="mt-8">

          <div className="flex items-end justify-between">

            <div>

              <p className="text-sm font-bold text-orange-500">
                Management
              </p>

              <h2 className="mt-1 text-2xl font-black text-gray-900">
                Quick Actions
              </h2>

            </div>

          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <Link
              to="/admin/foods"
              className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white">

                <UtensilsCrossed size={23} />

              </div>

              <h3 className="mt-5 text-lg font-black text-gray-900">
                Manage Foods
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add, edit and manage food items.
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-bold text-orange-500">

                Open Management

                <ArrowUpRight size={16} />

              </div>

            </Link>

            <Link
              to="/admin/orders"
              className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white">

                <Package size={23} />

              </div>

              <h3 className="mt-5 text-lg font-black text-gray-900">
                Manage Orders
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                View orders and update their status.
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-bold text-blue-500">

                Open Management

                <ArrowUpRight size={16} />

              </div>

            </Link>

            <Link
              to="/admin/users"
              className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-500 group-hover:bg-purple-500 group-hover:text-white">

                <Users size={23} />

              </div>

              <h3 className="mt-5 text-lg font-black text-gray-900">
                Manage Users
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                View and manage customer accounts.
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-bold text-purple-500">

                Open Management

                <ArrowUpRight size={16} />

              </div>

            </Link>

          </div>

        </div>

        {/* POPULAR FOODS */}

        <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2 text-orange-500">

                <TrendingUp size={19} />

                <span className="text-sm font-bold">
                  Performance
                </span>

              </div>

              <h2 className="mt-1 text-2xl font-black text-gray-900">
                Popular Foods
              </h2>

            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">

              <BarChart3 size={20} />

            </div>

          </div>

          {popularFoods.length === 0 ? (
            <div className="py-12 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-gray-400">

                <UtensilsCrossed size={25} />

              </div>

              <p className="mt-4 font-bold text-gray-700">
                No popular food data yet
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Popular foods will appear after customers
                place orders.
              </p>

            </div>
          ) : (
            <div className="mt-6 space-y-3">

              {popularFoods
                .slice(0, 5)
                .map((food, index) => {

                  const foodName =
                    food.name ||
                    food.food_name ||
                    food.title ||
                    "Food";

                  const quantity =
                    food.quantity ||
                    food.total_quantity ||
                    food.ordered_quantity ||
                    0;

                  return (
                    <div
                      key={
                        food.id ||
                        food.food_id ||
                        index
                      }
                      className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-4"
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 font-black text-orange-500">
                          {index + 1}
                        </div>

                        <div>

                          <p className="font-bold text-gray-900">
                            {foodName}
                          </p>

                          <p className="text-xs text-gray-400">
                            Ordered quantity
                          </p>

                        </div>

                      </div>

                      <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-gray-700 shadow-sm">
                        {quantity}
                      </span>

                    </div>
                  );
                })}

            </div>
          )}

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;