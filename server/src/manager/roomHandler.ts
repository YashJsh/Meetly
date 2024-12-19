import { Socket } from "socket.io";
import { v4 as uuidV4 } from "uuid";

const rooms: Record<string, string[]> = {}

export const roomHandler = (socket : Socket) =>{

    const createRoom = ()=>{
        const roomId = uuidV4();
        rooms[roomId] = [];
        console.log(roomId);
        socket.emit("room-created", {roomId});
    }


    const joinRoom = ({roomId, peerId} : {roomId: string, peerId: string}) =>{
        if(rooms[roomId]){
            console.log("User joined the room", roomId, "with", peerId)
            rooms[roomId].push(peerId);
            socket.join(roomId);

            socket.to(roomId).emit("user-joined", {peerId: peerId});
            socket.emit("get-users", {roomId, participants : rooms[roomId]})
        }   

        socket.on("disconnect", ()=>{
            console.log("user Left the room", peerId)
            leaveRoom({roomId, peerId});
        })
    }

    socket.on("create-room", ()=>{
        createRoom();
    })

    socket.on("join-room", joinRoom);


    const leaveRoom = ({roomId, peerId }: {roomId: string, peerId: string})=>{
        rooms[roomId] = rooms[roomId].filter((id)=> id !== peerId);
        socket.to(roomId).emit("user-disconnected", peerId);
    }
}