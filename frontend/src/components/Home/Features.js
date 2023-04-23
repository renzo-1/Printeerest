import React from "react";

const Features = () => {
  const divStyle =
    "w-full h-full md:w-52 p-10 flex justify-center items-center";
  return (
    <section className="h-fit py-10 px-7 md:h-[20rem] border-y border-black text-center grid gap-x-5 md:gap-x-0 grid-cols-2 md:grid-cols-4 place-items-center">
      <div className={divStyle}>
        <h3 className="text-lg md:text-2xl">
          <span className="font-extrabold">1000+</span> orders per day
        </h3>
      </div>
      <div className={divStyle}>
        <h3 className="text-lg md:text-2xl">
          <span className="font-extrabold">3-5 days </span>
          delivery time
        </h3>
      </div>
      <div className={divStyle}>
        <h3 className="text-lg md:text-2xl font-extrabold">
          Affordable options
        </h3>
      </div>
      <div className={divStyle}>
        <h3 className="text-lg md:text-2xl font-extrabold">
          high quality materials
        </h3>
      </div>
    </section>
  );
};

export default Features;
