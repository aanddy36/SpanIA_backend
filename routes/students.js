const express = require("express");
const router = express.Router();

const { getStudents, createStudent, getSingleStudent, loginStudent } = require("../controllers/students");

router.route("/").get(getStudents).post(createStudent);
router.route('/:id').get(getSingleStudent)
router.route("/login").post(loginStudent);

module.exports = router;
