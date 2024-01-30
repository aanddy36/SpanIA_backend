const express = require("express");
const router = express.Router();

const {
  getStudents,
  createStudent,
  getSingleStudent,
  loginStudent,
} = require("../controllers/students");
const authAdmin = require("../middleware/authAdmin");

router.route("/").get(authAdmin, getStudents).post(createStudent);
router.route("/:id").get(getSingleStudent);
router.route("/login").post(loginStudent);

module.exports = router;
