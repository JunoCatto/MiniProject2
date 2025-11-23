import { Routes, Route } from "react-router-dom";
import PlayerInfo from "../Components/PlayerInfo";
import PlayerActivities from "../Components/PlayerActivities";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<PlayerInfo />} />
      <Route path="/:playerName/skills" element={<PlayerInfo />} />
      <Route path="/:playerName/activities" element={<PlayerActivities />} />
    </Routes>
  );
}
