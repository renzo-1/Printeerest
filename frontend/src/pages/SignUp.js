import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import signUpImg from "../assets/sign_up.svg";
export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("");

    axios
      .post("/api/register", formData)
      .then((res) => {
        localStorage.setItem("isLoggedIn", true);
        toast.update(toastId, {
          render: "👋 Welcome to Printeerest!",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
        });
        navigate("/shop");
      })
      .catch((err) => {
        toast.update(toastId, {
          render: err.response?.data?.message || "Invalid username or password",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: false,
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
      <ToastContainer />
      <div className="container mx-auto w-screen min-h-screen grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 pt-28 pb-14 px-10 md:py-20">
        <div className="space-y-12 flex justify-center items-center flex-col text-center">
          <h1 className="">Sign up to Printeerest</h1>
          <img
            src={signUpImg}
            className="w-full max-w-[400px]"
            alt="girl browsing liking a clothe online"
          ></img>
        </div>
        <div className="flex justify-center items-center flex-col space-y-8">
          <form
            onSubmit={handleSubmit}
            className="form-control py-14  md:w-[300px] lg:w-[400px]"
          >
            <h3 className="text-center relative h-fit w-full pb-2 border-b border-zinc-300">
              Join our community today!
            </h3>

            <input
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
              name="username"
              id="username"
              type="text"
              required
            />

            <input
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              name="email"
              id="email"
              type="email"
              required
            />

            <input
              placeholder="Password"
              onChange={handleChange}
              value={formData.password1}
              name="password1"
              id="password1"
              type="password"
              required
            />

            <input
              placeholder="Confirm Password"
              onChange={handleChange}
              value={formData.password2}
              name="password2"
              id="password2"
              type="password"
              required
            />
            <button>Sign Up</button>
          </form>
          <div>
            <p>
              Signed up already?{" "}
              <Link to="/signin" className="underline font-bold">
                Click here to sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
