import { useLocation, useParams } from "react-router";
import { useEffect } from "react";
import { useData } from "../useData";
import LoadingCircle from "./LoadingCircle";

export default function PlayerActivities() {
  const location = useLocation();
  let activityData = [];
  const { data, isLoading, error, fetchData } = useData();
  const { playerName } = useParams();

  // Passes the props from the previous fetchData call (i.e. the skills landing page). If no data fetches again.
  if (location.state) {
    activityData = location.state.activities;
  } else {
    useEffect(() => {
      fetchData(`http://localhost:3000/hiscores/${playerName}`);
    }, [playerName]);
    activityData = data?.activities;
  }
  return (
    <>
      <div className="loadingContainer">{isLoading && <LoadingCircle />}</div>
      {activityData && !isLoading && (
        <>
          {activityData
            ?.filter((activity) => activity.score > 0)
            .map((activity) => (
              <div key={activity.name} className="skillCard">
                {activity.name} - {activity.score}
              </div>
            ))}
        </>
      )}
    </>
  );
}
