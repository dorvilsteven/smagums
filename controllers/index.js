const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const shopRoutes = require('./shop-routes.js');
const loginRoutes = require('./login-routes.js');
const signUpRoutes = require('./signup-routes.js');

router.use('/', homeRoutes);
router.use('/shop', shopRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signUpRoutes);

module.exports = router;