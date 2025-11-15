import { useData } from "./useData";
import { usePlayer } from "./PlayerContext";
import { use } from "react";

export default function PlayerInfo() {
  const { playerName } = usePlayer();
  const url = playerName
    ? `http://localhost:3000/hiscores/${playerName}`
    : null;
  const { data, isLoading, error } = useData(url);
  console.log(data);

  return (
    <>
      <div>
        <p>{isLoading ? "Loading..." : ""}</p>
      </div>
      <div id="playerName" className="card">
        <span className="summaryTitle">Player Name:</span>
        <p>{data?.name}</p>
      </div>
      <div className="summaryContainer">
        <div id="overallLevel" className="card">
          <span className="summaryTitle">Overall Level:</span>
          <p>{data?.skills?.[0]?.level}</p>
          {/* adding ? means that it will only show the data if it exists */}
        </div>
        <div id="overallXp" className="card">
          <span className="summaryTitle">Overall XP:</span>
          <p>{data?.skills?.[0]?.xp}</p>
        </div>
        <div id="rank" className="card">
          <span className="summaryTitle">Rank:</span>
          <p>{data?.skills?.[0]?.rank}</p>
        </div>
      </div>
    </>
  );
}
