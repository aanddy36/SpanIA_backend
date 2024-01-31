const mongoose = require("mongoose");

const ReservedHoursSchema = mongoose.Schema({
  hour: {
    type: Date,
    required: [true, "Must provide a hour"],
  },
});

module.exports = mongoose.model("ReservedHours", ReservedHoursSchema);
