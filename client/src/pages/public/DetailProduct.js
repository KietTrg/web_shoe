import React, { useCallback, useEffect, useRef, useState } from "react";
import { createSearchParams, useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts, apiUpdateCart } from "apis";
import {
  Breadcrumb,
  Button,
  SelectQuantity,
  ProductExtraInfoItem,
  ProductInfomation,
  CustomSlider,
} from "components";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";
import { formatMoney, formatPrice, renderStarFromNumber } from "ultils/helpers";
import { ProductExtraInfomation } from "ultils/contants";
import DOMPurify from "dompurify";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { getCurrent } from "store/user/asyncActions";
import withBase from "hocs/withBase";
import { toast } from "react-toastify";
import path from "ultils/path";
import Swal from "sweetalert2";

const settings = {
  dots: false, //dau cham
  infinite: false,
  speed: 500,
  slidesToShow: 3, //trong 1 lan show
  slidesToScroll: 1,
};
const DetailProduct = ({ isQuickView, data, location, dispatch, navigate }) => {
  const titleRef = useRef();
  const params = useParams();
  const { current } = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [update, setUpdate] = useState(false);
  const [varriant, setVarriant] = useState(null);
  // console.log("varriant: ", varriant);
  const [skuSize, setSkuSize] = useState(null);
  const [pid, setPid] = useState(null);
  const [category, setCategory] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    thumb: "",
    images: [],
    size: "",
    price: "",
    color: "",
  });
  useEffect(() => {
    if (data) {
      setPid(data.pid);
      setCategory(data.category);
    } else if (params && params.pid) {
      setPid(params.pid);
      setCategory(params.category);
    }
  }, [data, params]);
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
      setCurrentImage(response.productData?.thumb);
    }
    console.log(response.productData);
  };
  useEffect(() => {
    if (varriant) {
      setCurrentProduct({
        title: product?.varriants?.find((el) => el.sku === varriant)?.title,
        color: product?.varriants?.find((el) => el.sku === varriant)?.color,
        images: product?.varriants?.find((el) => el.sku === varriant)?.images,
        price: product?.varriants?.find((el) => el.sku === varriant)?.price,
        size: product?.varriants?.find((el) => el.sku === varriant)?.size,
        thumb: product?.varriants?.find((el) => el.sku === varriant)?.thumb,
      });
    } else {
      setCurrentProduct({
        title: product?.title,
        color: product?.color,
        images: product?.images || [],
        price: product?.price,
        size: product?.size,
        thumb: product?.thumb,
      });
    }
  }, [varriant, product]);
  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response.success) setRelatedProducts(response.productDatas);
  };
  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
    titleRef?.current?.scrollIntoView({ block: "start" });
    window.scrollTo(0, 0);
  }, [pid]);
  useEffect(() => {
    if (pid) fetchProductData();
  }, [update]);
  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else setQuantity(number);
    },
    [quantity]
  );

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "plus" && quantity === product?.quantity) {
        Swal.fire("Not enough products", "", "info");
        return;
      }

      if (flag === "minus") setQuantity((prev) => +prev - 1);
      if (flag === "plus") setQuantity((prev) => +prev + 1);
    },
    [quantity]
  );
  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };

  // const handleClickSize = (e, el) => {
  //   // e.stopPropagation();
  //   setCurrentSize(el);
  // };
  // console.log("el: ", currentSize);
  const handleAddToCart = async () => {
    if (!current)
      return Swal.fire({
        title: "Almost...",
        text: "Please login first",
        icon: "info",
        confirmButtonText: "Go login page",
        cancelButtonText: "Not now!",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed)
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: location.pathname,
            }).toString(),
          });
      });
    const response = await apiUpdateCart({
      pid: pid,
      color: currentProduct?.color || product?.color,
      size: currentSize,
      quantity: quantity,
      price: currentProduct?.price || product?.price,
      thumbnail: currentProduct?.thumb || product?.thumb,
      title: currentProduct?.title || product?.title,
    });
    if (response.success) {
      toast.success(response.mes);

      dispatch(getCurrent());
    } else toast.error(response.mes);
  };

  return (
    <div className={clsx("w-full")}>
      {!isQuickView && (
        <div className="h-[81px] flex justify-center items-center bg-gray-100">
          <div className="w-main">
            <h3 ref={titleRef} className="font-semibold mb-2">
              {product?.title}
            </h3>
            <Breadcrumb title={product?.title} category={category}></Breadcrumb>
          </div>
        </div>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          " bg-white m-auto mt-4 flex",
          isQuickView
            ? "max-w-full gap-16 p-8 max-h-[80vh] overflow-y-auto"
            : "w-main"
        )}
      >
        <div
          className={clsx(" flex flex-col gap-4 w-2/5", isQuickView && "w-1/2")}
        >
          <div className="h-[458px] w-[458px] border flex items-center object-cover">
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "Wristwatch by Ted Baker London",
                  isFluidWidth: true,
                  // src: product?.thumb,
                  src: currentImage || currentProduct?.thumb,
                },
                largeImage: {
                  // src: product?.thumb,
                  src: currentImage || currentProduct?.thumb,
                  width: 1800,
                  height: 1500,
                },
              }}
            />
          </div>
          <div className="w-[458px]">
            <Slider
              {...settings}
              className="img-slider justify-center flex gap-2"
            >
              {currentProduct.images.length === 0 &&
                product?.images?.map((el) => (
                  <div key={el} className="flex-1 ">
                    <img
                      onClick={(e) => handleClickImage(e, el)}
                      src={el}
                      alt="sub-product"
                      className="h-[143px] w-[143px] cursor-pointer border object-cover"
                    ></img>
                  </div>
                ))}
              {currentProduct.images.length > 0 &&
                currentProduct?.images?.map((el) => (
                  <div key={el} className="flex-1 ">
                    <img
                      onClick={(e) => handleClickImage(e, el)}
                      src={el}
                      alt="sub-product"
                      className="h-[143px] w-[143px] cursor-pointer border object-cover"
                    ></img>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        <div
          className={clsx(
            "w-2/5 flex flex-col gap-4 pr-[24px]  ",
            isQuickView && "w-1/2"
          )}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-[30px]">{`${formatMoney(
              formatPrice(currentProduct.price || product?.price)
            )} VND`}</h2>
            <span className="text-sm text-main">{`Kho: ${product?.quantity}`}</span>
          </div>
          <div className="flex items-center gap-1">
            {renderStarFromNumber(product?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            <span className="text-sm text-main italic">{`(Đã bán: ${product?.sold} sản phẩm)`}</span>
          </div>
          <ul className="text-sm text-gray-400 list-square pl-5">
            {product?.description?.length > 1 &&
              product?.description?.map((el, index) => (
                <li className=" leading-7" key={index}>
                  {el}
                </li>
              ))}
            {product?.description?.length === 1 && (
              <div
                className="text-sm line-clamp-[10] mb-8 "
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description[0]),
                }}
              ></div>
            )}
          </ul>
          <div className="my-4 flex  gap-4">
            <span className="font-bold">Color:</span>
            <div className="flex flex-wrap gap-4 items-center w-full">
              <div
                onClick={() => {
                  setVarriant(null);
                  setSkuSize(null);
                }}
                className={clsx(
                  "flex items-center gap-2 p-2  rounded-lg cursor-pointer",
                  !varriant && "bg-[#bde0fe] shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                )}
              >
                <span className="flex flex-col gap-2 items-center">
                  <span>
                    {product?.color.charAt(0).toUpperCase()}
                    {product?.color.slice(1)}
                  </span>

                  <div
                    style={{ backgroundColor: product?.color.toLowerCase() }}
                    className={clsx(`w-10 h-2 rounded-lg`)}
                  ></div>
                </span>
              </div>
              {product?.varriants?.map((el) => (
                <div
                  key={el.sku}
                  onClick={() => {
                    setVarriant(el.sku);
                    setSkuSize(el.sku);
                  }}
                  className={clsx(
                    "flex items-center gap-2 p-2  rounded-lg cursor-pointer",
                    varriant === el.sku &&
                      "bg-[#bde0fe] shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                  )}
                >
                  <span className="flex flex-col gap-2 items-center">
                    <span>
                      {el?.color.charAt(0).toUpperCase()}
                      {el?.color.slice(1)}
                    </span>

                    <div
                      style={{ backgroundColor: el?.color.toLowerCase() }}
                      className={clsx(`w-10 h-2 rounded-lg`)}
                    ></div>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="my-4 flex  gap-4">
            <span className="font-bold">Size:</span>
            <div className="flex flex-wrap gap-4 items-center w-full">
              {skuSize === null &&
                product?.size?.map((el) => (
                  <div
                    onClick={() => {
                      setVarriant(null);
                      setCurrentSize(el);
                    }}
                    className={clsx(
                      "flex items-center gap-2 p-2 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] cursor-pointer",
                      currentSize === el && "bg-[#bde0fe] "
                    )}
                  >
                    <span className="flex flex-col">
                      <span>{el}</span>
                    </span>
                  </div>
                ))}
              {product?.varriants?.map((el) => (
                <div className="flex items-center gap-2">
                  {skuSize === el.sku &&
                    el?.size?.map((e) => (
                      <div
                        className={clsx(
                          "flex items-center gap-2 p-2 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] cursor-pointer",
                          e === currentSize && "bg-main "
                        )}
                        onClick={() => {
                          setVarriant(el.sku);
                          setCurrentSize(e);
                        }}
                      >
                        <span className="flex flex-col">
                          <span>{e}</span>
                        </span>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8 ">
            <div className="flex items-center gap-4">
              <span className=" font-semibold">Số lượng</span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              ></SelectQuantity>
            </div>
            <Button handleOnClick={handleAddToCart} fw>
              Add to cart
            </Button>
          </div>
        </div>
        {!isQuickView && (
          <div className="w-1/5 ">
            {ProductExtraInfomation.map((el) => (
              <ProductExtraInfoItem
                key={el.id}
                title={el.title}
                sub={el.sub}
                icon={el.icon}
              />
            ))}
          </div>
        )}
      </div>
      {!isQuickView && (
        <div className="w-main m-auto mt-8">
          <ProductInfomation
            totalRatings={product?.totalRatings}
            ratings={product?.ratings}
            nameProduct={product?.title}
            pid={product?._id}
            rerender={rerender}
          />
        </div>
      )}
      {!isQuickView && (
        <div className="w-main m-auto mt-8">
          <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
            OTHER CUSTOMERS ALSO BUY:
          </h3>
          <div className="  mt-4 mx-[-10px] ">
            <CustomSlider normal={true} products={relatedProducts} />
          </div>
        </div>
      )}
      {/* <div className="h-[500px] w-full"></div> */}
    </div>
  );
};

export default withBase(DetailProduct);
