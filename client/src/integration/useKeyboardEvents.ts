import { useEffect } from "react";

export const useKeyboardEvents = (runCode: () => void) => {

    useEffect(() => {
        let keysPressed: any = {};

        const onCtrlReturn = (e: KeyboardEvent) => {
            keysPressed[e.key] = true;
            if (keysPressed["Alt"] && e.key === "Enter") {
                e.preventDefault();
                runCode();
            }
        };

        const onKeyUp = (e: KeyboardEvent) => {
            delete keysPressed[e.key];
        };

        window.addEventListener("keydown", onCtrlReturn);
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keydown", onCtrlReturn);
            window.removeEventListener("keyup", onKeyUp);
        }
    }, [runCode]);
};