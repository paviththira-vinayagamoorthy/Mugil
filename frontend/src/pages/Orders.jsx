import {
  ClipboardList,
  LoaderCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const customerId = localStorage.getItem("customer_id");

      if (!customerId) {
        setOrders([]);
        return;
      }

      const response = await api.get(
        `/orders/customer/${customerId}`
      );

      setOrders(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(error);

      setError("Unable to load your orders.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Delivered") {
      return "bg-green-50 text-green-600";
    }

    if (status === "Cancelled") {
      return "bg-red-50 text-red-500";
    }

    if (status === "Out for Delivery") {
      return "bg-blue-50 text-blue-600";
    }

    if (status === "Preparing") {
      return "bg-purple-50 text-purple-600";
    }

    if (status === "Confirmed") {
      return "bg-blue-50 text-blue-600";
    }

    return "bg-orange-50 text-orange-600";
  };

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">

        <Link
          to="/"
          className="inline-flex items-center gap-2 font-semibold text-gray-600 transition hover:text-orange-500"
        >
          <ArrowLeft size={19} />
          Back to Home
        </Link>

        <div className="mt-8">

          <p className="font-bold text-orange-500">
            Mugil
          </p>

          <h1 className="mt-1 text-4xl font-black text-gray-900">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            Track your previous food orders.
          </p>

        </div>

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">

            <div className="text-center">

              <LoaderCircle
                size={40}
                className="mx-auto animate-spin text-orange-500"
              />

              <p className="mt-4 font-semibold text-gray-600">
                Loading your orders...
              </p>

            </div>

          </div>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-3xl border border-red-100 bg-red-50 p-8 text-center">

            <AlertCircle
              size={40}
              className="mx-auto text-red-500"
            />

            <p className="mt-4 font-bold text-red-600">
              {error}
            </p>

            <button
              onClick={fetchOrders}
              className="mt-5 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              Try Again
            </button>

          </div>
        )}

        {!loading &&
          !error &&
          orders.length === 0 && (
            <div className="mt-10 rounded-[2rem] bg-white p-12 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                <ClipboardList size={36} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-gray-900">
                No orders yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                You haven't placed any orders yet.
                Find something delicious and place your
                first order!
              </p>

              <Link
                to="/"
                className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600"
              >
                Start Ordering 🍔
              </Link>

            </div>
          )}

        {!loading &&
          !error &&
          orders.length > 0 && (
            <div className="mt-8 space-y-5">

              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg"
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Order
                      </p>

                      <h2 className="mt-1 text-xl font-black text-gray-900">
                        #{order.id}
                      </h2>

                    </div>

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-bold ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </div>

                  <div className="mt-6 border-t border-gray-100 pt-5">

                    <div className="flex items-center justify-between">

                      <div>

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

                      <div className="text-right">

                        <p className="text-sm text-gray-500">
                          Items
                        </p>

                        <p className="mt-1 font-bold text-gray-900">
                          {order.order_items?.length || 0}
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

export default Orders;