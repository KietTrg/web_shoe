import { Button, InputForm, Loading, MarkdownEditor, Select } from "components";
import React, { useCallback, useEffect, useState, memo } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { validate, getBase64 } from "ultils/helpers";
import { toast } from "react-toastify";
import { apiUpdateProduct } from "apis";
import { showModal } from "store/app/appSlice";
import { HashLoader } from "react-spinners";
const UpdateProduct = ({ editProduct, render, seteditProduct }) => {
  const { categories } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [payload, setPayload] = useState({
    description: "",
  });
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    reset({
      title: editProduct?.title || "",
      price: editProduct?.price || "",
      quantity: editProduct?.quantity || "",
      color: editProduct?.color || "",
      size: editProduct?.size || "",
      category: editProduct?.category || "",
      brand: editProduct?.brand?.toLowerCase() || "",
    });
    setPayload({
      description:
        typeof editProduct?.description === "object"
          ? editProduct?.description?.join(",")
          : editProduct?.description,
    });
    setPreview({
      thumb: editProduct?.thumb || "",
      images: editProduct?.images || "",
    });
  }, [editProduct]);
  const [invalidFields, setInvalidFields] = useState([]);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );
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

  const handleUpdateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.category)
        data.category = categories?.find(
          (el) => el.title === data.category
        )?.title;
      const finalPayload = { ...data, ...payload };
      console.log(finalPayload);
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);

      if (finalPayload.thumb)
        formData.append(
          "thumb",
          finalPayload?.thumb?.length === 0
            ? preview.thumb
            : finalPayload.thumb[0]
        );
      if (finalPayload.images) {
        const images =
          finalPayload?.image?.length === 0
            ? preview.images
            : finalPayload.images;
        for (let image of images) formData.append("images", image);
      }
      if (finalPayload.size) {
        // finalPayload.size = finalPayload.size.split(",").map((s) => s.trim());
        const sizeArray = finalPayload.size.split(",");
        for (let size of sizeArray) {
          formData.append("size", size);

          console.log("size: ", size);
        }
        console.log("finalPayload.size: ", sizeArray);
      }
      setIsLoading(true);
      // dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiUpdateProduct(formData, editProduct._id);
      // dispatch(showModal({ isShowModal: false, modalChildren: null }));
      setIsLoading(false);

      if (response.success) {
        toast.success(response.mes);
        render();
        seteditProduct(null);
      } else toast.error(response.mes);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[75px] w-full"></div>
      <div className="p-4 border-b-2 border-main fixed bg-gray-100 flex justify-between items-center top-0 right-0 left-[257px]">
        <h1 className=" text-main text-3xl font-bold  ">Update Product</h1>
        <span
          className="text-red-600 hover:underline cursor-pointer"
          onClick={() => seteditProduct(null)}
        >
          Cancel
        </span>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <InputForm
            label="Name product"
            register={register}
            errors={errors}
            id="title"
            validate={{
              required: "Need fill this field",
            }}
            style="flex-1"
            placeholder="Name of new product"
          />
          <div className="w-full flex gap-4 my-6">
            <InputForm
              label="Price product"
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "Need fill this field",
              }}
              style="flex-auto"
              placeholder="Price of new product"
              type="number"
              fullWidth
            />
            <InputForm
              label="Quantity product"
              register={register}
              errors={errors}
              id="quantity"
              validate={{
                required: "Need fill this field",
              }}
              style="flex-auto"
              placeholder="Quantity of new product"
              type="number"
              fullWidth
            />
            <InputForm
              label="Color product"
              register={register}
              errors={errors}
              id="color"
              validate={{
                required: "Need fill this field",
              }}
              style="flex-auto"
              placeholder="Color of new product"
              fullWidth
            />
            <InputForm
              label="Size product"
              register={register}
              errors={errors}
              id="size"
              validate={{
                required: "Need fill this field",
              }}
              style="flex-auto"
              placeholder="Size of new product"
              fullWidth
            />
          </div>
          <div className="w-full flex gap-4 my-6">
            <Select
              label="Category"
              options={categories?.map((el) => ({
                code: el.title,
                value: el.title,
              }))}
              register={register}
              id="category"
              validate={{ required: "Need fill this field" }}
              style="flex-auto"
              errors={errors}
              fullWidth
            />
            <Select
              label="Brand (Optional)"
              options={categories
                ?.find((el) => el.title === watch("category"))
                ?.brand?.map((el) => ({
                  code: el.toLowerCase(),
                  value: el,
                }))}
              register={register}
              id="brand"
              style="flex-auto"
              errors={errors}
              fullWidth
            />
          </div>
          <MarkdownEditor
            name="description"
            changeValue={changeValue}
            label="Description"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            value={payload.description}
          />
          <div className="flex flex-col gap-2 mt-8">
            <label className="font-semibold" htmlFor="thumb">
              Upload image thumb
            </label>
            <input type="file" id="thumb" {...register("thumb")} />
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
            <input type="file" id="products" multiple {...register("images")} />
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
                  {/* {hoverElm === el.name && (
                    <div
                      className=" cursor-pointer absolute inset-0 bg-overlay animate-slide-top flex items-center justify-center"
                      onClick={() => handleRemoveImage(el.name)}
                    >
                      <RiDeleteBin2Fill
                        size={35}
                        color="white"
                      ></RiDeleteBin2Fill>
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          )}
          <div className="my-6">
            {!isLoading ? (
              <Button type="submit">Update Product</Button>
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

export default memo(UpdateProduct);
