"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import EmptyData from "@/components/ui/EmptyData";
import apiService from "@/services/api.service";
import Link from "next/link";

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
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-50 to-sky-100 p-6">
            <h1 className="text-4xl font-extrabold text-sky-700 mb-6">Followers</h1>
            <BackButton />

            {followers.length === 0 ? (
                <EmptyData />
            ) : (
                <ul className="space-y-4 mt-6 w-full max-w-md">
                    {followers.map((user) => (
                        <li
                            key={user.id}
                            className="p-4 bg-white shadow rounded-xl flex justify-between items-center"
                        >
                            <span className="font-medium text-sky-700">
                                {user.firstName} {user.lastName}
                            </span>
                            <Link href={`/chats/${user.id}`}>
                                Send Message
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
