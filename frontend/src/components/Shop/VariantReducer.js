const initValue = [
  {
    id: 0,
    color: "white",
    size: "small",
    quantity: 1,
  },
];

// update the single variant that changed in color and return the updated array
const updateVariantField = (state, id, newData, field) => {
  const newVariantArr = [...state].map((variant) => {
    // if current variant is not to be removed; return old state, else change data field of the variant
    if (variant.id !== id) {
      return variant;
    } else {
      return { ...variant, [field]: newData };
    }
  });

  return newVariantArr;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "colorChange":
      return updateVariantField(state, action.id, action.newColor, "color");

    case "sizeChange":
      return updateVariantField(state, action.id, action.newSize, "size");

    case "quantityChange":
      return updateVariantField(
        state,
        action.id,
        action.newQuantity,
        "quantity"
      );
    case "add":
      return [...state, { ...initValue[0], id: action.newId }];
    case "remove":
      // return all variants that is not similar to the variant being removed
      const newVariantsArr = [...state].filter(
        (variant) => variant.id !== action.id
      );
      return newVariantsArr;
    default:
      throw Error("Unknown action.");
  }
};

export { reducer, initValue };
