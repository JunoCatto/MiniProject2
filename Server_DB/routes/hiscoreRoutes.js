let express = require("express");
let router = express.Router();
const fetch = require("node-fetch");
const Controller = require("../controllers");

router.get("/:username", async (req, res) => {
  const playerName = req.params.username;
  const url = `https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${playerName}`;

  console.log("Fetching:", url);
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data) throw new Error("No data found");
    // Create new snapshot in database
    await Controller.snapshotController.createSnapshot(playerName, data.skills);
    // returns data to client
    res.send(data);

    // Error handling
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

module.exports = router;
