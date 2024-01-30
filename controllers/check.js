const { StatusCodes } = require("http-status-codes");
const Student = require("../models/student");
const Configuration = require("../models/configuration");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "No Token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const currentTime = Math.floor(Date.now() / 1000);
    const expiresIn = decoded.exp - currentTime;
    let User;
    if (decoded.role === "admin") {
      User = Configuration;
    } else {
      User = Student;
    }
    const photo = await User.findById(
      decoded.role === "admin" ? "65ac15ecbc57802d47ef4e2d" : decoded.id
    ).select("profilePhoto");
    
    const userInfo = {
      name: decoded.name,
      email: decoded.email,
      phone: decoded.role === "admin" ? "" : decoded.phone,
      userId: decoded.id,
      joinedAt: decoded.joinedAt,
      profilePhoto: photo.profilePhoto,
    };
    res.status(StatusCodes.OK).json({
      msg: "Valid JSON Token",
      role: decoded.role,
      expiresIn,
      userInfo,
    });
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
  }
};

module.exports = { checkToken };
