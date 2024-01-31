const { StatusCodes } = require("http-status-codes");
const AvailableHours = require("../models/availableHours");
require("dotenv").config();

const getAvailableHours = async (req, res) => {
  try {
    const schedule = await AvailableHours.find({});
    res.status(StatusCodes.CREATED).json({ schedule });
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
  }
};

const editAvailableHours = async (req, res) => {
  try {
    const {newSchedule} = req.body
    await AvailableHours.deleteMany({});
    const schedule = await AvailableHours.insertMany(newSchedule);
    res.status(StatusCodes.CREATED).json({ schedule });
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
  }
};

module.exports = {
  getAvailableHours,
  editAvailableHours,
};
