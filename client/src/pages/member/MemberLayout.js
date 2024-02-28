import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "ultils/path";
import { useSelector } from "react-redux";
import { MemberSidebar } from "components";

const MemberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);

  if (!isLoggedIn || !current)
    return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className=" flex w-full bg-gray-100 min-h-screen relative">
      <div className="w-[257px] flex-none fixed top-0 bottom-0">
        <MemberSidebar />
      </div>
      <div className="w-[257px]"></div>

      <div className="flex-auto bg-gray-100 min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MemberLayout;
