"use strict";

let Models = require("../models");

const getSnapshot = async (req, res) => {
  const snapshot = await Models.Snapshot.find({
    username: req.params.username,
  });
  if (!snapshot) {
    res.status(404).send("Snapshot not found");
  } else {
    res.status(200).send(snapshot);
  }
};

const createSnapshot = async (username, skills) => {
  // Create new snapshot in database
  const snaps = await Models.Snapshot.create({
    username: username,
    skills: skills,
  });

  const snapshots = await Models.Snapshot.find({ username });
  const snapshotCount = snapshots.length;

  if (snapshotCount > 10) {
    const extraSnapshots = snapshotCount - 10;
    const oldestSnapshots = await Models.Snapshot.find({
      username: username,
    })
      .sort({ createdAt: 1 })
      .limit(extraSnapshots);

    // Deletes the oldest snapshots
    const idsToDelete = oldestSnapshots.map((snapshot) => snapshot._id); // Get the ids of the oldest snapshots
    await Models.Snapshot.deleteMany({ _id: { $in: idsToDelete } });
    console.log(
      `Snapshots limit reached, ${extraSnapshots} old snapshot(s) deleted`
    );
    const snapshotsAfter = await Models.Snapshot.find({ username });
    console.log(
      "There is currently",
      snapshotsAfter.length,
      "snapshots for user:",
      username
    );
  }
  return snaps;
};

const updateSnapshot = async (req, res) => {
  const snapshot = await Models.Snapshot.findOne({
    username: req.params.username,
    _id: req.params.snapshotId,
  });
  if (!snapshot) {
    res.status(404).send("Snapshot not found");
  } else {
    snapshot.skills = req.body.skills;
    await snapshot.save();
    res.status(200).send("Snapshot updated");
  }
};

const deleteSnapshot = async (req, res) => {
  const snapshot = await Models.Snapshot.findOne({
    username: req.params.username,
    _id: req.params.snapshotId,
  });
  if (!snapshot) {
    res.status(404).send("Snapshot not found");
  } else {
    await Models.Snapshot.deleteOne({ _id: snapshot._id });
    res.status(200).send("Snapshot deleted");
  }
};

module.exports = {
  getSnapshot,
  createSnapshot,
  updateSnapshot,
  deleteSnapshot,
};
