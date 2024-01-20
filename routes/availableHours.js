const express = require("express");
const router = express.Router();

const { getAvailableHours, editAvailableHours } = require("../controllers/availableHours");

router.route("/").get(getAvailableHours).patch(editAvailableHours);

module.exports = router;
