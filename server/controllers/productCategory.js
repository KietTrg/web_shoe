const ProductCategory = require("../models/productCategory");
const asyncHandler = require("express-async-handler");

const creatCategory = asyncHandler(async (req, res) => {
  const { title, brand } = req.body;
  req.body.brand = brand.slice(1);
  const image = req?.files?.image[0]?.path;

  if (!(title && brand)) throw new Error("Missing input");
  if (image) req.body.image = image;
  const response = await ProductCategory.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? "Created" : "Cannot create new category",
  });
});
const getCategories = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((el) => delete queries[el]);

  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (mactheEl) => `$${mactheEl}`
  );
  const formatedQueries = JSON.parse(queryString);

  let brandQueryObject = {};
  //filtering
  if (queries?.title)
    formatedQueries.title = { $regex: queries.title, $options: "i" }; //'i': ko phan biet hoa hay thuong
  if (queries?.brand) {
    delete formatedQueries.brand;
    const brandArr = queries.brand?.split(",");
    const brandQuery = brandArr.map((el) => ({
      brand: { $regex: el, $options: "i" },
    }));
    brandQueryObject = { $or: brandQuery };
  }
  let queryObject = {};
  if (queries?.q) {
    delete formatedQueries.q;
    queryObject = {
      $or: [
        {
          title: { $regex: queries.q, $options: "i" },
        },

        {
          brand: { $regex: queries.q, $options: "i" },
        },
        // {
        //   description: { $regex: queries.q, $options: "i" },
        // },
      ],
    };
  }
  const qr = { ...brandQueryObject, ...formatedQueries, ...queryObject };
  let queryCommand = ProductCategory.find(qr);
  //sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    queryCommand = queryCommand.sort(sortBy);
  }
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    queryCommand = queryCommand.select(fields);
  }
  //pagination
  const page = +req.query.page * 1 || 1;
  const limit = +req.query.limit * 1 || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  queryCommand = queryCommand.skip(skip).limit(limit);
  queryCommand
    .exec()
    .then(async (response) => {
      const counts = await ProductCategory.find(qr).countDocuments();
      return res.status(200).json({
        success: response ? true : false,
        productCategories: response ? response : "Cannot get category",
        counts,
      });
    })
    .catch((err) => {
      if (err) throw new Error(err.message);
    });
  // const queries = { ...req.query };
  // const excludeFields = ["limit", "sort", "page", "fields"];
  // excludeFields.forEach((el) => delete queries[el]);

  // let queryString = JSON.stringify(queries);
  // queryString = queryString.replace(
  //   /\b(gte|gt|lt|lte)\b/g,
  //   (mactheEl) => `$${mactheEl}`
  // );
  // const formatedQueries = JSON.parse(queryString);

  // let brandQueryObject = {};
  // //filtering
  // if (queries?.title)
  //   formatedQueries.title = { $regex: queries.title, $options: "i" }; //'i': ko phan biet hoa hay thuong

  // if (queries?.brand) {
  //   delete formatedQueries.brand;
  //   const brandArr = queries.brand?.split(",");
  //   const brandQuery = brandArr.map((el) => ({
  //     brand: { $regex: el, $options: "i" },
  //   }));
  //   brandQueryObject = { $or: brandQuery };
  // }

  // let queryObject = {};
  // if (queries?.q) {
  //   delete formatedQueries.q;
  //   queryObject = {
  //     $or: [
  //       {
  //         title: { $regex: queries.q, $options: "i" },
  //       },

  //       {
  //         brand: { $regex: queries.q, $options: "i" },
  //       },
  //       // {
  //       //   description: { $regex: queries.q, $options: "i" },
  //       // },
  //     ],
  //   };
  // }
  // const qr = { ...brandQueryObject, ...formatedQueries, ...queryObject };
  // let queryCommand = Product.find(qr);

  // //sorting
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(",").join(" ");
  //   queryCommand = queryCommand.sort(sortBy);
  // }
  // //fields limiting
  // if (req.query.fields) {
  //   const fields = req.query.fields.split(",").join(" ");
  //   queryCommand = queryCommand.select(fields);
  // }
  // //pagination
  // const page = +req.query.page * 1 || 1;
  // const limit = +req.query.limit * 1 || process.env.LIMIT_PRODUCTS;
  // const skip = (page - 1) * limit;
  // queryCommand = queryCommand.skip(skip).limit(limit);
  // // Execute query
  // // so luong sp thoa man dk
  // queryCommand
  //   .exec()
  //   .then(async (response) => {
  //     const counts = await ProductCategory.find(qr).countDocuments();
  //     return res.status(200).json({
  //       success: response ? true : false,
  //       productCategories: response ? response : "Cannot get products",
  //       counts,
  //     });
  //   })
  //   .catch((err) => {
  //     if (err) throw new Error(err.message);
  //   });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;

  const files = req?.files;
  req.body.brand = req.body.brand.slice(1);
  if (files?.image) req.body.image = files?.image[0]?.path;

  const updateCategory = await ProductCategory.findByIdAndUpdate(
    pcid,
    {
      ...req.body,
    },
    {
      new: true,
    }
  );
  return res.json({
    success: updateCategory ? true : false,
    mes: updateCategory ? "Updated" : "Cannot update category",
  });
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findByIdAndDelete(pcid);
  return res.json({
    success: response ? true : false,
    mes: response ? "Deleted Category" : "Cannot delete category",
  });
});

module.exports = {
  creatCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
