import React, { useState } from "react";
import { useAppContext } from "../features/AppContext";
import ShowSavedAddress from "./DeliveryAddress/ShowSavedAddress";
import { VscClose } from "react-icons/vsc";
import OrderList from "./OrderList";
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function Orders({ isShowOrders, setIsShowOrders }) {
  const { orders } = useAppContext();
  const [currOrder, setCurrOrder] = useState(undefined);
  const [currOrderId, setCurrOrderId] = useState(undefined);
  const [isShowAddress, setIsShowAddress] = useState(false);
  // GETS ALL ORDERS
  const getOrder = () => {
    return (
      <div className="grid grid-cols-4">
        <div className="col-span-1 max-h-screen flex flex-col space-y-7 overflow-y-auto overflow-x-hidden pr-7 pb-[200px]">
          <h1 className="text-base lg:text-xl border-b-4 border-black max-w-[30px]">
            Orders
          </h1>
          {orders.map((order) => (
            <OrderList
              key={order._id}
              order={order}
              currOrderId={currOrderId}
              setCurrOrderId={setCurrOrderId}
              setCurrOrder={setCurrOrder}
            />
          ))}
        </div>
        <div className="col-span-3 px-4 lg:px-14 h-screen overflow-y-auto overflow-x-hidden pb-[200px]">
          {getCurrOrderDetails()}
        </div>
      </div>
    );
  };
  const getCurrOrderDetails = () => {
    if (currOrder) {
      return (
        <div className="space-y-8 lg:space-y-20">
          <div>
            <div className="grid gap-y-5 grid-cols-1 sm:grid-cols-2 sm:gap-x-5 place-items-center text-center">
              <div className="bg-gradient-to-t from-[#d5aaff] to-[#7b73f3] bg-opacity-1/2 shadow-md rounded-lg w-full p-8 ">
                <h3 className="text-zinc-100 text-lg font-bold col-span-3 lg:mb-1">
                  Type
                </h3>
                <p className="text-lg lg:text-xl text-white">
                  {capitalizeFirstLetter(currOrder.type)}
                </p>
              </div>
              <div className="bg-gradient-to-t from-[#d5aaff] to-[#7b73f3] bg-opacity-1/2 shadow-md  rounded-lg w-full p-8">
                <h3 className="text-zinc-100 text-lg  font-bold col-span-3 lg:mb-1">
                  Total
                </h3>
                <p className="text-lg lg:text-xl text-white">
                  &#8369;{currOrder.totalPrice}
                </p>
              </div>
              <div className="bg-gradient-to-t from-[#d5aaff] to-[#7b73f3] bg-opacity-1/2 shadow-md  rounded-lg w-full p-8">
                <h3 className="text-zinc-100 text-lg font-bold col-span-3 lg:mb-1">
                  Order Status
                </h3>
                <p className="text-lg lg:text-xl text-white">
                  {capitalizeFirstLetter(currOrder.orderStatus)}
                </p>
              </div>

              <div className="bg-gradient-to-t from-[#d5aaff] to-[#7b73f3] bg-opacity-1/2 shadow-md rounded-lg w-full p-8">
                <h3 className="text-zinc-100 text-lg  font-bold col-span-3 lg:mb-1">
                  Payment Status
                </h3>
                <p className="text-lg lg:text-xl text-white">
                  {capitalizeFirstLetter(currOrder.paymentStatus)}
                </p>
              </div>
            </div>
          </div>

          {/* variants */}
          <div className="grid grid-cols-4">
            <h3 className="text-zinc-400 col-span-4 font-bold">Variants</h3>
            {currOrder.variants.map(({ color, size, quantity }, i) => (
              <div
                key={`variant${i}`}
                className="grid grid-cols-3 col-span-3 text-md border-b"
              >
                <p className="mt-2">{color}</p>
                <p className="mt-2">{size}</p>
                <p className="mt-2">{quantity}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-bold text-zinc-400">Design and References</h3>
            {currOrder.files.map((file, i) => (
              <div className="flex space-x-4" key={`file${i}`}>
                <img
                  className="rounded-lg w-[150px] h-[200px] object-cover"
                  key={i}
                  src={file.url}
                  alt={file.filename}
                ></img>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-bold text-zinc-400">note</h3>
            <p className="max-w-700px h-fit">{currOrder.note}</p>
          </div>
          <p
            className="cursor-pointer underline"
            onClick={(e) => setIsShowAddress((prev) => !prev)}
          >
            {isShowAddress ? "Hide Address" : "Show Address"}
          </p>
          {isShowAddress && (
            <div>
              <h3 className="text-zinc-400">Delivery Address</h3>

              <ShowSavedAddress address={currOrder.deliveryAddress} />
            </div>
          )}
          {/* <div className="mt-10 mx-auto w-full flex justify-center items-center ">
            <button className="mt-10 bg-black text-white p-4 rounded-lg">
              Cancel
            </button>
          </div> */}
        </div>
      );
    }
  };

  return (
    <>
      <div
        id="modal-div"
        className={`${
          isShowOrders ? "fixed" : "hidden"
        } modal-div bg-white to-blue-500 top-0 right-0 px-5 py-3 lg:px-10 lg:py-7 h-screen w-screen lg:w-fit flex flex-col z-30 `}
      >
        <button
          className={`${
            isShowOrders ? "block" : "hidden"
          }signed-in-btn border border-black p-1 mb-7 rounded-lg self-end `}
          onClick={() => setIsShowOrders((prev) => !prev)}
        >
          <VscClose />
        </button>
        <div>
          {isShowOrders && orders && orders.length > 0 ? (
            getOrder()
          ) : (
            <h2 className="text-zinc-400 text-4xl">No orders yet</h2>
          )}
        </div>
      </div>

      {/* BLACK TRANSPARENT BG */}
      {isShowOrders ? (
        <div
          className="h-screen w-screen bg-black fixed left-0 z-20 opacity-50"
          onClick={(e) => setIsShowOrders((prev) => !prev)}
        ></div>
      ) : (
        ""
      )}
    </>
  );
}

export default Orders;
