const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const shopRoutes = require('./shop-routes.js');

router.use('/', homeRoutes);
router.use('/shop', shopRoutes);

module.exports = router;