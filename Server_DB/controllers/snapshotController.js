"use strict";

let Models = require("../models");

const getSnapshot = async (req, res) => {};

const createSnapshot = async (username, skills) => {
  return await Models.Snapshot.create({
    username: username,
    skills: skills,
  });
};

module.exports = {
  //   getSnapshot,
  createSnapshot,
};
