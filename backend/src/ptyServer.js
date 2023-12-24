import * as pty from "node-pty";

const pythonCode = (code) => `
print("Hello there! I can update!")
${code}
`;

const script = (code) => {
    console.log(code);
    return pythonCode(code);
};

class PTYServer {
    constructor(socket, code) {
        this.socket = socket;
        this.ptyProcess = pty.spawn('/bin/bash', [], {
            name: "xterm-color",
            cols: 80,
            rows: 30,
            cwd: process.env.APP_ENV === "docker-development" ?
                "/home/code/app" :
                process.env.CWD,
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