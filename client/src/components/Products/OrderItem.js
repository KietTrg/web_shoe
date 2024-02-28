import SelectQuantity from "components/Common/SelectQuantity";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "ultils/helpers";
import { updateCart } from "store/user/userSlice";
import withBase from "hocs/withBase";

const OrderItem = ({
  dispatch,
  color,
  dfQuantity = 1,
  title,
  price,
  thumbnail,
  pid,
  size,
}) => {
  const [quantity, setQuantity] = useState(() => dfQuantity);
  const handleQuantity = (number) => {
    if (+number > 1) setQuantity(number);
  };
  const handleChangeQuantity = (flag) => {
    if (flag === "minus" && quantity === 1) return;
    if (flag === "minus") setQuantity((prev) => +prev - 1);
    if (flag === "plus") setQuantity((prev) => +prev + 1);
  };
  useEffect(() => {
    dispatch(updateCart({ pid, quantity, color }));
  }, [quantity]);
  return (
    <div className="border-b w-main grid mx-auto py-3 font-bold grid-cols-10">
      <span className="text-center  col-span-6 w-full">
        <div className="flex gap-2 px-4 py-3">
          <img
            src={thumbnail}
            className=" w-28 h-28 object-cover"
            alt="thumb"
          ></img>
          <div className="flex flex-col  items-start gap-1">
            <span className="text-sm text-main">{title}</span>
            <span className="text-[10px] font-main">{color}</span>
            <span className="text-[10px] font-main">{size}</span>
          </div>
        </div>
      </span>
      <span className="text-center col-span-1 w-full">
        <div className="flex items-center h-full">
          <SelectQuantity
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleChangeQuantity={handleChangeQuantity}
          ></SelectQuantity>
        </div>
      </span>
      <span className="text-center justify-center h-full flex items-center col-span-3 w-full">
        <span className="text-lg">{`${formatMoney(
          price * quantity
        )} vnd`}</span>
      </span>
    </div>
  );
};

export default withBase(OrderItem);
