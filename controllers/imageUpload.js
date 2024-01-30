const { StatusCodes } = require("http-status-codes");
const Configuration = require("../models/configuration");
const Student = require("../models/student");
require("dotenv").config();

const uploadImage = async (req, res) => {
  const { id, role } = req.user;
  let User;
  if (role === "admin") {
    User = Configuration;
  } else {
    User = Student;
  }
  try {
    const response = await User.findByIdAndUpdate(
      role === "admin" ? "65ac15ecbc57802d47ef4e2d" : id,
      {
        profilePhoto: req.myUrl,
      },
      { new: true }
    );
    res.status(StatusCodes.OK).json({ user: response });
  } catch (error) {
    res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ msg: "Error when submitting" });
  }
};

module.exports = {
  uploadImage,
};
