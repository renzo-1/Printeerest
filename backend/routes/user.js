const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");
const User = require("../models/userModel");
const Variant = require("../models/variantModel");
const Order = require("../models/orderModel");
const sanitize = require("sanitize-html");
const { isLoggedIn } = require("../middleware");
const ExpressError = require("../utils/ExpressErrors");
const { validateRegister } = require("../middleware");
const sdk = require("api")("@paymaya/v5.9#ffo1kql3uxdce8");

// PAYMAYA AUTHENTICATION
sdk.auth(
  "pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah",
  "sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl"
);

// to get payment status
sdk.server("https://pg-sandbox.paymaya.com");

router
  .route("/register")
  // SAVE REGISTER
  .post(
    validateRegister,
    catchAsync(async (req, res, next) => {
      const { username, email, password1 } = req.body;

      const user = new User({ username: username, email });
      const registeredUser = await User.register(user, password1);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        return res.status(200).json(registeredUser._id);
      });
    })
  );

router
  .route("/login")
  // save login
  .post(
    passport.authenticate("local", { failureMessage: true }),
    (req, res) => {
      return res.status(200).json({ message: "Success" });
    }
  );

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Success" });
  });
});

// send user data to client
router.get(
  "/user/data",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const userData = await User.findById(req.user._id)
      .populate({
        path: "orders",
        populate: [{ path: "deliveryAddress" }, { path: "variants" }],
      })
      .populate("deliveryAddress");

    const userOrders = await Order.find({ _id: { $in: userData.orders } });

    for (let order of userOrders) {
      sdk
        .getPaymentStatusViaPaymentId({
          paymentId: order.paymentId,
        })
        .then(({ data }) => console.log(data))
        .catch((err) => console.error(err));
    }

    // console.log("payment status", paymentStatus);
    // const order = await Order.findById(orderId);
    // console.log("order to update", order);
    // if (paymentStatus.data.status)
    // order.paymentStatus = paymentStatus.data.status;
    return res.status(200).json(userData);
  })
);

module.exports = router;
