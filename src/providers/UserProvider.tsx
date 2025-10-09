'use client';

import { createContext, useContext, useState } from "react";

export const UserProviderContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState("");

    return (
        <UserProviderContext.Provider value={{ user, setUser }}>
            {children}
        </UserProviderContext.Provider>
    );
};

export const useUserProvider = () => {
    const context = useContext(UserProviderContext)
    if(!context){
        throw new Error("useUserProvider not found")
    }
    return context
};

export default UserProvider;