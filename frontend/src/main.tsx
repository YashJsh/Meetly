import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { RoomProvider } from "./context/RoomContext.tsx";
import Home from "./pages/Home.tsx";
import Room from "./pages/Room.tsx";

createRoot(document.getElementById("root")!).render(
 
    <BrowserRouter>
      <RoomProvider>
        <Routes>
          <Route path="/" element = {<Home/>}></Route>
          <Route path="/room/:id" element = {<Room/>}></Route>
        </Routes>
      </RoomProvider>
    </BrowserRouter>
  
);
