const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total, address, status } = req.body;
  if (address) {
    await User.findByIdAndUpdate(_id, { address, cart: [] });
  }
  const data = { products, total, orderBy: _id };
  if (status) data.status = status;
  const rs = await Order.create(data);
  return res.json({
    success: rs ? true : false,
    rs: rs ? rs : "Something went wrong",
  });
});
const updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error("Missing status");
  const response = await Order.findByIdAndUpdate(
    oid,
    { status },
    { new: true }
  );
  return res.json({
    success: response ? true : false,
    response: response ? response : "Something went wrong",
  });
});
// const getUserOrder = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const response = await Order.find({ orderBy: _id });
//   return res.json({
//     success: response ? true : false,
//     response: response ? response : "Something went wrong",
//   });
// });

const getUserOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const { _id } = req.user;
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (mactheEl) => `$${mactheEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  // let colorQueryObject = {};
  // //filtering
  // if (queries?.title)
  //   formatedQueries.title = { $regex: queries.title, $options: "i" }; //'i': ko phan biet hoa hay thuong
  // if (queries?.category)
  //   formatedQueries.category = { $regex: queries.category, $options: "i" }; //'i': ko phan biet hoa hay thuong
  // if (queries?.color) {
  //   delete formatedQueries.color;
  //   const colorArr = queries.color?.split(",");
  //   const colorQuery = colorArr.map((el) => ({
  //     color: { $regex: el, $options: "i" },
  //   }));
  //   colorQueryObject = { $or: colorQuery };
  // }

  // // let queryObject = {};
  // // if (queries?.q) {
  // //   delete formatedQueries.q;
  // //   queryObject = {
  // //     $or: [
  // //       {
  // //         color: { $regex: queries.q, $options: "i" },
  // //       },
  // //       {
  // //         title: { $regex: queries.q, $options: "i" },
  // //       },
  // //       {
  // //         category: { $regex: queries.q, $options: "i" },
  // //       },
  // //       {
  // //         brand: { $regex: queries.q, $options: "i" },
  // //       },
  // //       // {
  // //       //   description: { $regex: queries.q, $options: "i" },
  // //       // },
  // //     ],
  // //   };
  // }
  const qr = { ...formatedQueries, orderBy: _id };
  let queryCommand = Order.find(qr);

  //sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  //fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  //pagination
  const page = +req.query.page * 1 || 1;
  const limit = +req.query.limit * 1 || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  // Execute query
  // so luong sp thoa man dk
  queryCommand
    .exec()
    .then(async (response) => {
      const counts = await Order.find(qr).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        order: response ? response : "Cannot get products",
      });
    })
    .catch((err) => {
      if (err) throw new Error(err.message);
    });
});
const getOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (mactheEl) => `$${mactheEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  // let colorQueryObject = {};
  // //filtering
  // if (queries?.title)
  //   formatedQueries.title = { $regex: queries.title, $options: "i" }; //'i': ko phan biet hoa hay thuong
  // if (queries?.category)
  //   formatedQueries.category = { $regex: queries.category, $options: "i" }; //'i': ko phan biet hoa hay thuong
  // if (queries?.color) {
  //   delete formatedQueries.color;
  //   const colorArr = queries.color?.split(",");
  //   const colorQuery = colorArr.map((el) => ({
  //     color: { $regex: el, $options: "i" },
  //   }));
  //   colorQueryObject = { $or: colorQuery };
  // }

  // // let queryObject = {};
  // // if (queries?.q) {
  // //   delete formatedQueries.q;
  // //   queryObject = {
  // //     $or: [
  // //       {
  // //         color: { $regex: queries.q, $options: "i" },
  // //       },
  // //       {
  // //         title: { $regex: queries.q, $options: "i" },
  // //       },
  // //       {
  // //         category: { $regex: queries.q, $options: "i" },
  // //       },
  // //       {
  // //         brand: { $regex: queries.q, $options: "i" },
  // //       },
  // //       // {
  // //       //   description: { $regex: queries.q, $options: "i" },
  // //       // },
  // //     ],
  // //   };
  // }
  const qr = { ...formatedQueries };
  let queryCommand = Order.find(qr);

  //sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  //fields limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  //pagination
  const page = +req.query.page * 1 || 1;
  const limit = +req.query.limit * 1 || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  // Execute query
  // so luong sp thoa man dk
  queryCommand
    .exec()
    .then(async (response) => {
      const counts = await Order.find(qr).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        counts,
        order: response ? response : "Cannot get products",
      });
    })
    .catch((err) => {
      if (err) throw new Error(err.message);
    });
});
module.exports = {
  createOrder,
  updateStatus,
  getUserOrders,
  getOrders,
};
