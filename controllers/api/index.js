const router = require("express").Router();
const productRoutes = require("./product-routes.js");
const userRoutes = require("./user-routes.js");

router.use("/users", userRoutes);
router.use("/products", productRoutes);

module.exports = router;
