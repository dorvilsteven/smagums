const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => {
  // when the request is made to a not-defined endpoint
  res.status(404).end();
});

// const homeRoutes = require("./home-routes.js");
// const shopRoutes = require("./shop-routes.js");

// router.use("/", homeRoutes);
// router.use("/shop", shopRoutes);

module.exports = router;
