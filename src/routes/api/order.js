var express = require('express');
var router = express.Router();
const orderController = require('../../controllers/Order');
const authentication = require('../../../middleware/authentication');
const OrderModel = require('../../models/Order');
const User = require('../../models/User');

const PAGE_SIZE = 6
   /**
  //http://localhost:3000/api/products
*/
router.get('/orders',[authentication.checkToken], async function(req, res, next) {
      const orders = await orderController.getOrders();
      res.json(orders);
  });

  router.post('/orders',[authentication.checkToken], async function(req, res, next) {
    try {
    const newOrder = new OrderModel(req.body);
    const savedOrder = await newOrder.save();
    if(req.body.user_id){
      const user = User.findById(req.body.user_id);
      await user.updateOne({$push: {order: savedOrder._id}});
    }
    res.status(200).json(savedOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  router.post('/orders/:id/update',[authentication.checkToken], async function(req, res, next) {
    try {
      const order = await OrderModel.findById(req.params.id);
      await order.updateOne({$set: req.body});
      res.status(200).json("Update thanh cong")
    } catch (error) {
      res.status(200).json("Update fail") 
    }
  });
  router.delete('/orders/:id',[authentication.checkToken], async function(req, res, next) {
    try {
      await User.updateMany(
        { order: req.params.id },
        { $pull: {order: req.params.id}}
      );
      await OrderModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  });



  //http://localhost:3000/api/products/:id/detail
router.get('/orders/:id/detail',[authentication.checkToken], async function(req, res, next) {
    const {id} = req.params;
    const order = await orderController.getOrderById(id);
    res.json(order);
  });


module.exports = router;