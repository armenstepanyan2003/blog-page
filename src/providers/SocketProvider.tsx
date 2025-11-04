'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
    socket: Socket | null;
}

const SocketProviderContext = createContext<SocketContextType | undefined>(undefined);

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = io(process.env.NEXT_PUBLIC_API_URL as string);

        socketInstance.on("connect", () => {
            console.log("✅ Socket connected:", socketInstance.id);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketProviderContext.Provider value={{ socket }}>
            {children}
        </SocketProviderContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketProviderContext);
    if (!context) throw new Error("useSocket must be used inside SocketProvider");
    return context;
};

export default SocketProvider;
