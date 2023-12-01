"use client";

import Editor from "@monaco-editor/react";
import * as Monaco from "monaco-editor";
import { useCallback } from "react";
import { useCode } from ".";

const CodeEditor = () => {

    const { setCode } = useCode();

    const onCodeChange = useCallback((value: string | undefined) => {
        if (value) {
            setCode(value);
        }
    }, [setCode]);

    const options: Monaco.editor.IStandaloneEditorConstructionOptions | undefined = {
        minimap: { enabled: false },
        lineNumbersMinChars: 2,
        scrollBeyondLastLine: false,
        fontSize: 12,
        letterSpacing: 1
    };

    return (
        <Editor 
            className="code-editor"
            language="python" 
            onChange={onCodeChange}
            options={options}
        />
    );
};

export default CodeEditor;