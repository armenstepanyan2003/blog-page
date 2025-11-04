"use client";

import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import apiService from "@/services/api.service";
import EmptyData from "@/components/ui/EmptyData";
import SendIcon from "../../../../public/assets/send.svg";
import Image from "next/image";

export default function FollowingPage() {
    const router = useRouter();
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const data = await apiService.getFollowing();
                setFollowing(data || []);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFollowing();
    }, []);

    const handleGoToChat = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/getOrCreateChat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ receiverId: userId })
            });

            const data = await res.json();

            console.log('data', data);
            router.push(`/chats/${data.chatId}`);
        } catch (error) {
            console.log(error);
        }
    };

        return (
        <div className="flex flex-col items-center w-full bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-sky-700 mb-6">Following</h1>
            <p className="text-4xl">{following?.length}</p>

            {following.length === 0 ? (
                <EmptyData />
            ) : (
                <ul className="space-y-4 mt-6 w-full max-w-md">
                    {following.map(user => (
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

                            <button
                                onClick={() => handleGoToChat(user.id)}
                                className="text-blue-500 font-semibold hover:underline"
                            >
                                <Image src={SendIcon.src} alt="sent" width="24" height="24"/>
                            </button>
                        </li>

                    ))}
                </ul>
            )}
        </div>
    );
}
