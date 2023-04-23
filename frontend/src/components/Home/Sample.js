import React, { useState } from "react";
import { ImQuotesLeft } from "react-icons/im";

const Sample = ({ img, statement, name, index }) => {
  const [showStatement, setShowStatement] = useState(false);

  return (
    <div
      key={index}
      className="relative w-full h-full lg:max-w-[400px] overflow-hidden"
      onMouseOver={(e) => setShowStatement(true)}
      onMouseLeave={(e) => setShowStatement(false)}
    >
      <img
        className="object-cover rounded-2xl w-full h-full"
        src={img}
        alt="samples"
      ></img>
      <div
        className={`${
          showStatement ? "opacity-1" : "opacity-0"
        } transition-all duration-500 ease-in-out w-full h-full bg-gradient-to-b from-[#212121]/25 to-accent/75 absolute top-0 rounded-2xl flex flex-col-reverse  p-2 lg:p-5 lg:pb-10`}
      >
        <div
          className={`${
            showStatement ? "translate-y-0" : "translate-y-full"
          } transform transition-transform duration-500 flex flex-col items-center`}
        >
          <ImQuotesLeft className="white-icon h-5 w-5 lg:w-20 lg:h-20 opacity-75" />
          <p className="text-xs md:text-base lg:text-lg text-white tracking-wider font-thin max-h-[150px] lg:max-h-full hidden-scrollbar overflow-y-auto">
            {statement}
          </p>
          <h3 className="text-xs md:text-base lg:text-xl text-white  mt-2 lg:mt-5 font-bold">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Sample;
