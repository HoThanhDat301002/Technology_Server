const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    price: { type: Number },
    image: { type: Array, required: false },
    description: { type: String },
    category_id: { type: Schema.Types.ObjectId, ref: 'category' },
    released: { type: Date },
    status: { type: Boolean},
});

module.exports = mongoose.model('product', productSchema);