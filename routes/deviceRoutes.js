const express = require("express");
const {  query, body } = require("express-validator");
const tokenverify = require("../middleware/isauth.js");
const deviceController = require("../controller/deviceController.js");

const router = express.Router();

router.post("/create", tokenverify.verifytoken, deviceController.create);

router.get(
  "/getone",
  [
    query("deviceId")
      .notEmpty()
      .withMessage("ID cannot be null")
      .isMongoId()
      .withMessage("ID must be a valid MongoDB ObjectId"),
  ],
  tokenverify.verifytoken,
  deviceController.getOne
);

router.get("/getall", tokenverify.verifytoken, deviceController.getAll);

router.delete(
  "/delete",
  [
    query("deviceId")
      .notEmpty()
      .withMessage("ID cannot be null")
      .isMongoId()
      .withMessage("ID must be a valid MongoDB ObjectId"),
  ],
  tokenverify.verifytoken,
  deviceController.remove
);

router.post(
  "/hardware",
  [
    body('deviceId')
      .notEmpty()
      .withMessage('Device ID is required')
      .isMongoId()
      .withMessage('Device ID must be a valid MongoDB ObjectId'),
    
    body('rate')
      .notEmpty()
      .withMessage('Rate is required')
      .isNumeric()
      .withMessage('Rate must be a number'),
    
    body('pressure')
      .notEmpty()
      .withMessage('Pressure is required')
      .isNumeric()
      .withMessage('Pressure must be a number'),
    
    body('time')
      .notEmpty()
      .withMessage('Time is required')
      .isISO8601()
      .withMessage('Time must be a valid ISO 8601 date string'),
  ],
  tokenverify.verifytoken,
  deviceController.remove
);




module.exports = router;
