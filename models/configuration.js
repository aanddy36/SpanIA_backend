const mongoose = require("mongoose");

const ConfigurationSchema = mongoose.Schema(
  {
    address: {
      type: String,
      trim: true,
      required: [true, "Must provide an address"],
    },
    phone: {
      type: String,
      trim: true,
      required: [true, "Must provide a phone"],
    },
    pricePerHour: {
        type: Number,
        min: 5,
        required: [true, "Must provide a price per hour"],
    }}
);

module.exports = mongoose.model("Configuration", ConfigurationSchema);
