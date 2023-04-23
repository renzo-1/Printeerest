const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const DeliveryAddress = require("../models/deliveryAddressModel");
const User = require("../models/userModel");
const { isLoggedIn } = require("../middleware");
const { validateCreateDeliveryAddress } = require("../middleware");

router
  .route("/")
  .post(
    isLoggedIn,
    validateCreateDeliveryAddress,
    catchAsync(async (req, res) => {
      const deliveryAddress = req.body;
      const newAddress = new DeliveryAddress(deliveryAddress);
      const user = await User.findById(req.user._id);
      user.deliveryAddress = newAddress._id;
      user.save();
      newAddress.save();
      res.status(200).json(user.deliveryAddress);
      // save to user's delivery address
    })
  )
  .put(
    isLoggedIn,
    validateCreateDeliveryAddress,
    catchAsync(async (req, res) => {
      const data = req.body;
      await DeliveryAddress.findByIdAndUpdate(data._id, data);

      res.status(200).json({ message: "Updated" });
      // save to user's delivery address
    })
  );

module.exports = router;
