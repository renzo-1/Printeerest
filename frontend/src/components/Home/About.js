import React from "react";
import holdingClothe from "../../assets/clothe-holding.jpg";
const About = () => {
  return (
    <div className="container mx-auto pb-20 px-7 md:px-0 mt-[100px] md:mb-[100px] space-y-10  grid grid-cols-1 md:grid-cols-2">
      <div className="space-y-10 lg:space-y-36">
        <div className="space-y-5 max-w-[400px] md:max-w-[550px]">
          <h2 className="text-accent font-extrabold text-5xl lg:text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-accent text-transparent">
            Passion
          </h2>
          <p className="md:text-lg tracking-wider lg:text-xl leading-6">
            At Printeerest, we believe that everyone deserves to express
            themselves through their clothing. We started this business with the
            goal of making high-quality, custom clothing prints accessible to
            everyone. Our passion for personalized clothing and exceptional
            customer service is what drives us every day.
          </p>
        </div>
        <div className="space-y-5 max-w-[400px] md:max-w-[550px]">
          <h2 className="text-accent font-extrabold text-4xl lg:text-6xl  bg-clip-text bg-gradient-to-r from-purple-400 to-accent text-transparent">
            Your Clothe Your Choice
          </h2>
          <p className="md:text-lg lg:text-xl tracking-wider leading-6">
            We believe in giving our customers options when it comes to
            designing their custom prints. You can upload your own artwork or
            work with our talented designers to create a unique design just for
            you. We also offer a variety of colors and printing options, so you
            can create a truly personalized item.
          </p>
        </div>
        <div className="space-y-5 max-w-[400px] md:max-w-[550px]">
          <h2 className="text-accent font-extrabold text-4xl lg:text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-accent text-transparent">
            Serving You the Best
          </h2>
          <p className="md:text-lg lg:text-xl  tracking-wider leading-6">
            We're committed to providing our customers with the best possible
            experience. That's why we offer fast turnaround times, affordable
            pricing, and exceptional customer service. We want you to be
            completely satisfied with your custom clothing print, and we'll do
            everything we can to make sure you're happy with your order.
          </p>
        </div>
      </div>
      <div id="about" className="flex justify-center items-center mt-5 md:mt-0">
        <img
          className="rounded-lg w-full max-w-[350px] lg:max-w-full overlapping-borders"
          src={holdingClothe}
          alt="holding clothe"
        ></img>
      </div>
    </div>
  );
};

export default About;
