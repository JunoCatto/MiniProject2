"use strict";
let Models = require("../models");

const getPlayer = async (req, res) => {
  const player = await Models.Player.findOne({ username: req.params.username });
  if (!player) {
    res.status(404).send("Player not found");
  } else {
    res.status(200).send(player);
  }
};

const createPlayer = async (req, res) => {
  const player = await Models.Player.create(req.body);
  res.status(201).send(player);
};

module.exports = {
  getPlayer,
  createPlayer,
};
