const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const studentId = req.headers.studentid
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    if (decoded.role !== "user") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Just an user can access this routes" });
    }
    if (decoded.id !== studentId) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ msg: "You are not the user" });
      }
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
  }
  next();
};

module.exports = authUser;
