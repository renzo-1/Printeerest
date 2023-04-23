import React, { useState, useEffect, useReducer } from "react";
import { VscAdd, VscTrash } from "react-icons/vsc";
import { v4 as uuid } from "uuid";

const Variant = ({ variants, dispatchVariant }) => {
  const uniqueID = uuid().slice(0, 8);

  const handleAddVariant = () => {
    dispatchVariant({ type: "add", newId: uniqueID });
  };
  const handleRemoveVariant = (id) => {
    dispatchVariant({ type: "remove", id });
  };

  return (
    <>
      {variants.map(({ id, color, size, quantity }) => (
        <div
          className={`${
            id === 0 ? "grid-cols-6" : "grid-cols-7"
          } grid gap-x-4 w-full`}
          key={id}
        >
          <div className="w-full col-span-2">
            <label htmlFor="color">Color</label>
            <select
              required
              defaultValue={color || "white"}
              onChange={(e) =>
                dispatchVariant({
                  type: "colorChange",
                  newColor: e.target.value,
                  id,
                })
              }
              key={id}
              name="color"
              id="color"
            >
              <option value="" hidden></option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="white">White</option>
            </select>
          </div>
          <div className="w-full col-span-2">
            <label htmlFor="size">Size</label>
            <select
              required
              defaultValue={size || "small"}
              key={id}
              onChange={(e) =>
                dispatchVariant({
                  type: "sizeChange",
                  newSize: e.target.value,
                  id,
                })
              }
              name="size"
              id="size"
            >
              <option value="" hidden></option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="w-full col-span-2">
            <label htmlFor="quantity">Quantity</label>
            <input
              required
              defaultValue={quantity || 1}
              className="w-full"
              key={id}
              onChange={(e) =>
                dispatchVariant({
                  type: "quantityChange",
                  newQuantity: e.target.value,
                  id,
                })
              }
              type="number"
              name="quantity"
              id="quantity"
              min="1"
            />
          </div>
          <div className="flex justify-end items-end">
            <div
              className={`${
                id === 0 ? "hidden" : "block"
              } bg-black w-full h-10 md:h-14 border rounded-lg cursor-pointer grid place-items-center`}
              onClick={(e) => handleRemoveVariant(id)}
            >
              <VscTrash className="text-white" />
            </div>
          </div>
        </div>
      ))}
      <div
        className="border bg-white grid place-items-center cursor-pointer h-10 md:h-14 py-2 rounded"
        onClick={handleAddVariant}
      >
        <VscAdd className="hidden md:flex" />
        <h4 className="">Add Variant</h4>
      </div>
    </>
  );
};

export default Variant;
