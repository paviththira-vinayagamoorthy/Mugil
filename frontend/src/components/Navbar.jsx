import {
  ShoppingBag,
  User,
  Menu,
  X,
  Home,
  ClipboardList,
  LogIn,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartCount } = useCart();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* LOGO */}

        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-2xl shadow-lg shadow-orange-200">
            🍔
          </div>

          <div>

            <h1 className="text-xl font-black tracking-tight text-gray-900">
              Mug<span className="text-orange-500">
                il
              </span>
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Delicious food, delivered
            </p>

          </div>

        </Link>

        {/* DESKTOP NAV */}

        <div className="hidden items-center gap-7 md:flex">

          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-gray-600 transition hover:text-orange-500"
          >
            <Home size={17} />
            Home
          </Link>

          <a
            href="/#foods"
            className="font-semibold text-gray-600 transition hover:text-orange-500"
          >
            Foods
          </a>

          {isAuthenticated && user?.role === "customer" && (
            <Link
              to="/orders"
              className="flex items-center gap-2 font-semibold text-gray-600 transition hover:text-orange-500"
            >
              <ClipboardList size={17} />
              My Orders
            </Link>
          )}

          {isAuthenticated && user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 font-semibold text-gray-600 transition hover:text-orange-500"
            >
              <ShieldCheck size={17} />
              Admin
            </Link>
          )}

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2">

          {/* CART */}

          <Link
            to="/cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition hover:scale-105 hover:bg-orange-100"
          >

            <ShoppingBag size={21} />

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-xs font-black text-white">
                {cartCount}
              </span>
            )}

          </Link>

          {/* AUTH DESKTOP */}

          {isAuthenticated ? (
            <div className="hidden items-center gap-3 sm:flex">

              <div className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                  <User size={16} />
                </div>

                <div className="max-w-28">

                  <p className="truncate text-sm font-bold text-gray-900">
                    {user?.name}
                  </p>

                  <p className="text-xs capitalize text-gray-400">
                    {user?.role}
                  </p>

                </div>

              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-red-50 hover:text-red-500"
              >
                <LogOut size={18} />
              </button>

            </div>
          ) : (
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500 sm:flex"
            >
              <LogIn size={17} />
              Login
            </Link>
          )}

          {/* MOBILE MENU */}

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-orange-100 md:hidden"
          >

            {menuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="border-t border-gray-100 bg-white px-6 py-5 md:hidden">

          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-2 font-semibold text-gray-700"
            >
              <Home size={18} />
              Home
            </Link>

            <a
              href="/#foods"
              onClick={closeMenu}
              className="font-semibold text-gray-700"
            >
              Foods
            </a>

            {isAuthenticated &&
              user?.role === "customer" && (
                <Link
                  to="/orders"
                  onClick={closeMenu}
                  className="flex items-center gap-2 font-semibold text-gray-700"
                >
                  <ClipboardList size={18} />
                  My Orders
                </Link>
              )}

            {isAuthenticated &&
              user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-2 font-semibold text-gray-700"
                >
                  <ShieldCheck size={18} />
                  Admin Dashboard
                </Link>
              )}

            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center gap-2 border-t border-gray-100 pt-4 font-bold text-orange-500"
              >
                <LogIn size={18} />
                Login
              </Link>
            ) : (
              <>
                <div className="border-t border-gray-100 pt-4">

                  <p className="font-bold text-gray-900">
                    {user?.name}
                  </p>

                  <p className="text-sm capitalize text-gray-400">
                    {user?.role}
                  </p>

                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 font-bold text-red-500"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}

            <Link
              to="/cart"
              onClick={closeMenu}
              className="flex items-center gap-2 border-t border-gray-100 pt-4 font-semibold text-gray-700"
            >
              <ShoppingBag size={18} />
              Cart

              {cartCount > 0 && (
                <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}

            </Link>

          </div>

        </div>

      )}

    </nav>
  );
}

export default Navbar;