const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    deliveryAddress: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryAddress",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    variants: [
      {
        type: Schema.Types.ObjectId,
        ref: "Variant",
        required: true,
      },
    ],
    files: [
      {
        url: String,
        filename: String,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "cancelled"],
      default: "pending",
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
