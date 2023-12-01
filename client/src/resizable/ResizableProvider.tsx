"use client";

import { 
    createContext, 
    useCallback, 
    useContext, 
    useEffect, 
    useRef, 
    useState 
} from "react";

import type { ImperativePanelGroupHandle, MixedSizes } from "react-resizable-panels";

interface ContextProps {
    windowSize: {
        width: number;
        height: number;
    };
    resetLayout: () => void;
    panelGroupRef: React.RefObject<ImperativePanelGroupHandle> | null;
    breakpoint: number;
};

const initialValue: ContextProps = {
    windowSize: { height: 0, width: 0 },
    panelGroupRef: null,
    resetLayout: () => { },
    breakpoint: 915,
};

const Context = createContext(initialValue);

const ResizableProvider = (props: { children: React.ReactNode }) => {

    const [windowSize, setWindowSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
    const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);

    const resetLayout = useCallback(() => {
        const panelGroup = panelGroupRef.current;
        if (panelGroup) {
            const layout: Partial<MixedSizes>[] = [{ sizePercentage: 50 }, { sizePercentage: 50 }];
            panelGroup.setLayout(layout);
        }
    }, []);
    
    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        const onWindowResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", onWindowResize);

        return () => {
            window.removeEventListener("resize", onWindowResize);
        }
    }, []);

    return (
        <Context.Provider value={{
            windowSize,
            panelGroupRef,
            resetLayout,
            breakpoint: 915,
        }}>
            {props.children}
        </Context.Provider>
    );
};

const useResizable = () => useContext<ContextProps>(Context);

export { ResizableProvider as default, useResizable };