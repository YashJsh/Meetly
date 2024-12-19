import { useNavigate } from "react-router-dom";
import { CreateButton } from "../components/CreateRoom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  return (
    <div  className="h-screen w-ful flex justify-center text-center items-center gap-4">
      <div>
        <h1>Create Room</h1>
        <CreateButton />
      </div>
      <div className="flex flex-col gap-4">
        <h1>Join Room</h1>
        <input
          className="bg-slate-200 p-4 rounded-xl" onChange={(e) => {
            setId(e.target.value);
          }}
          type="text"
          placeholder="Enter room id"
        />
        <button
          className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-400 hover:to-blue-800 text-white p-4 rounded-xl" 
          onClick={() => {
            navigate(`/room/${id}`);
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default Home;
