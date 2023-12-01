"use client";

import dynamic from "next/dynamic";

const CodeProvider = dynamic(
    () => import("@/code").then(m => {
        return m.CodeProvider;
    }),
    { ssr: false }
);

const ResizableProvider = dynamic(
    () => import("@/resizable").then(m => {
        return m.ResizableProvider;
    }),
    { ssr: false }
);

const ResizablePanels = dynamic(
    () => import("@/resizable").then(m => {
        return m.ResizablePanels;
    }),
    { ssr: false }
);

const IntegrationProvider = dynamic(
    () => import("@/integration").then(m => {
        return m.IntegrationProvider;
    }),
    { ssr: false }
);

const ControlsBar = dynamic(
    () => import("@/components/ControlsBar"),
    { ssr: false }
);

import Brand from "@/components/Brand";

export default function Home() {
    return (
        <CodeProvider>
            <IntegrationProvider>
                <ResizableProvider>
                    <header className="header">
                        <Brand />
                        <ControlsBar />
                    </header>
                    <main className="main-container">
                        <ResizablePanels />
                    </main>
                    <footer className="footer">
                        <Brand />
                        <span className="copy">&copy; 2023</span>
                    </footer>
                </ResizableProvider>
            </IntegrationProvider>
        </CodeProvider>
    );
}
