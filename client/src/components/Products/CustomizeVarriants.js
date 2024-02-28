import { apiAddVarriant } from "apis";
import Button from "components/Buttons/Button";
import Loading from "components/Common/Loading";
import InputForm from "components/Inputs/InputForm";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import { getBase64 } from "ultils/helpers";
import { HashLoader } from "react-spinners";

const CustomizeVarriants = ({
  cumtomizeVarriant,
  setCumtomizeVarriant,
  render,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [preview, setPreview] = useState({
    thumb: "",
    images: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    reset({
      title: cumtomizeVarriant?.title,
      color: cumtomizeVarriant?.color,
      price: cumtomizeVarriant?.price,
      size: cumtomizeVarriant?.size,
    });
  }, [cumtomizeVarriant]);
  const handlAddVarriant = async (data) => {
    if (
      data.color === cumtomizeVarriant.color ||
      data.size === cumtomizeVarriant.size
    )
      Swal.fire("Oop!", "Color and size not chaned", "info");
    else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumb) formData.append("thumb", data.thumb[0]);
      //////
      if (data.images) {
        for (let image of data.images) formData.append("images", image);
      }
      if (data.size) {
        // finalPayload.size = finalPayload.size.split(",").map((s) => s.trim());
        const sizeArray = data.size.split(",");
        for (let size of sizeArray) {
          formData.append("size", size);
        }
      }
      // dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      setIsLoading(true);
      const response = await apiAddVarriant(formData, cumtomizeVarriant._id);
      // dispatch(showModal({ isShowModal: false, modalChildren: null }));
      setIsLoading(false);

      if (response.success) {
        toast.success(response.mes);
        reset();
        setPreview({ thumb: "", images: [] });
      } else toast.error(response.mes);
    }
  };
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };
  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("File not support");
        // Swal.fire("File not support", "errors");
      }
      const base64 = await getBase64(file);
      imagesPreview.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };
  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0) {
      handlePreviewThumb(watch("thumb")[0]);
    }
  }, [watch("thumb")]);
  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0) {
      handlePreviewImages(watch("images"));
    }
  }, [watch("images")]);
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[75px] w-full"></div>
      <div className="p-4 border-b-2 border-main fixed bg-gray-100 flex justify-between items-center top-0 right-0 left-[257px]">
        <h1 className=" text-main text-3xl font-bold  ">Customize Varriants</h1>
        <span
          className="text-red-600 hover:underline cursor-pointer"
          onClick={() => setCumtomizeVarriant(null)}
        >
          Back
        </span>
      </div>
      <form
        onSubmit={handleSubmit(handlAddVarriant)}
        className="p-4 w-full flex flex-col gap-4"
      >
        <div className="flex gap-4 items-center w-full">
          <InputForm
            label="Original Name"
            register={register}
            errors={errors}
            id="title"
            style="flex-auto"
            fullWidth
            validate={{
              required: "Need fill this field",
            }}
            placeholder="Title of varriant"
          />
        </div>
        <div className="flex gap-4 items-center w-full">
          <InputForm
            label="Price varriant"
            register={register}
            errors={errors}
            id="price"
            validate={{
              required: "Need fill this field",
            }}
            fullWidth
            placeholder="Price of new varriant"
            type="number"
            style="flex-auto"
          />
          <InputForm
            label="Color varriant"
            register={register}
            errors={errors}
            id="color"
            validate={{
              required: "Need fill this field",
            }}
            fullWidth
            placeholder="Color of new varriant"
            style="flex-auto"
          />
          <InputForm
            label="Size varriant"
            register={register}
            errors={errors}
            id="size"
            validate={{
              required: "Need fill this field",
            }}
            fullWidth
            placeholder="Size of new varriant"
            style="flex-auto"
          />
        </div>

        <div className="flex flex-col gap-2 mt-8">
          <label className="font-semibold" htmlFor="thumb">
            Upload image thumb
          </label>
          <input
            type="file"
            id="thumb"
            {...register("thumb", { required: "Need fill" })}
          />
          {errors["thumb"] && (
            <small className="text-xs text-red-600">
              {errors["thumb"]?.message}
            </small>
          )}
        </div>
        {preview.thumb && (
          <div className="my-4">
            <img
              className="w-[200px] object-contain"
              src={preview.thumb}
              alt="thumb"
            ></img>
          </div>
        )}
        <div className="flex flex-col gap-2 mt-8">
          <label className="font-semibold" htmlFor="products">
            Upload images of product
          </label>
          <input
            type="file"
            id="products"
            multiple
            {...register("images", { required: "Need fill" })}
          />
          {errors["images"] && (
            <small className="text-xs text-red-600">
              {errors["images"]?.message}
            </small>
          )}
        </div>
        {preview.images.length > 0 && (
          <div className="my-4  flex gap-3 w-full flex-wrap">
            {preview.images?.map((el, index) => (
              <div key={index} className="w-fit relative">
                <img
                  className="w-[200px] object-contain"
                  src={el}
                  alt="product"
                ></img>
              </div>
            ))}
          </div>
        )}
        <div className="my-6">
          {!isLoading ? (
            <Button type="submit">Add Varriants Product</Button>
          ) : (
            // <div className="w-7 h-7 border-4 border-gray-300 rounded-full border-t-transparent animate-spin"></div>
            <HashLoader className=" z-500" color="#005f90"></HashLoader>
          )}
        </div>
      </form>
    </div>
  );
};

export default memo(CustomizeVarriants);
