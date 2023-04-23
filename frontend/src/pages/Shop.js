import React from "react";
import { useAppContext } from "../features/AppContext";
import {
  AvailableOptions,
  ShopUnsigned,
  ClothingOrderForm,
} from "../components/Shop";
function Shop() {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="container w-screen min-h-screen mx-auto mb-10 px-14 md:pt-32  ">
      <AvailableOptions />
      {isLoggedIn ? <ClothingOrderForm /> : <ShopUnsigned />}
    </div>
  );
}

export default Shop;
