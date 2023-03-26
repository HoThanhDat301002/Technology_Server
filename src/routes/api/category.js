var express = require('express');
var router = express.Router();
const categoryController = require('../../controllers/Category')
const authentication = require('../../../middleware/authentication')

 // http://localhost:3000/api/categories
 router.get('/categories',[authentication.checkToken], async function(req, res, next) {
  const categories = await categoryController.getCategories();
  res.json(categories);
});
module.exports = router;