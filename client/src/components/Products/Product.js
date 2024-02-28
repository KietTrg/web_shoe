import React, { memo, useState } from "react";
import { formatMoney } from "ultils/helpers";
import label from "assets/New.png";
import Trending from "assets/Treding.png";
import { renderStarFromNumber } from "ultils/helpers";
import { SelectOption } from "..";
import icons from "ultils/icons";
import { Link, createSearchParams } from "react-router-dom";
import path from "ultils/path";
import withBase from "hocs/withBase";
import { showModal } from "store/app/appSlice";
import { DetailProduct } from "pages/public";
import { apiUpdateCart, apiUpdateWishlist } from "apis";
import { toast } from "react-toastify";
import { getCurrent } from "store/user/asyncActions";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { BsFillCartCheckFill } from "react-icons/bs";
import clsx from "clsx";

const { AiFillEye, BsCartPlusFill, BsSuitHeartFill } = icons;
const Product = ({
  productDatas,
  isNew,
  normal,
  navigate,
  dispatch,
  location,
  pid,
  className,
}) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const { current } = useSelector((state) => state.user);
  const handleClickOption = async (e, flag) => {
    e.stopPropagation();
    if (flag === "CART") {
      if (!current)
        return Swal.fire({
          title: "Almost...",
          text: "Please login first",
          icon: "info",
          confirmButtonText: "Go login page",
          cancelButtonText: "Not now!",
          showCancelButton: true,
        }).then((rs) => {
          if (rs.isConfirmed)
            navigate({
              pathname: `/${path.LOGIN}`,
              search: createSearchParams({
                redirect: location.pathname,
              }).toString(),
            });
        });
      const response = await apiUpdateCart({
        pid: productDatas?._id,
        color: productDatas?.color,
        size: productDatas?.size[0],
        quantity: 1,
        price: productDatas?.price,
        thumbnail: productDatas?.thumb,
        title: productDatas?.title,
      });
      if (response.success) {
        console.log("response: ", response);
        toast.success(response.mes);
        dispatch(getCurrent());
      } else toast.error(response.mes);
    }

    if (flag === "WISHLIST") {
      const response = await apiUpdateWishlist(pid);
      console.log("pid: ", pid);
      console.log("response: ", response);
      if (response.success) {
        dispatch(getCurrent());
        toast.success(response.mes);
      } else toast.error(response.mes);
    }
    if (flag === "QUICK_VIEW") {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <DetailProduct
              data={{
                pid: productDatas?._id,
                category: productDatas?.category,
              }}
              isQuickView
            />
          ),
        })
      );
    }
  };
  return (
    <div className={clsx(" w-full text-base  px-[10px]", className)}>
      <div
        className="w-full mb-2 shadow-lg rounded-xl  p-[15px] flex flex-col items-start"
        onClick={(e) =>
          navigate(
            `/${productDatas?.category?.toLowerCase()}/${productDatas?._id}/${
              productDatas?.title
            }`
          )
        }
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full flex items-center justify-center relative">
          {isShowOption && (
            <div className=" absolute bottom-[-10px] flex justify-center left-0 right-0 gap-2 animate-slide-top ">
              <span
                title="Quick view"
                onClick={(e) => handleClickOption(e, "QUICK_VIEW")}
              >
                <SelectOption icons={<AiFillEye />} />
              </span>
              {current?.cart.some(
                (el) => el.product === productDatas._id.toString()
              ) ? (
                <span title="Added to cart">
                  <SelectOption icons={<BsFillCartCheckFill />} />
                </span>
              ) : (
                <span
                  title="Add to cart"
                  onClick={(e) => handleClickOption(e, "CART")}
                >
                  <SelectOption icons={<BsCartPlusFill />} />
                </span>
              )}
              <span
                title="Add to wishlist"
                onClick={(e) => handleClickOption(e, "WISHLIST")}
              >
                <SelectOption
                  icons={
                    <BsSuitHeartFill
                      color={
                        current?.wishlist.some((el) => el._id === pid)
                          ? "pink"
                          : "black"
                      }
                    />
                  }
                />
              </span>
            </div>
          )}

          <img
            src={
              productDatas?.thumb ||
              "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
            }
            alt=""
            className=" w-[274px] h-[274px] object-cover"
          ></img>
          {!normal && (
            <img
              src={isNew ? label : Trending}
              className={`absolute w-[100px] h-[35px] top-[0] right-[0] object-cover`}
              alt=""
            ></img>
          )}
        </div>
        <div className=" flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="flex h-4">
            {renderStarFromNumber(productDatas?.totalRatings)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
          </span>
          <span className=" line-clamp-1">{productDatas?.title}</span>
          <span>{`${formatMoney(productDatas?.price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(Product));
