const mongoose = require("mongoose");

const AvailableHoursSchema = mongoose.Schema(
  {
    dayInTheWeek: {
      type: Number,
      required: [true, "Must provide a day"],
    },
    time: {
      type: String,
      required: [true, "Must provide an hour"],
    }
  }
);

module.exports = mongoose.model("AvailableHours", AvailableHoursSchema);
