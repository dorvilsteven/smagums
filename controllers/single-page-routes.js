const router = require("express").Router();
const { Product } = require("../models");

router.get("/:id", (req, res) => {
  res.render("singlepage");
});


module.exports = router;