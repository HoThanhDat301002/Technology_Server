var express = require('express');
var router = express.Router();
const orderController = require('../../controllers/Order');
const authentication =require('../../../middleware/authentication');
 /**
* http://localhost:3000/category
* method : get
* detail : Lấy danh sách danh mục 
* author : Hồ Thành Đạt
* date   : 9/04/2022
*/
router.get('/',[authentication.checkLogin], async function(req, res, next) {
    const data = await orderController.getOrders();
    res.render('order/index',{order: data});
  });

   /**
* http://localhost:3000/order/insert
* method : get
* detail : Hiển thị trang chi tiết đặt hàng
* author : Hồ Thành Đạt
* date   : 17/03/2022
*/
router.get('/:id/edit',[authentication.checkLogin], async function(req, res, next) {
  const { id } = req.params;
  const order = await orderController.getOrderById(id);
  res.render('order/update', { layout: 'layout_update', order : order});
});


router.post('/:id/edit',[authentication.checkLogin],async function(req, res, next) {
  //cập nhật thông tin 1 sản phẩm
  let {body,params} = req;
    body = {...body};
    await orderController.update(params.id,body);
    res.redirect('/order');
});
  module.exports = router;