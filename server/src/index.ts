import { roomHandler } from "./manager/roomHandler";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const port = 8080;
const app = express();
const server = http.createServer(app);

const io = new Server(server, { 
    cors : {
        origin : "*",
        methods : ["GET", "POST"]
    }
});

io.on("connection", (socket : any) => {
    console.log("User is connected");
    socket.emit("connected");
    roomHandler(socket);
    console.log("User Reched roomHandler")
    socket.on("disconnect", () => {
        console.log("User disconnected");
    })
});

server.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
