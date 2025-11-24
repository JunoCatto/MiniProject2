import { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { PlayerContext } from "../Context/PlayerContext";

export default function PlayerInput({ invalid, onSubmit }) {
  const [localPlayerName, setLocalPlayerName] = useState("");
  const [internalError, setInternalError] = useState(false);
  const { setPlayer } = useContext(PlayerContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!localPlayerName) return;
    setPlayer((player) => ({
      ...player,
      name: localPlayerName,
    }));
  };

  useEffect(() => {
    setInternalError(invalid);
  }, [invalid]);

  return (
    <div className="inputContainer">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "50vw",
            input: { color: "#cdd6f4" },
            boxShadow: "0 1px 5px #000000",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Enter username..."
          id={internalError ? "outlined-error" : "filled-required"}
          variant="filled"
          error={internalError && localPlayerName !== ""}
          helperText={
            internalError && localPlayerName !== ""
              ? "No data found for this player"
              : ""
          }
          value={localPlayerName}
          onChange={(e) => {
            setLocalPlayerName(e.target.value);
            if (e.target.value === "") {
              setInternalError(false);
            }
          }}
        />
      </Box>
    </div>
  );
}
