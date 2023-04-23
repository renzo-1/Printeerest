import React from "react";
import { HashLink as Link } from "react-router-hash-link";

const NavbarLinks = () => {
  return (
    <>
      <li>
        <Link className="text-md lg:text-lg" smooth to="/#home">
          Home
        </Link>
      </li>
      <li>
        <Link className="text-md lg:text-lg" smooth to="/#about">
          About
        </Link>
      </li>
      <li>
        <Link className="text-md lg:text-lg" smooth to="/#contacts">
          Contacts
        </Link>
      </li>
      <li>
        <Link className="text-md lg:text-lg" to="/shop">
          Shop
        </Link>
      </li>
    </>
  );
};

export default NavbarLinks;
