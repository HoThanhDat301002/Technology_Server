const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    image:{type: String},
    description: { type: String },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ]
});

module.exports = mongoose.model('category', categorySchema);