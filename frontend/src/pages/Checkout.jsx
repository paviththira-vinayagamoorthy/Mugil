import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  User,
  LoaderCircle,
  ShoppingBag,
} from "lucide-react";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const { user } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deliveryFee = cartItems.length > 0 ? 250 : 0;

  const grandTotal =
    Number(cartTotal) + deliveryFee;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (cartItems.length === 0) {
      setError(
        "Your cart is empty. Please add some food before checkout."
      );
      return;
    }

    if (name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    try {
      setLoading(true);

      // ================================
      // 1. CREATE CUSTOMER
      // ================================

      const customerResponse = await api.post(
        "/customers",
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
        }
      );

      const customer = customerResponse.data;

      // Save customer ID for My Orders page
      localStorage.setItem(
        "customer_id",
        String(customer.id)
      );

      // ================================
      // 2. CREATE ORDER
      // ================================

      const orderResponse = await api.post(
        "/orders",
        {
          customer_id: customer.id,

          items: cartItems.map((item) => ({
            food_id: item.id,
            quantity: item.quantity,
          })),
        }
      );

      const order = orderResponse.data;

      // ================================
      // 3. SAVE ORDER DETAILS
      // ================================

      const confirmationData = {
        customer,
        order,
        cartItems,
        cartTotal: Number(cartTotal),
        deliveryFee,
        grandTotal,
      };

      // ================================
      // 4. CLEAR CART
      // ================================

      clearCart();

      // ================================
      // 5. GO TO CONFIRMATION
      // ================================

      navigate("/order-confirmation", {
        state: confirmationData,
        replace: true,
      });
    } catch (error) {
      console.error(
        "Checkout error:",
        error
      );

      const message =
        error?.response?.data?.detail ||
        "Unable to place your order. Please try again.";

      setError(
        Array.isArray(message)
          ? "Please check your details and try again."
          : message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 font-semibold text-gray-600 transition hover:text-orange-500"
        >
          <ArrowLeft size={19} />
          Back to Cart
        </Link>

        {/* Header */}
        <div className="mt-8">
          <p className="font-bold text-orange-500">
            FoodNest
          </p>

          <h1 className="mt-1 text-4xl font-black text-gray-900">
            Checkout
          </h1>

          <p className="mt-2 text-gray-500">
            Enter your delivery details and place your order.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">

          {/* =====================================
              CUSTOMER DETAILS
          ====================================== */}

          <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                <MapPin size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  Delivery Details
                </h2>

                <p className="text-sm text-gray-500">
                  Where should we deliver your food?
                </p>
              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />

                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />

                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Phone Number
                </label>

                <div className="relative">

                  <Phone
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    placeholder="07XXXXXXXX"
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  />

                </div>
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Delivery Address
                </label>

                <textarea
                  value={address}
                  onChange={(event) =>
                    setAddress(event.target.value)
                  }
                  placeholder="Enter your complete delivery address"
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {/* Payment */}
              <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                    <CreditCard size={20} />
                  </div>

                  <div>
                    <p className="font-bold text-gray-900">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when your food arrives.
                    </p>
                  </div>

                </div>

              </div>

              {/* Mobile submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 font-black text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 lg:hidden"
              >

                {loading ? (
                  <>
                    <LoaderCircle
                      size={20}
                      className="animate-spin"
                    />

                    Placing Order...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={20} />

                    Place Order
                  </>
                )}

              </button>

            </form>

          </div>

          {/* =====================================
              ORDER SUMMARY
          ====================================== */}

          <div className="h-fit rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-7 lg:sticky lg:top-24">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  Your Order
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {cartItems.length} item
                  {cartItems.length !== 1
                    ? "s"
                    : ""}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <ShoppingBag size={21} />
              </div>

            </div>

            {/* Items */}
            <div className="mt-6 space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3"
                >

                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-orange-50">

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl">
                        🍔
                      </div>
                    )}

                  </div>

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate font-bold text-gray-900">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <p className="font-black text-gray-900">
                    Rs.{" "}
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toLocaleString()}
                  </p>

                </div>
              ))}

            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100" />

            {/* Price */}
            <div className="space-y-4">

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-bold text-gray-900">
                  Rs.{" "}
                  {Number(
                    cartTotal
                  ).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Delivery Fee
                </span>

                <span className="font-bold text-gray-900">
                  Rs.{" "}
                  {deliveryFee.toLocaleString()}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4">

                <div className="flex items-end justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="mt-1 text-3xl font-black text-orange-500">
                      Rs.{" "}
                      {grandTotal.toLocaleString()}
                    </p>
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-600">
                    COD
                  </span>

                </div>

              </div>

            </div>

            {/* Desktop submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="mt-7 hidden w-full items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-4 font-black text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 lg:flex"
            >

              {loading ? (
                <>
                  <LoaderCircle
                    size={20}
                    className="animate-spin"
                  />

                  Placing Order...
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />

                  Place Order
                </>
              )}

            </button>

            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
              By placing this order, you confirm that
              your delivery details are correct.
            </p>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Checkout;