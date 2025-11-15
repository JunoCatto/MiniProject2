import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import PlayerInfo from "./PlayerInfo";
import PlayerInput from "./PlayerInput";
import { PlayerProvider } from "./PlayerContext";

function App() {
  return (
    <>
      <PlayerProvider>
        <h1>OSRS Skill Lookup</h1>
        <PlayerInput />
        <PlayerInfo />
      </PlayerProvider>
    </>
  );
}

export default App;
