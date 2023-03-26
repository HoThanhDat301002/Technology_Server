var express = require('express');
var router = express.Router();

const Category = require('../../models/Category');
const categoryController = require('../../../src/controllers/Category');
const productController = require('../../../src/controllers/Product');
const upload = require('../../../middleware/upload');
const authentication =require('../../../middleware/authentication');
  /**
* http://localhost:3000/product
* method : get
* detail : Lấy danh sách sản phẩm
* author : Hồ Thành Đạt
* date   : 17/03/2022
*/
router.get('/',[authentication.checkLogin], async function(req, res, next) {
  const data = await productController.getProducts();
  res.render('product/index',{product: data});
});
 /**
* http://localhost:3000/product/insert
* method : get
* detail : Hiển thị trang thêm mới sản phẩm
* author : Hồ Thành Đạt
* date   : 17/03/2022
*/
router.get('/insert',[authentication.checkLogin], async function(req, res, next) {
  const categories = await categoryController.getCategoriesForWeb();
  res.render('product/insert',{categories: categories, layout: 'layout_child' });
});
 /**
* http://localhost:3000/product/insert
* method : post
* detail : Thêm mới sản phẩm
* author : Hồ Thành Đạt
* date   : 17/03/2022
*/
//middleware

router.post('/',[authentication.checkLogin],[upload.array('images',5)], async function(req, res, next) {
  //thêm mới sản phẩm vào database
  let {body} = req;
  var image = [];
  var status = true;
  for(var i=0;i<req.files.length;i++){
    image.push(`http://192.168.100.43:3000/images/${req.files[i].filename}`);
  }
  body = {...body,image : image, status : status}
  await productController.insertProduct(body);

  res.redirect('/product');
});
/**
* http://localhost:3000/product/:id/edit
* method : get
* detail : Lấy thông tin 1 sản phẩm
* author : Hồ Thành Đạt
* date   : 17/03/2022
*/
router.get('/:id/edit',[authentication.checkLogin], async function(req, res, next) {
  //lấy thông tin 1 sản phẩm
  const { id } = req.params;
  const product = await productController.getProductById(id);
  const categories = await categoryController.getCategoryForOneProduct(product.category_id._id);
  res.render('product/update', {layout: 'layout_update', product: product,categories : categories });
});

/**
* http://localhost:3000/product/:id/edit
* method : post
* detail : Cập nhật 1 sản phẩm
* author : Hồ Thành Đạt
* date   : 17/03/2022
*///[authentication.checkLogin]
router.post('/:id/edit',[authentication.checkLogin],[upload.array('images',5)],async function(req, res, next) {
  //cap nhat sản phẩm vào database
  let {body,params} = req;
  var image = [];
  for(var i=0;i<req.files.length;i++){
    image.push(`http://192.168.100.43:3000/images/${req.files[i].filename}`);
  }
  body = {...body,image : image}
  await productController.update(params.id,body);
  res.redirect('/product');
});
 

 /**
* http:/localhost:3000/delete/
* method : delete
* detail : xóa 1 sản phẩm
* author : Hồ Thành Đạt
* date   : 17/03/2022
*/
router.delete('/:id/delete',[authentication.checkLogin], async function(req, res, next) {
  //xóa 1 sản phẩm
  const { id } = req.params;
  await Category.updateMany(
    { product: id },
    { $pull: {product: id}}
  );
  await productController.delete(id);
  res.json({result: true});
});

 /**
* http:/localhost:3000/thong-ke
* method : get
* detail : thống kê sản phẩm
* author : Hồ Thành Đạt
* date   : 17/03/2022
*/
router.get('/:id/thong-ke',[authentication.checkLogin], function(req, res, next) {
  //thông kê 1 sản phẩm
  res.render('product');
});

module.exports = router;
