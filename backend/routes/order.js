const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");

// MODELS
const Order = require("../models/orderModel");
const Variant = require("../models/variantModel");
const DeliveryAddress = require("../models/deliveryAddressModel");
const User = require("../models/userModel");
// TOOLS
const { storage } = require("../cloudinary/index.js");
const multer = require("multer");
const upload = multer({ storage });
const { v4: uuidv4 } = require("uuid");
const sdk = require("api")("@paymaya/v5.9#1bmd73pl9p4h9zf");
// MIDDLEWARES
const {
  validateOrder,
  validateOrderDeliveryAddress,
  isLoggedIn,
} = require("../middleware");

// PAYMAYA AUTHENTICATION
sdk.auth(
  "pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah",
  "sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl"
);

// This prices are hard coded; can be improved by creating admin system
const prices = {
  tee: 200,
  polo: 250,
  hoodie: 300,
};

// create new order
router.route("/create").post(
  isLoggedIn,
  upload.array("files", 5),
  validateOrder,
  validateOrderDeliveryAddress,
  catchAsync(async (req, res) => {
    const { order, deliveryAddress } = req.body;
    const parsedOrder = JSON.parse(order);
    const paymentId = uuidv4();
    const { files } = req;

    // save the payment id to the order model

    let newVariants = [];
    for (let variant of parsedOrder.variants) {
      let newVariant = new Variant(variant);
      newVariants.push(newVariant);
      await newVariant.save();
    }

    const newOrder = new Order({
      ...parsedOrder,
      paymentId,
      variants: newVariants,
    });
    console.log("new order data", newOrder);

    files.forEach((f) => {
      newOrder.files.push({ url: f.path, filename: f.filename });
    });

    // if address used is the saved address, use it; else, create new address
    if (mongoose.Types.ObjectId.isValid(deliveryAddress)) {
      const existingAddress = await DeliveryAddress.findById(deliveryAddress);
      if (existingAddress) newOrder.deliveryAddress = deliveryAddress;
    } else {
      const newAddress = new DeliveryAddress(JSON.parse(deliveryAddress));
      newOrder.deliveryAddress = newAddress._id;
      await newAddress.save();
    }

    // push the order to the user's orders
    const user = await User.findById(req.user._id);
    user.orders.push(newOrder);
    await newOrder.save();
    await user.save();

    // PROCESS PAYMENT
    const { type, totalPrice } = parsedOrder;

    const totalItemQuantity = parsedOrder.variants.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const payment = await sdk.createV1Checkout({
      totalAmount: { value: totalPrice, currency: "PHP" },
      items: [
        {
          amount: { value: prices[type] },
          totalAmount: { value: totalPrice },
          name: type,
          quantity: totalItemQuantity,
        },
      ],
      redirectUrl: {
        success: `http://localhost:3000/shop`,
        failure: `http://localhost:3000/shop`,
        cancel: `http://localhost:3000/shop`,
      },
      requestReferenceNumber: paymentId,
    });

    res.json({ paymentId, paymentUrl: payment.data.redirectUrl });

    res.status(200).json({ message: "success" });
  })
);

router
  .route("/:id/deleteOrder")
  // delete order
  .delete(
    isLoggedIn,
    catchAsync(async (req, res) => {
      const { id } = req.params;
      await Order.findByIdAndDelete(id);
      res.status(200).json({ message: "order deleted" });
    })
  );

module.exports = router;
