const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const shopRoutes = require("./shop-routes.js");
const loginRoutes = require("./login-routes.js");
const signUpRoutes = require("./signup-routes.js");
const singlePageRoutes = require("./single-page-routes.js");

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/shop', shopRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signUpRoutes);
router.use('/product', singlePageRoutes);

router.use((req, res) => {
  // when the request is made to a not-defined endpoint
  res.status(404).end();
});

module.exports = router;
