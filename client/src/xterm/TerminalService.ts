import { SocketService } from "@/socket";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

class TerminalService {

    terminal: Terminal;
    fitAddon: FitAddon;
    container: HTMLDivElement | null;
    socket: SocketService | null; 

    constructor() {
        this.terminal = new Terminal();
        this.fitAddon = new FitAddon();
        this.container = null;
        this.socket = null;
    }

    open(container: HTMLDivElement, socket: SocketService) {
        if (!container.hasChildNodes()) {
            this.container = container;
            this.socket = socket;
            this.terminal.loadAddon(this.fitAddon);
            this.terminal.open(container);
            this.fitAddon.fit();

            this.terminal.onRender(e => {
                console.log("render: ", `{start: ${e.start}, end: ${e.end}}`);
                this.fitAddon.fit();
                this.terminal.scrollToBottom();
            });

            this.terminal.onResize(e => {
                console.log("resize: ", `{cols: ${e.cols}, rows: ${e.rows}}`);
                this.fitAddon.fit();
                this.terminal.scrollToBottom();
            });

            this.terminal.onData(data => {
                socket.emit(data);
            });

            this.socket.onData(data => {
                this.terminal.write(data);
                this.terminal.focus();
            });
        }
    }

    write(data: string) {
        this.terminal.write(data);
    }

    dispose() {
        this.terminal.dispose();
        if (this.container) {
            this.container.removeChild;
            this.container = null;
        }
    }

    focus() {
        this.terminal.focus();
    }

    onData(callback: (data: string) => void) {
        this.terminal.onData(data => callback(data));
    }
}

export default TerminalService;