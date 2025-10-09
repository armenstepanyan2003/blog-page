'use client'

import React, { useEffect, useState } from 'react';
import { useSearchProvider } from "@/providers/SearchProvider";
import { usePathname, useRouter } from "next/navigation";
import { deleteAccessToken } from "@/utils/actions";
import Button from "@/components/ui/Button";
import DropDown from "@/components/ui/DropDown";
import UsersList from "@/components/UsersList";
import { useUserProvider } from "@/providers/UserProvider";

const Header = () => {
    const { search, setSearch } = useSearchProvider();
    const { user, setUser } = useUserProvider();
    const [inputValue, setInputValue] = useState('');
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (!token) {
            router.push("/login");
        }

        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [router, setUser]);

    const handleLogOut = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        await deleteAccessToken();
        setUser(null);
        router.push("/login");
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(inputValue);
        }, 500);

        return () => clearTimeout(timeout);
    }, [inputValue, setSearch]);


    return (
        <div className="bg-white border-b border-gray-400 w-full h-16 flex justify-between items-center px-6 shadow-sm sticky top-0 z-50">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold text-black mr-8">MyApp</h1>
                <input
                    type="text"
                    placeholder="Search users.."
                    value={inputValue}
                    onChange={handleSearch}
                    className="flex-1 max-w-sm border border-gray-300 rounded-md px-3 py-1 text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                />
                { path !== '/users' && search && search.trim() !== "" && (
                    <div className="absolute top-full left-10 right-40 bg-white shadow-lg border border-gray-300 z-50 max-h-96 overflow-y-auto">
                        <UsersList search={search} />
                    </div>
                )}
            </div>


            <div className="flex items-center gap-4 ml-6">
                {user && (
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-gray-700">
                            {user.firstName[0]}
                        </div>
                        <DropDown
                            trigger="click"
                            item1="My Account"
                            item2="Settings"
                            placement="bottom"
                            title ={`${user.firstName}`}
                            userId={user.id}
                            user={user}
                        />
                    </div>
                )}
                <Button title="Logout" onClick={handleLogOut} />
            </div>
        </div>
    );
};

export default Header;