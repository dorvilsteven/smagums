const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

const homeRoutes = require("./home-routes");
const shopRoutes = require("./shop-routes");

router.use("/", homeRoutes);
router.use("/shop", shopRoutes);

router.use((req, res) => {
  // when the request is made to a not-defined endpoint
  res.status(404).end();
});

module.exports = router;
