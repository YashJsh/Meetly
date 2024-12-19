"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roomHandler_1 = require("./manager/roomHandler");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const port = 8080;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
io.on("connection", (socket) => {
    console.log("User is connected");
    socket.emit("connected");
    (0, roomHandler_1.roomHandler)(socket);
    console.log("User Reched roomHandler");
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
