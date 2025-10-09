'use client';

import React, { useEffect, useState } from 'react';
import apiService from "@/services/api.service";
import Pagination from "@/components/Pagination";
import Link from "next/link";
import {useSearchProvider} from "@/providers/SearchProvider";

const UsersList = () => {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { search } = useSearchProvider();

    const fetchAllUsers = async () => {
        try {
            const data = await apiService.getAllUsers(page, 10, search);
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
        <div className="flex flex-col items-center w-full bg-gray-200 py-10 px-4 sm:px-6 lg:px-8">
            {users.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {users.map((user) => {

                        return (
                            <div
                                key={user.id}
                                className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
                                        {user.firstName[0]}{user.lastName[0]}
                                    </div>

                                    <h2 className="text-lg font-semibold text-gray-800">
                                        <Link href={`/posts/author/${user.id}`}>
                                            {user.firstName} {user.lastName}
                                        </Link>
                                    </h2>
                                </div>

                                <button
                                    onClick={() => handleToggleFollow(user.id)}
                                    className={`
                                        px-4 py-2 rounded-full font-semibold transition-all duration-200 shadow-sm
                                        ${user.isFollowing
                                        ? "bg-gray-400 text-white border border-gray-400 hover:bg-gray-500"
                                        : "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200"
                                    }
                                 `}
                                >
                                    {user.isFollowing ? "Unfollow" : "Follow"}
                                </button>
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

export default UsersList;
