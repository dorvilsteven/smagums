const router = require("express").Router();
const { Product } = require("../../models");

// internal use /api, so developers can add product info in database
// read /api/product
router.get("/", (req, res) => {
  // SELECT *
  Product.findAll()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// read a specific product by id: /api/product/1
router.get("/:id", (req, res) => {
  Product.findOne({
    where: { id: req.params.id },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "None found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create /api/product
router.post("/", (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    product_type: req.body.product_type,
    brand_name: req.body.brand_name,
    product_image_url: req.body.product_image_url,
    price: req.body.price,
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update /api/product/1
router.put("/:id", (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data[0]) {
        res.status(404).json({ message: "No product found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// destroy /api/product/1
router.delete("/:id", (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No product found with this id" });
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
