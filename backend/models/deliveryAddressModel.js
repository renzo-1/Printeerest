const mongoose = require("mongoose");
const { Schema } = mongoose;

const DeliveryAddressSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo: {
    type: String,
    required: true,
    unique: true,
  },
  region: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  barangay: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  houseNo: {
    type: String,
  },
});

module.exports = mongoose.model("DeliveryAddress", DeliveryAddressSchema);
