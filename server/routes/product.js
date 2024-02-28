const router = require("express").Router();
const ctrls = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");
router.post(
  "/",
  [verifyAccessToken, isAdmin],
  uploader.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  ctrls.createProduct
);
router.get("/", ctrls.getProducts);
router.put("/rating", verifyAccessToken, ctrls.ratings);

router.put(
  "/uploadimage/:pid",
  [verifyAccessToken, isAdmin],
  uploader.array("images", 10),
  ctrls.uploadImagesProduct
);
router.put(
  "/varriant/:pid",
  [verifyAccessToken, isAdmin],
  uploader.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  ctrls.addVarriant
);
router.put(
  "/quantity/:pid",
  [verifyAccessToken],

  ctrls.updateQuantityProduct
);
router.put(
  "/sold/:pid",
  [verifyAccessToken],

  ctrls.updateSoldProduct
);
router.put(
  "/:pid",
  [verifyAccessToken, isAdmin],
  uploader.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  ctrls.updateProduct
);
router.delete("/:pid", [verifyAccessToken, isAdmin], ctrls.deleteProduct);
router.get("/:pid", ctrls.getProduct);

module.exports = router;
