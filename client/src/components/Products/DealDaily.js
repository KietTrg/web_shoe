import React, { useState, useEffect, memo } from "react";
import icons from "../../ultils/icons";
import { apiGetProducts } from "../../apis/product";
import { renderStarFromNumber, formatMoney } from "../../ultils/helpers";
import { Countdown } from "..";
import withBase from "hocs/withBase";
const { AiFillStar, BiMenu } = icons;
let idInterval;
const DealDaily = ({ navigate }) => {
  const [dealDaily, setDealDaily] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [expireTime, setExpireTime] = useState(false);

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,

      totalRatings: 5,
    });
    if (response.success) {
      setDealDaily(response.productDatas[0]);
      const h = 24 - new Date().getHours();
      const m = 60 - new Date().getMinutes();
      const s = 60 - new Date().getSeconds();
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    } else {
      setHours(0);
      setMinutes(59);
      setSeconds(59);
    }
  };

  // useEffect(() => {
  //   fetchDealDaily();
  // }, []);
  useEffect(() => {
    idInterval && clearInterval(idInterval);
    fetchDealDaily();
  }, [expireTime]);
  useEffect(() => {
    idInterval = setInterval(() => {
      if (seconds > 0) setSeconds((prev) => prev - 1);
      else {
        if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours((prev) => prev - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [seconds, minutes, hours, expireTime]);

  // console.log(dealDaily);
  return (
    <div className=" rounded-xl border w-full flex-auto">
      <div className="flex justify-between items-center p-4 w-full">
        <span className=" flex-1 flex justify-center">
          <AiFillStar size={20} color="#005f90" />
        </span>
        <span className=" flex-8 font-semibold text-[20px] flex justify-center text-gray-700">
          DEAL DAILY
        </span>
        <span className=" flex-1"></span>
      </div>
      <div className=" w-full flex flex-col items-center pt-8 gap-2 px-4">
        <img
          src={
            dealDaily?.thumb ||
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
          }
          alt=""
          className=" w-full  object-contain"
        ></img>
        <span className="flex h-4">
          {renderStarFromNumber(dealDaily?.totalRatings, 20)?.map(
            (el, index) => (
              <span key={index}>{el}</span>
            )
          )}
        </span>
        <span className=" line-clamp-1 text-center ">{dealDaily?.title}</span>
        <span>{`${
          dealDaily?.price && formatMoney(dealDaily?.price)
        } VND`}</span>
      </div>
      <div className="px-4 mt-8">
        <div className="mb-4 flex justify-center items-center gap-2">
          <Countdown unit={"Hours"} number={hours}></Countdown>
          <Countdown unit={"Minutes"} number={minutes}></Countdown>
          <Countdown unit={"Seconds"} number={seconds}></Countdown>
        </div>
        <button
          onClick={(e) =>
            navigate(
              `/${dealDaily?.category?.toLowerCase()}/${dealDaily?._id}/${
                dealDaily?.title
              }`
            )
          }
          type="button"
          className="py-2 flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium"
        >
          <BiMenu></BiMenu>
          <span>Options</span>
        </button>
      </div>
    </div>
  );
  ///new
};

export default withBase(memo(DealDaily));
