import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import PlayerInfo from "./PlayerInfo";

function App() {
  return (
    <>
      <h1>OSRS Skill Lookup</h1>
      <PlayerInfo />
    </>
  );
}

export default App;
