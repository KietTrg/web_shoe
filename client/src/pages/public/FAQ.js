import { Breadcrumb } from "components";
import React, { useState } from "react";
import fagImg from "assets/faq.svg";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BiSolidMap, BiTimeFive } from "react-icons/bi";
import { FaEarthAmericas } from "react-icons/fa6";
import { AiTwotonePhone } from "react-icons/ai";

const FAQ = () => {
  const [isShow1, setIsShow1] = useState(false);
  const [isShow2, setIsShow2] = useState(false);
  const [isShow3, setIsShow3] = useState(true);

  return (
    <div className="w-full">
      <div className="h-[81px] flex  justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase mb-2">FAQ</h3>
          <Breadcrumb></Breadcrumb>
        </div>
      </div>
      <div className="w-main m-auto flex items-center justify-center mt-10">
        <h2 className="text-main text-4xl font-semibold">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="grid grid-cols-10 w-main m-auto items-center justify-between ">
        <div className=" col-span-6 gap-10 ">
          <div>
            <div className="flex justify-between items-center border-b-2">
              <h2 className="p-2 text-xl font-medium ">
                Do you provide support?
              </h2>
              <div
                className="cursor-pointer p-2"
                onClick={() => setIsShow1(!isShow1)}
              >
                {isShow1 ? (
                  <FiChevronDown size={30}></FiChevronDown>
                ) : (
                  <FiChevronRight size={30}></FiChevronRight>
                )}
              </div>
            </div>
            {isShow1 && (
              <div className="px-6  py-4 text-justify text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            )}
          </div>
          <div>
            <div className="flex justify-between items-center border-b-2">
              <h2 className="p-2 text-xl font-medium ">
                How long will it take to get my order?
              </h2>
              <div
                className=" cursor-pointer p-2"
                onClick={() => setIsShow2(!isShow2)}
              >
                {isShow2 ? (
                  <FiChevronDown size={30}></FiChevronDown>
                ) : (
                  <FiChevronRight size={30}></FiChevronRight>
                )}
              </div>
            </div>
            {isShow2 && (
              <div className="px-6 py-4 text-justify text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
            )}
          </div>
          <div>
            <div className="flex justify-between items-center border-b-2">
              <h2 className="p-2 text-xl font-medium ">Where your store ?</h2>
              <div
                className=" cursor-pointer p-2"
                onClick={() => setIsShow3(!isShow3)}
              >
                {isShow3 ? (
                  <FiChevronDown size={30}></FiChevronDown>
                ) : (
                  <FiChevronRight size={30}></FiChevronRight>
                )}
              </div>
            </div>
            {isShow3 && (
              <div className="px-6 py-4 flex gap-4  text-gray-500">
                <div className="flex flex-5 flex-col right-0 gap-4">
                  <div className="flex gap-4 items-center">
                    <BiSolidMap size={25}></BiSolidMap>
                    <span>3/2 Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam </span>
                  </div>
                  <div className="flex gap-4 items-center ">
                    <BiTimeFive size={20}></BiTimeFive>
                    <span>08:30 to 22:30 </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <FaEarthAmericas size={18}></FaEarthAmericas>
                    <span>http://cit.ctu.edu.vn/ </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <AiTwotonePhone size={20}></AiTwotonePhone>
                    <span>+84 292 3831 301</span>
                  </div>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.841454377115!2d105.76804037459512!3d10.029938972519753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883d2192b0f1%3A0x4c90a391d232ccce!2zVHLGsOG7nW5nIEPDtG5nIE5naOG7hyBUaMO0bmcgVGluIHbDoCBUcnV54buBbiBUaMO0bmcgKENUVSk!5e0!3m2!1svi!2s!4v1698936753959!5m2!1svi!2s"
                  className="w-[300px] h-[200px] flex-5 rounded-lg"
                ></iframe>
              </div>
            )}
          </div>
        </div>
        <div className=" col-span-4">
          <img
            src={fagImg}
            className="w-[500px] h-[400px] object-contain"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
