"use client";

import React, { useEffect, useState } from "react";
import EmptyData from "@/components/ui/EmptyData";
import apiService from "@/services/api.service";
import SendIcon from "../../../../public/assets/send.svg";
import Link from "next/link";
import Image from "next/image";

export default function FollowingPage() {
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        const fetchFollowers = async  () => {
            try {
                const data = await apiService.getFollowers();
                setFollowers(data || []);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFollowers();
    }, []);

    return (
        <div className="flex flex-col items-center w-full bg-gray-510 py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-sky-700 mb-6">Followers</h1>

            {followers.length === 0 ? (
                <EmptyData />
            ) : (
                <ul className="space-y-4 mt-6 w-full max-w-md">
                    {followers.map((user) => (
                        <li
                            key={user.id}
                            className="p-4 bg-white shadow-md rounded-xl flex justify-between items-center"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>
                                <span className="font-medium text-gray-900">
                                    {user.firstName} {user.lastName}
                                </span>
                            </div>

                            <Link
                                href={`/chats/${user.id}`}
                                className="text-blue-500 font-semibold hover:underline"
                            >
                               <Image src={SendIcon.src} alt="sent" width="24" height="24"/>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
