const Room = require("../model/room.js");

const getAll = async (req, res, next) => {
  try {
    const room = await Room.find({ userId: req.user._id });
    if (room) {
      return res.json({ success: true, room: room, token: req.user.token });
    } else {
      return res.json({ success: false, msg: "Failed to load room" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const roomId = req.query.roomId;
    const room = await Room.findById(roomId);
    if (room) {
      return res.json({ success: true, room: room, token: req.user.token });
    } else {
      return res.json({ success: false, msg: "Failed to load room" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { roomName, waterConsum, calibrated } = req.body;
    const room = await Room.create({
      roomName: roomName,
      waterConsum: waterConsum,
      calibrated: calibrated,
      userId: req.user._id,
    });
    if (room) {
      return res.json({
        success: true,
        msg: "Room created successfully",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, msg: "Failed to create room" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { roomId, roomName, calibrated } = req.body;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.json({ success: "false", message: "Room not found" });
    }
    room.roomName = roomName;
    room.calibrated = calibrated;
    const updated = await room.save();
    if (updated) {
      return res.json({
        success: true,
        message: "Room updated",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, message: "Room not updated" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const roomId = req.query.roomId;
    const room = await Room.findById(roomId);
    if (!room) {
      return res.json({ success: "false", message: "Room not found" });
    }
    const result = await Room.deleteOne({ _id: roomId });
    if (result.deletedCount == 1) {
      return res.json({
        success: true,
        msg: "Room deleted",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, msg: "Failed to delete room" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
