// tầng giao tiếp với database
const User = require('../models/User');
const productModel = require('../models/Product');
const Order = require('../models/Order');

//lấy danh order
exports.getOrders = async () => {
    const orders = await Order.find({}).populate('details');
    return orders;
}

//lấy thông tin chi tiết 1 order
exports.getOrderById = async (id) => {
  const order = await Order.findById(id).populate('details');
  return order;
}

exports.delete = async (id) => {
  await Order.findByIdAndDelete(id);
}

exports.update = async (id,order) => {
  await Order.findByIdAndUpdate(id,order);
}
exports.getSumOrders = async () => {
  const sumOrders = await Order.find({}).count();
 
    return sumOrders;
}
exports.getMoneyFinalInMonth = async () => {
  const data = await Order.aggregate(
    [
      {
        $match: {
              "status": {
                $eq: "COMPLETE"
              }
            },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              "date": "$released",
              "format": "%Y-%m"
            },
          },
          totalAmount: { $sum:"$moneyFinal"},
          // Count: {
          //   $sum: 1
          // },
        }
      },
      // {
      //   $match: {
      //     $and: [
      //       {
      //         "createdAt": {
      //           $gte: ISODate("2021-07-01")
      //         }
      //       },
      //       {
      //         "createdAt": {
      //           $lte: ISODate("2021-12-31")
      //         }
      //       }
      //     ],
          
      //   }
      // },
    ])
    return data;
}
exports.getStatusForCheck = async () => {
  const data = await Order.aggregate(
    [     
      {
        $group: {
          _id: "$status" 
          ,
          Count: {
            $sum: 1
          },
        }
      },
    ])
    return data;
}

exports.getTotalMoney = async () => {
  const data = await Order.aggregate(
    [
      {
        $match: {
              "status": {
                $eq: "COMPLETE"
              }
            },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              "date": "$released",
              "format": "%Y"
            },
          },
          totalAmount: { $sum:"$moneyFinal"},
        }
      },

    ])
    return data;
}
