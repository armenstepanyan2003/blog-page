'use client';

import React, { useEffect, useState } from 'react';
import BackButton from "@/components/BackButton";
import apiService from "@/services/api.service";
import Pagination from "@/components/Pagination";

const AllUsersPage = () => {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

    const fetchAllUsers = async () => {
        try {
            const data = await apiService.getAllUsers(page, 2, search);
            setUsers(data.users);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
            setUsers([]);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, [page, search])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleToggleFollow = async (userId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(`http://localhost:5000/users/followers/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!res.ok) return;

            const data = await res.json();
            const following = data.action === "follow";

            setUsers(prev => prev.map(user =>
                user.id === userId ? { ...user, isFollowing: following } : user
              )
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-50 to-sky-100 p-6">
            <div className="flex flex-col items-center mb-6 space-y-4">
                <h1 className="text-4xl font-extrabold text-sky-700">Users</h1>
                <BackButton />
            </div>
            <input
                type="text"
                placeholder="Search by username"
                value={search}
                onChange={handleSearch}
                className="border p-2 rounded mb-4"
            />

            {users.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {users.map((user) => {
                        const isSelf = currentUser?.id === user.id;

                        return (
                            <div
                                key={user.id}
                                className="bg-white shadow-md rounded-xl p-4 flex gap-8 items-center space-x-4"
                            >
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xl text-gray-500">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>

                                <div className="flex flex-col">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {user.firstName} {user.lastName}
                                    </h2>
                                </div>

                                {!isSelf && (
                                    <button
                                        onClick={() => handleToggleFollow(user.id)}
                                        className={`
                                            px-4 py-2 rounded-lg font-semibold transition-colors duration-200
                                            ${user.isFollowing
                                            ? "bg-red-500 text-white border border-red-500"
                                            : "bg-blue-500 text-white border border-blue-500"}
                                        `}
                                    >
                                        {user.isFollowing ? "Unfollow" : "Follow"}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-gray-400 mt-6">No users found.</p>
            )}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
};

export default AllUsersPage;
