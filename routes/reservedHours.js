const express = require("express");
const router = express.Router();

const { getReservedHours, createReservedHours, deleteReservedHour } = require("../controllers/reservedHours");

router.route("/").get(getReservedHours).post(createReservedHours);
router.route('/:hourId').delete(deleteReservedHour)

module.exports = router;
