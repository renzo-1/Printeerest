import axios from "axios";
import React, { useState } from "react";
import { useAppContext } from "../../features/AppContext";
import AddressFormFields from "./AddressFormFields";
import { ToastContainer, toast } from "react-toastify";

const EditDeliveryAddress = () => {
  const { deliveryAddress } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(deliveryAddress);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Checking your address...");

    axios
      .put("/api/deliveryAddress", formData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.update(toastId, {
          render: err.response?.data?.message || "Oh no! Something went wrong.",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
        });
      });
  };

  const setParentFormData = (data) => {
    setFormData(data);
  };

  return (
    <>
      <ToastContainer />

      {formData && (
        <form
          className="form-control shadow-none p-0 px-5"
          onSubmit={handleSubmit}
        >
          <AddressFormFields
            formData={formData}
            isEditing={isEditing}
            setParentFormData={setParentFormData}
          />
          <div className="flex justify-center space-x-2 md:space-x-5">
            <div
              className={
                isEditing
                  ? "bg-zinc-400 text-white font-bold text-xl  w-1/2 p-2 md:p-4 rounded-lg cursor-pointer flex justify-center items-center"
                  : "hidden"
              }
              onClick={(e) => setIsEditing((prev) => !prev)}
            >
              Cancel
            </div>
            <div
              className="bg-black text-white font-bold text-xl w-1/2 p-2 md:p-4 rounded-lg cursor-pointer text-center"
              hidden={isEditing}
              onClick={(e) => setIsEditing((prev) => !prev)}
            >
              Edit
            </div>
            <div className="h-full w-1/2" hidden={!isEditing}>
              <button className="text-white font-bold text-2xl w-full rounded-lg">
                Save Address
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
export default EditDeliveryAddress;
