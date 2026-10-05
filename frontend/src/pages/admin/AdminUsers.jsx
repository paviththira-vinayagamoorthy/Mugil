import {
  ArrowLeft,
  Users,
  Search,
  LoaderCircle,
  AlertCircle,
  ShieldCheck,
  UserRound,
  UserX,
  UserCheck,
  RefreshCw,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import api from "../../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingUser, setUpdatingUser] =
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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/users",
        authConfig
      );

      setUsers(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.detail ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (user) => {
    const newStatus = !user.is_active;

    try {
      setUpdatingUser(user.id);

      /*
       * Admin user status endpoint.
       *
       * Expected:
       * PATCH /users/{id}/status
       */
      await api.patch(
        `/users/${user.id}/status`,
        {
          is_active: newStatus,
        },
        authConfig
      );

      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          item.id === user.id
            ? {
                ...item,
                is_active: newStatus,
              }
            : item
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.detail ||
          "Unable to update user status."
      );
    } finally {
      setUpdatingUser(null);
    }
  };

  const filteredUsers = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    if (!searchText) {
      return users;
    }

    return users.filter((user) =>
      [
        user.name,
        user.email,
        user.role,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value)
            .toLowerCase()
            .includes(searchText)
        )
    );
  }, [users, search]);

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.is_active
  ).length;

  const inactiveUsers = users.filter(
    (user) => !user.is_active
  ).length;

  const adminUsers = users.filter(
    (user) => user.role === "admin"
  ).length;

  return (
    <div className="min-h-screen bg-[#fffaf5]">

      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-orange-500"
            >
              <ArrowLeft size={17} />
              Admin Dashboard
            </Link>

            <p className="mt-6 font-bold text-orange-500">
              User Management
            </p>

            <h1 className="mt-1 text-4xl font-black text-gray-900">
              Users
            </h1>

            <p className="mt-2 text-gray-500">
              Manage customers and administrator accounts.
            </p>

          </div>

          <button
            onClick={fetchUsers}
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

        {/* Stats */}
        {!loading && !error && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Users size={21} />
                </div>

                <span className="text-2xl font-black text-gray-900">
                  {totalUsers}
                </span>

              </div>

              <p className="mt-4 text-sm font-semibold text-gray-500">
                Total Users
              </p>

            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                  <UserCheck size={21} />
                </div>

                <span className="text-2xl font-black text-gray-900">
                  {activeUsers}
                </span>

              </div>

              <p className="mt-4 text-sm font-semibold text-gray-500">
                Active Users
              </p>

            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                  <UserX size={21} />
                </div>

                <span className="text-2xl font-black text-gray-900">
                  {inactiveUsers}
                </span>

              </div>

              <p className="mt-4 text-sm font-semibold text-gray-500">
                Inactive Users
              </p>

            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <ShieldCheck size={21} />
                </div>

                <span className="text-2xl font-black text-gray-900">
                  {adminUsers}
                </span>

              </div>

              <p className="mt-4 text-sm font-semibold text-gray-500">
                Admin Users
              </p>

            </div>

          </div>
        )}

        {/* Search */}
        <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="relative">

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
              placeholder="Search by name, email or role..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
            />

          </div>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5">

            <div className="flex items-center gap-3 text-red-600">

              <AlertCircle size={22} />

              <p className="font-semibold">
                {error}
              </p>

            </div>

            <button
              onClick={fetchUsers}
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
                Loading users...
              </p>

            </div>

          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          filteredUsers.length === 0 && (
            <div className="mt-8 rounded-[2rem] bg-white p-14 text-center shadow-sm">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                <Users size={36} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-gray-900">
                No users found
              </h2>

              <p className="mt-2 text-gray-500">
                Try changing your search.
              </p>

            </div>
          )}

        {/* Desktop Table */}
        {!loading &&
          !error &&
          filteredUsers.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">

              <div className="hidden overflow-x-auto md:block">

                <table className="w-full">

                  <thead className="bg-gray-50">

                    <tr>

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-400">
                        User
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-400">
                        Role
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-gray-400">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-gray-400">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-gray-100">

                    {filteredUsers.map(
                      (user) => (
                        <tr
                          key={user.id}
                          className="transition hover:bg-orange-50/30"
                        >

                          {/* User */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                                {user.role ===
                                "admin" ? (
                                  <ShieldCheck
                                    size={19}
                                  />
                                ) : (
                                  <UserRound
                                    size={19}
                                  />
                                )}
                              </div>

                              <div>

                                <p className="font-bold text-gray-900">
                                  {user.name}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                  {user.email}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* Role */}
                          <td className="px-6 py-5">

                            <span
                              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                                user.role ===
                                "admin"
                                  ? "bg-purple-50 text-purple-600"
                                  : "bg-blue-50 text-blue-600"
                              }`}
                            >
                              {user.role}
                            </span>

                          </td>

                          {/* Status */}
                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                                user.is_active
                                  ? "bg-green-50 text-green-600"
                                  : "bg-red-50 text-red-500"
                              }`}
                            >

                              <span
                                className={`h-2 w-2 rounded-full ${
                                  user.is_active
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              />

                              {user.is_active
                                ? "Active"
                                : "Inactive"}

                            </span>

                          </td>

                          {/* Action */}
                          <td className="px-6 py-5 text-right">

                            <button
                              onClick={() =>
                                toggleUserStatus(
                                  user
                                )
                              }
                              disabled={
                                updatingUser ===
                                user.id
                              }
                              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                user.is_active
                                  ? "bg-red-50 text-red-500 hover:bg-red-100"
                                  : "bg-green-50 text-green-600 hover:bg-green-100"
                              }`}
                            >

                              {updatingUser ===
                              user.id ? (
                                <LoaderCircle
                                  size={17}
                                  className="animate-spin"
                                />
                              ) : user.is_active ? (
                                <UserX
                                  size={17}
                                />
                              ) : (
                                <UserCheck
                                  size={17}
                                />
                              )}

                              {user.is_active
                                ? "Deactivate"
                                : "Activate"}

                            </button>

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 p-4 md:hidden">

                {filteredUsers.map(
                  (user) => (
                    <div
                      key={user.id}
                      className="rounded-2xl border border-gray-100 p-4"
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-orange-500">

                            {user.role ===
                            "admin" ? (
                              <ShieldCheck
                                size={19}
                              />
                            ) : (
                              <UserRound
                                size={19}
                              />
                            )}

                          </div>

                          <div>

                            <p className="font-bold text-gray-900">
                              {user.name}
                            </p>

                            <p className="text-sm text-gray-500">
                              {user.email}
                            </p>

                          </div>

                        </div>

                      </div>

                      <div className="mt-4 flex items-center justify-between">

                        <div className="flex gap-2">

                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                              user.role ===
                              "admin"
                                ? "bg-purple-50 text-purple-600"
                                : "bg-blue-50 text-blue-600"
                            }`}
                          >
                            {user.role}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                              user.is_active
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-500"
                            }`}
                          >
                            {user.is_active
                              ? "Active"
                              : "Inactive"}
                          </span>

                        </div>

                        <button
                          onClick={() =>
                            toggleUserStatus(
                              user
                            )
                          }
                          disabled={
                            updatingUser ===
                            user.id
                          }
                          className={`rounded-xl p-2.5 ${
                            user.is_active
                              ? "bg-red-50 text-red-500"
                              : "bg-green-50 text-green-600"
                          }`}
                        >

                          {updatingUser ===
                          user.id ? (
                            <LoaderCircle
                              size={18}
                              className="animate-spin"
                            />
                          ) : user.is_active ? (
                            <UserX size={18} />
                          ) : (
                            <UserCheck
                              size={18}
                            />
                          )}

                        </button>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>
          )}

      </main>

    </div>
  );
}

export default AdminUsers;