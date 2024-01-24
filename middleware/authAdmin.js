const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    if (decoded.role !== "admin") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Just the teacher can access this routes" });
    }
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
  }
  next();
};

module.exports = authAdmin;
