const express = require("express");
const router = express.Router();

const { getClasses, createClass, getClassesOfUser } = require("../controllers/classes");
const authUser = require("../middleware/authUser");
const authAdmin = require("../middleware/authAdmin");

router.route("/").get(authAdmin,getClasses).post(createClass);
router.route('/:studentId').get(authUser,getClassesOfUser)

module.exports = router;
