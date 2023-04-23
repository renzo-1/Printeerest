import React from "react";
const ShowSavedAddress = ({ address = "" }) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        <div className="space-y-2">
          <h4 className="">First Name </h4>
          <h3 className="font-bold border-b">{address.firstName}</h3>
        </div>
        <div className="space-y-2">
          <h5 className="">Last Name</h5>
          <h3 className="font-bold border-b">{address.lastName}</h3>
        </div>
        <div className="space-y-2">
          <h5 className="">Email</h5>
          <h3 className="font-bold border-b">{address.email}</h3>
        </div>
        <div className="space-y-2">
          <h5 className="">Mobile Number</h5>
          <h3 className="font-bold border-b">{address.mobileNo}</h3>
        </div>
        <div className="space-y-2">
          <h5 className="">Region</h5>
          <h3 className="font-bold border-b">{address.region}</h3>
        </div>
        <div className="space-y-2">
          <h5 className="">Province</h5>
          <h3 className="font-bold border-b">{address.province}</h3>
        </div>
        <div className="space-y-2">
          <h5 className="">City</h5>
          <h3 className="font-bold border-b">{address.city}</h3>
        </div>
        <div className="space-y-2">
          <h5 className="">Barangay</h5>
          <h3 className="font-bold border-b">{address.barangay}</h3>
        </div>
        <div className="space-y-2">
          <h5 className="">Street</h5>
          <h3 className="font-bold border-b">{address.street}</h3>
        </div>
        <div className="space-y-2">
          <h5 className="">Zip Code</h5>
          <h3 className="font-bold border-b">{address.zip}</h3>
        </div>
        <div className="space-y-2">
          <h5 className="">Unit no./House no./Building name</h5>
          <h3 className="font-bold border-b">{address.houseNo}</h3>
        </div>
      </div>
    </>
  );
};

export default ShowSavedAddress;
