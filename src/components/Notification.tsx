'use client'

import React, { useEffect } from 'react';
import Image from "next/image";
import BellIcon from "../../public/assets/bell.svg";
import { useNotificationProvider } from "@/providers/NotificationProvider";
import { useSocket } from "@/providers/SocketProvider";
import { useUserProvider } from "@/providers/UserProvider";
import apiService from "@/services/api.service";

const Notification = () => {
    const { socket } = useSocket();
    const { count, setCount } = useNotificationProvider();
    const { isOn } = useNotificationProvider()
    const { user } = useUserProvider();

    useEffect(() => {
        const fetchCount = async () => {
            if (!user?.id) return;
            try {
                const res = await apiService.messageCount();
                setCount(res.count || 0);
            } catch (error) {
                console.error("Failed to load message count:", error);
            }
        };

        fetchCount();
    }, [user, setCount]);

    useEffect(() => {
        if (!user?.id || !socket) return;

        socket?.on(`notification_received_${user.id}`, () => {
            setCount(prev => prev + 1);
        });

        return () => {
            socket?.off(`notification_received_${user.id}`);
        };
    }, [socket, setCount, user]);

    return (
        <div className="relative">
            <Image src={BellIcon.src} alt="notification" width="24" height="24" />

            { count > 0 && isOn && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {count}
                </span>
            )}
        </div>
    );
};

export default Notification;