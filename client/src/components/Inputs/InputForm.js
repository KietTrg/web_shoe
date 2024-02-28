import React, { memo } from "react";
import clsx from "clsx";
const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullWidth,
  defaultValue,
  style,
  readOnly,
}) => {
  return (
    <div className={clsx("flex flex-col gap-2 h-[78px] ", style)}>
      {label && (
        <label className=" font-medium" htmlFor={id}>
          {label + ":"}
        </label>
      )}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(
          " form-input border-none rounded-lg bg-blue-100",
          fullWidth && "w-full",
          style
        )}
        defaultValue={defaultValue}
        readOnly={readOnly}
      ></input>
      {errors[id] && (
        <small className="text-xs text-red-600">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);
