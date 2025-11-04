"use client";

import React, {useEffect, useState} from "react";
import EmptyData from "@/components/ui/EmptyData";
import SendIcon from "../../../../public/assets/send.svg";
import Link from "next/link";
import Image from "next/image";
import apiService from "@/services/api.service";
import GroupModal from "@/components/GroupModal";


export default function MyChats() {
    const [chats, setChats] = useState([]);
    const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setCurrentUser(user);
    }, []);

    useEffect(() => {
        const fetchMyChats = async () => {
            try {
                const data = await apiService.getMyChats();
                setChats(data.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchMyChats();
    }, []);


    const openGroupModal = () => {
        setIsGroupModalVisible(true);
    }

    const closeGroupModal = () => {
        setIsGroupModalVisible(false);
    }

    const handleGroupCreated = (newChat) => {
        setChats((prev) => [...prev, newChat]);
    };

    return (
        <div className="flex flex-col items-center w-full bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold text-sky-700 mb-6">My Chats</h1>

            <button
                onClick={openGroupModal}
                className="mb-4 px-6 py-2 bg-sky-600 text-white font-semibold rounded-full shadow-md hover:bg-sky-700 transition duration-300 ease-in-out"
            >
                + Create Group
            </button>

            {chats.length === 0 ? (
                <EmptyData />
            ) : (
                <ul className="space-y-4 mt-6 w-full max-w-md">
                    {chats.map(chat => (
                        <li
                            key={chat.id}
                            className="p-4 bg-white shadow-md rounded-xl flex justify-between items-center"
                        >
                            {chat.isGroup ? (
                                (() => {
                                    const otherUsers = chat.chatParticipantRecords
                                        .map(uc => uc.user)
                                        .filter(u => u.id !== currentUser?.id);

                                    let iconContent = "?";
                                    let displayName = "";

                                    if (otherUsers?.length === 1) {
                                        iconContent = otherUsers[0].firstName[0];
                                        displayName = `${otherUsers[0].firstName} ${otherUsers[0].lastName}`;
                                    } else {
                                        displayName = chat.groupName && chat.groupName.trim() !== ""
                                            ? chat.groupName
                                            : otherUsers.map(u => u.firstName).join(", ");
                                    }

                                    return (
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
                                                {iconContent}
                                            </div>
                                            <span className="font-medium text-gray-900">{displayName}</span>
                                        </div>
                                    );
                                })()
                            ) : (
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
                                        {chat.chatParticipantRecords[0].user.firstName[0]}
                                        {chat.chatParticipantRecords[0].user.lastName[0]}
                                    </div>
                                    <span className="font-medium text-gray-900">
                                        {chat.chatParticipantRecords[0].user.firstName} {chat.chatParticipantRecords[0].user.lastName}
                                     </span>
                                </div>
                            )}

                            <Link
                                href={`/chats/${chat.id}`}
                                className="text-blue-500 font-semibold hover:underline"
                            >
                                <Image src={SendIcon.src} alt="sent" width="24" height="24" />
                            </Link>
                        </li>

                    ))}
                </ul>
            )}

            <GroupModal
                visible={isGroupModalVisible}
                setVisible={setIsGroupModalVisible}
                onCancel={closeGroupModal}
                title="Create Group"
                currentUser={currentUser}
                onGroupCreated={handleGroupCreated}
            />
        </div>
    );
}