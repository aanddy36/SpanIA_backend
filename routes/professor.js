const express = require("express");
const router = express.Router();

const {
  getProfessor,
  editProfessor,
  createProfessor,
  loginProfessor,
} = require("../controllers/professor");
const authAdmin = require("../middleware/authAdmin");

router.route("/").get(authAdmin, getProfessor).patch(authAdmin, editProfessor);
router.route("/register").post(createProfessor);
router.route("/login").post(loginProfessor);

module.exports = router;
