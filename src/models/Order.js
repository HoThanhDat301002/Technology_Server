const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    phone: { type: String },
    address: {type: String},
    paymentType:{type: String}, // Hinh thuc thanh toan
    status: {type: String}, // trang thai don hang
    code: {type: String}, // Ma giam gia
    feeDelivery:{type:Number}, // tiền shiper
    moneyTotal:{type:Number}, // Tổng cộng
    moneyDiscount:{type:Number}, // tiền giảm giá
    moneyFinal:{type:Number}, // tiền cuối cùng
    details: [
      
    ],
    user_id: { type: Schema.Types.ObjectId, ref: 'user' },
    released: { type: Date },
});

module.exports = mongoose.model('order', orderSchema);
