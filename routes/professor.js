const express = require("express");
const router = express.Router();

const { getProfessor, editProfessor } = require("../controllers/professor");

router.route("/").get(getProfessor).patch(editProfessor);

module.exports = router;
