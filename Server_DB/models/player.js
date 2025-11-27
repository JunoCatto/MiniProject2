const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const PlayerSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  accountType: {
    type: String,
    required: true,
    enum: ["normal", "ironman", "hardcore", "ultimate"],
    default: "normal",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Player", PlayerSchema);
