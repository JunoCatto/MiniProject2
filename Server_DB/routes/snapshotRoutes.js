let express = require("express");
let router = express.Router();
let Controllers = require("../controllers");

router.get("/:username", (req, res) => {
  Controllers.snapshotController.getSnapshot(req, res);
});

router.post("/", (req, res) => {
  Controllers.snapshotController.createSnapshot(req, res);
  console.log(`Snapshot of user: ${req.body.username} created`);
});

router.put("/:username/:snapshotId", (req, res) => {
  Controllers.snapshotController.updateSnapshot(req, res);
});

router.delete("/:username/:snapshotId", (req, res) => {
  Controllers.snapshotController.deleteSnapshot(req, res);
});

module.exports = router;
