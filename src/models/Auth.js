const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const authSchema = new Schema({
    id: { type: ObjectId },
    email: { type: String, required: true },
    password: { type: String }
});

module.exports = mongoose.model('auth', authSchema);