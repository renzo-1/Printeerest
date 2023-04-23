const ExpressError = require("./utils/ExpressErrors");
const {
  orderSchema,
  registerSchema,
  deliveryAddressSchema,
} = require("./joiSchemas");
const catchAsync = require("./utils/catchAsync");
const DeliveryAddress = require("./models/deliveryAddressModel");
const mongoose = require("mongoose");

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new ExpressError("You must be signed in", 401);
  }
  next();
};

const validateOrder = (req, res, next) => {
  const { order } = req.body;
  const parsedOrder = JSON.parse(order);

  const { error } = orderSchema.validate(parsedOrder);

  if (error) {
    const msg = error.details.map((details) => details.message).join(", ");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateOrderDeliveryAddress = catchAsync(async (req, res, next) => {
  const { deliveryAddress } = req.body;
  // check if delivery address is valid and if found in the database
  if (mongoose.Types.ObjectId.isValid(deliveryAddress)) {
    const existingAddress = await DeliveryAddress.findById(deliveryAddress);
    if (!existingAddress) {
      throw new ExpressError("Delivery Address not found", 400);
    }
  }
  // if a new address is created; check schema
  else {
    const parsedDeliveryAddress =
      typeof deliveryAddress === "string"
        ? JSON.parse(deliveryAddress)
        : deliveryAddress;

    const { error } = deliveryAddressSchema.validate({
      ...parsedDeliveryAddress,
    });

    if (error) {
      const msg = error.details.map((details) => details.message).join(", ");
      throw new ExpressError(msg, 400);
    }
  }
  next();
});

const validateCreateDeliveryAddress = catchAsync(async (req, res, next) => {
  const { error } = deliveryAddressSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((details) => details.message).join(", ");
    throw new ExpressError(msg, 400);
  }
  next();
});

const validateRegister = catchAsync(async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((details) => details.message).join(", ");
    throw new ExpressError(msg, 400);
  }
  next();
});

module.exports = {
  isLoggedIn,
  validateOrder,
  validateOrderDeliveryAddress,
  validateCreateDeliveryAddress,
  validateRegister,
};
