const mongoose = require("mongoose");

const ProfessorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Must provide a name"],
      maxlength: [20, "Name cant be more than 20 characters "],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Must provide an email"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Must provide a password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Professor", ProfessorSchema);
