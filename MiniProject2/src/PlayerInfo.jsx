import { useState, useEffect } from "react";
import { useData } from "./useData";
import PlayerInput from "./PlayerInput";
import LoadingCircle from "./LoadingCircle";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";

import { iconMap } from "./IconMap";
import { DynamicIcon } from "lucide-react/dynamic";

export default function PlayerInfo() {
  const { data, isLoading, error, fetchData } = useData();
  const [playerName, setPlayerName] = useState("");

  function SkillIcon({ skillName }) {
    const Icon = iconMap[skillName];
    return <Icon />;
  }

  // Fetch only when playerName changes
  useEffect(() => {
    if (playerName) {
      fetchData(`http://localhost:3000/hiscores/${playerName}`);
    }
  }, [playerName]);

  return (
    <>
      <PlayerInput invalid={!!error} onSubmit={setPlayerName} />
      <>
        <div className="loadingContainer">{isLoading && <LoadingCircle />}</div>
      </>
      {data && !isLoading && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Grow in={true} timeout={200}>
            <div className="container summaryContainer">
              {/* <div id="playerName" className="summaryCard">
                <span className="summaryTitle">Player Name:</span>
                <p>{data.name}</p>
              </div> */}
              <div id="overallLevel" className="summaryCard">
                <span className="summaryTitle">Overall Level:</span>
                <p>{data.skills?.[0]?.level}</p>
              </div>
              <div id="overallXp" className="summaryCard">
                <span className="summaryTitle">Overall XP:</span>
                <p>{data.skills?.[0]?.xp}</p>
              </div>
              <div id="rank" className="summaryCard">
                <span className="summaryTitle">Rank:</span>
                <p>#{data.skills?.[0]?.rank}</p>
              </div>
            </div>
          </Grow>
          <Grow in={true} timeout={200}>
            <div className="container skillContainer">
              {data?.skills?.map((skill) =>
                skill.name !== "Overall" ? (
                  <div className="skillCard" key={skill.name}>
                    <div className="skillTop">
                      <span className="skillIcon">
                        <SkillIcon skillName={skill.name} />
                      </span>
                      <span className="skillTitle">{skill.name}</span>
                    </div>
                    <div className="skillBottom">
                      <span>Level {skill.level}</span>
                      <span>{skill.xp} XP</span>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </Grow>
        </Box>
      )}
    </>
  );
}
