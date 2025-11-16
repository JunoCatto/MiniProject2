import { useState, useEffect } from "react";
import { useData } from "./useData";
import PlayerInput from "./PlayerInput";
import LoadingCircle from "./LoadingCircle";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";

export default function PlayerInfo() {
  const { data, isLoading, error, fetchData } = useData();
  const [playerName, setPlayerName] = useState("");

  // Fetch only when playerName changes
  useEffect(() => {
    if (playerName) {
      fetchData(`http://localhost:3000/hiscores/${playerName}`);
    }
  }, [playerName]);

  return (
    <>
      {/* {!data && !isLoading && !error && ( */}
      <PlayerInput invalid={!!error} onSubmit={setPlayerName} />
      {/* )} */}
      <>
        <div className="loadingContainer">
          {isLoading ? <LoadingCircle /> : ""}
        </div>
      </>
      {data && (
        <Box sx={{ display: "flex" }}>
          <Grow in={true} timeout={200}>
            <div className="summaryContainer">
              <div id="playerName" className="card">
                <span className="summaryTitle">Player Name:</span>
                <p>{data.name}</p>
              </div>
              <div id="overallLevel" className="card">
                <span className="summaryTitle">Overall Level:</span>
                <p>{data.skills?.[0]?.level}</p>
              </div>
              <div id="overallXp" className="card">
                <span className="summaryTitle">Overall XP:</span>
                <p>{data.skills?.[0]?.xp}</p>
              </div>
              <div id="rank" className="card">
                <span className="summaryTitle">Rank:</span>
                <p>{data.skills?.[0]?.rank}</p>
              </div>
            </div>
          </Grow>
        </Box>
      )}
    </>
  );
}
