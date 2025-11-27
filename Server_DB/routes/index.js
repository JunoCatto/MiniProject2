const express = require("express");
const router = express.Router();
const playerRoutes = require("./playerRoutes");
const hiscoreRoutes = require("./hiscoreRoutes");
const snapshotRoutes = require("./snapshotRoutes");

router.use("/players", playerRoutes);
router.use("/hiscores", hiscoreRoutes);
router.use("/snapshots", snapshotRoutes);

module.exports = router;
