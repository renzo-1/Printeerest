import React from "react";
const ShopUnsigned = () => {
  return (
    <>
      <div className="text-center py-24 space-y-8">
        <h1 className="text-5xl text-zinc-400">Want to place an order?</h1>
        <a
          href="/signin"
          className="inline-block transition-all ease-in-out duration-300 hover:scale-105 "
        >
          <h2 className="floating-btn text-2xl font-bold">
            Click here to sign in
          </h2>
        </a>
      </div>
    </>
  );
};

export default ShopUnsigned;
