import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import signInImg from "../assets/sign_in.svg";

function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("isLoggedIn"))) navigate("/shop");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("");
    axios
      .post("/api/login", formData)
      .then(() => {
        localStorage.setItem("isLoggedIn", true);
        toast.update(toastId, {
          render: "👋 Welcome back!",
          isLoading: false,
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
        });
        navigate("/shop");
      })
      .catch((err) => {
        console.log(err);
        toast.update(toastId, {
          render: err.response?.data?.message || "Invalid username or password",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
        });
      });
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto w-screen min-h-screen pt-28 px-10 md:py-20 grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2">
        <div className="space-y-8 flex justify-center items-center flex-col text-center">
          <h1 className="">Sign in to Printeerest</h1>
          <img src={signInImg} alt="girl browsing clothes online"></img>
        </div>
        <div className="flex md:justify-center items-center flex-col space-y-5 md:space-y-8">
          <form
            onSubmit={handleSubmit}
            className="form-control md:w-[300px] lg:w-[400px]"
          >
            {/* <label htmlFor="username">Username</label> */}
            <input
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              name="username"
              id="username"
              type="text"
              required
            />
            {/* <label htmlFor="password">Password</label> */}
            <input
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              name="password"
              id="password"
              type="password"
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            New to Printeerest?{" "}
            <Link to="/signup" className="underline font-bold">
              Click here to sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
