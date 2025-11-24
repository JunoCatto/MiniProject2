import { createContext, useState } from "react";

export const PlayerContext = createContext(null);

export default function PlayerProvider({ children }) {
  const [player, setPlayer] = useState("");

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
}
