const mongoose = require("mongoose");

const schema = mongoose.Schema;

const addressSchema = new schema({
    houseNo: {
      type: Number,
      required: true,
    },
    add1: {
      type: String,
      required: true,
    },
    add2: {
      type: String,
      required: false,
    },
    add3: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: false,
    },
    lon: {
      type: Number,
      required: false,
    },
  });

const homeSchema = new schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  waterConsum: {
    type: Number,
    default: 0,
  },
  person:{
    type:Number
  },
  address: {
    type: addressSchema,
    required: false,
  }
});

module.exports = mongoose.model("home", homeSchema);
