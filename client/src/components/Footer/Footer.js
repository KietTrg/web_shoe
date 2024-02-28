import React, { memo } from "react";
import icons from "../../ultils/icons";
const { MdEmail } = icons;
const Footer = () => {
  return (
    <div className="w-full ">
      <div className="h-[103px] w-full bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-100">
              SIGN UP TO NEWSLETTER
            </span>
            <small className="text-[13px] text-gray-300">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              className="p-4 pr-0 rounded-l-full  w-full bg-[#97bbcd] outline-none text-gray-100 placeholder:text-sm placeholder:text-gray-100 placeholder:opacity-50"
              type="text"
              placeholder="Email address"
            ></input>
            <div className="h-[56px] w-[56px] bg-[#97bbcd] rounded-r-full justify-center items-center flex text-white">
              <MdEmail size={20}></MdEmail>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] w-full bg-gray-900 flex items-center justify-center text-white text-[13px]">
        <div className="w-main flex  ">
          <div className="flex-2 flex-col flex gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              ABOUT US
            </h3>
            <span>
              <span>Address</span>
              <span className=" opacity-70">
                : 3/2 Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam
              </span>
            </span>
            <span>
              <span>Phone</span>
              <span className=" opacity-70">
                <a href="tel: +842923831301">: +84 292 3831 301</a>
              </span>
            </span>
            <span>
              <span>Mail</span>
              <span className=" opacity-70">
                : kietb2016977@student.ctu.edu.vn
              </span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              INFORMATION
            </h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>Store Location</span>
            <span>Today's Deals</span>
            <span>Contact</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              WHO WE ARE
            </h3>
            <span>Free Shipping</span>
            <span>Gallery</span>
            <span>FAQs</span>
            <span>Return & Exchange</span>
            <span>Testimonials</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              #STORESHOE
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
