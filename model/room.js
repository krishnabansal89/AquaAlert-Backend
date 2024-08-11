const mongoose = require("mongoose");

const schema = mongoose.Schema;

const roomSchema = new schema({
  roomName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  waterConsum: {
    type: Number,
    default: 0,
  },
  calibrated: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("room", roomSchema);
