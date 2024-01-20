const express = require("express");
const router = express.Router();

const { getStudents, createStudent, getSingleStudent } = require("../controllers/students");

router.route("/").get(getStudents).post(createStudent);
router.route('/:id').get(getSingleStudent)

module.exports = router;
