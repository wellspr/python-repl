import * as pty from "node-pty";

const script = (code) => `
from RestrictedPython import compile_restricted
from RestrictedPython import safe_globals

source_code = ${code}

loc = {}
byte_code = compile_restricted(source_code, '<inline>', 'exec')

exec(byte_code, safe_globals, loc)

loc['example']()
`;

class PTYServer {
    constructor(socket, code) {
        this.socket = socket;
        this.ptyProcess = pty.spawn('/home/code/bin/python3', ['-c', code], {
            name: "xterm-color",
            cols: 80,
            rows: 30,
            cwd: process.env.APP_ENV === "docker-development" ?
                "/home/code/playground" :
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