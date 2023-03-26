var express = require('express');
var router = express.Router();
const newsController = require('../../controllers/News');
const authentication = require('../../../middleware/authentication')

   /**
  //http://localhost:3000/api/news
*/
router.get('/news',[authentication.checkToken], async function(req, res, next) {
    const news = await newsController.getNews();
    res.json(news);
  });

  //http://localhost:3000/api/news/:id/detail
router.get('/news/:id/detail',[authentication.checkToken], async function(req, res, next) {
    const {id} = req.params;
    const news = await newsController.getNewsById(id);
    res.json(news);
  });

module.exports = router;