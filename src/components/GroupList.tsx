'use client';

import React, { useEffect, useState } from 'react';
import apiService from "@/services/api.service";
import Pagination from "@/components/Pagination";
import {useSearchProvider} from "@/providers/SearchProvider";

const GroupList = ({ selectedUsers, setSelectedUsers }) => {
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


    const handleCheckboxChange = (userId: number) => {
        setSelectedUsers(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            } else {
                return [...prev, userId ];
            }
        });
    };


    return (
        <div className="flex flex-col items-center w-full bg-gray-200 py-10 px-4 sm:px-6 lg:px-8">
            {users.length > 0 ? (
                <div className="max-h-[400px] overflow-y-auto w-full space-y-2">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="flex-1 flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>

                                <div className="flex-1 justify-between flex items-center gap-5">
                                    <h2 className="text-lg font-semibold text-gray-800 space-x-2">
                                        {user.firstName} {user.lastName}
                                    </h2>
                                    <input type="checkbox" onChange={() => handleCheckboxChange(user.id)} checked={selectedUsers.includes(user.id)}/>
                                </div>
                            </div>
                        </div>
                    ))}
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

export default GroupList;
