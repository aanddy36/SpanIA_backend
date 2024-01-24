const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
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
    phone: {
      type: String,
      trim: true,
      required: [true, "Must provide a phone"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Must provide a password"],
    },
    profilePhoto:{
      type:String,
      default: "",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
