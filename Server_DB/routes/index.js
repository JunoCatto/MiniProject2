const express = require("express");
const router = express.Router();
const hiscoreRoutes = require("./hiscoreRoutes");
const snapshotRoutes = require("./snapshotRoutes");

router.use("/hiscores", hiscoreRoutes);
router.use("/snapshots", snapshotRoutes);

module.exports = router;
