var express = require('express');
var router = express.Router();
const upload = require('../../../middleware/upload');
const userController = require('../../controllers/User');
const authentication = require('../../../middleware/authentication');
router.get('/',[authentication.checkLogin], async function(req, res, next) {
    const data = await userController.getUsers();
    res.render('user/index',{user : data});
});
 /**
* http://localhost:3000/user/insert
* method : get
* detail : Hiển thị trang thêm mới khách hàng
* author : Hồ Thành Đạt
* date   : 17/03/2022
*/
router.get('/insert',[authentication.checkLogin], async function(req, res, next) {
  const userTypes = await userTypeController.getUserType();
  res.render('user/insert', {userTypes : userTypes, layout: 'layout_child' });
});

  module.exports = router;
