const port = process.env.PORT || 4000;

import cors from "cors";
import express from "express";
import { createServer } from "http";
import SocketServer from "./socketServer.js";
import PTYServer from "./ptyServer.js";

const origin = [
    "http://localhost:3000",
];

const app = express();
app.use(express.json());
app.use(cors({ origin }));

const httpServer = createServer(app);

const socket = new SocketServer(httpServer, origin);
socket.connect();

app.post("/code", (req, res) => {

    const ptyProcess = new PTYServer(socket, req.body.code);

    socket.onData(data => {
        ptyProcess.writeData(data);
    });

    if (socket.socket) {
        res.json({ response: socket.socket.id });
    }
});

httpServer.listen(port, () => {
    console.log(`App listening on port ${port}`)
});