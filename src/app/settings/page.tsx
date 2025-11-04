"use client";

import React from "react";
import { useNotificationProvider } from "@/providers/NotificationProvider";

const SettingsPage = () => {
    const { isOn, setIsOn } = useNotificationProvider()

    const handleToggle = () => {
        setIsOn();
    };

    return (
        <div className="flex flex-col items-center justify-center ">
            <h1 className="text-2xl font-semibold mb-6">Settings</h1>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-md">
                <span className="text-lg font-medium">
                    Notifications:{" "}
                    <span className={isOn ? "text-green-600" : "text-red-500"}>
                        {isOn ? "On" : "Off"}
                    </span>
                </span>

                <button
                    onClick={handleToggle}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                        isOn
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                >
                    Turn {isOn ? "Off" : "On"}
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
