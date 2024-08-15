const Home = require("../model/home.js");

const getOne = async (req, res, next) => {
  try {
    const home = await Home.find({ userId: req.user._id });
    if (home) {
      return res.json({ success: true, home: home, token: req.user.token });
    } else {
      return res.json({ success: false, msg: "Failed to load home" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const create = async (req, res, next) => {
  try {
    const { waterConsum, person } = req.body;
    const home = await Home.create({
      waterConsum: waterConsum,
      calibrated: calibrated,
      userId: req.user._id,
    });
    if (home) {
      return res.json({
        success: true,
        msg: "Home created successfully",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, msg: "Failed to create home" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { homeId,person } = req.body;
    const home = await Home.findById(homeId);
    if (!home) {
      return res.json({ success: "false", message: "Home not found" });
    }
    home.person = person;
    const updated = await home.save();
    if (updated) {
      return res.json({
        success: true,
        message: "Home updated",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, message: "Home not updated" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const homeId = req.query.homeId;
    const home = await Home.findById(homeId);
    if (!home) {
      return res.json({ success: "false", message: "Home not found" });
    }
    const result = await Home.deleteOne({ _id: homeId });
    if (result.deletedCount == 1) {
      return res.json({
        success: true,
        msg: "Home deleted",
        token: req.user.token,
      });
    } else {
      return res.json({ success: false, msg: "Failed to delete home" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const address = async (req, res, next) => {
    try {
      const { houseNo, add1, add2, add3, city, state, zip, lat, lon } = req.body;
      const homeId = req.query.homeId;
      const home = await Home.findById(homeId);
      if (!home) {
        return res.json({ success: "false", message: "Home not found" });
      }
  
      home.address = {
        houseNo,
        add1,
        add2,
        add3,
        city,
        state,
        zip,
        lat,
        lon,
      };
      const updated = await home.save();
      if (updated) {
        return res.json({
          success: true,
          msg: "Address added",
          token: req.user.token
        });
      }
  
      return res.json({ success: false, msg: "Address not added" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
module.exports = {
  create,
  getOne,
  address,
  update,
  remove,
};
