"use client";

import React, {
    createContext,
    useContext,
    useState
} from "react";

interface ContextProps {
    code: string;
    setCode: React.Dispatch<React.SetStateAction<string>>;
};

const initialValue: ContextProps = {
    code: "",
    setCode: () => { },
};

const Context = createContext(initialValue);

const CodeProvider = (props: { children: React.ReactNode }) => {

    const [code, setCode] = useState<string>("");

    const value = {
        code,
        setCode,
    };

    return <Context.Provider value={value}>
        {props.children}
    </Context.Provider>
};

export default CodeProvider;

export const useCode = () => useContext<ContextProps>(Context);
