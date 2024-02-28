import React, { memo, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "../../ultils/helpers";
import { useSelector } from "react-redux";
import { apiGetCategory } from "apis";
const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);
  const [category, setCategory] = useState(null);
  const fetchCategory = async () => {
    const response = await apiGetCategory();
    if (response.success) setCategory(response.productCategories);
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="flex flex-col rounded-xl border h-[360px]">
      {category?.map((el) => (
        <NavLink
          key={createSlug(el.title)}
          to={createSlug(el.title)}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
              : "px-5 pt-[15px] pb-[14px] text-sm hover:text-main "
          }
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Sidebar);
