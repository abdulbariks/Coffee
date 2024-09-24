const {
  ProductCreate,
  AllProducts,
  SingleProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../controllers/ProductController");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("API works");
});

router.get("/products", AllProducts);
router.get("/products/:id", SingleProduct);
router.post("/products", ProductCreate);
router.patch("/products/:id", UpdateProduct);
router.delete("products/:id", DeleteProduct);

module.exports = router;
