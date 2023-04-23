import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import {
  Home,
  PageNotFound,
  Profile,
  Shop,
  SignIn,
  SignUp,
  PaymentStatus,
} from "./pages";
import Navbar from "./components/Navbar/Navbar";
import OrderProvider from "./features/OrderContext";
import AppProvider from "./features/AppContext";
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <OrderProvider>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<SignIn />} path="/signin" />
            <Route element={<Shop />} path="/shop" />
            <Route
              element={<PaymentStatus />}
              path="/payment/status/:orderId"
            />
            <Route element={<Profile />} path="/profile" />
            <Route element={<PageNotFound />} path="*" />
          </Routes>
        </OrderProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
