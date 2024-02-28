import axios from "../axios";

export const apiGetCategories = (params) =>
  axios({
    url: "/productcategory/",
    method: "get",
    params,
  });
