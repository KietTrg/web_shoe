import { apiCreateCategory, apiUpdateCategory } from "apis";
import { Button, InputForm } from "components";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getCategories } from "store/app/asyncActions";
import { getBase64 } from "ultils/helpers";

const UpdateCategorys = ({ editProduct, render, seteditProduct }) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();
  const [payload, setPayload] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [preview, setPreview] = useState({
    image: null,
  });
  useEffect(() => {
    reset({
      title: editProduct?.title || "",
      brand: editProduct?.brand || "",
    });
    setPreview({
      image: editProduct?.image || "",
    });
  }, [editProduct]);
  const handlePreviewImage = async (file) => {
    const base64Image = await getBase64(file);
    setPreview((prev) => ({ ...prev, image: base64Image }));
  };
  useEffect(() => {
    if (watch("image") instanceof FileList && watch("image").length > 0) {
      handlePreviewImage(watch("image")[0]);
    }
  }, [watch("image")]);

  const handleUpdateCategory = async (data) => {
    const finalPayload = { ...data, ...payload };

    const formData = new FormData();
    for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
    if (finalPayload.image)
      formData.append(
        "image",
        finalPayload?.image?.length === 0
          ? preview.image
          : finalPayload.image[0]
      );
    if (finalPayload.brand) {
      // finalPayload.brand = finalPayload.brand.split(",").map((s) => s.trim());
      const brandArray = finalPayload?.brand?.split(",");
      for (let brand of brandArray) {
        formData.append("brand", brand);
      }
    }
    setIsLoading(true);
    const response = await apiUpdateCategory(formData, editProduct._id);
    setIsLoading(false);
    if (response?.success) {
      toast.success(response?.mes);
      render();
      seteditProduct(null);
    } else toast.error(response?.mes);
  };
  return (
    <div className="w-full  flex flex-col gap-4 relative">
      <div className="h-[75px] w-full"></div>

      <div className="p-4 border-b-2 border-main fixed bg-gray-100 flex justify-between items-center top-0 right-0 left-[257px]">
        <h1 className=" text-main text-3xl font-bold  ">Update Category</h1>
        <span
          className="text-red-600 hover:underline cursor-pointer"
          onClick={() => seteditProduct(null)}
        >
          Cancel
        </span>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateCategory)}>
          <InputForm
            label="Name category"
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: "Need fill this field",
            }}
            style="flex-1"
            placeholder="Name of new category"
          />
          <InputForm
            label="Name brand"
            register={register}
            errors={errors}
            id="brand"
            validate={{
              required: "Need fill this field",
            }}
            style="flex-1"
            placeholder="Name of new brand"
          />
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="image">
              Upload image image
            </label>
            <input
              type="file"
              id="image"
              {...register("image", { required: "Need fill" })}
            />
            {errors["image"] && (
              <small className="text-xs text-red-600">
                {errors["image"]?.message}
              </small>
            )}
          </div>
          {preview.image && (
            <div className="my-4">
              <img
                className="w-[200px] object-contain"
                src={preview.image}
                alt="image"
              ></img>
            </div>
          )}
          <div className="my-6">
            {!isLoading ? (
              <Button type="submit">Update Category</Button>
            ) : (
              // <div className="w-7 h-7 border-4 border-gray-300 rounded-full border-t-transparent animate-spin"></div>
              <HashLoader className=" z-500" color="#005f90"></HashLoader>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategorys;
