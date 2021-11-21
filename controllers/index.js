const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
const homeRoutes = require("./home-routes.js");
const shopRoutes = require("./shop-routes.js");
const loginRoutes = require("./login-routes.js");
const signUpRoutes = require("./signup-routes.js");

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/shop', shopRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signUpRoutes);

router.use("/", homeRoutes);
router.use("/shop", shopRoutes);

router.use((req, res) => {
  // when the request is made to a not-defined endpoint
  res.status(404).end();
});

module.exports = router;
