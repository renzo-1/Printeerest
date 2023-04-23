import React, { useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
const Carousel = () => {
  const [currImg, setCurrImg] = useState(1);

  const handlePrevImg = () => {
    setCurrImg((prev) => {
      if (prev === 1) {
        return prev + 2;
      }
      return prev - 1;
    });
  };

  const handleNextImg = () => {
    setCurrImg((prev) => {
      if (prev === 3) {
        return prev - 2;
      }
      return prev + 1;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextImg();
    }, 4000);
    return () => clearTimeout(timer);
  });

  const highlightImgBtn = (btnNum) => {
    return currImg === btnNum
      ? "border bg-white rounded-xl p-1 z-10 relative"
      : "border rounded-xl p-1 z-10 relative ";
  };

  return (
    <div className="h-[14rem] shadow-lg rounded-lg overflow-hidden relative z-10">
      <div className="w-full h-full absolute flex justify-between items-center px-3">
        <button
          className="icon-bg rounded-full border border-white p-1 z-10 relative"
          onClick={handlePrevImg}
        >
          <GrPrevious className="icon" />
        </button>
        <button
          className="icon-bg rounded-full border border-white p-1 z-10 relative"
          onClick={handleNextImg}
        >
          <GrNext className="icon" />
        </button>
      </div>
      <div className="w-full h-full justify-center flex items-end pb-3 space-x-3">
        <button
          className={highlightImgBtn(1)}
          onClick={(e) => setCurrImg(1)}
        ></button>
        <button
          className={highlightImgBtn(2)}
          onClick={(e) => setCurrImg(2)}
        ></button>
        <button
          className={highlightImgBtn(3)}
          onClick={(e) => setCurrImg(3)}
        ></button>
      </div>
      <div className="h-full w-screen absolute top-0">
        <img
          src={`assets/carousel/${currImg}.jpg`}
          alt="carousel feature"
          className="min-w-full h-full object-cover"
        ></img>
      </div>
    </div>
  );
};

export default Carousel;
