import React from "react";
import { shirt, polo, hoodie } from "../../assets/available";
const AvailableOptions = () => {
  return (
    <div className="pt-24 lg:pt-10 text-center">
      <h2 className="text-accent text-4xl md:text-6xl">
        Available clothing options
      </h2>
      <div className="grid gap-y-16 mt-7">
        <div className="grid grid-cols-4 place-items-center">
          <h3 className="font-bold">Clothing Type</h3>
          <img src={shirt} alt="shirt" className="object-contain w-[85%]"></img>
          <img src={polo} alt="polo" className="object-contain"></img>
          <img src={hoodie} alt="hoodie" className="object-contain"></img>
        </div>
        <div className="grid grid-cols-4 place-items-center">
          <h3 className="font-bold">Colors</h3>
          <h3 className="text-xs md:text-base">
            Red, green, blue, black, white
          </h3>
          <h3 className="text-xs md:text-base">
            Red, green, blue, black, white
          </h3>
          <h3 className="text-xs md:text-base">
            Red, green, blue, black, white
          </h3>
        </div>
        <div className="grid grid-cols-4 place-items-center">
          <h3 className="font-bold">Sized</h3>
          <h3 className="text-xs md:text-base">Small, Medium, Large</h3>
          <h3 className="text-xs md:text-base">Small, Medium, Large</h3>
          <h3 className="text-xs md:text-base">Small, Medium, Large</h3>
        </div>
      </div>
    </div>
  );
};

export default AvailableOptions;
