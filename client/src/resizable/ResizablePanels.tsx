"use client"

import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
} from "react-resizable-panels";

import { useResizable } from ".";
import { CodeEditor } from "../code";

import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const XTerm = dynamic(() => import("../xterm").then(m => m.XTerm), { 
    ssr: false, 
    loading: () => <Loading mode="dark" />
});

const ResizablePanels = () => {

    const { windowSize, panelGroupRef, breakpoint } = useResizable();

    return (
        <PanelGroup
            ref={panelGroupRef}
            direction={
                windowSize.width < breakpoint ?
                    "vertical" :
                    "horizontal"
            }
        >
            <Panel>
                <section className="code">
                    <CodeEditor />
                </section>
            </Panel>
            <PanelResizeHandle
                style={
                    windowSize.width < breakpoint ?
                        {
                            height: 10,
                            backgroundColor: "darkcyan"
                        } :
                        {
                            width: 10,
                            backgroundColor: "darkcyan"
                        }
                }
            />
            <Panel>
                <section className="terminal">
                    <XTerm />
                </section>
            </Panel>
        </PanelGroup>
    );
};

export default ResizablePanels;