import React, { memo, Fragment, useState } from "react";
import avatar from "assets/avtDefault.png";
import { adminSidebar, memberSidebar } from "ultils/contants";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import path from "ultils/path";
import { useSelector } from "react-redux";
import { BiLogOut } from "react-icons/bi";
const activedStyle =
  "px-4 py-2 rounded-l-xl flex items-center gap-2 text-main bg-gray-100 font-semibold  ";
const notActivedStyle =
  "px-4 py-2 rounded-xl flex items-center gap-2 text-gray-200 hover:bg-main ";
const MemberSidebar = () => {
  const [actived, setActived] = useState([]);
  const { current } = useSelector((state) => state.user);
  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID))
      setActived((prev) => prev.filter((el) => el !== tabID));
    else setActived((prev) => [...prev, tabID]);
  };
  return (
    <div className=" py-4 bg-black h-full rounded-r-2xl w-[257px] flex-none">
      <div className="flex flex-col gap-4 items-center justify-center p-4">
        <img
          src={current?.avatar || avatar}
          alt="logo"
          className="w-20 h-20 object-cover rounded-full"
        ></img>

        <small className="text-white text-lg">{`${current?.lastname} ${current?.firstname}`}</small>
      </div>
      <div className="mt-4">
        {memberSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(isActive && activedStyle, !isActive && notActivedStyle)
                }
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <div
                className="flex flex-col text-gray-200"
                onClick={() => handleShowTabs(+el.id)}
              >
                <div className=" px-4 py-2 flex justify-between items-center gap-2 hover:bg-main hover:rounded-xl cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {actived.some((id) => +id === +el.id) ? (
                    <FiChevronRight />
                  ) : (
                    <FiChevronDown />
                  )}
                </div>

                {actived.some((id) => +id === +el.id) && (
                  <div className="flex flex-col ">
                    {el.submenu.map((item) => (
                      <NavLink
                        key={el.text}
                        to={item.path}
                        onClick={(e) => e.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activedStyle,
                            !isActive && notActivedStyle,
                            " pl-16"
                          )
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
        <NavLink className={clsx(notActivedStyle)} to={"/"}>
          <BiLogOut size={25}></BiLogOut>
          Home
        </NavLink>
      </div>
    </div>
  );
};

export default memo(MemberSidebar);
