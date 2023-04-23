import React from "react";
import imgNotFound from "../assets/not_found.svg";
const PageNotFound = () => {
  return (
    <div className="w-full h-screen border flex items-center justify-center flex-col space-y-16 overflow-hidden">
      <h1 className="text-zinc-400">Page Not Found</h1>
      <img
        src={imgNotFound}
        alt="page not found"
        className="w-full max-w-lg"
      ></img>
    </div>
  );
};

export default PageNotFound;
