const Student = require("../models/student");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getStudents = (req, res) => {
  res.json({ status: 200, msg: "Students info" });
};

const createStudent = async (req, res) => {
  const { name, email, password, phone } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const temp = {
    name,
    email,
    phone,
    password: hashedPassword,
  };
  try {
    let existingEmail = await Student.findOne({ email });
    if (existingEmail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Email already registered.");
    }
    const newStudent = await Student.create(temp);

    const userPayload = {
      id: newStudent._id,
      name,
      email,
      phone,
      joinedAt: newStudent.createdAt,
      profilePhoto: newStudent.profilePhoto,
      role: "user",
    };
    const token = jwt.sign(userPayload, process.env.SECRET, {
      expiresIn: process.env.SESSION_TIME,
    });
    res.status(StatusCodes.CREATED).json({ user: userPayload, token });
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
  }
};

const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid email or password" });
  }
  const existingStudent = await Student.findOne({ email });
  if (!existingStudent) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid email or password" });
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingStudent.password
  );
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid email or password" });
  }
  const userPayload = {
    id: existingStudent._id,
    name: existingStudent.name,
    email: existingStudent.email,
    phone: existingStudent.phone,
    joinedAt: existingStudent.createdAt,
    profilePhoto:existingStudent.profilePhoto,
    role: "user",
  };
  const token = jwt.sign(userPayload, process.env.SECRET, {
    expiresIn: process.env.SESSION_TIME,
  });
  res.status(StatusCodes.OK).json({ user: userPayload, token });
};

const getSingleStudent = (req, res) => {
  res.json({ status: 200, msg: req.params });
};

module.exports = {
  getStudents,
  createStudent,
  getSingleStudent,
  loginStudent,
};
