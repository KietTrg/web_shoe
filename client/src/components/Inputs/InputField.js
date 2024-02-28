import React, { memo } from "react";
import clsx from "clsx";
const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  style,
  fullWidth,
  placeholder,
  isHideLabel,
}) => {
  return (
    <div className={clsx("flex flex-col mb-2 relative", fullWidth && "w-full")}>
      {!isHideLabel && value?.trim() !== "" && (
        <label
          htmlFor={nameKey}
          className=" block bg-white px-1 text-[12px] absolute top-0 left-[8px] animate-slide-top-sm"
        >
          {nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        name=""
        id=""
        className={clsx(
          "px-4 py-2 rounded-lg w-full mt-2 border-b border-gray-300 placeholder:text-sm outline-none",
          style
        )}
        placeholder={
          placeholder || nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)
        }
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
      ></input>
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className=" text-red-700 text-[10px] italic">
          {invalidFields.find((el) => el.name === nameKey)?.mes}
        </small>
      )}
    </div>
  );
};

export default memo(InputField);
