import React, { memo } from "react";
import Slider from "react-slick";
import { Product } from "..";
const settings = {
  dots: false, //dau cham
  infinite: false,
  speed: 500,
  slidesToShow: 3, //trong 1 lan show
  slidesToScroll: 1,
};
const CustomSlider = ({ products, activedTab, normal }) => {
  return (
    <>
      {products && (
        <Slider {...settings} className="custom-slider">
          {products?.map((el, index) => (
            <Product
              key={index}
              pid={el._id}
              productDatas={el}
              isNew={activedTab === 1 ? false : true}
              normal={normal}
            ></Product>
          ))}
        </Slider>
      )}
    </>
  );
};

export default memo(CustomSlider);
