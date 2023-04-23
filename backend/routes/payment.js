const express = require("express");
// const catchAsync = require("../utils/catchAsync");
// const { isLoggedIn } = require("../middleware");
// const router = express.Router();
// const sdk = require("api")("@paymaya/v5.9#1bmd73pl9p4h9zf");

// // development api keys
// sdk.auth(
//   "pk-Z0OSzLvIcOI2UIvDhdTGVVfRSSeiGStnceqwUE7n0Ah",
//   "sk-X8qolYjy62kIzEbr0QRK1h4b4KDVHaNcwMYk39jInSl"
// );

// sdk
//   .createV1Checkout({
//     totalAmount: { value: 1000, currency: "PHP" },
//     items: [
//       {
//         amount: { value: 200 },
//         totalAmount: { value: 1000 },
//         name: "Tee Prints",
//         quantity: "4",
//       },
//     ],
//     requestReferenceNumber: "5fc10b93-bdbd-4f31-b31d-4575a3785009",
//   })
//   .then(({ data }) => console.log(data))
//   .catch((err) => console.error(err));

// router.route("/pay").post(isLoggedIn);
