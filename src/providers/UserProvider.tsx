'use client';

import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";

export const UserProviderContext = createContext(null);

const UserProvider: FC<{
    children: ReactNode;
}> = ({children}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        if (window !== undefined) {
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
            setUser(currentUser);
        }
    }, [setUser]);

    return (
        <UserProviderContext.Provider value={{user, setUser}}>
            {children}
        </UserProviderContext.Provider>
    );
};

export const useUserProvider = () => {
    const context = useContext(UserProviderContext)
    if (!context) {
        throw new Error("useUserProvider not found")
    }
    return context
};

export default UserProvider;