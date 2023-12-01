"use client";

import { useIntegration } from "@/integration";
import { useResizable } from "../resizable";

const ControlsBar = () => {

    const { runCode, close } = useIntegration();
    const { resetLayout } = useResizable();

    return (
        <div className="controls">
            <button
                className="button"
                onClick={runCode}
            >
                <span className="button__label">Run</span>
            </button>

            <button
                className="button"
                onClick={close}
            >
                <span className="button__label">Close</span>
            </button>

            <button
                className="button"
                onClick={resetLayout}
            >
                <span className="button__label">Reset Layout</span>
            </button>
        </div>
    );
};

export default ControlsBar;