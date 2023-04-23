import React from "react";
import Sample from "./Sample";
import { samples } from "../../helpers/SampleHelper";
const Samples = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 w-full h-fit mt-[100px] md:mt-[150px] px-7 overflow-x-hidden text-center ">
      {samples.map(({ img, statement, name }, i) => (
        <Sample index={i} img={img} statement={statement} name={name} />
      ))}
    </div>
  );
};

export default Samples;
