import React, { memo, useEffect, useState } from "react";
import icons from "../../ultils/icons";
import { colors } from "../../ultils/contants";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { apiGetProducts } from "../../apis";
import useDebounce from "../../hooks/useDebounce";
import Swal from "sweetalert2";

const { AiOutlineDown } = icons;
const SearchItem = ({
  name,
  activeClick,
  ChangeActiveFilter,
  type = "checkbox",
}) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [selected, setSetselected] = useState([]);
  const [params] = useSearchParams();
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const [bestPrice, setBestPrice] = useState(null);
  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl)
      setSetselected((prev) => prev.filter((el) => el !== e.target.value));
    else setSetselected((prev) => [...prev, e.target.value]);
    ChangeActiveFilter(null);
  };
  const fetchBestPriceProduct = async () => {
    const response = await apiGetProducts({ sort: "-price", limit: 1 });
    if (response.success) setBestPrice(response.productDatas[0]?.price);
  };

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (selected.length > 0) {
      queries.color = selected.join(",");

      queries.page = 1;
    } else delete queries.color;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);
  useEffect(() => {
    if (type === "input") fetchBestPriceProduct();
  }, [type]);
  useEffect(() => {
    if (price.from && price.to && price.from > price.to)
      Swal.fire("From price cannot greater than to price");
  }, [price]);
  const deboucePriceFrom = useDebounce(price.from, 500);
  const deboucePriceTo = useDebounce(price.to, 500);
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (Number(price.from) > 0) queries.from = price.from;
    else delete queries.from;
    if (Number(price.to) > 0) queries.to = price.to;
    else delete queries.to;
    queries.page = 1;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [deboucePriceFrom, deboucePriceTo]);
  // console.log(selected);

  return (
    <div
      className=" cursor-pointer relative text-sm gap-6 p-2 rounded-xl border border-main flex justify-between items-center"
      onClick={() => ChangeActiveFilter(name)}
    >
      <span className=" capitalize">{name}</span>
      <AiOutlineDown></AiOutlineDown>
      {activeClick === name && (
        <div className=" z-10 absolute top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]">
          {type === "checkbox" && (
            <div className="">
              <div className="p-4 flex justify-between items-center gap-8 border-b">
                <span className=" whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  className=" cursor-pointer underline hover:text-main"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSetselected([]);
                    ChangeActiveFilter(null);
                  }}
                >
                  Reset
                </span>
              </div>
              <div
                className="flex flex-col gap-3 mt-4"
                onClick={(e) => e.stopPropagation()}
              >
                {colors.map((el, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-main bg-gray-100 rounded border-gray-300 focus-within:hidden"
                      value={el}
                      onChange={handleSelect}
                      id={el}
                      checked={selected.some(
                        (selectedItem) => selectedItem === el
                      )}
                    ></input>
                    <label className=" capitalize text-gray-700" htmlFor={el}>
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-4 flex justify-between items-center gap-8 border-b">
                <span className=" whitespace-nowrap">{`Gia cao nhat la ${Number(
                  bestPrice
                ).toLocaleString()} VND`}</span>
                <span
                  className=" cursor-pointer underline hover:text-main"
                  onClick={(e) => {
                    e.stopPropagation();
                    // setSetselected([]);
                    setPrice({ from: "", to: "" });
                    ChangeActiveFilter(null);
                  }}
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                    type="number"
                    id="from"
                    className="form-input"
                  ></input>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                    type="number"
                    id="to"
                    className="form-input"
                  ></input>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
