import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";

export const CreateButton: React.FC = () => {
  const { ws } = useContext(RoomContext);
  const joinRoom = () => {
    ws.emit("create-room");
  };

  return (
    <div>
      <button
        onClick={() => {
          joinRoom();
        }}
        className="bg-black text-white p-4 rounded-xl pointer bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-400 hover:to-blue-800 "
      >
        Create Room
      </button>
    </div>
  );
};
