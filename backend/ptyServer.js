import * as pty from "node-pty";

class PTYServer {
    constructor(socket, code){
        this.socket = socket;
        this.ptyProcess = pty.spawn('/usr/bin/python3', ['-c', code], {
            name: "xterm-color",
            cols: 80,
            rows: 30,
            cwd: process.env.CWD,
            env: process.env,
        });

        this.ptyProcess.onData(data => {
            this.socket.emit(data);
        });
    }

    writeData(data) {
        this.ptyProcess.write(data);
    }
}

export default PTYServer;