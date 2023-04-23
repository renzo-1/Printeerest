import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../features/AppContext";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const PaymentStatus = () => {
  const [status, setStatus] = useState("");
  const { orderId } = useParams;
  useEffect(() => {
    const paymentId = localStorage.getItem("paymentId");
    console.log(paymentId);
    axios
      .put(`/api/orders/payment/status/${orderId}`, paymentId)
      .then((res) => {
        console.log("status res", res.data);
      });
  });

  if (status && status === "PAYMENT_SUCCESS") {
    return (
      <div>
        Payment Sucessful
        <Link to="/shop">Order Again</Link>
      </div>
    );
  }

  if (status && status === "PAYMENT_CANCELLED") {
    return <div>Payment Cancelled</div>;
  }

  return <div>Payment Failed</div>;
  // return <ToastContainer />;
};

export default PaymentStatus;
