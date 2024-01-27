const mongoose = require("mongoose");

const SingleClassSchema = mongoose.Schema({
  duration: {
    type: String,
    enum: { values: ["60", "90", "120"], message: "{VALUE} is not supported" },
  },
  price: { type: Number, required: [true, "Must provide a price"] },
  createdAt: { type: Date, default: Date.now },
  startsOn: { type: Date, required: [true, "Must provide a starting date"] },
  endsOn: { type: Date, required: [true, "Must provide an ending date"] },
  status: { type: String, default: "In coming" },
  studentId: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: [true, "Please provide a student"],
  },
  configurationId: {
    type: mongoose.Types.ObjectId,
    ref: "Configuration",
    default: "65ac15ecbc57802d47ef4e2d",
  },
});

module.exports = mongoose.model("SingleClass", SingleClassSchema);
