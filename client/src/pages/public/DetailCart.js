import { Breadcrumb, Button } from "components";
import OrderItem from "components/Products/OrderItem";
import withBase from "hocs/withBase";
import React from "react";
import { useSelector } from "react-redux";
import { Link, createSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { formatMoney } from "ultils/helpers";
import path from "ultils/path";

const DetailCart = ({ location, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  const handleSubmit = () => {
    if (!current.address)
      return Swal.fire({
        icon: "info",
        title: "Almost!",
        text: "Please update your address before checkout",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Go update",
        cancelButtonText: "Cancel",
      }).then((rs) => {
        if (rs.isConfirmed)
          navigate({
            pathname: `/${path.MEMBER}/${path.PERSONAL}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
      });
    else {
      window.open(`/${path.CHECKOUT}`, "_blank");
    }
  };
  return (
    <div className="w-full px-4">
      {/* <div className="h-[81px] flex  justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase mb-2">My Cart</h3>
          <Breadcrumb
            category={location?.pathmane
              ?.replace("/", "")
              ?.split("-")
              ?.join(" ")}
          ></Breadcrumb>
        </div>
      </div> */}
      <header className="text-main text-3xl font-semibold py-4 border-b-2 border-main">
        My Cart
      </header>
      <div className="flex flex-col rounded-lg w-main mx-auto my-8 shadow-lg ">
        <div className="bg-[#9AD0EC] rounded-tr-lg rounded-tl-lg w-main grid mx-auto py-3 font-bold grid-cols-10">
          <span className="text-center  col-span-6 w-full">Products</span>
          <span className="text-center col-span-1 w-full">Quantity</span>
          <span className="text-center  col-span-3 w-full">Price</span>
        </div>
        {currentCart?.map((el) => (
          <OrderItem
            key={el._id}
            el={el?.product}
            dfQuantity={el.quantity}
            color={el.color}
            title={el.title}
            thumbnail={el.thumbnail}
            price={el.price}
            pid={el.product?._id}
            size={el.size}
          />
        ))}
      </div>
      <div className="w-main mx-auto mb-12 flex justify-center flex-col items-end gap-3">
        <span className="flex items-center gap-8 text-lg">
          <span className="font-medium">Subtotal:</span>
          <span className="text-main text-2xl font-bold">{`${formatMoney(
            currentCart?.reduce((sum, el) => +el?.price * el?.quantity + sum, 0)
          )} VNĐ`}</span>
        </span>
        <Button
          style="w-[300px] hover:bg-[#014e75] px-4 py-2 rounded-md text-white text-semibold bg-main my-2"
          handleOnClick={handleSubmit}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default withBase(DetailCart);
