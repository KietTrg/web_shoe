import React, { Fragment, memo, useEffect, useState } from "react";
import logo from "assets/logo2.png";
import icons from "ultils/icons";
import { Link } from "react-router-dom";
import path from "ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";
import withBase from "hocs/withBase";
import { showCart } from "store/app/appSlice";
import { BiLogOut } from "react-icons/bi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
const { BsTelephoneFill, MdEmail, BiSolidShoppingBagAlt, BiSolidUser } = icons;
const Header = ({ dispatch }) => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  // const dispatch = useDispatch();
  useEffect(() => {
    const handleClickoutOptions = (e) => {
      const profile = document.getElementById("profile");
      if (!profile?.contains(e.target)) setIsShowOption(false);
    };
    document.addEventListener("click", handleClickoutOptions);
    return () => {
      document.removeEventListener("click", handleClickoutOptions);
    };
  }, []);
  return (
    <div className=" w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className=" w-[234px] object-contain"></img>
      </Link>
      <div className=" flex text-[13px]">
        <div className=" flex flex-col items-center px-6 border-r">
          <span className=" flex gap-4 items-center">
            <BsTelephoneFill color="#005f90"></BsTelephoneFill>
            <span className=" font-semibold">+84 292 3831 301</span>
          </span>
          <span>Mon-Sat 8:00AM - 10:30PM</span>
        </div>
        <div className=" flex flex-col items-center px-6 border-r">
          <span className=" flex gap-4 items-center">
            <MdEmail color="#005f90"></MdEmail>
            <span className=" uppercase font-semibold">
              kietb2016977@student.ctu.edu.vn
            </span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        {current && (
          <Fragment>
            <div
              onClick={() => dispatch(showCart())}
              className=" cursor-pointer flex items-center justify-center gap-2 px-6 border-r"
            >
              <BiSolidShoppingBagAlt color="#005f90"></BiSolidShoppingBagAlt>
              <span>{`${current?.cart?.length || 0} item(s)`}</span>
            </div>
            <div
              onClick={() => setIsShowOption((prev) => !prev)}
              id="profile"
              className=" cursor-pointer flex items-center justify-center px-6 gap-2 relative"
            >
              <BiSolidUser color="#005f90" size={24}></BiSolidUser>
              <span>Profile</span>
              {isShowOption && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className=" rounded-lg absolute flex flex-col top-full left-[25px] bg-gray-100 min-w-[120px] "
                >
                  <div className="p-2 hover:bg-[#9AD0EC] w-full flex justify-between items-center">
                    <Link to={`/${path.MEMBER}/${path.PERSONAL}`}>Pesonal</Link>
                    <BsFillPersonLinesFill></BsFillPersonLinesFill>
                  </div>
                  {current.role === "1" && (
                    <div className="p-2 hover:bg-[#9AD0EC] w-full flex justify-between items-center">
                      <Link to={`/${path.ADMIN}/${path.DASHBOARD}`}>Admin</Link>
                      <GrUserAdmin></GrUserAdmin>
                    </div>
                  )}
                  <div className="flex justify-between items-center p-2 hover:bg-[#9AD0EC] w-full">
                    <span onClick={() => dispatch(logout())}>Logout</span>
                    <BiLogOut></BiLogOut>
                  </div>
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default withBase(memo(Header));
