import React, { useEffect, useState, useCallback } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import {
  Breadcrumb,
  Product,
  SearchItem,
  InputSelect,
  Pagination,
} from "components";
import { apiGetProducts } from "apis";
import Masonry from "react-masonry-css";
import { sorts } from "ultils/contants";
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};
const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();
  const [sort, setSort] = useState("");
  const { category } = useParams();
  const fetchProductsByCategory = async (queries) => {
    if (category && category !== "products") queries.category = category;

    const response = await apiGetProducts(queries);
    if (response.success) setProducts(response);
    // console.log(response.productDatas);
    // console.log(response);
  };

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    let priceQuery = {};
    if (queries.from && queries.to) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    } else {
      if (queries.from) queries.price = { gte: queries.from };

      if (queries.to) queries.price = { lte: queries.to };
    }
    delete queries.to;
    delete queries.from;
    // const q = { ...priceQuery, ...queries };
    // console.log(q);
    fetchProductsByCategory({ ...priceQuery, ...queries });
    window.scrollTo(0, 0);
  }, [params]);
  const ChangeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    },
    [activeClick]
  );
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );
  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ sort }).toString(),
      });
    }
  }, [sort]);
  return (
    <div className="w-full">
      <div className="h-[81px] flex  justify-center items-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-semibold uppercase mb-2">{category}</h3>
          <Breadcrumb category={category}></Breadcrumb>
        </div>
      </div>
      <div className="w-main border p-4 flex   justify-between mt-8 m-auto">
        <div className="w-4/5 flex-auto flex-col flex gap-3">
          <span className="font-semibold text-sm">Filter by:</span>
          <div className="flex items-center gap-4">
            <SearchItem
              name="Price"
              activeClick={activeClick}
              ChangeActiveFilter={ChangeActiveFilter}
              type="input"
            ></SearchItem>
            <SearchItem
              name="Color"
              activeClick={activeClick}
              ChangeActiveFilter={ChangeActiveFilter}
            ></SearchItem>
          </div>
        </div>
        <div className="w-1/5 flex-col flex gap-3">
          <span className="font-semibold text-sm">Sort by:</span>
          <div className="w-full">
            <InputSelect
              changeValue={changeValue}
              value={sort}
              options={sorts}
            ></InputSelect>
          </div>
        </div>
      </div>
      <div className="mt-8 w-main m-auto ">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid cursor-pointer flex mx-[-10px]"
          columnClassName="my-masonry-grid_column"
        >
          {products?.productDatas?.map((el) => (
            <Product
              key={el._id}
              pid={el._id}
              productDatas={el}
              normal={true}
            ></Product>
          ))}
        </Masonry>
      </div>

      <div className=" w-main m-auto my-4 flex justify-end">
        <Pagination totalCount={products?.counts}></Pagination>
      </div>

      <div className="h-[500px]"></div>
    </div>
  );
};

export default Products;
