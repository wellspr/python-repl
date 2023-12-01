"use client";

import * as api from "../api";
import { useCode } from "@/code";
import { SocketService } from "@/socket";
import { TerminalService } from "@/xterm";

import {
    createContext,
    useCallback,
    useContext,
    useRef,
} from "react";
import { useKeyboardEvents } from "./useKeyboardEvents";

interface ContextProps {
    runCode: () => void;
    containerRef: React.RefObject<HTMLDivElement> | null;
    close: () => void;
}

const defaultValue: ContextProps = {
    runCode: () => { },
    containerRef: null,
    close: () => { },
};

const Context = createContext(defaultValue);

const backendServer = "http://localhost:4000";

const IntegrationProvider = (props: { children: React.ReactNode }) => {

    const { code } = useCode();
    const containerRef = useRef<HTMLDivElement>(null);
    const terminalRef = useRef<TerminalService | null>(null);
    const socketRef = useRef<SocketService | null>(null);

    const close = useCallback(() => {
        if (terminalRef.current) {
            terminalRef.current.dispose();
            terminalRef.current = null;
        }

        const ref = containerRef.current;
        if (ref && ref.firstChild) {
            ref.firstChild.removeChild;
        }

        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
        }
    }, []);

    const sendCode = useCallback(() => {
        api.sendCode(code)
            .then(r => {
                console.log(r.data.response);
            });
    }, [code]);

    const runCode = useCallback(() => {
        close();

        const term = new TerminalService();
        terminalRef.current = term;

        const socket = new SocketService(backendServer);
        socketRef.current = socket;
        socket.connect();

        if (containerRef && containerRef.current) {
            const ref = containerRef.current;
            term.open(ref, socket);
        }

        sendCode();

    }, [close, sendCode]);

    /* useKeyboardEvents */
    useKeyboardEvents(runCode);

    const value: ContextProps = {
        runCode,
        containerRef,
        close,
    };

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
};

export default IntegrationProvider;

export const useIntegration = () => useContext<ContextProps>(Context);