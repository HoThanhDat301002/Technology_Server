const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const voucherSchema = new Schema({
    id: { type: ObjectId },
    title: { type: String },
    image: { type: String },
    body: { type: String },
    discount: { type: Number },
    code: { type: String },
    released: { type: Date },
    end_date: { type: Date },
    user_id: { type: Schema.Types.ObjectId, ref: 'user' }
});

module.exports = mongoose.model('voucher', voucherSchema);