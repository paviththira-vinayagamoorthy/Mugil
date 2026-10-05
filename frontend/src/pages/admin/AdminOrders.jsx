import {
  ArrowLeft,
  LoaderCircle,
  AlertCircle,
  Package,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  RefreshCw,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingOrder, setUpdatingOrder] =
    useState(null);

  const token = localStorage.getItem(
    "access_token"
  );

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      /*
       * Admin order endpoint.
       *
       * If your backend uses /orders instead,
       * change this URL to "/orders".
       */
      const response = await api.get(
        "/orders",
        authConfig
      );

      setOrders(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.detail ||
          "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    orderId,
    newStatus
  ) => {
    try {
      setUpdatingOrder(orderId);

      await api.put(
        `/orders/${orderId}/status`,
        {
          status: newStatus,
        },
        authConfig
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Unable to update order status."
      );
    } finally {
      setUpdatingOrder(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-blue-50 text-blue-600";

      case "Preparing":
        return "bg-purple-50 text-purple-600";

      case "Out for Delivery":
        return "bg-cyan-50 text-cyan-600";

      case "Delivered":
        return "bg-green-50 text-green-600";

      case "Cancelled":
        return "bg-red-50 text-red-500";

      default:
        return "bg-orange-50 text-orange-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Confirmed":
        return <CheckCircle2 size={16} />;

      case "Preparing":
        return <Clock3 size={16} />;

      case "Out for Delivery":
        return <Truck size={16} />;

      case "Delivered":
        return <CheckCircle2 size={16} />;

      case "Cancelled":
        return <XCircle size={16} />;

      default:
        return <Package size={16} />;
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    return new Date(date).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-orange-500"
            >
              <ArrowLeft size={17} />
              Admin Dashboard
            </Link>

            <p className="mt-6 font-bold text-orange-500">
              Order Management
            </p>

            <h1 className="mt-1 text-4xl font-black text-gray-900">
              Customer Orders
            </h1>

            <p className="mt-2 text-gray-500">
              View orders and update their delivery status.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 font-bold text-gray-700 shadow-sm transition hover:border-orange-200 hover:text-orange-500 disabled:opacity-50"
          >
            <RefreshCw
              size={18}
              className={
                loading
                  ? "animate-spin"
                  : ""
              }
            />
            Refresh
          </button>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 p-5">

            <div className="flex items-center gap-3 text-red-600">

              <AlertCircle size={22} />

              <p className="font-semibold">
                {error}
              </p>

            </div>

            <button
              onClick={fetchOrders}
              className="mt-4 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white"
            >
              Try Again
            </button>

          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[350px] items-center justify-center">

            <div className="text-center">

              <LoaderCircle
                size={42}
                className="mx-auto animate-spin text-orange-500"
              />

              <p className="mt-4 font-semibold text-gray-600">
                Loading customer orders...
              </p>

            </div>

          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          orders.length === 0 && (
            <div className="mt-10 rounded-[2rem] bg-white p-14 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                <Package size={36} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-gray-900">
                No orders yet
              </h2>

              <p className="mt-2 text-gray-500">
                Customer orders will appear here.
              </p>

            </div>
          )}

        {/* Orders */}
        {!loading &&
          !error &&
          orders.length > 0 && (
            <div className="mt-8 space-y-6">

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm"
                >

                  {/* Top */}
                  <div className="border-b border-gray-100 p-6">

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                      <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                          <Package size={22} />
                        </div>

                        <div>

                          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                            Order
                          </p>

                          <h2 className="text-xl font-black text-gray-900">
                            #{order.id}
                          </h2>

                          <p className="mt-1 text-sm text-gray-500">
                            {formatDate(
                              order.created_at
                            )}
                          </p>

                        </div>

                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                        <span
                          className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(
                            order.status
                          )}

                          {order.status}
                        </span>

                        <select
                          value={order.status}
                          disabled={
                            updatingOrder ===
                            order.id
                          }
                          onChange={(event) =>
                            updateStatus(
                              order.id,
                              event.target.value
                            )
                          }
                          className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                        >
                          {ORDER_STATUSES.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {status}
                              </option>
                            )
                          )}
                        </select>

                      </div>

                    </div>

                  </div>

                  {/* Body */}
                  <div className="grid gap-6 p-6 lg:grid-cols-[1fr_280px]">

                    {/* Items */}
                    <div>

                      <h3 className="font-black text-gray-900">
                        Ordered Items
                      </h3>

                      <div className="mt-4 space-y-3">

                        {order.order_items?.map(
                          (item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
                            >

                              <div>

                                <p className="font-bold text-gray-900">
                                  Food #{item.food_id}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                  Quantity:{" "}
                                  {item.quantity}
                                </p>

                              </div>

                              <div className="text-right">

                                <p className="font-bold text-gray-900">
                                  Rs.{" "}
                                  {Number(
                                    item.subtotal
                                  ).toLocaleString()}
                                </p>

                                <p className="text-xs text-gray-400">
                                  Rs.{" "}
                                  {Number(
                                    item.unit_price
                                  ).toLocaleString()}{" "}
                                  each
                                </p>

                              </div>

                            </div>
                          )
                        )}

                      </div>

                    </div>

                    {/* Summary */}
                    <div className="rounded-2xl bg-orange-50 p-5">

                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Order Summary
                      </p>

                      <div className="mt-5">

                        <p className="text-sm text-gray-500">
                          Customer ID
                        </p>

                        <p className="mt-1 font-bold text-gray-900">
                          #{order.customer_id}
                        </p>

                      </div>

                      <div className="mt-5 border-t border-orange-100 pt-5">

                        <p className="text-sm text-gray-500">
                          Total Amount
                        </p>

                        <p className="mt-1 text-2xl font-black text-orange-500">
                          Rs.{" "}
                          {Number(
                            order.total_amount
                          ).toLocaleString()}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

      </main>

    </div>
  );
}

export default AdminOrders;