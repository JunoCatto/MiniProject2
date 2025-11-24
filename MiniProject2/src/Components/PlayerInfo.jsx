import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router";
import { useData } from "../useData";
import TemporaryDrawer from "./Drawer";
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
    const name = player?.name || playerName;
    if (!name) return;
    if (!player?.data || player.name !== name) {
      fetchData(`http://localhost:3000/hiscores/${name}`);
    }
    if (player?.name) {
      navigate(`/${name.toLowerCase()}/skills`);
    }
  }, [playerName, player?.name, player]);

  useEffect(() => {
    if (data) {
      setPlayer({ name: player?.name || playerName, data: data });
    }
  }, [data, player?.name, playerName, setPlayer]);

  const playerData = player?.data;

  return (
    <>
      <div style={{ display: isRoot ? "block" : "none" }}>
        <PlayerInput invalid={!!error} />
      </div>
      <>
        <div className="loadingContainer">{isLoading && <LoadingCircle />}</div>
      </>
      {player && !isLoading && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TemporaryDrawer />
          <Grow in={true} timeout={200}>
            <div className="container summaryContainer">
              <div id="overallLevel" className="summaryCard">
                <span className="summaryTitle">Overall Level:</span>
                <p>{playerData?.skills?.[0]?.level}</p>
              </div>
              <div id="overallXp" className="summaryCard">
                <span className="summaryTitle">Overall XP:</span>
                <p>{playerData?.skills?.[0]?.xp}</p>
              </div>
              <div id="rank" className="summaryCard">
                <span className="summaryTitle">Rank:</span>
                <p>#{playerData?.skills?.[0]?.rank}</p>
              </div>
            </div>
          </Grow>
          <Grow in={true} timeout={200}>
            <div className="container skillContainer">
              {playerData?.skills?.map((skill) =>
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
