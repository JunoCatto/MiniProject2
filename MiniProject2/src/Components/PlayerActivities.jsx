import { useParams } from "react-router";
import { useEffect, useContext } from "react";
import { useData } from "../useData";
import { PlayerContext } from "../Context/PlayerContext";
import LoadingCircle from "./LoadingCircle";
import TemporaryDrawer from "./Drawer";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";

import { Trophy } from "lucide-react";

export default function PlayerActivities() {
  const { data, isLoading, error, fetchData } = useData();
  const { player, setPlayer } = useContext(PlayerContext);
  const { playerName } = useParams();

  const name = player?.name || playerName;

  useEffect(() => {
    if (!player || player.name !== name) {
      fetchData(`http://localhost:3000/hiscores/${name}`);
    }
  }, [name, player]);

  useEffect(() => {
    if (data) {
      setPlayer({ name, data });
    }
  }, [data, name, setPlayer]);

  const activityData = player?.data?.activities;

  return (
    <>
      <div className="loadingContainer">{isLoading && <LoadingCircle />}</div>
      {activityData && !isLoading && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TemporaryDrawer />
          <Grow in={true} timeout={200}>
            <div className="container skillContainer">
              {activityData
                ?.filter((activity) => activity.score > 0)
                .map((activity) => (
                  <div key={activity?.name} className="skillCard">
                    <div className="skillTop">
                      <span className="skillIcon">
                        <Trophy />
                      </span>
                      <span className="skillTitle">{activity?.name}</span>
                    </div>
                    <div className="skillBottom">
                      <span>Score: {activity?.score}</span>
                      {activity?.rank > 0 ? <span>#{activity?.rank}</span> : ""}
                    </div>
                  </div>
                ))}
            </div>
          </Grow>
        </Box>
      )}
    </>
  );
}
