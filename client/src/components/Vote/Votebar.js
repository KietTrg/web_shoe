import React, { useRef, useEffect, memo } from "react";
import { AiFillStar } from "react-icons/ai";

const Votebar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef();
  useEffect(() => {
    const percent = Math.round((ratingCount * 100) / ratingTotal) || 0;
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingCount, ratingTotal]);
  return (
    <div className=" flex items-center gap-2 text-sm text-gray-500">
      <div className="w-[10%] flex justify-center items-center gap-1 text-sm">
        <span>{number}</span>
        <AiFillStar color="#005f90"></AiFillStar>
      </div>
      <div className="w-[75%]">
        <div className="w-full h-[6px] relative bg-gray-200 rounded-full">
          <div
            ref={percentRef}
            className=" rounded-full absolute inset-0 bg-main"
          ></div>
        </div>
      </div>
      <div className="w-[15%] text-xs text-400 flex justify-end">{`${
        ratingCount || 0
      } reviewers`}</div>
    </div>
  );
};

export default memo(Votebar);
