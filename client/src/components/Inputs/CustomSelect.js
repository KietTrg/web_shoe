import clsx from "clsx";
import React from "react";
import Select from "react-select";
const CustomSelect = ({
  label,
  placeholder,
  onChange,
  options = [],
  classname,
  value,
  wrapClassname,
}) => {
  return (
    <div className={clsx(wrapClassname)}>
      {label && <h3>{label}</h3>}
      <Select
        placeholder={placeholder}
        isClearable
        options={options}
        value={value}
        isSearchable
        className={{ contron: () => clsx("border-2, py-[2px]", classname) }}
        onChange={(val) => onChange(val)}
        formatOptionLabel={(option) => (
          <div className="flex text-black items-center gap-2">
            <span>{option.label}</span>
          </div>
        )}
      ></Select>
    </div>
  );
};

export default CustomSelect;
