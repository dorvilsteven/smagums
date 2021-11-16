const router = require('express').Router();

router.get('/shop', (req, res) => { 
  res.render('shop');
});

module.exports = router;