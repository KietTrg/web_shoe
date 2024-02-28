import React, { memo } from "react";
import { useSelector } from "react-redux";

const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  return (
    <div className=" cursor-pointer flex items-center">
      <span onClick={() => handleChangeQuantity("minus")} className=" p-2 ">
        -
      </span>
      <input
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
        className="py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-center outline-none border-none rounded-lg w-[50px]"
        type="text"
      ></input>
      <span
        onClick={() => handleChangeQuantity("plus")}
        className=" cursor-pointer p-2 "
      >
        +
      </span>
    </div>
  );
};
export default memo(SelectQuantity);
