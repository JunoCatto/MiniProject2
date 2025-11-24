import { useEffect, useContext } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router";
import { useData } from "../useData";
import PlayerInput from "./PlayerInput";
import LoadingCircle from "./LoadingCircle";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";

import { iconMap } from "../assets/IconMap";
import { PlayerContext } from "../Context/PlayerContext";

export default function PlayerInfo() {
  const { data, isLoading, error, fetchData } = useData();
  const { player, setPlayer } = useContext(PlayerContext);
  const { playerName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isRoot = location.pathname === "/";

  function SkillIcon({ skillName }) {
    const Icon = iconMap[skillName];
    return <Icon />;
  }

  // Fetch only when playerName changes
  useEffect(() => {
    if (!player || player.name !== playerName) {
      setPlayer({ name: playerName });
      fetchData(`http://localhost:3000/hiscores/${playerName}`);
      navigate(`/${playerName.toLowerCase()}/skills`);
    }
  }, [playerName, player]);

  console.log(player);

  const handleSubmit = (inputName) => {
    navigate(`/${inputName.toLowerCase()}/skills`);
  };

  return (
    <>
      <div style={{ display: isRoot ? "block" : "none" }}>
        <PlayerInput invalid={!!error} onSubmit={handleSubmit} />
      </div>
      <>
        <div className="loadingContainer">{isLoading && <LoadingCircle />}</div>
      </>
      {data && !isLoading && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Grow in={true} timeout={200}>
            <div className="container summaryContainer">
              <div id="overallLevel" className="summaryCard">
                <span className="summaryTitle">Overall Level:</span>
                <p>{data?.skills?.[0]?.level}</p>
              </div>
              <div id="overallXp" className="summaryCard">
                <span className="summaryTitle">Overall XP:</span>
                <p>{data?.skills?.[0]?.xp}</p>
              </div>
              <div id="rank" className="summaryCard">
                <span className="summaryTitle">Rank:</span>
                <p>#{data?.skills?.[0]?.rank}</p>
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
