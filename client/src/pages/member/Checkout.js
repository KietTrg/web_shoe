import React, { useEffect, useState } from "react";
import paymenticon from "assets/payment.svg";
import { useSelector } from "react-redux";
import { formatMoney } from "ultils/helpers";
import { Congrat, InputForm, Paypal } from "components";
import withBase from "hocs/withBase";
import { getCurrent } from "store/user/asyncActions";
import {
  apiGetProducts,
  apiUpdateQuantityProduct,
  apiUpdateSoldProduct,
} from "apis";
const Checkout = ({ dispatch, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  console.log("currentCart: ", currentCart);

  const [isSuccess, setIsSuccess] = useState(false);

  const updateQuatityProducts = async () => {
    const arrayProductId = [];
    for (const product of currentCart) {
      arrayProductId.push({
        id: product.product._id,
        quantity: +product.quantity,
      });
    }
    arrayProductId.forEach(async (e) => {
      await apiUpdateQuantityProduct(e.quantity, e.id);
    });
  };
  const updateSoldProducts = async () => {
    const arrayProductId = [];
    for (const product of currentCart) {
      arrayProductId.push({
        id: product.product._id,
        sold: +product.quantity,
      });
    }
    arrayProductId.forEach(async (e) => {
      await apiUpdateSoldProduct(e.sold, e.id);
      console.log("product._id: ", e.sold);
      console.log("product.quantity: ", e.id);
    });
  };
  useEffect(() => {
    if (isSuccess) {
      updateQuatityProducts();
      updateSoldProducts();
      dispatch(getCurrent());
    }
  }, [isSuccess]);

  return (
    <div className="w-full p-8 grid grid-cols-10 h-full max-h-screen overflow-y-auto gap-6">
      {isSuccess && <Congrat></Congrat>}
      <div className="w-full flex items-center justify-center col-span-4">
        <img
          className="h-[70%] object-contain"
          src={paymenticon}
          alt="payment"
        ></img>
      </div>
      <div className="w-full flex flex-col justify-center gap-6 col-span-6">
        <h2 className="text-main text-3xl mb-6 font-bold">
          Checkout your order
        </h2>

        <div className="flex w-full gap-6 ">
          <div className="flex-1 ">
            <table className="table-auto h-fit w-[420px] fixed">
              <thead>
                <tr className="bg-[#9AD0EC] ">
                  <th className=" text-left p-2">Products</th>
                  <th className=" text-center p-2">Quantity</th>
                  <th className=" text-right p-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {currentCart?.map((el) => (
                  <tr className=" border-b border-main" key={el._id}>
                    <td className=" text-left p-2">{el.title}</td>
                    <td className=" text-center p-2">{el.quantity}</td>
                    <td className=" text-right p-2">{`${formatMoney(
                      el.price
                    )} VND`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="gap-[45px] flex-1 flex-col flex justify-between">
            <div className="flex flex-col gap-6">
              <span className="flex items-center gap-8 text-sm">
                <span className="font-bold">Subtotal:</span>
                <span className="text-main text-lg font-bold">{`${formatMoney(
                  currentCart?.reduce(
                    (sum, el) => +el?.price * el?.quantity + sum,
                    0
                  )
                )}vnd`}</span>
              </span>
              <span className="flex items-center gap-8 text-sm">
                <span className="font-bold">Address:</span>
                <span className="font-medium">{current?.address}</span>
              </span>
            </div>

            <div className="w-full mx-auto">
              <Paypal
                payload={{
                  products: currentCart,
                  total: Math.round(
                    +currentCart?.reduce(
                      (sum, el) => +el?.price * el?.quantity + sum,
                      0
                    ) / 23500
                  ),
                  address: current?.address,
                }}
                setIsSuccess={setIsSuccess}
                amount={Math.round(
                  +currentCart?.reduce(
                    (sum, el) => +el?.price * el?.quantity + sum,
                    0
                  ) / 23500
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withBase(Checkout);
