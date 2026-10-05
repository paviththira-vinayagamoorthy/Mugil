import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  CreditCard,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";


function Cart() {
  const {
    cartItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();


  const deliveryFee =
    cartItems.length > 0 ? 250 : 0;

  const grandTotal =
    cartTotal + deliveryFee;


  // EMPTY CART

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fffaf5]">

        <div className="border-b border-orange-100 bg-white">

          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

            <Link
              to="/"
              className="inline-flex items-center gap-2 font-semibold text-gray-600 transition hover:text-orange-500"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>

          </div>

        </div>


        <div className="mx-auto flex min-h-[75vh] max-w-3xl items-center justify-center px-4 py-16">

          <div className="w-full rounded-[2rem] bg-white px-6 py-14 text-center shadow-xl shadow-orange-100">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-50">

              <ShoppingBag
                size={42}
                className="text-orange-500"
              />

            </div>


            <h1 className="mt-7 text-3xl font-black text-gray-900">
              Your cart is empty
            </h1>


            <p className="mx-auto mt-3 max-w-md text-gray-500">
              Looks like you haven't added any delicious
              food yet. Let's find something tasty for you!
            </p>


            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-1 hover:bg-orange-600"
            >
              Explore Foods
              <span>🍔</span>
            </Link>

          </div>

        </div>

      </div>
    );
  }


  // CART

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      {/* HEADER */}

      <div className="border-b border-orange-100 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 font-semibold text-gray-600 transition hover:text-orange-500"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>


          <div>

            <p className="font-semibold text-orange-500">
              Your Selection
            </p>

            <h1 className="mt-1 text-3xl font-black text-gray-900 sm:text-4xl">
              Your Cart 🛒
            </h1>

            <p className="mt-2 text-gray-500">
              {cartItems.reduce(
                (total, item) =>
                  total + item.quantity,
                0
              )}{" "}
              items in your cart
            </p>

          </div>

        </div>

      </div>


      {/* MAIN */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">


          {/* CART ITEMS */}

          <div className="space-y-5">

            {cartItems.map((item) => (

              <div
                key={item.id}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-5"
              >

                <div className="flex gap-4 sm:gap-5">


                  {/* IMAGE */}

                  <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-orange-50 sm:h-36 sm:w-36">

                    {item.image ? (

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <div className="flex h-full items-center justify-center text-3xl">
                        🍔
                      </div>

                    )}

                  </div>


                  {/* DETAILS */}

                  <div className="flex min-w-0 flex-1 flex-col justify-between">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-orange-500">
                        {item.category?.name ||
                          item.category ||
                          "Food"}
                      </p>


                      <h2 className="mt-1 line-clamp-2 text-base font-extrabold text-gray-900 sm:text-lg">
                        {item.name}
                      </h2>


                      <p className="mt-1 text-sm font-bold text-gray-700">
                        Rs.{" "}
                        {Number(
                          item.price
                        ).toLocaleString()}
                      </p>

                    </div>


                    {/* CONTROLS */}

                    <div className="mt-4 flex items-center justify-between gap-3">


                      <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50">

                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-l-xl text-gray-600 transition hover:bg-orange-100 hover:text-orange-500"
                        >
                          <Minus size={16} />
                        </button>


                        <span className="flex h-9 min-w-9 items-center justify-center border-x border-gray-200 bg-white px-2 text-sm font-bold text-gray-900">
                          {item.quantity}
                        </span>


                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-r-xl text-gray-600 transition hover:bg-orange-100 hover:text-orange-500"
                        >
                          <Plus size={16} />
                        </button>

                      </div>


                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        <Trash2 size={16} />

                        <span className="hidden sm:inline">
                          Remove
                        </span>

                      </button>

                    </div>

                  </div>


                  {/* ITEM TOTAL */}

                  <div className="hidden text-right sm:block">

                    <p className="text-xs text-gray-400">
                      Total
                    </p>

                    <p className="mt-1 text-lg font-black text-gray-900">
                      Rs.{" "}
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toLocaleString()}
                    </p>

                  </div>

                </div>


                {/* MOBILE TOTAL */}

                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 sm:hidden">

                  <span className="text-sm text-gray-500">
                    Item Total
                  </span>

                  <span className="font-black text-gray-900">
                    Rs.{" "}
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toLocaleString()}
                  </span>

                </div>

              </div>

            ))}


            {/* DELIVERY INFO */}

            <div className="flex items-start gap-4 rounded-2xl border border-green-100 bg-green-50 p-5">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-sm">
                <Truck size={21} />
              </div>

              <div>

                <p className="font-bold text-gray-900">
                  Fast & Fresh Delivery
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Your food will be freshly prepared and
                  delivered to your doorstep.
                </p>

              </div>

            </div>

          </div>


          {/* SUMMARY */}

          <div className="lg:sticky lg:top-24 lg:h-fit">

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-orange-100">

              <div className="flex items-center justify-between">

                <h2 className="text-xl font-black text-gray-900">
                  Order Summary
                </h2>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <ShoppingBag size={20} />
                </div>

              </div>


              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-semibold text-gray-900">
                    Rs.{" "}
                    {cartTotal.toLocaleString()}
                  </span>

                </div>


                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Delivery Fee
                  </span>

                  <span className="font-semibold text-gray-900">
                    Rs.{" "}
                    {deliveryFee.toLocaleString()}
                  </span>

                </div>


                <div className="border-t border-dashed border-gray-200 pt-4">

                  <div className="flex items-center justify-between">

                    <span className="font-bold text-gray-900">
                      Total
                    </span>

                    <span className="text-2xl font-black text-orange-500">
                      Rs.{" "}
                      {grandTotal.toLocaleString()}
                    </span>

                  </div>

                </div>

              </div>


              {/* CHECKOUT */}

              <Link
                to="/checkout"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-4 font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-1 hover:bg-orange-600"
              >
                <CreditCard size={19} />
                Proceed to Checkout
              </Link>


              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                Secure checkout • Fresh food • Fast delivery
              </p>

            </div>


            {/* PAYMENT */}

            <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-5">

              <p className="text-sm font-bold text-gray-800">
                We accept
              </p>

              <div className="mt-3 flex gap-2">

                <div className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-500">
                  VISA
                </div>

                <div className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-500">
                  MASTER
                </div>

                <div className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-bold text-gray-500">
                  CASH
                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}


export default Cart;