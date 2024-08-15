const mongoose = require("mongoose");

const schema = mongoose.Schema;

const roomSchema = new schema({
  roomName: {
    type: String,
    required: true,
  },
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "home",
    required: true,
  },
  waterConsum: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("room", roomSchema);
