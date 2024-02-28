import axios from "../axios";
export const apiCreateCategory = (data) =>
  axios({
    url: "/productcategory/",
    method: "post",
    data,
  });
export const apiGetCategory = (params) =>
  axios({
    url: "/productcategory/",
    method: "get",
    params,
  });
export const apiDeleteCategory = (pcid) =>
  axios({
    url: "/productcategory/" + pcid,
    method: "delete",
  });
export const apiUpdateCategory = (data, pcid) =>
  axios({
    url: "/productcategory/" + pcid,
    method: "put",
    data,
  });
