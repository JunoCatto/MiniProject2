import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const port = 3000;
app.use(cors());

app.get("/hiscores/:playerName", async (req, res) => {
  const playerName = req.params.playerName;
  const url = `https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${playerName}`;

  console.log("Fetching:", url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});
app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
