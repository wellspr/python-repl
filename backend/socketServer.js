import { Server } from "socket.io";

class SocketServer {
    constructor(httpServer, origin) {
        this.io = new Server(httpServer, {
            cors: {
                origin,
            },
        });
        this.socket = undefined;
    }

    connect() {
        this.io.on("connection", socket => {
            this.socket = socket;
            console.log(socket.id);

            this.socket.on("disconnect", () => {
                this.socket.emit("disconnected", "disconnected!");
            });
        });
    }

    onData(callback) {
        this.socket.on("data", data => {
            callback(data);
        })
    }

    emit(data) {
        this.socket.emit("data", data);
    }

    getSocket() {
        return this.socket;
    }

    disconnect() {
        this.socket.disconnect();
    }
}

export default SocketServer;