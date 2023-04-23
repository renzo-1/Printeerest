import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState("");
  const [orders, setOrders] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [reload, setReload] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const formData = new FormData();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userInfo, JSON.parse(localStorage.getItem("isLoggedIn"))]);

  useEffect(() => {
    if (isLoggedIn) {
      const controller = new AbortController();
      axios
        .get("/api/user/data", { withCredentials: true })
        .then((res) => {
          const { _id, username, email, orders, deliveryAddress } = res.data;
          setOrders([...orders.reverse()]);
          console.log(orders);
          setUserInfo({ id: _id, username, email });
          setDeliveryAddress(deliveryAddress);
        })
        .catch((err) => {
          console.log(err);
          localStorage.setItem("isLoggedIn", false);
          navigate("/signin");
          toast.error(
            err.response?.data?.message || "Oh no! Something went wrong."
          );
        });
      return () => {
        controller.abort();
      };
    }
  }, [isLoggedIn]);
  // Logout updates the user data to default
  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setDeliveryAddress,
        reload,
        setReload,
        userInfo,
        orders,
        setOrders,
        deliveryAddress,
        formData,
      }}
    >
      <ToastContainer />
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
