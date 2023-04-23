require("dotenv").config();
const mongoose = require("mongoose");
const Order = require("./models/orderModel");

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connection Open");
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  const order = await new Order({
    // user: "userID",
    // deliveryAddress: "addressID",
    orderDetails: "Clothing, tee, blue, 30, red, 20",
    totalPrice: 5000,
    status: "pending",
    paymentMethod: "COD",
  });

  await order.save();
};

seedDB()
  .then(() => {
    console.log("Seeds Saved!");
    mongoose.connection.close();
  })
  .catch((e) => {
    console.log("Connection Error:", e);
  });
