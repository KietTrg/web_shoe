import React, { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "ultils/path";
import { getCurrent } from "store/user/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import icons from "ultils/icons";
import { logout, clearMessage } from "store/user/userSlice";
import Swal from "sweetalert2";
import withBase from "hocs/withBase";
const { BiLogOut } = icons;
const TopHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, current, mes } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeOutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(setTimeOutId);
    };
  }, [dispatch, isLoggedIn]);
  useEffect(() => {
    if (mes)
      Swal.fire("Oops!", mes, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [mes]);
  return (
    <div className="h-[38px] w-full bg-main flex items-center justify-center">
      <div className=" h-[38px] w-main flex items-center justify-between text-xs text-white">
        <span>
          ORDER ONLINE OR CALL US{" "}
          <a href="tel: +842923831301">: +84 292 3831 301</a>
        </span>
        {isLoggedIn && current ? (
          <div className="flex gap-4 text-sm items-center">
            <span>{`Welcome ${current?.lastname} ${current?.firstname}`}</span>
            <span
              onClick={() => dispatch(logout())}
              className=" cursor-pointer hover:text-main hover:rounded-full hover:bg-gray-200 p-2"
            >
              <BiLogOut size={18}></BiLogOut>
            </span>
          </div>
        ) : (
          <Link className=" hover:text-gray-800" to={`/${path.LOGIN}`}>
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default withBase(TopHeader);
