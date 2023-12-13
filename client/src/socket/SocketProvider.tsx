"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import SocketService from "./SocketService";
import { backend } from "@/config";

interface ContextProps {
    socket: SocketService | null;
}

const initialValue: ContextProps = {
    socket: null,
};

const Context = createContext(initialValue);

const SocketProvider = (props: { children: React.ReactNode }) => {

    const [socket, setSocket] = useState<SocketService | null>(null);

    const createSocket = useCallback(() => {
        if (backend) {
            setSocket(new SocketService(backend));
        }
    }, [setSocket, backend]);

    useEffect(() => {
        createSocket();

        return () => {
            setSocket(null);
        }
    }, [createSocket]);

    const value: ContextProps = { socket };

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
};

export default SocketProvider;

export const useSocket = () => useContext<ContextProps>(Context);