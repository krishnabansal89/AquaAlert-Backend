const Device = require("../model/device.js");
const { validationResult } = require("express-validator");

const getAll = async (req, res, next) => {
  try {
    const device = await Device.find({ userId: req.user._id });
    if (device) {
      return res.json({ success: true, device: device, token: req.user.token });
    } else {
      return res.json({ success: false, msg: "Failed to load Device" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const deviceId = req.query.deviceId;
    const device = await Device.findById({ _id: deviceId });
    if (device) {
      return res.json({ success: true, device: device, token: req.user.token });
    } else {
      return res.json({ success: false, msg: "Failed to load Device" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const device = await Device.create({
      userId: req.user._id,
    });
    if (device) {
      return res.json({
        success: true,
        msg: "Device created successfully",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, msg: "Failed to create Device" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const deviceId = req.query.deviceId;
    const device = await Device.findById(deviceId);
    if (!device) {
      return res.json({ success: false, msg: "No Device found" });
    }
    const result = await Device.deleteOne({ _id: deviceId });

    if (result.deletedCount === 1) {
      return res.json({
        success: true,
        msg: "Device deleted",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, msg: "Failed to delete Device" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// const update = async (req, res, next) => {
//   try {
//     const { deviceId, rate, pressure } = req.body;
//     const device = await Device.find({ _id: deviceId });
//     if (!device) {
//       return res.json({ success: false, message: "Device not found" });
//     }
//     const updated = await Device.updateOne(
//       { _id: deviceId },
//       {
//         $set: {
//           rate,
//           pressure,
//         },
//       }
//     );
//     if (updated) {
//       return res.json({
//         success: true,
//         message: "Device updated",
//         token: req.user.token,
//       });
//     } else {
//       return res.json({ success: false, message: "Device not updated" });
//     }
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };

const hardware = async (req, res, next) => {
  try {
    const { deviceId, rate, pressure, time } = req.body;
    if (!time || isNaN(new Date(time).getTime())) {
      return res.json({ success: false, message: "Invalid time format" });
    }
    const timeDate = new Date(time);

    const hours = timeDate.getUTCHours();
    const minutes = timeDate.getUTCMinutes();
    const day = timeDate.getDate();
    const device = await Device.findById(deviceId);
    if (!device) {
      return res.json({ success: false, message: "Device not found" });
    }
    const waterConsum = rate * 60;
    device.hourConsum[minutes - 1] = waterConsum;
    const sumArray = (arr) => {
      return arr.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    };
    device.dailyConsum[hours - 1] = sumArray(device.hourConsum);
    device.weekConsum[(day % 7) - 1] = sumArray(device.dailyConsum);
    device.monthConsum[day - 1] = sumArray(device.monthConsum);

    device.rate = rate;
    device.pressure = pressure;

    const updated = await device.save();
    if (updated) {
      return res.json({
        success: true,
        message: "Device updated",
        token: req.user.token,
        device: device,
      });
    } else {
      return res.json({ success: false, message: "Device not updated" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  hardware,
  remove,
};
