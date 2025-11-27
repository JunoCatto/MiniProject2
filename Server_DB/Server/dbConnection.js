const Mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.DB_URI;

Mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const db = Mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
