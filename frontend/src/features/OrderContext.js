import React, { useReducer, createContext, useContext } from "react";

const OrderContext = createContext();

export const useOrderContext = () => {
  return useContext(OrderContext);
};

function reducer(state, action) {
  switch (action.type) {
    case "addVariant":
      break;
    case "reduceVariant":
      break;
    default:
      throw Error("Unknown action.");
  }
}

const OrderProvider = ({ children }) => {
  const [orderForm, dispatch] = useReducer(reducer);

  return (
    <OrderContext.Provider value={"asd"}>{children}</OrderContext.Provider>
  );
};

export default OrderProvider;
