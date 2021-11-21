const router = require("express").Router();
const { Product } = require("../models");

router.get("/", (req, res) => {
  res.render("shop");
});

router.get("/:id", (req, res) => {
  res.render("singlePage");
});

// read products by product_type: /api/product?product_type=shoes
router.get("/", (req, res) => {
  //what should the path be??
  Product.findAll({
    where: { product_type: req.body.product_type },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "None found with this product type" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// read products by brand_name: /api/product?brand_name=ASOS
router.get("/", (req, res) => {
  //what should the path be??
  Product.findAll({
    where: { brand_name: req.body.brand_name },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "None found with this brand name" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
