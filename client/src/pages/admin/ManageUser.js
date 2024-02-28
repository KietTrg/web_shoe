import React, { useEffect, useState, useCallback } from "react";
import { apiGetUsers, apiUpdateUser, apiDeleteUser } from "apis/user";
import { roles, blockStatus } from "ultils/contants";
import moment from "moment";
import { MdGroups2 } from "react-icons/md";
import Masonry from "react-masonry-css";
import { InputField, Pagination, InputForm, Select, Button } from "components";
import useDebounce from "hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const breakpointColumnsObj = {
  default: 3,
  1300: 2,
  1100: 1,
  500: 1,
};
const ManageUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    mobile: "",
    isBlocked: "",
  });
  const [users, setUsers] = useState(null);
  const [queries, setQueries] = useState({
    q: "",
  });
  const [update, setUpdate] = useState(false);
  const [editElm, setEditElm] = useState(null);
  const [params] = useSearchParams();
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: +process.env.REACT_APP_LIMIT,
    });
    if (response.success) setUsers(response);
  };
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const queriesDebounce = useDebounce(queries.q, 800);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fetchUsers(queries);
  }, [queriesDebounce, params, update]);

  // console.log(editElm);
  const handleUpdate = async (data) => {
    // console.log(data);
    const response = await apiUpdateUser(data, editElm._id);
    if (response.success) {
      setEditElm(null);
      render();
      toast.success(response.mes);
    } else toast.error(response.mes);
  };
  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "Are you ready remove this user?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(uid);
        if (response.success) {
          render();
          toast.success(response.mes);
        } else toast.error(response.mes);
      }
    });
  };
  useEffect(() => {
    if (editElm)
      reset({
        email: editElm.email,
        firstname: editElm.firstname,
        lastname: editElm.lastname,
        role: editElm.role,
        isBlocked: editElm.isBlocked,
        mobile: editElm.mobile,
      });
  }, [editElm]);
  return (
    <div className="w-full ">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold p-4 border-b-2 border-main">
        <div className="flex items-center text-main justify-center gap-4 ">
          <span>Manage User </span>
          <MdGroups2 size={35}></MdGroups2>
        </div>
      </h1>
      {/* <div className="w-full p-4 ">
        <table className=" table-auto mb-6 text-left shadow-xl rounded-xl w-full">
          <thead className=" font-bold bg-gray-500 text-[13px]  text-white shadow-xl rounded-xl">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Fullname</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.map((el, index) => (
              <tr key={el._id} className=" shadow-md">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{`${el.lastname} ${el.firstname}`}</td>
                <td className="py-2 px-4">{el.email}</td>
                <td className="py-2 px-4">
                  {roles.find((role) => +role.code === +el.role)?.value}
                </td>
                <td className="py-2 px-4">{el.mobile}</td>

                <td className="py-2 px-4">
                  {el.isBlocked ? "Blocke" : "Active"}
                </td>
                <td className="py-2 px-4">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="py-2 px-4 flex gap-4">
                  <span className="px-2 text-main hover:underline cursor-pointer">
                    Edit
                  </span>
                  <span className="px-2 text-main hover:underline cursor-pointer">
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="w-full p-4 ">
        <div className="flex justify-between items-center py-2">
          <div className="font-semibold text-main text-lg flex  items-center gap-2">
            <h2>Total User: </h2>
            <span>{`${users?.counts} users`}</span>
          </div>
          <InputField
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            style="w500  border-none rounded-lg bg-blue-100"
            placeholder="Search name or mail user"
            isHideLabel
          ></InputField>
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {editElm && <Button type="submit">Update</Button>}
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid flex "
            columnClassName="my-masonry-grid_column"
          >
            {users?.users?.map((el, index) => (
              <div
                key={el._id}
                className={clsx(
                  "w-[390px]  bg-gray-100 p-2 rounded-xl shadow-lg flex flex-col gap-1",
                  editElm?._id === el._id ? "h-[600px]" : "h-[310px]"
                )}
              >
                <div className="text-main flex items-center gap-2 font-semibold text-2xl border-b-2 border-main">
                  <span>{index + 1} -</span>
                  <h2>{`${el.lastname} ${el.firstname}`}</h2>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">First Name:</span>
                  <span>
                    {editElm?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={editElm?.firstname}
                        id={"firstname"}
                        validate={{ required: "Require fill" }}
                      />
                    ) : (
                      <span>{el.firstname}</span>
                    )}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Last Name:</span>
                  <span>
                    {editElm?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={editElm?.lastname}
                        id={"lastname"}
                        validate={{ required: "Require fill" }}
                      />
                    ) : (
                      <span>{el.lastname}</span>
                    )}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Email:</span>
                  <span>
                    {editElm?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={editElm?.email}
                        id={"email"}
                        validate={{
                          required: "Require fill",

                          pattern: {
                            value:
                              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "invali email address",
                          },
                        }}
                      />
                    ) : (
                      <span>{el.email}</span>
                    )}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Role:</span>
                  <span>
                    {editElm?._id === el._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={+el.role}
                        id={"role"}
                        validate={{ required: "Require fill" }}
                        options={roles}
                      />
                    ) : (
                      <span>
                        {roles.find((role) => +role.code === +el.role)?.value}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Phone:</span>
                  <span>
                    {editElm?._id === el._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={editElm?.mobile}
                        id={"mobile"}
                        validate={{
                          required: "Require fill",

                          pattern: {
                            value: /^[62||0]+\d{9}/gi,
                            message: "Invalid phone number",
                          },
                        }}
                      />
                    ) : (
                      <span>{el.mobile}</span>
                    )}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Status:</span>
                  <span>
                    {editElm?._id === el._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={el.isBlocked}
                        id={"isBlocked"}
                        validate={{ required: "Require fill" }}
                        options={blockStatus}
                      />
                    ) : (
                      <span>{el.isBlocked ? "Blocked" : "Active"}</span>
                    )}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold">Created At:</span>
                  <span>{moment(el.createdAt).format("DD/MM/YYYY")}</span>
                </div>
                <div className="flex justify-between items-center">
                  {editElm?._id === el._id ? (
                    <span
                      className=" text-main hover:underline cursor-pointer"
                      onClick={() => setEditElm(null)}
                    >
                      Back
                    </span>
                  ) : (
                    <span
                      className=" text-main hover:underline cursor-pointer"
                      onClick={() => setEditElm(el)}
                    >
                      Edit
                    </span>
                  )}
                  <span
                    className=" text-main hover:underline cursor-pointer"
                    onClick={() => handleDeleteUser(el._id)}
                  >
                    Delete
                  </span>
                </div>
              </div>
            ))}
          </Masonry>
        </form>
        <div className="w-full text-right">
          <Pagination totalCount={users?.counts}></Pagination>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
