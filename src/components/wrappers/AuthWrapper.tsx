"use client";

import React from 'react';
import { AuthWrapperProps } from "@/constants";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

const AuthWrapper = ({ children }: AuthWrapperProps) => {

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
        <SideBar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-4 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AuthWrapper;
