const Configuration = require("../models/configuration");
const { StatusCodes } = require("http-status-codes");
require('dotenv').config()

const getConfiguration = async (req, res) => {
  try {
    const configuration = await Configuration.find({});
    res.status(StatusCodes.OK).json({ configuration });
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
  }
};

const editConfiguration = async (req, res) => {
    try {
        const newConfiguration = await Configuration.findByIdAndUpdate(
          process.env.CONFIGURATION_ID,
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        res.status(StatusCodes.OK).json({ newConfiguration });
      } catch (error) {
        res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
      }
};

module.exports = {
  getConfiguration,
  editConfiguration,
};
