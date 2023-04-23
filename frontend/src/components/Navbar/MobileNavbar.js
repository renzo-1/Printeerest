import React, { useState } from "react";
import { Spiral as Hamburger } from "hamburger-react";
import { BiUserCircle, BiCart } from "react-icons/bi";
import NavbarLinks from "./NavbarLinks";
import { useAppContext } from "../../features/AppContext";
import { Link, useNavigate } from "react-router-dom";

const MobileNavbar = ({ handleSignOut, setIsShowOrders }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppContext();
  const [isShowMenu, setIsShowMenu] = useState(false);

  const signedOutNav = () => {
    return (
      <>
        <li className="pt-6">
          <Link className="no-effect font-bold text-md pt-10" to="/signin">
            Sign In
          </Link>
        </li>
        <li>
          <Link
            className="no-effect font-bold text-accent text-md"
            to="/signup"
          >
            Sign Up
          </Link>
        </li>
      </>
    );
  };
  const signedInNav = () => {
    return (
      <>
        <li className="pt-6" onClick={(e) => navigate("./profile")}>
          <BiUserCircle className="signed-in-btn w-7 h-7 lg:w-8 lg:h-8" />
        </li>
        <li>
          <a
            href="#modal-div"
            onClick={(e) => setIsShowOrders((prev) => !prev)}
          >
            <BiCart className="signed-in-btn w-7 h-7 lg:w-8 lg:h-8" />
          </a>
        </li>
        <li className="w-20 lg:hidden text-md pt-6" onClick={handleSignOut}>
          Sign Out
        </li>
      </>
    );
  };

  return (
    <>
      <div onClick={(e) => setIsShowMenu((prev) => !prev)}>
        <Hamburger />
      </div>
      <div
        className={`${
          isShowMenu ? "flex" : "hidden"
        } absolute top-12 right-10 h-fit w-fit py-10 px-10 bg-[#f9f9f9]  flex-col z-20 shadow-lg rounded-lg`}
      >
        <ul className="space-y-3">
          <NavbarLinks />
          {isLoggedIn ? signedInNav() : signedOutNav()}
        </ul>
      </div>
    </>
  );
};

export default MobileNavbar;
