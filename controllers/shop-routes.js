const router = require("express").Router();
const { Product } = require("../models");

router.get("/", (req, res) => {
  res.render("shop");
});

router.get("/:id", (req, res) => {
  res.render("singlePage");
});

// url link for single product
// route /shop/:id
router.get("/:id");

// filter for product by: product type
// where: {[Op.in]: req.body.product_type} /search?product_type=shoes
router.get("/search");

// filter for product by: brand_name
router.get("/search");
