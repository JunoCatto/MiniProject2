import { useContext } from "react";
import { PlayerContext } from "../Context/PlayerContext";

export default function PlayerGreeting() {
  const { player } = useContext(PlayerContext);
  return (
    <>
      {player?.name && (
        <div>
          <span>Player: {player?.name}</span>
        </div>
      )}
    </>
  );
}
