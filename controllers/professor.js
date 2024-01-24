const Professor = require("../models/professor");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getProfessor = async (req, res) => {
  try {
    const professor = await Professor.findOne({
      email: "fakejavier@hotmail.com",
    });
    res.status(StatusCodes.OK).json({ professor });
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
  }
};

const editProfessor = async (req, res) => {
  try {
    const newProfessor = await Professor.findOneAndUpdate(
      { email: "fakejavier@hotmail.com" },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(StatusCodes.OK).json({ newProfessor });
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
  }
};

const createProfessor = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const temp = {
    name,
    email,
    password: hashedPassword,
  };
  try {
    let existingEmail = await Professor.findOne({ email });
    if (existingEmail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Email already registered.");
    }
    const professor = await Professor.create(temp);

    const adminPayload = {
      id: professor._id,
      name,
      role: "admin",
    };
    const token = jwt.sign(adminPayload, process.env.SECRET, {
      expiresIn: process.env.SESSION_TIME,
    });
    res.status(StatusCodes.CREATED).json({ professor, token });
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({ msg: error });
  }
};

const loginProfessor = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid email or password" });
  }
  const existingProfessor = await Professor.findOne({ email });
  if (!existingProfessor) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid email or password" });
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingProfessor.password
  );
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Invalid email or password" });
  }

  const adminPayload = {
    id: existingProfessor._id,
    name: existingProfessor.name,
    email:existingProfessor.email,
    phone:"",
    joinedAt:existingProfessor.createdAt,
    profilePhoto: "",
    role: "admin",
  };
  const token = jwt.sign(adminPayload, process.env.SECRET, {
    expiresIn: process.env.SESSION_TIME,
  });
  res.status(StatusCodes.OK).json({user:adminPayload, token})
};

module.exports = {
  getProfessor,
  editProfessor,
  createProfessor,
  loginProfessor,
};
