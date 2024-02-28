import React, { memo, Fragment, useState } from "react";
import logo from "assets/logoAdmin.png";
import { adminSidebar } from "ultils/contants";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import path from "ultils/path";
const activedStyle =
  "px-4 py-2 rounded-l-xl flex items-center gap-2 text-main bg-gray-100 font-semibold  ";
const notActivedStyle =
  "px-4 py-2 rounded-xl flex items-center gap-2 text-gray-200 hover:bg-main ";
const AdminSidebar = () => {
  const [actived, setActived] = useState([]);
  const handleShowTabs = (tabID) => {
    if (actived.some((el) => el === tabID))
      setActived((prev) => prev.filter((el) => el !== tabID));
    else setActived((prev) => [...prev, tabID]);
  };
  return (
    <div className=" py-4 bg-black h-full rounded-r-2xl">
      <div className=" p-4 flex flex-col items-center justify-center gap-4">
        <Link to={`/`}>
          <img src={logo} alt="logo" className="w-[200px] object-contain"></img>
        </Link>
        <small className="text-white text-sm italic ">Admin Workspace</small>
      </div>
      <div className="mt-4">
        {adminSidebar.map((el) => (
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
      </div>
    </div>
  );
};

export default memo(AdminSidebar);
