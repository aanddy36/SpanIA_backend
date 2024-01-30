const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authAnyone = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = { role: decoded.role, id: decoded.id };
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
  }
  next();
};

module.exports = authAnyone;
