import { io } from "socket.io-client";
import { Socket } from "socket.io-client";

class SocketService {

    socket: Socket

    constructor(remote: string) {
        this.socket = io(remote, {
            autoConnect: false,
            reconnection: false,            
        });

        this.socket.on("disconnected", () => {
            console.log("disconnected...");
            this.socket.emit("Disconnected...");
        });
    }

    connect() {
        if (this.socket.disconnected) {
            this.socket.connect();
        }
    }

    onData(callback: (data: string) => void) {
        this.socket.on("connect", () => {
            console.log("connected...");
            this.socket.on("data", data => callback(data));
        });
    }

    emit(data: string) {
        if (this.socket.connected) {
            this.socket.emit("data", data);
        }
    }

    disconnect() {
        this.socket.disconnect();
    }
}

export default SocketService;