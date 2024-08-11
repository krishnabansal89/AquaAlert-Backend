const mongoose = require("mongoose");

const schema = mongoose.Schema;

const deviceSchema = new schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    pressure: {
      type: Number,
      default: 0,
    },
    hourConsum: {
      type: [Number],
      default: () => Array(60).fill(0),
    },
    dailyConsum: {
      type: [Number],
      default: () => Array(24).fill(0),
    },
    weekConsum: {
      type: [Number],
      default: () => Array(7).fill(0),
    },
    monthlyConsum: {
      type: [Number],
      default: () => Array(31).fill(0),
    },
    yearlyConsum: {
      type: [Number],
      default: () => Array(60).fill(0),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("device", deviceSchema);
