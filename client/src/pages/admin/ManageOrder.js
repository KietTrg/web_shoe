import { apiGetOrders, apiGetUsers } from "apis";
import clsx from "clsx";
import { CustomSelect, Pagination } from "components";
import OrderItem from "components/Products/OrderItem";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { formatMoney } from "ultils/helpers";
import { statusOders } from "ultils/contants";
import withBase from "hocs/withBase";
import { useForm } from "react-hook-form";

const ManageOrder = ({ location, navigate }) => {
  const [orders, setOrders] = useState(null);
  const [users, setUsers] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams();

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const status = watch("status");

  const fectOrder = async (params) => {
    const response = await apiGetOrders({
      ...params,
      limit: +process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setOrders(response.order);
      setCounts(response.counts);
    }
  };
  const fectUser = async () => {
    const response = await apiGetUsers();
    if (response.success) setUsers(response.users);
  };
  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fectUser();
    fectOrder(pr);
  }, [params]);

  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };

  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold p-4 border-b-2 border-main">
        <div className="flex items-center text-main justify-center gap-4 ">
          <span>ManageOrder </span>
        </div>
      </h1>
      <div className="flex justify-end items-center px-4 ">
        <form className="w-[30%] my-4 gap-4-">
          <div>
            <CustomSelect
              options={statusOders}
              value={status}
              onChange={(val) => handleSearchStatus(val)}
              wrapClassname="w-full"
            />
          </div>
        </form>
      </div>
      <table className="table-auto w-full ">
        <thead>
          <tr className="bg-[#9AD0EC] text-black  ">
            <th className="text-center py-2 rounded-l-lg">#</th>
            <th className="text-center py-2">User</th>
            <th className="text-center py-2">Product</th>
            <th className="text-center py-2">Total</th>
            <th className="text-center py-2">Status</th>
            <th className="text-center py-2 rounded-r-lg ">created dAt</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((el, index) => (
            <tr className="border-b border-main " key={el._id}>
              <td className="text-center p-2">
                {+params.get("page") - 1 > 1
                  ? +params.get("page") - 1
                  : 0 * process.env.REACT_APP_LIMIT + index + 1}
              </td>
              <td className="pl-8 py-2 max-w-[250px]">
                {users?.map(
                  (e) =>
                    e._id === el.orderBy && (
                      <div className="flex flex-col gap-2">
                        <span className=" font-medium">
                          Full name: {`${e.lastname} ${e.firstname}`}
                        </span>
                        <span className="text-sm italic">Email: {e.email}</span>
                        <span className="text-sm italic">
                          Address: {e.address}
                        </span>
                      </div>
                    )
                )}
              </td>
              <td className="max-w-[150px] py-2">
                <span className="grid grid-cols-1 gap-3">
                  {el.products?.map((el) => (
                    <span
                      className="flex flex-col items-star gap-2"
                      key={el._id}
                    >
                      <span className="text-sm">• {el.title}</span>
                    </span>
                  ))}
                </span>
              </td>
              <td className="text-center py-2">
                {formatMoney(el.total * 23500) + " VND"}
              </td>
              <td
                className={clsx(
                  "text-center py-2",
                  el.status === "Successed" ? "text-green-600" : "text-red-600"
                )}
              >
                {el.status}
              </td>
              <td className="text-center py-2">
                {moment(el.createdAt).format("DD/MM/YYYY")}
              </td>
              {/*                
                <td className="text-center py-2">
                  {moment(el.updatedAt).format("DD/MM/YYYY")}
                </td> */}
              <td>
                {/* <div className="flex items-center justify-center">
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
                  </div> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end my-8 px-4">
        <Pagination totalCount={counts}></Pagination>
      </div>
    </div>
  );
};

export default withBase(ManageOrder);
