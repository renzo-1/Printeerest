import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddressFormFields from "./AddressFormFields";
import { useAppContext } from "../../features/AppContext";
export default function CreateDeliveryAddress() {
  const { setDeliveryAddress } = useAppContext();
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Checking your address...");

    axios
      .post("/api/deliveryAddress", formData)
      .then((res) => {
        toast.update(toastId, {
          render: "Your address has been saved",
          type: "success",
          isLoading: false,
          autoClose: 2000,
          hideProgressBar: true,
        });
        setDeliveryAddress(formData);
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

  return (
    <>
      <ToastContainer />
      <h2>Create your delivery address</h2>
      <form className="form-control" onSubmit={handleSubmit}>
        <AddressFormFields
          formData={formData}
          isEditing={true}
          setAddressFormData={setFormData}
        />
        <button>Save Address</button>
      </form>
    </>
  );
}
