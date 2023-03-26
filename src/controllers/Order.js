const orderService = require('../services/Order');
const OrderModel = require('../models/Order');
const date = require('../../utils/date');
exports.getOrders = async () => {
    let data = await orderService.getOrders();
    data = data.map((item,index) => {
        item = {
            released: date.format(item.released),
            _id: item._id,
            name: item.name,
            phone: item.price,
            address : item.image,
            paymentType : item.paymentType,
            status : item.status,
            code : item.code,
            feeDelivery : item.feeDelivery,
            moneyTotal : item.moneyTotal,
            moneyDiscount : item.moneyDiscount,
            moneyFinal : item.moneyFinal,
            details : item.details,
            user_id: item.user_id,
            index : index + 1        
        }
        return item;
    })
    return data;
}

exports.getOrderById = async(id) => {
    let order = await orderService.getOrderById(id);
    order = {
        released: date.format(order.released),
        _id: order._id,
        name: order.name,
        phone: order.phone,
        address : order.address,
        paymentType : order.paymentType,
        status : order.status,
        code : order.code,
        feeDelivery : order.feeDelivery,
        moneyTotal : order.moneyTotal,
        moneyDiscount : order.moneyDiscount,
        moneyFinal : order.moneyFinal,
        details : order.details,
        user_id: order.user_id       
    }
    return order;
}
// .map((item) => {
//     item = {
//         quantity: item.quantity,    
//     }
//     return item.quantity;
// })
exports.update = async (id,order) => {
    await orderService.update(id,order);
}
exports.delete = async (id) => {
    await orderService.delete(id);
}
exports.getSumOrders = async () => {
   const sum =  await orderService.getSumOrders();
    return sum;
}
 exports.getMoneyFinalInMonth = async () => {
    const statistical =  await orderService.getMoneyFinalInMonth();
     return statistical;
 }
 exports.getStatusForCheck = async () => {
    const getStatus =  await orderService.getStatusForCheck();
     return getStatus;
 }
 exports.getTotalMoney = async () => {
    const getMoney =  await orderService.getTotalMoney();
     return getMoney;
 }
