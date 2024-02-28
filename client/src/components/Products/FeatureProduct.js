import React, { memo, useEffect, useState } from "react";
import { ProductCard } from "..";
import { apiGetProducts } from "../../apis";
import banner1 from "assets/banner/banner1.png";
import banner2 from "assets/banner/banner2.png";
import banner3 from "assets/banner/banner3.png";

const FeatureProduct = () => {
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await apiGetProducts({ limit: 9, sort: "-totalRatings" });

    if (response.success) setProducts(response.productDatas);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div className=" w-full">
      <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
        FEATURED PRODUCTS
      </h3>
      <div className=" cursor-pointer flex flex-wrap mt-[15px] mx-[-10px]">
        {products?.map((el) => (
          <ProductCard key={el._id} pid={el._id} image={el.thumb} {...el} />
        ))}
      </div>
      <div className=" grid grid-cols-4 grid-rows-2 gap-6">
        <img
          src={banner1}
          alt="banner"
          className="w-full rounded-lg shadow-md cursor-pointer h-full object-cover col-span-2 row-span-2"
        ></img>
        <img
          src={banner2}
          alt="banner"
          className="w-full rounded-lg shadow-md cursor-pointer h-full object-cover col-span-1 row-span-1"
        ></img>
        <img
          src="https://i.pinimg.com/564x/22/47/cf/2247cf9863f74875de6f28d2f4273278.jpg"
          alt="banner"
          className="w-full rounded-lg shadow-md cursor-pointer h-full object-cover col-span-1 row-span-2"
        ></img>
        <img
          src={banner3}
          alt="banner"
          className="w-full rounded-lg shadow-md cursor-pointer h-full object-cover col-span-1 row-span-1"
        ></img>
      </div>
    </div>
  );
};

export default memo(FeatureProduct);
