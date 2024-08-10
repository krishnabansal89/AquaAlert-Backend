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
  }
});


const userschema = new schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phoneNo:{
    type: Number,
    required: true,
  },
  otp: {
    type: Number,
  },

  expireotp: {
    type: Date,
  },
  
  address:{
    type:addressSchema,
    required:false
  },

  token: {
    type: String,
  },

  emailverify: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", userschema);
