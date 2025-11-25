import { useContext } from "react";
import { PlayerContext } from "../Context/PlayerContext";

export default function PlayerGreeting() {
  const { player } = useContext(PlayerContext);
  return (
    <>
      {player?.data && (
        <div>
          <span>Player: {player?.name}</span>
        </div>
      )}
    </>
  );
}
