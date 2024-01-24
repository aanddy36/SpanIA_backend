const express = require("express");
const router = express.Router();

const { getConfiguration, editConfiguration } = require("../controllers/configuration");
const authAdmin = require('../middleware/authAdmin')

router.route("/").get(getConfiguration).patch(authAdmin,editConfiguration);

module.exports = router;
