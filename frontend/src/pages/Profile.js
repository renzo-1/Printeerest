import React from "react";
import { BiUserCircle } from "react-icons/bi";
import {
  CreateDeliveryAddress,
  EditDeliveryAddress,
} from "../components/DeliveryAddress";
import { useAppContext } from "../features/AppContext";

const Profile = () => {
  const { userInfo, deliveryAddress, isLoggedIn } = useAppContext();
  return (
    <>
      <div className="container mx-auto min-h-screen max-w-screen flex flex-col justify-center items-center py-32">
        <div className="flex items-center justify-center space-x-5 w-[90%] pb-5 border-b border-black">
          <BiUserCircle className="w-[100px] h-[100px] min-w-[50px]" />
          <div>
            <h2 className="font-bold">{userInfo.username}</h2>
            <h4>{userInfo.email}</h4>
          </div>
        </div>
        <h2 className="text-zinc-400 mt-20 mb-10 px-5">
          Your delivery address
        </h2>
        {isLoggedIn && deliveryAddress ? (
          <EditDeliveryAddress />
        ) : (
          <CreateDeliveryAddress />
        )}
      </div>
    </>
  );
};

export default Profile;
