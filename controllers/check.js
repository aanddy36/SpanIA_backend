const { StatusCodes } = require("http-status-codes");
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
    const userInfo = {
      name: decoded.name,
      email: decoded.email,
      phone: decoded.role === "admin" ? "" : decoded.phone,
      userId: decoded.id,
      joinedAt: decoded.joinedAt,
      profilePhoto: decoded.profilePhoto,
    };
    res
      .status(StatusCodes.OK)
      .json({
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
