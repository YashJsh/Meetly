import socketIoClient from "socket.io-client";
import { createContext, ReactNode, useEffect, useState, useReducer} from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { peerReducer } from "./PeerReducer";
import { addPeerAction, RemovePeerAction } from "./PeerActions";

const Ws = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);
const ws = socketIoClient(Ws);

export const RoomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peerReducer, {});

  const enterRoom = ({roomId} : {roomId : "string"}) => {
    console.log("Control Reached enter ROOm")
    console.log({roomId})
    navigate(`/room/${roomId}`);
  } 

  const removePeer = (peerId : string) =>{
    dispatch(RemovePeerAction(peerId));
  }

  useEffect(()=>{
    const meID = uuidV4();

    const peer= new Peer(meID);
    setMe(peer);

    try{
      navigator.mediaDevices.getUserMedia({video : true, audio : true}).then((stream)=>{setStream(stream)})
    }catch(err){
      console.error(err);
    }

    ws.on("room-created", enterRoom);
    ws.on("get-users", ({participants} : {participants : string}) => {
      console.log(participants);
    ws.on("user-disconnected", removePeer);
    })
  }, [])

  useEffect(()=>{
    if(!me) return;
    if(!stream) return;
    ws.on("user-joined", ({peerId})=>{
      const call = me.call(peerId, stream);
      call.on("stream", (peerStream)=>{
        dispatch(addPeerAction(peerId, peerStream));
      })
    });
    
    me.on("call", (call)=>{
      call.answer(stream)
      call.on("stream", (peerStream)=>{
        dispatch(addPeerAction(call.peer, peerStream));
      })
    })
  },[me, stream])

  return <RoomContext.Provider value={{ ws, me, stream, peers }}>{children}</RoomContext.Provider>;
};
