var express = require('express');
var router = express.Router();
const authentication =require('../../../middleware/authentication');
const orderController = require('../../controllers/Order');
router.get('/',[authentication.checkLogin], async function(req,res,next){
  const statistical = await orderController.getMoneyFinalInMonth();
  const getStatus = await orderController.getStatusForCheck();
  const getMoney = statistical.map(month => month.totalAmount);
  const getMonth = statistical.map(month => month._id);

  const getStatusCancel = getStatus.filter(s=> s._id == 'CANCEL');
  const getCountCancel = getStatusCancel.map(s => s.Count)[0];

  const getStatusComplete = getStatus.filter(s=> s._id == 'COMPLETE');
  const getCountComplete = getStatusComplete.map(s => s.Count)[0];

  const getStatusWaiting = getStatus.filter(s=> s._id == 'WAITING');
  const getCountWaiting = getStatusWaiting.map(s => s.Count)[0];

  const getStatusProcessing = getStatus.filter(s=> s._id == 'PROCESSING');
  const getCountProcessing = getStatusProcessing.map(s => s.Count)[0];

  const getStatusDelivering = getStatus.filter(s=> s._id == 'DELIVERING');
  const getCountDelivering = getStatusDelivering.map(s => s.Count)[0];
    res.render('chart/index',{getMonth: getMonth,getMoney: getMoney,
      getCountCancel : getCountCancel,
      getCountComplete: getCountComplete,
      getCountWaiting : getCountWaiting,
      getCountProcessing: getCountProcessing,
      getCountDelivering : getCountDelivering
    });
});

module.exports = router;