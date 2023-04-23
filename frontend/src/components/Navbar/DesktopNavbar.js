import React, { useState } from "react";
import { useAppContext } from "../../features/AppContext";
import { Link, useNavigate } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import { BiUserCircle, BiCart } from "react-icons/bi";

function DesktopNavbar({ handleSignOut, setIsShowOrders }) {
  const { userInfo, isLoggedIn } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const menu = () => {
    return (
      <div className="absolute top-full bg-[#f9f9f9] min-h-fit min-w-[100px] flex flex-col rounded-lg shadow-lg space-y-2 px-4 py-2 font-bold">
        <button onClick={(e) => navigate("./profile")}>
          {userInfo.username}
        </button>
        <button className="border-t py-2" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    );
  };

  const signedInNav = () => {
    return (
      <>
        <li
          className="w-8 h-8 relative flex"
          onMouseOver={(e) => setIsHovered(true)}
          onMouseLeave={(e) => setIsHovered(false)}
        >
          <BiUserCircle className="signed-in-btn w-6 h-6 lg:w-8 lg:h-8" />
          {isHovered && menu()}
        </li>
        <li className="w-8 h-8 relative flex">
          <a
            href="#modal-div"
            onClick={(e) => setIsShowOrders((prev) => !prev)}
          >
            <BiCart className="signed-in-btn w-6 h-6 lg:w-8 lg:h-8" />
          </a>
        </li>
      </>
    );
  };

  const signedOutNav = () => {
    return (
      <>
        <li>
          <Link className="no-effect" to="/signin">
            <button className="font-bold">Sign In</button>
          </Link>
        </li>
        <li>
          <Link className="no-effect" to="/signup">
            <button
              id="sign-up-btn"
              className="text-black font-bold rounded-lg lg:border lg:bg-accent lg:text-white lg:py-2 lg:px-4"
            >
              Sign Up
            </button>
          </Link>
        </li>
      </>
    );
  };
  return (
    <div className="w-full flex justify-between">
      <ul className="flex items-center justify-center space-x-8">
        <NavbarLinks />
      </ul>
      <ul className="flex items-center space-x-8">
        {isLoggedIn ? signedInNav() : signedOutNav()}
      </ul>
    </div>
  );
}

export default DesktopNavbar;
