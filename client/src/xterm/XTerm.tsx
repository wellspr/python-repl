"use client";

import "xterm/css/xterm.css";
import { useResizable } from "../resizable";
import { useIntegration } from "@/integration";

const XTerm = () => {
    const { windowSize, breakpoint } = useResizable();
    const { containerRef } = useIntegration();

    return (
        <div
            ref={containerRef}
            className="xterm-container"
            style={
                windowSize.width < breakpoint ?
                    {
                        height: "100%",
                        width: windowSize.width,
                    } :
                    {
                        height: windowSize.height - 60,
                        width: "100%"
                    }
            }
        ></div>
    );
};

export default XTerm;