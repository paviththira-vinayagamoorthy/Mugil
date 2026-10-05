import {
  CheckCircle,
  Home,
  ShoppingBag,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

import {
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";


function OrderConfirmation() {
  const location = useLocation();

  const orderData = location.state;


  if (!orderData) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  const {
    customer,
    order,
    cartItems,
    cartTotal,
    deliveryFee,
    grandTotal,
  } = orderData;


  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <div className="border-b border-orange-100 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

          <Link
            to="/"
            className="inline-flex items-center gap-2 font-semibold text-gray-600 hover:text-orange-500"
          >
            <Home size={19} />
            Mugil
          </Link>

        </div>

      </div>


      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

        {/* SUCCESS */}

        <div className="text-center">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

            <CheckCircle
              size={54}
              className="text-green-500"
            />

          </div>


          <p className="mt-6 font-bold uppercase tracking-wider text-green-600">
            Order Confirmed
          </p>


          <h1 className="mt-2 text-4xl font-black text-gray-900 sm:text-5xl">
            Thank You! 🎉
          </h1>


          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Your delicious food is now being prepared.
            We will deliver it to your doorstep.
          </p>

        </div>


        {/* ORDER NUMBER */}

        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-orange-100 bg-white p-5 text-center shadow-sm">

          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Order Number
          </p>


          <p className="mt-2 text-3xl font-black text-orange-500">
            #{order?.id || "Pending"}
          </p>


          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">

            <Clock size={16} />

            {order?.status || "Pending"}

          </div>

        </div>


        {/* DETAILS */}

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {/* DELIVERY */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-black text-gray-900">
              Delivery Details
            </h2>


            <div className="mt-5 space-y-5">

              <div className="flex gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  👤
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Customer
                  </p>

                  <p className="font-bold">
                    {customer.name}
                  </p>

                </div>

              </div>


              <div className="flex gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <Phone size={18} />
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Phone
                  </p>

                  <p className="font-bold">
                    {customer.phone}
                  </p>

                </div>

              </div>


              <div className="flex gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <MapPin size={18} />
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    Delivery Address
                  </p>

                  <p className="font-semibold leading-6">
                    {customer.address}
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* SUMMARY */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-black">
              Order Summary
            </h2>


            <div className="mt-5 space-y-4">

              {cartItems.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center gap-3"
                >

                  {item.image ? (

                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-xl object-cover"
                    />

                  ) : (

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                      🍔
                    </div>

                  )}


                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-bold">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {item.quantity} × Rs.{" "}
                      {Number(
                        item.price
                      ).toLocaleString()}
                    </p>

                  </div>


                  <p className="text-sm font-bold">
                    Rs.{" "}
                    {(
                      Number(item.price) *
                      item.quantity
                    ).toLocaleString()}
                  </p>

                </div>

              ))}

            </div>


            <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span className="font-semibold">
                  Rs.{" "}
                  {cartTotal.toLocaleString()}
                </span>
              </div>


              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Delivery
                </span>

                <span className="font-semibold">
                  Rs.{" "}
                  {deliveryFee.toLocaleString()}
                </span>
              </div>


              <div className="flex justify-between border-t border-dashed pt-4">

                <span className="font-bold">
                  Total
                </span>

                <span className="text-xl font-black text-orange-500">
                  Rs.{" "}
                  {grandTotal.toLocaleString()}
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* NEXT */}

        <div className="mt-6 rounded-3xl border border-green-100 bg-green-50 p-6">

          <h2 className="font-black text-gray-900">
            What happens next?
          </h2>


          <div className="mt-5 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl bg-white p-4">
              <div className="text-2xl">
                👨‍🍳
              </div>

              <p className="mt-2 font-bold">
                Preparing
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Restaurant prepares your food.
              </p>
            </div>


            <div className="rounded-2xl bg-white p-4">
              <div className="text-2xl">
                🛵
              </div>

              <p className="mt-2 font-bold">
                On the way
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Your food is handed to the rider.
              </p>
            </div>


            <div className="rounded-2xl bg-white p-4">
              <div className="text-2xl">
                🏠
              </div>

              <p className="mt-2 font-bold">
                Delivered
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Enjoy your delicious meal!
              </p>
            </div>

          </div>

        </div>


        {/* BUTTONS */}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-600"
          >
            <Home size={19} />
            Back to Home
          </Link>


          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 font-bold text-gray-700 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
          >
            <ShoppingBag size={19} />
            View My Orders
          </Link>

        </div>

      </main>

    </div>
  );
}

export default OrderConfirmation;