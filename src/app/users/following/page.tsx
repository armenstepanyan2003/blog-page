"use client";

import BackButton from "@/components/BackButton";
import {useEffect, useState} from "react";
import apiService from "@/services/api.service";
import EmptyData from "@/components/ui/EmptyData";
import Link from "next/link";

export default function FollowingPage() {
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const data = await apiService.getFollowing();
                setFollowing(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchFollowing();
    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-50 to-sky-100 p-6">
            <h1 className="text-4xl font-extrabold text-sky-700 mb-6">Following</h1>
            <BackButton />

            {following.length === 0 ? (
                <EmptyData />
            ) : (
                <ul className="space-y-4 mt-6 w-full max-w-md">
                    {following.map(user => (
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