import React, { memo } from "react";

const Banner = () => {
  return (
    <div className=" w-full">
      <img
        src="https://i.pinimg.com/originals/95/92/46/95924635d7c88ffe204f13f944b27e83.gif"
        alt="banner"
        className=" h-[360px] w-full object-cover"
      ></img>
    </div>
  );
};

export default memo(Banner);
