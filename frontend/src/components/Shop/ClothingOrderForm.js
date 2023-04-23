import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAppContext } from "../../features/AppContext";
import { ShowSavedAddress, AddressFormFields } from "../DeliveryAddress";
import Variant from "./Variant";
import { reducer, initValue } from "./VariantReducer";
import { useNavigate } from "react-router-dom";

// This prices are hard coded; can be improved by creating admin system
const prices = {
  tee: 200,
  polo: 250,
  hoodie: 300,
};

const ClothingOrderForm = () => {
  const { deliveryAddress: savedDeliveryAddress, formData } = useAppContext();
  const navigate = useNavigate();
  const [isNext, setIsNext] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("#");
  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const [type, setType] = useState("tee");
  const [content, setContent] = useState([]);
  const [note, setNote] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [variants, dispatchVariant] = useReducer(reducer, initValue);
  const [addressFormData, setAddressFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    region: "",
    province: "",
    zip: "",
    city: "",
    barangay: "",
    street: "",
    houseNo: "",
  });
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (type && content && totalPrice && variants) {
      setCanNext(true);
    }
  }, [type, content, totalPrice, variants]);

  const handleOrderChange = (e) => {
    const { name, value, files } = e.target;

    switch (name) {
      case "type":
        setType(value);
        break;
      case "content":
        setContent([...files]);
        break;
      case "note":
        setNote(value);
        break;
      default:
        throw Error("Unknown field.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const variantsWithoutId = variants.map((variant) => {
      delete variant["id"];
      return { ...variant, quantity: parseInt(variant.quantity) };
    });

    // final request data
    const data = {
      type,
      note,
      variants: variantsWithoutId,
      totalPrice,
    };

    let deliveryAddress;
    if (useSavedAddress && savedDeliveryAddress) {
      deliveryAddress = savedDeliveryAddress?._id;
    } else {
      deliveryAddress = JSON.stringify(addressFormData);
    }

    formData.append("order", JSON.stringify(data));
    formData.append("deliveryAddress", deliveryAddress);
    // Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    content.map((file) => {
      formData.append("files", file);
    });

    const toastId = toast.loading("Checking your order...");
    axios
      .post("/api/orders/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const { paymentId, paymentUrl } = res.data;
        localStorage.setItem("paymentId", paymentId);
        // redirect to maya payment page
        window.location.replace(paymentUrl);
      })
      .catch((err) => {
        console.log("paymentErr", err);
        toast.update(toastId, {
          render:
            err.response?.data?.message ||
            "Sorry, something went wrong with your order.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
        });
      });
  };

  useEffect(() => {
    const totalQty = variants.reduce(
      (total, currVal) => total + Math.abs(parseInt(currVal.quantity)),
      0
    );
    setTotalPrice(prices[type] * totalQty);
  }, [variants]);

  return (
    <>
      <ToastContainer />
      <div className="mt-14 md:mt-20 text-center mx-auto">
        <h2 className="text-accent text-4xl md:text-6xl">Make an order</h2>
      </div>
      <div className="w-full md:w-1/2 h-fit mx-auto relative flex overflow-hidden mt-7">
        <form
          onSubmit={handleSubmit}
          className="form-control w-full h-full shadow-none p-0 "
        >
          <div className={isNext ? "hidden" : "space-y-7 w-full"}>
            <div>
              <label htmlFor="type">Clothing Type</label>
              <select
                className="mt-0"
                required
                value={type}
                onChange={handleOrderChange}
                name="type"
                id="type"
              >
                <option value="tee">T-shirt</option>
                <option value="hoodie">Hoodie</option>
                <option value="polo">Polo Shirt</option>
              </select>
            </div>
            <Variant variants={variants} dispatchVariant={dispatchVariant} />

            <div>
              <label htmlFor="content">Upload content</label>
              <div className="file-input ">
                {content.length > 0 ? (
                  <ul className="space-x-2 ">
                    {content.map((file, i) => (
                      <li
                        key={i}
                        className="inline-block border rounded-lg px-1 md:px-2 bg-white text-sm"
                      >
                        {file.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <h3 className="text-sm md:text-base">
                    Upload references and graphics...
                  </h3>
                )}
                <input
                  required
                  multiple
                  onChange={handleOrderChange}
                  type="file"
                  name="content"
                  id="content"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="note">Note</label>
              <textarea
                placeholder="Write your personalized requests..."
                value={note}
                onChange={handleOrderChange}
                name="note"
                id="note"
              ></textarea>
            </div>
          </div>
          {isNext ? (
            <div className={isNext ? "left-0 w-full" : "left-full w-full"}>
              <div className="space-y-6">
                <div className="w-full flex justify-center space-x-5">
                  <div
                    className={
                      useSavedAddress
                        ? "p-4 border rounded-lg cursor-pointer inline-block bg-black text-white font-semibold "
                        : "border rounded-lg cursor-pointer inline-block p-4"
                    }
                    onClick={(e) => setUseSavedAddress(true)}
                    disabled={useSavedAddress}
                  >
                    Use My Address
                  </div>
                  <div
                    className={
                      useSavedAddress
                        ? "border rounded-lg cursor-pointer inline-block p-4"
                        : "p-4 border rounded-lg cursor-pointer inline-block bg-black text-white font-semibold "
                    }
                    onClick={(e) => setUseSavedAddress(false)}
                    disabled={!useSavedAddress}
                  >
                    Use Another Address
                  </div>
                </div>
                <div>
                  {useSavedAddress && savedDeliveryAddress ? (
                    <ShowSavedAddress address={savedDeliveryAddress} />
                  ) : (
                    <AddressFormFields
                      formData={addressFormData}
                      isEditing={true}
                      setAddressFormData={setAddressFormData}
                    />
                  )}
                </div>
              </div>
              <div className="bold border grid place-items-center bg-white rounded-lg w-full min-h-14 py-4 my-7">
                <h4>Total</h4>
                <h2>{totalPrice} </h2>
              </div>
              <div className="flex space-x-2">
                <div
                  className="flex justify-center items-center rounded-lg cursor-pointer bg-zinc-400 text-md lg:text-xl text-white h-10 md:h-12 lg:h-14 w-full z-10 py-6 lg:py-8"
                  onClick={(e) => setIsNext(false)}
                >
                  Previous
                </div>
                <button className="w-full py-6 lg:py-8">Pay</button>

                {/* <button className="w-full py-6 lg:py-8">Place Order</button> */}
              </div>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
      <div className="w-full md:w-1/2 flex items-end text-center space-x-7 my-7 mx-auto">
        {isNext ? (
          ""
        ) : (
          <div
            className="rounded-lg text-white bg-black cursor-pointer border h-10 md:h-12 lg:h-14 py-6 lg:py-8 w-full flex justify-center items-center font-bold text-2xl"
            onClick={(e) => setIsNext(true)}
            disabled={!canNext}
          >
            Next
          </div>
        )}
      </div>
    </>
  );
};

export default ClothingOrderForm;
