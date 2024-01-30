const express = require("express");
const router = express.Router();

const {
  getAvailableHours,
  editAvailableHours,
} = require("../controllers/availableHours");
const authAdmin = require("../middleware/authAdmin");

router.route("/").get(getAvailableHours).patch(authAdmin, editAvailableHours);

module.exports = router;
