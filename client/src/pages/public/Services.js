import { Breadcrumb } from "components";
import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";

import { MdOutlinePayment } from "react-icons/md";
import { RiMoneyDollarCircleLine, RiUserHeartLine } from "react-icons/ri";
const Services = () => {
  return (
    <div className="w-full">
      <div className="h-[81px] flex  justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase mb-2">Services</h3>
          <Breadcrumb></Breadcrumb>
        </div>
      </div>
      <div className="w-main m-auto flex items-center justify-center mt-10">
        <h2 className="text-main text-4xl font-semibold">Our Services</h2>
      </div>
      <div className="w-main m-auto grid grid-cols-4 gap-6 mt-20 ">
        <div className="flex flex-col gap-3 items-center justify-center shadow-lg rounded-lg p-4 cursor-pointer  transition ease-in-out duration-500  hover:bg-[#9AD0EC] ">
          <LiaShippingFastSolid size={80}></LiaShippingFastSolid>
          <h2>FREE SHIPPING</h2>
          <span className=" text-center text-gray-400 text-sm h-[80px]">
            Get 10% cash back, free shipping, free returns, and more at 1000+
            top retailers!
          </span>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center shadow-lg rounded-lg p-4 cursor-pointer transition ease-in-out duration-500  hover:bg-[#9AD0EC] ">
          <RiMoneyDollarCircleLine size={80} />
          <h2>30 DAYS MONEY BACK</h2>
          <span className=" text-center text-gray-400 text-sm  h-[80px]">
            100% satisfaction guaranteed, or get your money back within 30 days!
          </span>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center shadow-lg rounded-lg p-4 cursor-pointer transition ease-in-out duration-500  hover:bg-[#9AD0EC] ">
          <MdOutlinePayment size={80}></MdOutlinePayment>
          <h2>SAFE PAYMENT</h2>
          <span className=" text-center text-gray-400 text-sm h-[80px]">
            Pay with the world’s most popular and secure payment methods.
          </span>
        </div>
        <div className="flex flex-col gap-3 items-center justify-center shadow-lg rounded-lg p-4 cursor-pointer transition ease-in-out duration-500  hover:bg-[#9AD0EC] ">
          <RiUserHeartLine size={80}></RiUserHeartLine>
          <h2>LOYALTY CUSTOMER</h2>
          <span className=" text-center text-gray-400 text-sm h-[80px]">
            Card for the other 30% of their purchases at a rate of 1% cash back.
          </span>
        </div>
      </div>
      <div className="h-[200px]"></div>
    </div>
  );
};

export default Services;
