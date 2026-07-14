"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Heading } from "../UI/Heading";
import { getUsers, updateUserRoles } from "@/lib/userQueries";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ArrowUp } from "lucide-react";

const roles = ["admin", "student", "social_handler"];
const filterOptions = ["all", ...roles];

export const Dashboard = () => {
  const queryClient = useQueryClient();

  const [selectedRole, setSelectedRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["users", selectedRole, debouncedSearchTerm],
      queryFn: ({ pageParam }) =>
        getUsers({ pageParam, selectedRole, search: debouncedSearchTerm }),
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      staleTime: 1000 * 60 * 2,
      gcTime: 1000 * 60 * 10,
    });

  const roleMutation = useMutation({
    mutationKey: ["updating-roles"],
    mutationFn: updateUserRoles,
    onSuccess: () => {
      setUsersForUpdate([]);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { data: You } = useCurrentUser();
  const users = data?.pages.flatMap((page) => page.users) || [];
  const [editMode, setEditMode] = useState(false);
  const [usersForUpdate, setUsersForUpdate] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const observerRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = () => {
    setEditMode(false);

    if (!usersForUpdate.length) {
      return;
    }
    roleMutation.mutate(usersForUpdate);
  };

  const handleCancel = () => {
    setEditMode(false);
    setUsersForUpdate([]);
  };

  return (
    <section className="w-full min-h-screen px-4 py-6 sm:px-6 sm:py-8 scroll-smooth">
      <Heading>Dashboard</Heading>

      <div className="mt-10 flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#2D2926]">Users</h2>
            <p className="text-neutral-500">
              Total Users : {data && data.pages[0].totalUsers}
            </p>
          </div>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="rounded-xl bg-[#2D2926] px-6 py-3 text-white transition hover:opacity-90"
            >
              Edit Users
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={roleMutation.isPending}
                className="flex-1 rounded-xl bg-green-600 px-6 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
              >
                {roleMutation.isPending ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 rounded-xl border border-[#2D2926] px-6 py-3 text-[#2D2926] transition hover:bg-[#2D2926]/5 sm:flex-none"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search Users"
            name="searchbar"
            id="searchbar"
            autoComplete="off"
            autoCapitalize="off"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 w-full rounded-full border border-transparent bg-neutral-100 px-5 outline-2 outline-secondary/20 transition-all focus:border-secondary/20 sm:flex-1"
          />

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="h-14 w-full cursor-pointer rounded-full border border-[#ddd1c2] bg-white px-5 font-medium text-[#2D2926] outline-none transition focus:border-[#2D2926] sm:w-auto"
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All Roles" : option.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-[#ddd1c2] bg-white shadow-xl sm:rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F7F2EA]">
              <tr className="text-left text-sm uppercase tracking-wider text-[#2D2926]">
                <th className="px-4 py-4 sm:px-6 sm:py-5">User</th>
                <th className="hidden px-6 py-5 md:table-cell">Email</th>
                <th className="hidden px-6 py-5 sm:table-cell">Role</th>
                <th className="hidden px-6 py-5 sm:table-cell">Status</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <UserRow
                  key={user._id}
                  user={user}
                  editMode={editMode}
                  You={You}
                  usersForUpdate={usersForUpdate}
                  setUsersForUpdate={setUsersForUpdate}
                />
              ))}
            </tbody>
          </table>
        </div>

        {!isLoading && !users.length && (
          <p className="py-10 text-center text-sm text-neutral-400">
            No users found.
          </p>
        )}

        <div ref={observerRef} className="h-4 w-full">
          {isFetchingNextPage && (
            <p className="py-4 text-center text-sm text-neutral-400">
              Loading more users...
            </p>
          )}
        </div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#2D2926] text-white shadow-lg transition hover:opacity-90 sm:bottom-8 sm:right-8 sm:h-12 sm:w-12"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </section>
  );
};

function UserRow({ user, editMode, You, usersForUpdate, setUsersForUpdate }) {
  const { username, email, role, verified, _id } = user;
  const isYou = _id === You._id;

  const updatedUser = usersForUpdate.find((curElem) => curElem._id === _id);

  const handleRoleUpdate = (e) => {
    setUsersForUpdate((prev) => {
      const index = prev.findIndex((curElem) => curElem._id === _id);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = { ...updated[index], role: e.target.value };
        return updated;
      }

      return [...prev, { _id, role: e.target.value }];
    });
  };

  return (
    <tr className="border-t border-neutral-200 transition hover:bg-[#faf7f2]">
      <td className="px-4 py-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2D2926] text-base font-semibold text-white sm:h-12 sm:w-12 sm:text-lg">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-[#2D2926]">
              {isYou ? "You" : username}
            </p>
            <p className="text-xs text-neutral-400">{_id.slice(0, 8)}...</p>
            <p className="mt-1 truncate text-xs text-neutral-500 md:hidden">
              {email}
            </p>
            <span className="mt-1 inline-block sm:hidden">
              {verified ? (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Verified
                </span>
              ) : (
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                  Pending
                </span>
              )}
            </span>
            <span className="mt-1 ml-2 inline-block sm:hidden">
              {" "}
              {editMode && !isYou ? (
                <select
                  className="rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-[#2D2926] sm:px-4"
                  value={updatedUser?.role || role}
                  onChange={handleRoleUpdate}
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r.replace("_", " ")}
                    </option>
                  ))}
                </select>
              ) : (
                <RoleBadge role={role} />
              )}
            </span>
          </div>
        </div>
      </td>
      <td className="hidden px-6 py-5 text-neutral-600 md:table-cell">
        {email}
      </td>
      <td className="hidden px-4 py-4  sm:table-cell">
        {editMode && !isYou ? (
          <select
            className="rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-[#2D2926] sm:px-4"
            value={updatedUser?.role || role}
            onChange={handleRoleUpdate}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.replace("_", " ")}
              </option>
            ))}
          </select>
        ) : (
          <RoleBadge role={role} />
        )}
      </td>
      <td className="hidden px-6 py-5 sm:table-cell">
        {verified ? (
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            Verified
          </span>
        ) : (
          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
            Pending
          </span>
        )}
      </td>
    </tr>
  );
}

function RoleBadge({ role }) {
  const styles = {
    admin: "bg-[#2D2926] text-white",
    student: "bg-blue-100 text-blue-700",
    social_handler: "bg-violet-100 text-violet-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-medium sm:px-4 sm:py-2 sm:text-sm ${styles[role] || "bg-neutral-100 text-neutral-700"}`}
    >
      {role.replace("_", " ")}
    </span>
  );
}
