var express = require('express');
var router = express.Router();
const authentication =require('../../../middleware/authentication');
const orderController = require('../../controllers/Order');
const userController = require('../../controllers/User');
const productController = require('../../controllers/Product');
const categoryController = require('../../controllers/Category');
router.get('/',[authentication.checkLogin],async function(req,res,next){
    const sumOrders = await orderController.getSumOrders();
    const sumUsers = await userController.getSumUsers();
    const sumProducts = await productController.getSumProducts();
    const sumCategories = await categoryController.getSumCategories();
    const sumMoney = await orderController.getTotalMoney();
    const getStatus = await orderController.getStatusForCheck();

    const getStatusComplete = getStatus.filter(s=> s._id == 'COMPLETE');
    res.render('dashboard/index',{sumOrders: sumOrders,
      sumUsers: sumUsers,
      sumProducts: sumProducts,
      sumCategories : sumCategories,
      sumMoney : sumMoney[0].totalAmount,
      sumCount : getStatusComplete[0].Count,
    });
  });

module.exports = router;