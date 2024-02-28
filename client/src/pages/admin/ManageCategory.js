import { apiDeleteCategory, apiGetCategories } from "apis";
import { InputForm, Pagination } from "components";
import withBase from "hocs/withBase";
import useDebounce from "hooks/useDebounce";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiCustomize } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateProduct from "./UpdateProduct";
import UpdateCategorys from "./UpdateCategory";
import { UpdateCategory } from ".";

const ManageCategory = ({ navigate, location }) => {
  const [params] = useSearchParams();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const [categorys, setCategorys] = useState(null);
  const [update, setUpdate] = useState(false);
  const [counts, setCounts] = useState(0);
  const [editProduct, seteditProduct] = useState(null);

  const render = useCallback(() => {
    setUpdate(!update);
  });
  const fetchCategory = async (params) => {
    const response = await apiGetCategories({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    // console.log("response: ", response);
    if (response.success) {
      setCounts(response.counts);

      setCategorys(response.productCategories);
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

    fetchCategory(searchParams);
  }, [params, update]);
  const handleDeleteCategory = (pid) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "Are you ready remove this product?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteCategory(pid);
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
          <UpdateCategory
            editProduct={editProduct}
            render={render}
            seteditProduct={seteditProduct}
          />
        </div>
      )}
      <div className="h-[75px] w-full"></div>
      <div className="w-full fixed bg-gray-100">
        <h1 className="  flex justify-between items-center text-3xl font-bold p-4 border-b-2 border-main">
          <div className="flex items-center text-main justify-center gap-4 ">
            <span>Manage Categorys </span>
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
              <th className="text-center py-2 rounded-l-lg">#</th>
              <th className="text-center py-2">Image</th>
              <th className="text-center py-2">Title</th>
              <th className="text-center py-2">Brand</th>

              <th className="text-center py-2 ">createAt</th>
              <th className="text-center py-2 rounded-r-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {categorys?.map((el, index) => (
              <tr key={el._id}>
                <td className="text-center py-2">{index + 1}</td>
                <td className=" text-center flex justify-center py-2">
                  <img
                    src={el.image}
                    alt="image"
                    className=" w-14 h-14 object-cover rounded-md "
                  ></img>
                </td>
                <td className="text-center py-2">{el.title}</td>
                <td className="text-center py-2">{el.brand.length}</td>
                <td className="text-center py-2">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
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
                      onClick={() => handleDeleteCategory(el._id)}
                      className="text-main hover:text-orange-600 cursor-pointer px-1"
                    >
                      <RiDeleteBin2Fill size={20}></RiDeleteBin2Fill>
                    </span>
                    {/* <span
                      //   onClick={() => setCumtomizeVarriant(el)}
                      className="text-main hover:text-orange-600 cursor-pointer px-1"
                    >
                      <BiCustomize size={20}></BiCustomize>
                    </span> */}
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

export default withBase(ManageCategory);
