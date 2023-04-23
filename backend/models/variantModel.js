const mongoose = require("mongoose");
const { Schema } = mongoose;

const VariantSchema = new Schema({
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

module.exports = mongoose.model("Variant", VariantSchema);
