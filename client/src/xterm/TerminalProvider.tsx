"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import TerminalService from "./TerminalService";

interface ContextProps {
    term: TerminalService | null;
};

const defaultValue: ContextProps = {
    term: null,
};

const Context = createContext(defaultValue);

const TerminalProvider = (props: { children: React.ReactNode }) => {
    
    const [term, setTerm] = useState<TerminalService | null>(null);

    const createTerminal = useCallback(() => {
        setTerm(new TerminalService());
    }, [setTerm]);

    useEffect(() => {
        createTerminal();

        return () => {
            setTerm(null);
        };
    }, [createTerminal]);

    const value: ContextProps = { term };

    return (
        <Context.Provider value={value}>
            {props.children}
        </Context.Provider>
    );
};

export default TerminalProvider;

export const useTerminal = () => useContext<ContextProps>(Context);