const express = require("express");
const router = express.Router();

const { getReservedHours, createReservedHours, deleteReservedHour } = require("../controllers/reservedHours");

router.route("/").post(createReservedHours);
router.route('/:time').get(getReservedHours)
router.route('/:hourId').delete(deleteReservedHour)

module.exports = router;
