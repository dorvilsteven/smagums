const router = require("express").Router();
const { Product } = require("../../models");
const { Op } = require("sequelize");

// internal use /api, so developers can add product info in database
router.get("/", (req, res) => {
  // SELECT *
  Product.findAll()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// read a specific product by id
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

// INSERT INTO
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

// UPDATE
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

// DELETE
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

router.post("/search", (req, res) => {
  Product.findAll({
    where: {
      // product_type: 'shoes'
      product_type: {
        [Op.in]: req.body.product_type, // array
      },
      price: {
        [Op.lte]: req.body.price,
      },
    },
  });
});
const searchTerm = "product_type";
const data = {
  [searchTerm]: "shoes",
};
// `search term = ${searchTerm}`
// "search term = " + searchTerm
// SELECT * FROM Product
// WHERE product_type IN ('shoes', 'shirts')
// WHERE product_type = 'shoes'
module.exports = router;
