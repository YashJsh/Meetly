import { useParams } from "react-router-dom"
import { RoomContext } from "../context/RoomContext";
import { useContext, useEffect } from "react";
import { VideoPlayer } from "../components/Video";
import { PeerState } from "../context/PeerReducer";
const Room = () => {
  const params = useParams();
  const room = params.id;

  const {ws, me, stream, peers} = useContext(RoomContext);
  
  useEffect(()=>{
    if(me) ws.emit('join-room', { roomId : room  , peerId : me._id});
  },[room, me, ws])

  return (
    <div className="flex  flex-col">
      <h2>Room Id : {room}</h2>
      <div className = "grid grid-cols-4 gap-4">
           <VideoPlayer stream={stream} />
        {Object.values(peers as PeerState).map(peer => (
            <VideoPlayer stream = {peer.stream}/>
        ))}
      </div>
       
    </div>
  )
}

export default Room