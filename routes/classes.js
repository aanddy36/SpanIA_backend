const express = require("express");
const router = express.Router();

const { getClasses, createClass, getClassesOfUser } = require("../controllers/classes");

router.route("/").get(getClasses).post(createClass);
router.route('/:userId').get(getClassesOfUser)

module.exports = router;
