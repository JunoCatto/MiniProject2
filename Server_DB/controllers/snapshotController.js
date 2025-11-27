"use strict";

let Models = require("../models");

const getSnapshot = async (req, res) => {
  const snapshot = await Models.Snapshot.findOne({
    username: req.params.username,
  });
  if (!snapshot) {
    res.status(404).send("Snapshot not found");
  } else {
    res.status(200).send(snapshot);
  }
};

const createSnapshot = async (username, skills) => {
  return await Models.Snapshot.create({
    username: username,
    skills: skills,
  });
};

module.exports = {
  getSnapshot,
  createSnapshot,
};
