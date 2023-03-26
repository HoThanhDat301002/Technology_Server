const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String},
    age: { type: Number , required: false},
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    order: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "order"
        }
    ]
});

module.exports = mongoose.model('user', userSchema);