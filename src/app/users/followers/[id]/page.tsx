'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "next/navigation";
import apiService from "@/services/api.service";
import BackButton from "@/components/BackButton";

export default function ChatPage() {
    const params = useParams();
    const userId = params.id;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const data = await apiService.getMessages(userId);
                console.log(data);
                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMessages();
    },[userId]);


    const handleSend = async () => {
        if (!newMessage.trim()) return;

        try {
            const sentMessage = await apiService.writeMessage({
                receiverId: userId,
                content: newMessage
            });

            setMessages(prev => [...prev, sentMessage]);
            setNewMessage("");
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-sky-50 to-sky-100 p-6 gap-5">

            <h1 className="text-2xl font-bold text-sky-700 mb-4">
                Chat {messages.receiverId}
            </h1>
            <BackButton />

            <div className="w-full max-w-md flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden">

                <div className="flex-1 p-4 overflow-y-auto space-y-3 h-[400px]">
                    {messages.length === 0 ? (
                        <p className="text-gray-500 text-center">No messages yet.</p>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.senderId === Number(userId) ? "justify-start" : "justify-end"}`}
                            >
                                <div
                                    className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
                                        msg.senderId === Number(userId)
                                            ? "bg-gray-200 text-gray-800 rounded-bl-none"
                                            : "bg-sky-500 text-white rounded-br-none"
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="border-t p-3 flex items-center bg-gray-50">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        onClick={handleSend}
                        className="ml-3 px-4 py-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}