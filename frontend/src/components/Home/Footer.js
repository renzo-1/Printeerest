import React from "react";
import { BsPhone, BsEnvelope } from "react-icons/bs";
const Footer = () => {
  return (
    <footer id="contacts" className="border-t border-black">
      <div className="container mx-auto grid lg:place-items-center grid-cols-1 gap-y-6 lg:grid-rows-1 lg:grid-cols-2 p-7 md:py-16 md:px-0 mb-5">
        <div>
          <h2
            id="stroked-footer"
            className="font-extrabold md:text-6xl xl:text-[6.5rem] outline-1 inline-block w-fit"
          >
            Graphic...Tee? Hoodie? Polo?
          </h2>
        </div>
        <div>
          <div>
            <h2 className="font-bold md:text-6xl xl:text-[6.5rem] text-accent mb-3 lg:mb-5">
              We got you!
            </h2>
          </div>
          <div className="space-y-2">
            <p>For inqueries, you can contact us at </p>
            <div className="flex items-center">
              <BsEnvelope className="mr-3" />
              <h3 className="pr-3 font-bold">Printeerest@notanemail.com</h3>
            </div>
            <div className="flex items-center">
              <BsPhone className="mr-3" />
              <h3 className="font-bold">09xx-xxxx-xxx</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center border-t border-black">
        <p>&copy;Copyright 2022 Printeerest</p>
      </div>
    </footer>
  );
};

export default Footer;
