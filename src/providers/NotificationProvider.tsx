'use client'

import {createContext, useContext, useEffect, useState} from "react";
import apiService from "@/services/api.service";

export const NotificationProviderContext = createContext(null);

const NotificationProvider = ({ children }) => {
    const [count, setCount] = useState(0);
    const [isOn, setIsOn] = useState(true)

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const data = await apiService.getNotificationStatus();
                setIsOn(data.notificationsEnabled)
            } catch (error) {
                console.log(error);
            }
        }
        fetchStatus()
    }, [])


    const toggleNotifications = async () => {
        try {
            const newStatus = !isOn
            const res = await apiService.updateNotificationStatus({ status: newStatus });
            setIsOn(res.data.status)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NotificationProviderContext.Provider value={{ count, setCount, isOn, setIsOn: toggleNotifications }}>
            {children}
        </NotificationProviderContext.Provider>
    );
};

export const useNotificationProvider = () => {
    const context = useContext(NotificationProviderContext);
    if (!context) {
        throw new Error("useNotificationProvider not found");
    }
    return context;
};

export default NotificationProvider;
