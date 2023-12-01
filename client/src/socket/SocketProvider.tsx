"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import SocketService from "./SocketService";
const backendServer = "http://localhost:4000";

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
        setSocket(new SocketService(backendServer));
    }, [setSocket]);

    useEffect(() => {
        createSocket();

        return () => {
            setSocket(null);
        }
    }, [createSocket]);

    const value: ContextProps = { socket };

    return (
        <Context.Provider value={value}>
            { props.children }
        </Context.Provider>
    );
};

export default SocketProvider;

export const useSocket = () => useContext<ContextProps>(Context);