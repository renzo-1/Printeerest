import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../features/AppContext";
import Orders from "../Orders";
import axios from "axios";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

function Navbar() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();
  const [isShowOrders, setIsShowOrders] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = (e) => {
    localStorage.setItem("isLoggedIn", false);
    axios
      .get("/api/logout")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setIsLoggedIn(false);
    navigate("/signin");
    window.location.reload();
  };

  // const onHoverItems = () => {
  //   return (
  //     <div className="absolute top-full bg-[#f9f9f9] min-h-fit min-w-[100px] flex flex-col rounded-lg shadow-lg space-y-2 px-4 py-2 font-bold">
  //       <button onClick={(e) => navigate("./profile")}>
  //         {userInfo.username}
  //       </button>
  //       <button className="border-t py-2" onClick={handleSignOut}>
  //         Sign Out
  //       </button>
  //     </div>
  //   );
  // };
  // const SignedOutNavbar = () => {
  //   return (
  //     <div className="flex flex-col items-start space-y-2 lg:space-y-0 lg:space-x-5 lg:justify-center lg:items-center lg:flex-row z-30">
  //       <li
  //         className="w-8 h-8 relative flex"
  //         onMouseOver={(e) => setIsHovered(true)}
  //         onMouseLeave={(e) => setIsHovered(false)}
  //       >
  //         <BiUserCircle className="signed-in-btn w-6 h-6 lg:w-8 lg:h-8" />
  //         {isHovered && onHoverItems()}
  //       </li>
  //       <li className="w-8 h-8 relative flex">
  //         <a
  //           href="#modal-div"
  //           onClick={(e) => setIsShowOrders((prev) => !prev)}
  //         >
  //           <BiCart className="signed-in-btn w-6 h-6 lg:w-8 lg:h-8" />
  //         </a>
  //       </li>
  //     </div>
  //   );
  // };
  // const getSignedInHeader = () => {
  //   return (
  //     <div className="flex flex-col items-start space-y-2 lg:space-y-0 lg:space-x-5 lg:justify-center lg:items-center lg:flex-row z-30">
  //       <li
  //         className="w-8 h-8 relative flex"
  //         onMouseOver={(e) => setIsHovered(true)}
  //         onMouseLeave={(e) => setIsHovered(false)}
  //       >
  //         <BiUserCircle className="signed-in-btn w-6 h-6 lg:w-8 lg:h-8" />
  //         {isHovered && onHoverItems()}
  //       </li>
  //       <li className="w-8 h-8 relative flex">
  //         <a
  //           href="#modal-div"
  //           onClick={(e) => setIsShowOrders((prev) => !prev)}
  //         >
  //           <BiCart className="signed-in-btn w-6 h-6 lg:w-8 lg:h-8" />
  //         </a>
  //       </li>
  //     </div>
  //   );
  // };
  // const getSignedInMobileHeader = () => {
  //   return (
  //     <div className="flex flex-col items-start space-y-2 lg:space-y-0 lg:space-x-5 lg:justify-center lg:items-center lg:flex-row z-30">
  //       <li
  //         className="w-8 h-8 relative flex"
  //         onClick={(e) => navigate("./profile")}
  //       >
  //         <BiUserCircle className="signed-in-btn w-6 h-6 lg:w-8 lg:h-8" />
  //       </li>
  //       <li className="w-8 h-8 relative flex">
  //         <a
  //           href="#modal-div"
  //           onClick={(e) => setIsShowOrders((prev) => !prev)}
  //         >
  //           <BiCart className="signed-in-btn w-6 h-6 lg:w-8 lg:h-8" />
  //         </a>
  //       </li>
  //       <li className="w-20 lg:hidden">
  //         <button
  //           className="text-sm break-keep font-bold"
  //           onClick={handleSignOut}
  //         >
  //           Sign Out
  //         </button>
  //       </li>
  //     </div>
  //   );
  // };

  // const getSignedOutHeaders = () => {
  //   return (
  //     <div className="flex justify-center items-center space-x-7">
  //       <li>
  //         <Link className="no-effect" to="/signin">
  //           <button className="font-bold">Sign In</button>
  //         </Link>
  //       </li>
  //       <li>
  //         <Link className="no-effect" to="/signup">
  //           <button
  //             id="sign-up-btn"
  //             className="text-black font-bold rounded-lg lg:border lg:bg-accent lg:text-white lg:py-2 lg:px-4"
  //           >
  //             Sign Up
  //           </button>
  //         </Link>
  //       </li>
  //     </div>
  //   );
  // };
  return (
    <>
      <nav className=" bg-[#f9f9f9] shadow-md z-20 fixed right-0 left-0 py-2 lg:py-5 px-7 lg:px-0">
        <div className="container mx-auto grid grid-cols-5">
          <div className="col-span-2 flex items-center">
            <Link to="/" className="no-effect font-bold text-md lg:text-lg">
              Printeerest
            </Link>
          </div>
          <div className="col-span-3 flex justify-end lg:hidden">
            <MobileNavbar
              handleSignOut={handleSignOut}
              setIsShowOrders={setIsShowOrders}
            />
          </div>
          <div className="col-span-3 hidden lg:block ">
            <DesktopNavbar
              handleSignOut={handleSignOut}
              setIsShowOrders={setIsShowOrders}
            />
          </div>
        </div>
      </nav>
      <Orders isShowOrders={isShowOrders} setIsShowOrders={setIsShowOrders} />
    </>
  );
}

export default Navbar;
