import React from "react";
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const OrderList = ({ order, currOrderId, setCurrOrderId, setCurrOrder }) => {
  return (
    <button
      className="text-left"
      onClick={(e) => {
        setCurrOrder(order);
        setCurrOrderId(order._id);
      }}
    >
      <h2
        className={`${
          currOrderId == order._id ? "text-accent" : "text-black"
        } text-xl font-extrabold lg:text-5xl`}
      >
        {capitalizeFirstLetter(order.type)}
      </h2>
      <p className="text-zinc-400">
        {new Date(order.createdAt).toLocaleDateString()}
      </p>
    </button>
  );
};

export default OrderList;
