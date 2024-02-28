import React, { memo } from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return <HashLoader className=" z-500" color="#005f90"></HashLoader>;
};

export default memo(Loading);
