const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const SnapshotSchema = new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

module.exports = Mongoose.model("Snapshot", SnapshotSchema);
