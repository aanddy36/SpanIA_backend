const ReservedHours = require("../models/reservedHours");
const { StatusCodes } = require("http-status-codes");

const getReservedHours = async (req, res) => {
  const { time } = req.params;
  const startingDate = new Date(Number(time));
  startingDate.setDate(startingDate.getDate());
  startingDate.setHours(0);
  startingDate.setMinutes(0);
  startingDate.setSeconds(0);
  const endingDate = new Date(startingDate);
  endingDate.setDate(endingDate.getDate() + 6);
  endingDate.setHours(23);
  endingDate.setMinutes(59);
  endingDate.setSeconds(59);
  try {
    const response = await ReservedHours.find({
      hour: { $gte: startingDate, $lte: endingDate },
    });
    const reservedHours = response.map((cell) => {
      return {
        id: cell._id,
        hour: cell.hour,
      };
    });
    res.status(StatusCodes.OK).json({ reservedHours });
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
  }
};

const createReservedHours = (req, res) => {
  res.json({ status: 200, msg: req.body });
};

const deleteReservedHour = (req, res) => {
  res.json({ status: 200, msg: req.params });
};

module.exports = {
  getReservedHours,
  createReservedHours,
  deleteReservedHour,
};
