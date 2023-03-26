var express = require('express');
var router = express.Router();
const bannerController = require('../../controllers/Banner')
const authentication = require('../../../middleware/authentication')

 // http://localhost:3000/api/categories
 router.get('/banner',[authentication.checkToken], async function(req, res, next) {
  const banner = await bannerController.getBanners();
  res.json(banner);
});

module.exports = router;