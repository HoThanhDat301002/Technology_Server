var express = require('express');
var router = express.Router();
const voucherController = require('../../controllers/Voucher');
const authentication =require('../../../middleware/authentication');
const upload = require('../../../middleware/upload');
 /**
* http://localhost:3000/category
* method : get
* detail : Lấy danh sách danh mục 
* author : Hồ Thành Đạt
* date   : 9/04/2022
*/
router.get('/',[authentication.checkLogin], async function(req, res, next) {
    const data = await voucherController.getVoucher();
    res.render('voucher/index',{voucher: data});
  });
   /**
* http://localhost:3000/voucher/insert
* method : get
* detail : Hiển thị trang thêm mới khuyến mãi
* author : Hồ Thành Đạt
* date   : 17/03/2022
*/
router.get('/insert',[authentication.checkLogin], async function(req, res, next) {
  res.render('voucher/insert', { layout: 'layout_child' });
});
  /**
* http://localhost:3000/voucher/insert
* method : post
* detail : trang thêm mới khuyến mãi
* author : Hồ Thành Đạt
* date   : 17/03/2022
*/
router.post('/',[authentication.checkLogin],[upload.single('image')], async function(req, res, next) {
  //thêm mới sản phẩm vào database
  let {body, file} = req;
  let image = '';
  if(file){
    image = `http://localhost:3000/images/${file.filename}`;
  }
  body = {...body,image : image}
  await voucherController.insertVoucher(body);
  res.redirect('/voucher');
});
 /**
* http://localhost:3000/category/:id/edit
* method : get
* detail : Lấy thông tin 1 tin tuc
* author : Hồ Thành Đạt
* date   : 20/10/2022
*/
router.get('/:id/edit',[authentication.checkLogin], async function(req, res, next) {
  //lấy thông tin 1 sản phẩm
  const { id } = req.params;
  const voucher = await voucherController.getVoucherById(id);  
  res.render('voucher/update', { layout: 'layout_update' ,voucher : voucher });
});

/**
* http://localhost:3000/news/:id/edit
* method : post
* detail : Cập nhật 1 tin tuc
* author : Hồ Thành Đạt
* date   : 20/10/2022
*///[authentication.checkLogin]
router.post('/:id/edit',[authentication.checkLogin],[upload.single('image')],async function(req, res, next) {
  let {body, file,params} = req;
  delete body.image;
  if(file){
    let image = `http://192.168.100.43:3000/images/${file.filename}`;
    body = {...body, image: image};
  }
  await voucherController.update(params.id,body);
  res.redirect('/voucher');
});
/**
* http:/localhost:3000/delete/
* method : delete
* detail : xóa 1 sản phẩm
* author : Hồ Thành Đạt
* date   :20/10/2022
*/
router.delete('/:id/delete',[authentication.checkLogin], async function(req, res, next) {
  //xóa 1 sản phẩm
  try{
    const { id } = req.params;
      await voucherController.delete(id);
      res.json({result: true});
  }catch(err){
    next(err);
  }
  
});
  module.exports = router;