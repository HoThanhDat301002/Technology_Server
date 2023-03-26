var express = require('express');
var router = express.Router();
const productController = require('../../controllers/Product');
const authentication = require('../../../middleware/authentication');
const ProductModel = require('../../models/Product');
const Category = require('../../models/Category');

const PAGE_SIZE = 6
   /**
  //http://localhost:3000/api/products
*/
router.get('/products',[authentication.checkToken], async function(req, res, next) {
    var page = req.query.page;
    const search = req.query.search || "";
    if(page){
      page = parseInt(page)
      if(page < 1){
        page = 1
      }
      var soLuongBoQua = (page - 1) * PAGE_SIZE
      ProductModel.find({})
      .skip(soLuongBoQua)
      .limit(PAGE_SIZE)
      .then(data=> {
        res.json(data)
      }).catch(err => {
        res.status(500).json('loi sever')
      })
    } else if(search){
      var soLuongBoQua = (page - 1) * PAGE_SIZE
      ProductModel.find({name: {$regex: search, $options: "i"}})
      .skip(soLuongBoQua)
      .then(data=> {
        res.json(data)
      }).catch(err => {
        res.status(500).json('loi sever')
      })
    }
    else{
      const products = await productController.getProductSearch();
      res.json(products);
    }
    
  });

  router.post('/products',[authentication.checkToken], async function(req, res, next) {
    try {
    const newProduct = new ProductModel(req.body);
    const savedProduct = await newProduct.save();
    if(req.body.category_id){
      const categories = Category.findById(req.body.category_id);
      await categories.updateOne({$push: {product: savedProduct._id}});
    }
    res.status(200).json(savedProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.delete('/products/:id',[authentication.checkToken], async function(req, res, next) {
    try {
      await Category.updateMany(
        { product: req.params.id },
        { $pull: {product: req.params.id}}
      );
      await ProductModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  });



  //http://localhost:3000/api/products/:id/detail
router.get('/products/:id/detail',[authentication.checkToken], async function(req, res, next) {
    const {id} = req.params;
    const product = await productController.getProductById(id);
    res.json(product);
  });



module.exports = router;