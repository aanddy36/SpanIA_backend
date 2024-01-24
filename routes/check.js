const express = require("express");
const router = express.Router();

const { checkToken } = require("../controllers/check");

router.route("/token").post(checkToken);

module.exports = router;
