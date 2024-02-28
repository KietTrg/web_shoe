import { apiRemoveCart } from "apis";
import Button from "components/Buttons/Button";
import withBase from "hocs/withBase";
import moment from "moment";
import React, { memo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { showCart, showModal } from "store/app/appSlice";
import { getCurrent } from "store/user/asyncActions";
import { formatMoney } from "ultils/helpers";
import path from "ultils/path";

const Cart = ({ dispatch, navigate }) => {
  const { current, currentCart } = useSelector((state) => state.user);
  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) {
      toast.success(response.mes);
      dispatch(getCurrent());
    } else toast.error(response.mes);
  };
  // console.log("current: ", current.cart);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-6 w-[400px]  h-screen overflow-hidden bg-black text-white grid grid-rows-10"
    >
      <header className=" row-span-1 h-full border-b border-gray-600 flex items-center justify-between font-bold text-2xl">
        <span> Your Cart</span>
        <span
          onClick={() => dispatch(showCart())}
          className=" cursor-pointer p-2"
        >
          <AiOutlineClose className=" hover:text-red-600" />
        </span>
      </header>
      <section className="gap-3 flex flex-col row-span-7 h-full  max-h-full overflow-y-auto py-3">
        {!currentCart && (
          <span className="text-sm italic">Your cart is empty</span>
        )}
        {currentCart &&
          currentCart?.map((el) => (
            <div className="flex justify-between items-center" key={el._id}>
              <div className="flex gap-2">
                <img
                  src={el.thumbnail}
                  className=" rounded-lg w-20 h-20 object-cover"
                  alt="thumb"
                ></img>
                <div className="flex flex-col gap-1">
                  <span className="text-sm">{el?.title}</span>
                  <span className="text-[10px]">{el.color}</span>
                  <span className="text-[10px]">{`Quantity ${el.quantity}`}</span>
                  <span className="text-sm">{`${formatMoney(
                    el?.price
                  )} vnd`}</span>
                </div>
              </div>
              <span
                onClick={() => removeCart(el?.product?._id, el.color)}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-300 cursor-pointer"
              >
                <RiDeleteBin2Fill className=" hover:text-red-600"></RiDeleteBin2Fill>
              </span>
            </div>
          ))}
      </section>
      <div className=" row-span-2 flex flex-col justify-between h-full">
        <div className="flex items-center justify-between pt-4 border-t">
          <span>Subtotal:</span>
          <span className="font-medium">{`${formatMoney(
            currentCart?.reduce(
              (sum, el) => sum + Number(el?.price) * el?.quantity,
              0
            )
          )} vnd`}</span>
        </div>

        <Button
          handleOnClick={() => {
            dispatch(showCart());
            navigate(`/${path.MEMBER}/${path.DETAIL_CART}`);
          }}
          fw
        >
          Shopping Cart
        </Button>
      </div>
    </div>
  );
};

export default withBase(memo(Cart));
