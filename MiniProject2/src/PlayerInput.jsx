import { usePlayer } from "./PlayerContext";
import { useState } from "react";

export default function PlayerInput() {
  const { setPlayerName } = usePlayer();
  const [localPlayerName, setLocalPlayerName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayerName(localPlayerName);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter player name"
        onChange={(e) => {
          setLocalPlayerName(e.target.value);
        }}
      />
    </form>
  );
}
