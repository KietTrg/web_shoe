import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Select, Button, MarkdownEditor, Loading } from "components";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { validate, getBase64 } from "ultils/helpers";
import { toast } from "react-toastify";
import { apiCreateProduct } from "apis";
import { showModal } from "store/app/appSlice";
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
// import { RiDeleteBin2Fill } from "react-icons/ri";
const CreateProducts = () => {
  const { categories } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    watch,
  } = useForm();

  const [payload, setPayload] = useState({
    description: "",
  });
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );
  const [hoverElm, setHoverElm] = useState(null);
  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };
  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpg") {
        toast.warning("File not support");
        // Swal.fire("File not support", "errors");
      }
      const base64 = await getBase64(file);
      imagesPreview.push({ name: file.name, path: base64 });
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };
  useEffect(() => {
    handlePreviewThumb(watch("thumb")[0]);
    // console.log(watch("thumb"));
  }, [watch("thumb")]);
  useEffect(() => {
    handlePreviewImages(watch("images"));
    // console.log(watch("thumb"));
  }, [watch("images")]);

  const handleCreateProduct = async (data) => {
    const invalids = validate(payload, setInvalidFields);
    if (invalids === 0) {
      if (data.category)
        data.category = categories?.find(
          (el) => el._id === data.category
        )?.title;
      // const datasize = data.size.split(",");
      // console.log(datasize);
      const finalPayload = { ...data, ...payload };
      // console.log({ ...data, ...payload });
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      if (finalPayload.thumb) formData.append("thumb", finalPayload.thumb[0]);
      if (finalPayload.images) {
        for (let image of finalPayload.images) formData.append("images", image);
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
      console.log("formData: ", formData);
      // dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      setIsLoading(true);
      const response = await apiCreateProduct(formData);
      setIsLoading(false);
      // dispatch(showModal({ isShowModal: false, modalChildren: null }));

      if (response.success) {
        toast.success(response.mes);
        reset();
        setPayload({
          thumb: "",
          image: [],
        });
      } else toast.error(response.mes);
    }
  };
  return (
    <div className="w-full ">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold p-4 border-b-2 border-main">
        <span className="text-main">Create New Product</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
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
                code: el._id,
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
                ?.find((el) => el._id === watch("category"))
                ?.brand?.map((el) => ({
                  code: el,
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
          />
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
                    src={el.path}
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
              <Button type="submit">Create New Product</Button>
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

export default CreateProducts;
