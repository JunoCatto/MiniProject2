import { useContext } from "react";
import { PlayerContext } from "../Context/PlayerContext";

export default function PlayerGreeting() {
  const { player } = useContext(PlayerContext);
  return (
    <>
      {player?.data && (
        <div>
          <span className="playerGreeting">Player: {player?.name}</span>
        </div>
      )}
    </>
  );
}
