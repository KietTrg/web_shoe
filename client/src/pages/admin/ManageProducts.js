import React, { useCallback, useEffect, useState } from "react";
import { CustomizeVarriants, InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import { apiGetProducts, apiDeleteProduct } from "apis/product";
import moment from "moment";
import UpdateProduct from "pages/admin/UpdateProduct";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useDebounce from "hooks/useDebounce";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { BiCustomize } from "react-icons/bi";

const ManageProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const [products, setProducts] = useState(null);
  const [counts, setCounts] = useState(0);
  const [editProduct, seteditProduct] = useState(null);
  const [update, setUpdate] = useState(false);
  const [cumtomizeVarriant, setCumtomizeVarriant] = useState(null);
  const render = useCallback(() => {
    setUpdate(!update);
  });
  // const handleSearchProducts = (data) => {
  //   console.log(data);
  // };
  const fetchProducts = async (params) => {
    const response = await apiGetProducts({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setCounts(response.counts);

      setProducts(response.productDatas);
    }
  };
  const queryDebounce = useDebounce(watch("q"), 800);
  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDebounce }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
  }, [queryDebounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchProducts(searchParams);
  }, [params, update]);
  const handleDeleteProduct = (pid) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "Are you ready remove this product?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteProduct(pid);
        if (response.success) {
          render();
          toast.success(response.mes);
        } else toast.error(response.mes);
      }
    });
  };
  return (
    <div className="w-full flex flex-col gap-4 relative">
      {editProduct && (
        <div className=" absolute inset-0 min-h-screen bg-gray-100 z-50">
          <UpdateProduct
            editProduct={editProduct}
            render={render}
            seteditProduct={seteditProduct}
          ></UpdateProduct>
        </div>
      )}
      {cumtomizeVarriant && (
        <div className=" absolute inset-0 min-h-screen bg-gray-100 z-50">
          <CustomizeVarriants
            cumtomizeVarriant={cumtomizeVarriant}
            render={render}
            setCumtomizeVarriant={setCumtomizeVarriant}
          ></CustomizeVarriants>
        </div>
      )}
      <div className="h-[75px] w-full"></div>
      <div className="w-full fixed bg-gray-100">
        <h1 className="  flex justify-between items-center text-3xl font-bold p-4 border-b-2 border-main">
          <div className="flex items-center text-main justify-center gap-4 ">
            <span>Manage Products </span>
          </div>
        </h1>
      </div>
      <div className="flex justify-end items-center px-4 ">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder="Search products by title..."
          />
        </form>
      </div>
      <div className="w-full px-4 ">
        <table className="table-auto w-full ">
          <thead>
            <tr className="bg-blue-100 text-black  ">
              <th className="text-center py-2 rounded-l-lg">Order</th>
              <th className="text-center py-2">Thumb</th>
              <th className="text-center py-2">Title</th>
              <th className="text-center py-2">Brand</th>
              <th className="text-center py-2">Category</th>
              <th className="text-center py-2">Price</th>
              <th className="text-center py-2">Quantity</th>
              <th className="text-center py-2">Sold</th>
              <th className="text-center py-2">Color</th>
              <th className="text-center py-2">Size</th>
              <th className="text-center py-2">Ratings</th>
              <th className="text-center py-2">Varriants</th>
              <th className="text-center py-2 ">updatedAt</th>
              <th className="text-center py-2 rounded-r-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((el, index) => (
              <tr className="border-b border-main " key={el._id}>
                <td className="text-center py-2">
                  {+params.get("page") - 1 > 1
                    ? +params.get("page") - 1
                    : 0 * process.env.REACT_APP_LIMIT + index + 1}
                </td>
                <td className=" text-center py-2">
                  <img
                    src={el.thumb}
                    alt="thumb"
                    className="w-12 h-12 object-cover"
                  ></img>
                </td>
                <td className="text-center py-2">{el.title}</td>
                <td className="text-center py-2">{el.brand}</td>
                <td className="text-center py-2">{el.category}</td>
                <td className="text-center py-2">{el.price}</td>
                <td className="text-center py-2">{el.quantity}</td>
                <td className="text-center py-2">{el.sold}</td>
                <td className="text-center py-2">{el.color}</td>
                <td className="text-center py-2"> {el.size} </td>
                <td className="text-center py-2">{el.totalRatings}</td>
                <td className="text-center py-2">
                  {el.varriants?.length || 0}
                </td>
                <td className="text-center py-2">
                  {moment(el.updatedAt).format("DD/MM/YYYY")}
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <span
                      onClick={() => seteditProduct(el)}
                      className="text-main hover:text-orange-600 cursor-pointer px-1 "
                    >
                      <TbEdit size={20}></TbEdit>
                    </span>
                    <span
                      onClick={() => handleDeleteProduct(el._id)}
                      className="text-main hover:text-orange-600 cursor-pointer px-1"
                    >
                      <RiDeleteBin2Fill size={20}></RiDeleteBin2Fill>
                    </span>
                    <span
                      onClick={() => setCumtomizeVarriant(el)}
                      className="text-main hover:text-orange-600 cursor-pointer px-1"
                    >
                      <BiCustomize size={20}></BiCustomize>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end my-8 px-4">
        <Pagination totalCount={counts}></Pagination>
      </div>
    </div>
  );
};

export default ManageProducts;
