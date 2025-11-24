import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import PlayerProvider from "./Context/PlayerContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlayerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PlayerProvider>
  </StrictMode>
);
