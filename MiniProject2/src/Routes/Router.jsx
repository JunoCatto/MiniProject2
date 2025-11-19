import { Routes, Route } from "react-router-dom";
import PlayerInfo from "../Components/PlayerInfo";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<PlayerInfo />} />
      <Route path="/:playerName/skills" element={<PlayerInfo />} />
    </Routes>
  );
}
