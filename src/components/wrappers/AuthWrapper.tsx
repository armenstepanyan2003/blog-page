"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { deleteAccessToken } from "@/utils/actions";
import { AuthWrapperProps, User } from "@/constants";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

const AuthWrapper = ({ children }: AuthWrapperProps) => {
    // const router = useRouter();
    // const [user, setUser] = useState<User | null>(null);
    //
    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     const userData = localStorage.getItem("user");
    //
    //     if (!token) {
    //         router.push("/login");
    //     }
    //
    //     if (userData) {
    //         setUser(JSON.parse(userData));
    //     }
    // }, [router]);
    //
    // const handleLogOut = async () => {
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("user");
    //     await deleteAccessToken();
    //     router.push("/login");
    // };

    return (
        <div className="flex min-h-screen bg-gradient-to-b from-sky-50 to-sky-100">
            {/*<div className="flex items-center justify-end w-full pt-6 pr-8 space-x-4">*/}
            {/*    {user && (*/}
            {/*        <span className="text-sky-700 font-semibold">*/}
            {/*            {user.firstName}*/}
            {/*        </span>*/}
            {/*    )}*/}
            {/*    <Button title="Logout" onClick={handleLogOut} />*/}
            {/*</div>*/}
            <SideBar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AuthWrapper;
