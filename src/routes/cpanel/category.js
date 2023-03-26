var express = require('express');
var router = express.Router();


const productController = require('../../controllers/Product');
const categoryController = require('../../controllers/Category');
const authentication =require('../../../middleware/authentication');
const upload = require('../../../middleware/upload');
 /**
* http://localhost:3000/category
* method : get
* detail : Lấy danh sách danh mục 
* author : Hồ Thành Đạt
* date   : 20/10/2022
*/
router.get('/',[authentication.checkLogin], async function(req, res, next) {
    const data = await categoryController.getCategoriesForWeb();
    res.render('category/index',{category: data});
  });
 /**
* http://localhost:3000/category/insert
* method : get
* detail : HIển thị trang thêm mới danh mục
* author : Hồ Thành Đạt
* date   : 20/10/2022
*/
router.get('/insert',[authentication.checkLogin], async function(req, res, next) {
  res.render('category/insert', { layout: 'layout_child' });
});
 /**
* http://localhost:3000/category/insert
* method : get
* detail : Thêm mới danh mục 
* author : Hồ Thành Đạt
* date   : 20/10/2022
*/
router.post('/',[authentication.checkLogin],[upload.single('image')], async function(req, res, next) {
  //thêm mới sản phẩm vào database
  let {body, file} = req;
  let image = '';
  if(file){
    image = `http://localhost:3000/images/${file.filename}`;
  }
  body = {...body,image : image}
  await categoryController.insertCategory(body);
  res.redirect('/category');
});

  /**
* http://localhost:3000/category/:id/edit
* method : get
* detail : Lấy thông tin 1 sản phẩm
* author : Hồ Thành Đạt
* date   : 20/10/2022
*/
router.get('/:id/edit', async function(req, res, next) {
  //lấy thông tin 1 sản phẩm
  const { id } = req.params;
  const category = await categoryController.getCategoryByIdForWeb(id);  
  res.render('category/update', { layout: 'layout_update' ,category : category });
});

/**
* http://localhost:3000/category/:id/edit
* method : post
* detail : Cập nhật 1 danh mục
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
  await categoryController.update(params.id,body);
  res.redirect('/category');
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
    const products = await categoryController.checkProductInCategory(id);
    if(products){
      await categoryController.delete(id);
      res.json({result: true});
    }else{
      alert("There are products that already exist");
    }
  }catch(err){
    next(err);
  }
  
});
  module.exports = router;

