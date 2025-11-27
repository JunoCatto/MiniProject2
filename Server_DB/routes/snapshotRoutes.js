let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

// router.get("/:username", (req, res) => {
//   Controllers.snapshotController.getSnapshot(req, res);
// });

router.post("/", (req, res) => {
  Controllers.snapshotController.createSnapshot(req, res);
});

module.exports = router;
